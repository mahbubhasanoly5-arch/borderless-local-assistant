import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'server_settings.dart';

class CityPhoto extends StatefulWidget {
  const CityPhoto({super.key, required this.city, this.contextName = '', this.height = 190, this.overlay, this.compact = false, this.imageUrl, this.articleUrl});
  final String? imageUrl;
  final String? articleUrl;
  final String city;
  final String contextName;
  final double height;
  final Widget? overlay;
  final bool compact;
  @override
  State<CityPhoto> createState() => _CityPhotoState();
}

class _CityPhotoState extends State<CityPhoto> {
  int _imageAttempt = 0;
  String get city => widget.city;
  String get contextName => widget.contextName;
  double get height => widget.height;
  Widget? get overlay => widget.overlay;
  bool get compact => widget.compact;
  static final Map<String, Future<Map<String, String>>> _cache = {};
  static Future<Map<String, String>> _photo(String city, String contextName) async {
    final client = HttpClient()..connectionTimeout = const Duration(seconds: 8);
    try {
      final request = await client.getUrl(Uri.https('en.wikipedia.org', '/api/rest_v1/page/summary/$city')).timeout(const Duration(seconds: 8));
      request.headers.set(HttpHeaders.userAgentHeader, 'BorderlessLocal/0.5 (travel guide; mahbubhasanoly@gmail.com)');
      final response = await request.close().timeout(const Duration(seconds: 8));
      final body = await response.transform(utf8.decoder).join().timeout(const Duration(seconds: 8));
      final data = response.statusCode == 200 ? jsonDecode(body) as Map : <String, dynamic>{};
      final image = data['thumbnail']?['source'] as String?;
      final article = data['content_urls']?['desktop']?['page'] as String?;
      if (image == null || Uri.tryParse(image)?.scheme != 'https') {
        final search = await client.getUrl(Uri.https('en.wikipedia.org', '/w/api.php', {
          'action': 'query', 'format': 'json', 'generator': 'search',
          'gsrsearch': '$city $contextName', 'gsrlimit': '3',
          'prop': 'pageimages|info', 'piprop': 'thumbnail', 'pithumbsize': '900', 'inprop': 'url',
        })).timeout(const Duration(seconds: 8));
        search.headers.set(HttpHeaders.userAgentHeader, 'BorderlessLocal/0.5.1 (travel guide; mahbubhasanoly@gmail.com)');
        final result = await search.close().timeout(const Duration(seconds: 8));
        final searchBody = await result.transform(utf8.decoder).join().timeout(const Duration(seconds: 8));
        if (result.statusCode != 200) return {};
        final pages = ((jsonDecode(searchBody) as Map)['query']?['pages'] as Map? ?? {}).values.whereType<Map>().toList()
          ..sort((a, b) => ((a['index'] as num?) ?? 999).compareTo((b['index'] as num?) ?? 999));
        final words = city.toLowerCase().split(RegExp(r'\W+')).where((word) => word.length > 2).toList();
        for (final page in pages) {
          final title = page['title']?.toString() ?? '';
          final source = page['thumbnail']?['source'] as String?;
          if (source != null && Uri.tryParse(source)?.scheme == 'https' && words.any((word) => title.toLowerCase().contains(word))) {
            return {'image': source, 'article': page['fullurl']?.toString() ?? 'https://en.wikipedia.org/wiki/${Uri.encodeComponent(title)}', 'title': title};
          }
        }
        return {};
      }
      return {'image': image, 'article': article ?? 'https://en.wikipedia.org/wiki/${Uri.encodeComponent(city)}', 'title': data['title']?.toString() ?? city};
    } catch (_) { return {}; }
    finally { client.close(force: true); }
  }
  @override
  Widget build(BuildContext context) => FutureBuilder<Map<String, String>>(
    future: widget.imageUrl != null && Uri.tryParse(widget.imageUrl!)?.scheme == 'https'
      ? Future.value({'image':widget.imageUrl!, 'article':widget.articleUrl ?? 'https://en.wikipedia.org/wiki/${Uri.encodeComponent(city)}', 'title':city})
      : _cache.putIfAbsent('$city|$contextName', () => _photo(city, contextName)),
    builder: (context, snapshot) {
      final data = snapshot.data ?? {};
      return SizedBox(height: height, child: Stack(fit: StackFit.expand, children: [
        Container(decoration: const BoxDecoration(gradient: LinearGradient(colors: [Color(0xff183e32), Color(0xff5c9b81)], begin: Alignment.topLeft, end: Alignment.bottomRight)), child: const Center(child: Icon(Icons.travel_explore, size: 72, color: Color(0xffb9d8c7)))),
        if (data['image'] != null) Image.network(data['image']!, key: ValueKey('${data['image']}|$_imageAttempt'), fit: BoxFit.cover, excludeFromSemantics: true, errorBuilder: (_, error, stack) => Center(child: TextButton.icon(style: TextButton.styleFrom(foregroundColor: Colors.white), onPressed: () async { await NetworkImage(data['image']!).evict(); if (mounted) setState(() => _imageAttempt++); }, icon: const Icon(Icons.refresh), label: Text(compact ? 'Retry' : 'Photo failed · Retry / আবার চেষ্টা')))),
        const DecoratedBox(decoration: BoxDecoration(gradient: LinearGradient(colors: [Colors.transparent, Color(0xdd10261f)], begin: Alignment.topCenter, end: Alignment.bottomCenter))),
        if (overlay != null) overlay!,
        if (!compact && snapshot.connectionState == ConnectionState.done && data.isEmpty) Positioned(top: 8, left: 8, child: TextButton.icon(style: TextButton.styleFrom(foregroundColor: Colors.white, backgroundColor: const Color(0xaa10261f)), onPressed: () => setState(() => _cache.remove('$city|$contextName')), icon: const Icon(Icons.refresh, size: 16), label: const Text('Retry photo · আবার চেষ্টা', style: TextStyle(fontSize: 10)))),
        if (!compact && data['article'] != null) Positioned(top: 8, left: 8, right: 8, child: Align(alignment: Alignment.topLeft, child: Material(color: const Color(0xaa10261f), borderRadius: BorderRadius.circular(16), child: InkWell(borderRadius: BorderRadius.circular(16), onTap: () async {
          try { await ServerSettings.channel.invokeMethod<void>('openExternalUrl', data['article']); }
          catch (_) { if (context.mounted) ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Could not open photo source.'))); }
        }, child: Padding(padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 5), child: Text('Photo · Wikipedia: ${data['title']}', overflow: TextOverflow.ellipsis, style: const TextStyle(color: Colors.white, fontSize: 10))))))),
      ]));
    },
  );
}
