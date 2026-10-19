package com.borderlesslocalassistant;

import com.borderlesslocalassistant.model.City;
import com.borderlesslocalassistant.model.CityOverview;
import com.borderlesslocalassistant.model.EtiquetteRule;
import com.borderlesslocalassistant.model.TransitGuide;
import com.borderlesslocalassistant.service.LocalAssistantService;
import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.net.URI;
import java.net.InetSocketAddress;
import java.net.URLEncoder;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.sql.SQLException;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Executors;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/** Serves the local web interface and a small read-only JSON API. */
public final class WebServer {
    private static final int PORT = Integer.parseInt(System.getenv().getOrDefault(
            "PORT", System.getProperty("server.port", "8080")));
    private static final Pattern GUIDE_COUNTRY_BLOCK = Pattern.compile(
            "\\{country:'([^']+)',region:'[^']+',cities:\\[([\\s\\S]*?)\\n \\]\\}");
    private static final Pattern GUIDE_CITY = Pattern.compile("\\{name:'([^']+)',sights:\\[");
    private static final LocalAssistantService SERVICE = new LocalAssistantService();
    private static final HttpClient TRANSLATION_CLIENT = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(8)).build();
    private static final ExecutorService TRANSLATION_EXECUTOR = Executors.newFixedThreadPool(4);
    private static final Pattern TRANSLATED_TEXT = Pattern.compile("\\\"translatedText\\\"\\s*:\\s*\\\"((?:\\\\.|[^\\\"\\\\])*)\\\"");
    private static final List<String> TRANSLATION_LANGUAGES = List.of(
            "bn", "en", "ja", "my", "zh", "ko", "vi", "th", "id", "ms", "tl", "hi",
            "ur", "ar", "fr", "de", "es", "pt", "ru", "it", "ne", "si", "km");

    private WebServer() {
    }

    public static void main(String[] args) throws IOException {
        // Bind to all interfaces so a cloud platform's reverse proxy can reach the app.
        HttpServer server = HttpServer.create(new InetSocketAddress(PORT), 0);
        server.createContext("/health", WebServer::handleHealth);
        server.createContext("/api/cities", WebServer::handleCities);
        server.createContext("/api/translate", WebServer::handleTranslate);
        server.createContext("/", WebServer::handleStatic);
        server.setExecutor(Executors.newFixedThreadPool(8));
        server.start();
        System.out.printf("Borderless Local Assistant is listening on port %d%n", PORT);
        System.out.println("Press Ctrl+C to stop.");
    }

    private static void handleHealth(HttpExchange exchange) throws IOException {
        try {
            if (!"/health".equals(exchange.getRequestURI().getPath())) {
                exchange.sendResponseHeaders(404, -1);
                return;
            }
            if (!"GET".equals(exchange.getRequestMethod())) {
                exchange.getResponseHeaders().set("Allow", "GET");
                exchange.sendResponseHeaders(405, -1);
                return;
            }
            byte[] body = "ok".getBytes(StandardCharsets.UTF_8);
            exchange.getResponseHeaders().set("Content-Type", "text/plain; charset=utf-8");
            exchange.getResponseHeaders().set("Cache-Control", "no-store");
            exchange.getResponseHeaders().set("X-Content-Type-Options", "nosniff");
            exchange.sendResponseHeaders(200, body.length);
            exchange.getResponseBody().write(body);
        } finally {
            exchange.close();
        }
    }

    private static void handleTranslate(HttpExchange exchange) throws IOException {
        if (!"POST".equals(exchange.getRequestMethod())) {
            sendJson(exchange, 405, "{\"error\":\"Only POST is supported.\"}");
            return;
        }
        String origin = exchange.getRequestHeaders().getFirst("Origin");
        String host = exchange.getRequestHeaders().getFirst("Host");
        if (origin != null && (host == null || !(origin.equals("http://" + host)
                || origin.equals("https://" + host)))) {
            sendJson(exchange, 403, "{\"error\":\"Origin not allowed.\"}");
            return;
        }
        try {
            byte[] requestBytes = exchange.getRequestBody().readNBytes(24001);
            if (requestBytes.length > 24000) {
                sendJson(exchange, 413, "{\"error\":\"Translation request is too large.\"}");
                return;
            }
            Map<String, List<String>> form = parseForm(new String(requestBytes, StandardCharsets.UTF_8));
            String target = firstValue(form, "target");
            List<String> texts = form.getOrDefault("text", List.of()).stream()
                    .filter(value -> !value.isBlank()).toList();
            if (!TRANSLATION_LANGUAGES.contains(target) || texts.isEmpty() || texts.size() > 128
                    || texts.stream().mapToInt(String::length).sum() > 5000) {
                sendJson(exchange, 400, "{\"error\":\"Invalid translation request.\"}");
                return;
            }

            List<CompletableFuture<String>> translations = texts.stream()
                    .map(text -> CompletableFuture.supplyAsync(() -> {
                        try {
                            return translateFree(text, target);
                        } catch (IOException | InterruptedException exception) {
                            if (exception instanceof InterruptedException) Thread.currentThread().interrupt();
                            throw new CompletionException(exception);
                        }
                    }, TRANSLATION_EXECUTOR)).toList();
            List<String> translated;
            try {
                translated = translations.stream().map(CompletableFuture::join).toList();
            } catch (CompletionException exception) {
                Throwable cause = exception.getCause();
                if (cause instanceof InterruptedException) {
                    Thread.currentThread().interrupt();
                    throw new InterruptedException();
                }
                if (cause instanceof IOException ioException) throw ioException;
                throw exception;
            }
            String result = "{\"translations\":" + translated.stream().map(WebServer::quote)
                    .collect(java.util.stream.Collectors.joining(",", "[", "]")) + "}";
            sendJson(exchange, 200, result);
        } catch (IOException exception) {
            sendJson(exchange, 502, "{\"error\":\"Free translation is temporarily unavailable or rate-limited.\"}");
        } catch (InterruptedException exception) {
            Thread.currentThread().interrupt();
            sendJson(exchange, 502, "{\"error\":\"Translation request was interrupted.\"}");
        } catch (RuntimeException exception) {
            sendJson(exchange, 400, "{\"error\":\"Invalid translation request.\"}");
        } finally {
            exchange.close();
        }
    }

    private static String translateFree(String text, String target) throws IOException, InterruptedException {
        List<String> chunks = splitTranslationText(text, 450);
        List<String> translated = new ArrayList<>();
        for (String chunk : chunks) translated.add(translateFreeChunk(chunk, target));
        return String.join(" ", translated);
    }

    private static List<String> splitTranslationText(String text, int maxBytes) {
        List<String> chunks = new ArrayList<>();
        String remaining = text.trim();
        while (remaining.getBytes(StandardCharsets.UTF_8).length > maxBytes) {
            int bytes = 0, cut = 0, lastSpace = -1;
            for (int offset = 0; offset < remaining.length();) {
                int cp = remaining.codePointAt(offset);
                int width = Character.charCount(cp);
                int cpBytes = new String(Character.toChars(cp)).getBytes(StandardCharsets.UTF_8).length;
                if (bytes + cpBytes > maxBytes) break;
                bytes += cpBytes;
                offset += width;
                cut = offset;
                if (Character.isWhitespace(cp)) lastSpace = offset;
            }
            int end = lastSpace > 0 ? lastSpace : cut;
            if (end <= 0) break;
            chunks.add(remaining.substring(0, end).trim());
            remaining = remaining.substring(end).trim();
        }
        if (!remaining.isEmpty()) chunks.add(remaining);
        return chunks;
    }

    private static String translateFreeChunk(String text, String target) throws IOException, InterruptedException {
        String languageCode = "zh".equals(target) ? "zh-CN" : target;
        URI uri = URI.create("https://api.mymemory.translated.net/get?q="
                + URLEncoder.encode(text, StandardCharsets.UTF_8)
                + "&langpair=en%7C" + URLEncoder.encode(languageCode, StandardCharsets.UTF_8)
                + "&mt=1");
        HttpRequest request = HttpRequest.newBuilder(uri).timeout(Duration.ofSeconds(15))
                .header("Accept", "application/json")
                .header("User-Agent", "BorderlessLocalAssistant/1.0")
                .GET().build();
        HttpResponse<String> response = TRANSLATION_CLIENT.send(request,
                HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
        if (response.statusCode() < 200 || response.statusCode() >= 300) {
            throw new IOException("Translation provider is unavailable.");
        }
        Matcher matcher = TRANSLATED_TEXT.matcher(response.body());
        if (!matcher.find()) throw new IOException("Translation provider did not return a translation.");
        return unescapeJson(matcher.group(1));
    }

    private static Map<String, List<String>> parseForm(String body) {
        Map<String, List<String>> values = new java.util.HashMap<>();
        for (String pair : body.split("&")) {
            String[] parts = pair.split("=", 2);
            if (parts.length != 2) continue;
            String name = URLDecoder.decode(parts[0], StandardCharsets.UTF_8);
            String value = URLDecoder.decode(parts[1], StandardCharsets.UTF_8);
            values.computeIfAbsent(name, ignored -> new ArrayList<>()).add(value);
        }
        return values;
    }

    private static String firstValue(Map<String, List<String>> values, String name) {
        List<String> entries = values.get(name);
        return entries == null || entries.isEmpty() ? "" : entries.get(0);
    }

    private static String unescapeJson(String value) {
        StringBuilder decoded = new StringBuilder();
        for (int i = 0; i < value.length(); i++) {
            char ch = value.charAt(i);
            if (ch != '\\' || i + 1 >= value.length()) { decoded.append(ch); continue; }
            char escaped = value.charAt(++i);
            switch (escaped) {
                case '"' -> decoded.append('"'); case '\\' -> decoded.append('\\'); case '/' -> decoded.append('/');
                case 'b' -> decoded.append('\b'); case 'f' -> decoded.append('\f'); case 'n' -> decoded.append('\n');
                case 'r' -> decoded.append('\r'); case 't' -> decoded.append('\t');
                case 'u' -> { if (i + 4 < value.length()) { decoded.append((char) Integer.parseInt(value.substring(i + 1, i + 5), 16)); i += 4; } }
                default -> decoded.append(escaped);
            }
        }
        return decoded.toString().replace("&amp;", "&").replace("&lt;", "<")
                .replace("&gt;", ">").replace("&quot;", "\"").replace("&#39;", "'");
    }

    private static void handleCities(HttpExchange exchange) throws IOException {
        if (!"GET".equals(exchange.getRequestMethod())) {
            sendJson(exchange, 405, "{\"error\":\"Only GET is supported.\"}");
            return;
        }
        try {
            String path = exchange.getRequestURI().getPath();
            if ("/api/cities".equals(path) || "/api/cities/".equals(path)) {
                List<City> cities = SERVICE.listCities();
                String json = cities.stream().map(city -> "{\"cityId\":" + city.cityId()
                        + ",\"cityName\":" + quote(city.cityName()) + "}")
                        .collect(java.util.stream.Collectors.joining(",", "[", "]"));
                sendJson(exchange, 200, json);
                return;
            }

            String suffix = path.substring("/api/cities/".length());
            if (suffix.contains("/")) {
                sendJson(exchange, 404, "{\"error\":\"Not found.\"}");
                return;
            }
            int cityId;
            try {
                cityId = Integer.parseInt(suffix);
            } catch (NumberFormatException exception) {
                sendJson(exchange, 400, "{\"error\":\"City ID must be a number.\"}");
                return;
            }
            String language = queryParameters(exchange).getOrDefault("language", "bn").toLowerCase();
            if (!language.matches("[a-z]{2}")) {
                sendJson(exchange, 400, "{\"error\":\"Language must be a two-letter language code.\"}");
                return;
            }
            CityOverview overview;
            try {
                overview = SERVICE.getCityOverview(cityId, language);
            } catch (IllegalArgumentException exception) {
                sendJson(exchange, 404, "{\"error\":\"City not found.\"}");
                return;
            }
            sendJson(exchange, 200, overviewJson(overview));
        } catch (SQLException | IOException exception) {
            logDatabaseFailure(exception);
            sendJson(exchange, 500, "{\"error\":\"Could not load data. Check that MySQL is running and local.properties is configured.\"}");
        } finally {
            exchange.close();
        }
    }

    private static void logDatabaseFailure(Exception exception) {
        if (exception instanceof SQLException sqlException) {
            System.err.printf("Database request failed (%s, SQLState=%s, code=%d).%n",
                    sqlException.getClass().getSimpleName(), sqlException.getSQLState(), sqlException.getErrorCode());
        } else {
            System.err.printf("Database request failed (%s).%n", exception.getClass().getSimpleName());
        }
    }

    private static Map<String, String> queryParameters(HttpExchange exchange) {
        String raw = exchange.getRequestURI().getRawQuery();
        if (raw == null || raw.isBlank()) return Map.of();
        return java.util.Arrays.stream(raw.split("&"))
                .map(pair -> pair.split("=", 2))
                .filter(pair -> pair.length == 2)
                .collect(java.util.stream.Collectors.toMap(
                        pair -> URLDecoder.decode(pair[0], StandardCharsets.UTF_8),
                        pair -> URLDecoder.decode(pair[1], StandardCharsets.UTF_8),
                        (first, ignored) -> first));
    }

    private static String overviewJson(CityOverview overview) {
        String rules = overview.rules().stream().map(WebServer::ruleJson)
                .collect(java.util.stream.Collectors.joining(",", "[", "]"));
        String guides = overview.transitGuides().stream().map(WebServer::guideJson)
                .collect(java.util.stream.Collectors.joining(",", "[", "]"));
        return "{\"city\":{\"cityId\":" + overview.city().cityId()
                + ",\"cityName\":" + quote(overview.city().cityName())
                + "},\"rules\":" + rules + ",\"transitGuides\":" + guides + "}";
    }

    private static String ruleJson(EtiquetteRule rule) {
        return "{\"ruleId\":" + rule.ruleId() + ",\"category\":" + quote(rule.category())
                + ",\"title\":" + quote(rule.title()) + ",\"description\":" + quote(rule.description()) + "}";
    }

    private static String guideJson(TransitGuide guide) {
        return "{\"guideId\":" + guide.guideId() + ",\"transportType\":" + quote(guide.transportType())
                + ",\"instructions\":" + quote(guide.instructions()) + "}";
    }

    private static String quote(String value) {
        if (value == null) return "null";
        StringBuilder escaped = new StringBuilder("\"");
        for (int i = 0; i < value.length(); i++) {
            char character = value.charAt(i);
            switch (character) {
                case '"' -> escaped.append("\\\"");
                case '\\' -> escaped.append("\\\\");
                case '\b' -> escaped.append("\\b");
                case '\f' -> escaped.append("\\f");
                case '\n' -> escaped.append("\\n");
                case '\r' -> escaped.append("\\r");
                case '\t' -> escaped.append("\\t");
                default -> {
                    if (character < 0x20) escaped.append(String.format("\\u%04x", (int) character));
                    else escaped.append(character);
                }
            }
        }
        return escaped.append('"').toString();
    }

    private static void sendJson(HttpExchange exchange, int status, String body) throws IOException {
        Headers headers = exchange.getResponseHeaders();
        headers.set("Content-Type", "application/json; charset=utf-8");
        headers.set("Cache-Control", "no-store");
        headers.set("X-Content-Type-Options", "nosniff");
        byte[] bytes = body.getBytes(StandardCharsets.UTF_8);
        exchange.sendResponseHeaders(status, bytes.length);
        exchange.getResponseBody().write(bytes);
    }

    private static void handleStatic(HttpExchange exchange) throws IOException {
        if (!"GET".equals(exchange.getRequestMethod())) {
            exchange.sendResponseHeaders(405, -1);
            exchange.close();
            return;
        }
        String path = exchange.getRequestURI().getPath();
        if ("/robots.txt".equals(path)) {
            sendText(exchange, "text/plain; charset=utf-8",
                    "User-agent: *\nAllow: /\nSitemap: " + publicBaseUrl() + "sitemap.xml\n");
            return;
        }
        if ("/sitemap.xml".equals(path)) {
            sendText(exchange, "application/xml; charset=utf-8", createSitemap());
            return;
        }
        if ("/".equals(path)) path = "/index.html";
        if (!(path.equals("/index.html") || path.equals("/styles.css")
                || path.equals("/app.js") || path.equals("/script.js")
                || path.equals("/cities500.js") || path.matches("/cities/[A-Z]{2}\\.js"))) {
            exchange.sendResponseHeaders(404, -1);
            exchange.close();
            return;
        }
        String resource = "/web" + path;
        try (var input = WebServer.class.getResourceAsStream(resource)) {
            if (input == null) {
                exchange.sendResponseHeaders(404, -1);
                return;
            }
            byte[] bytes = input.readAllBytes();
            if ("/index.html".equals(path)) {
                String html = new String(bytes, StandardCharsets.UTF_8);
                if (!html.contains("rel=\"canonical\"")) {
                    html = html.replace("</head>", "  <link rel=\"canonical\" href=\""
                            + escapeHtml(publicBaseUrl()) + "\">\n</head>");
                }
                String verification = System.getenv().getOrDefault("GOOGLE_SITE_VERIFICATION", "").trim();
                if (!verification.isBlank() && !html.contains("name=\"google-site-verification\"")) {
                    html = html.replace("</head>", "  <meta name=\"google-site-verification\" content=\""
                            + escapeHtml(verification) + "\">\n</head>");
                }
                if (!html.equals(new String(bytes, StandardCharsets.UTF_8))) {
                    bytes = html.getBytes(StandardCharsets.UTF_8);
                }
            }
            String contentType = path.endsWith(".css") ? "text/css; charset=utf-8"
                    : path.endsWith(".js") ? "text/javascript; charset=utf-8" : "text/html; charset=utf-8";
            exchange.getResponseHeaders().set("Content-Type", contentType);
            exchange.getResponseHeaders().set("Cache-Control", "no-store");
            exchange.getResponseHeaders().set("X-Content-Type-Options", "nosniff");
            exchange.getResponseHeaders().set("Content-Security-Policy", "default-src 'self'; style-src 'self'; script-src 'self'; connect-src 'self' https://en.wikipedia.org https://api.mymemory.translated.net; img-src 'self' data: https://upload.wikimedia.org https://*.wikimedia.org");
            exchange.sendResponseHeaders(200, bytes.length);
            exchange.getResponseBody().write(bytes);
        } finally {
            exchange.close();
        }
    }

    private static void sendText(HttpExchange exchange, String contentType, String body) throws IOException {
        try {
            byte[] bytes = body.getBytes(StandardCharsets.UTF_8);
            exchange.getResponseHeaders().set("Content-Type", contentType);
            exchange.getResponseHeaders().set("Cache-Control", "public, max-age=300");
            exchange.getResponseHeaders().set("X-Content-Type-Options", "nosniff");
            exchange.sendResponseHeaders(200, bytes.length);
            exchange.getResponseBody().write(bytes);
        } finally {
            exchange.close();
        }
    }

    private static String publicBaseUrl() {
        String configured = System.getenv().getOrDefault("PUBLIC_BASE_URL", "").trim();
        if (!configured.isBlank()) return configured.endsWith("/") ? configured : configured + "/";
        String railwayDomain = System.getenv().getOrDefault("RAILWAY_PUBLIC_DOMAIN", "").trim();
        if (!railwayDomain.isBlank()) return "https://" + railwayDomain.replaceAll("^https?://", "") + "/";
        return "http://localhost:" + PORT + "/";
    }

    private static String createSitemap() throws IOException {
        List<String> urls = new ArrayList<>();
        String baseUrl = publicBaseUrl();
        urls.add(baseUrl);
        try (var input = WebServer.class.getResourceAsStream("/web/script.js")) {
            if (input == null) throw new IOException("Travel guide data is missing.");
            String script = new String(input.readAllBytes(), StandardCharsets.UTF_8);
            Matcher countries = GUIDE_COUNTRY_BLOCK.matcher(script);
            while (countries.find()) {
                String country = countries.group(1);
                Matcher cities = GUIDE_CITY.matcher(countries.group(2));
                while (cities.find()) {
                    urls.add(baseUrl + "?country=" + URLEncoder.encode(country, StandardCharsets.UTF_8)
                            + "&city=" + URLEncoder.encode(cities.group(1), StandardCharsets.UTF_8));
                }
            }
        }
        StringBuilder xml = new StringBuilder("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n")
                .append("<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n");
        for (String url : urls) xml.append("  <url><loc>").append(escapeXml(url)).append("</loc></url>\n");
        return xml.append("</urlset>\n").toString();
    }

    private static String escapeXml(String value) {
        return value.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
                .replace("\"", "&quot;").replace("'", "&apos;");
    }

    private static String escapeHtml(String value) {
        return value.replace("&", "&amp;").replace("\"", "&quot;").replace("<", "&lt;").replace(">", "&gt;");
    }
}
