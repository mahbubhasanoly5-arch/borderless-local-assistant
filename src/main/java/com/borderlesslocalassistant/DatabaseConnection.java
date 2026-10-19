package com.borderlesslocalassistant;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

/** Creates MySQL connections using settings kept outside source code. */
public final class DatabaseConnection {
    private static final Path CONFIG_FILE = Path.of("local.properties");

    private DatabaseConnection() {
    }

    public static Connection open() throws IOException, SQLException {
        Properties settings = loadSettings();
        String url = setting("DB_URL", settings, "db.url");
        String username = setting("DB_USERNAME", settings, "db.username");
        String password = setting("DB_PASSWORD", settings, "db.password");

        if (url.isBlank() && System.getenv("MYSQLHOST") != null) {
            url = "jdbc:mysql://" + System.getenv("MYSQLHOST") + ":"
                    + System.getenv().getOrDefault("MYSQLPORT", "3306") + "/"
                    + System.getenv().getOrDefault("MYSQLDATABASE", "railway")
                    + "?sslMode=REQUIRED&serverTimezone=UTC";
        }
        if (username.isBlank()) username = System.getenv().getOrDefault("MYSQLUSER", "");
        if (password.isBlank()) password = System.getenv().getOrDefault("MYSQLPASSWORD", "");

        if (url.isBlank() || username.isBlank()) {
            throw new IOException("Database settings are missing. Fill in local.properties or set DB_URL and DB_USERNAME.");
        }

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException exception) {
            throw new IOException("MySQL JDBC driver is missing from the application classpath.", exception);
        }
        return DriverManager.getConnection(url, username, password);
    }

    private static Properties loadSettings() throws IOException {
        Properties settings = new Properties();
        if (Files.isRegularFile(CONFIG_FILE)) {
            try (InputStream input = Files.newInputStream(CONFIG_FILE)) {
                settings.load(input);
            }
        }
        return settings;
    }

    private static String setting(String environmentName, Properties settings, String propertyName) {
        String value = System.getenv(environmentName);
        if (value == null || value.isBlank()) value = settings.getProperty(propertyName, "");
        value = value.trim();
        return value;
    }
}
