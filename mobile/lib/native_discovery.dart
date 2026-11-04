import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'app_language.dart';
import 'city_visuals.dart';
import 'server_settings.dart';

class NativeDiscovery extends StatefulWidget {
  const NativeDiscovery({super.key, required this.city, required this.country, required this.bangla, this.food = false});
  final String city;
  final String country;
  final bool bangla;
  final bool food;
  @override
  State<NativeDiscovery> createState() => _NativeDiscoveryState();
}

class _NativeDiscoveryState extends State<NativeDiscovery> {
  List<Map<String, dynamic>> _pages = [];
  bool _loading = true;
  String? _error;
  int _limit = 12;
  HttpClient? _client;
  int _request = 0;
  String t(String en, String bn) => AppLanguage.text(en, bn, useBangla: widget.bangla);
  @override
  void initState() { super.initState(); _load(); }
  @override
  void dispose() { ++_request; _client?.close(force: true); super.dispose(); }
  Future<void> _load() async {
    final request = ++_request;
    _client?.close(force: true);
    final client = HttpClient()..connectionTimeout = const Duration(seconds: 12);
    _client = client;
    setState(() { _loading = true; _error = null; });
    try {
      final query = widget.food ? 'famous restaurants local dishes and food markets in ${widget.city}, ${widget.country}' : 'tourist attractions in ${widget.city}, ${widget.country}';
      final uri = Uri.https('en.wikipedia.org', '/w/api.php', {
        'action':'query', 'format':'json', 'generator':'search', 'gsrsearch':query,
        'gsrnamespace':'0', 'gsrlimit':'$_limit', 'prop':'pageimages|info|extracts',
        'piprop':'thumbnail', 'pithumbsize':'800', 'inprop':'url', 'exintro':'1',
        'exsentences':'3', 'explaintext':'1',
      });
      final call = await client.getUrl(uri).timeout(const Duration(seconds: 15));
      call.headers.set(HttpHeaders.userAgentHeader, 'BorderlessLocal/0.9 (travel guide; mahbubhasanoly@gmail.com)');
      final response = await call.close().timeout(const Duration(seconds: 15));
      if (response.statusCode != 200) throw const HttpException('Discovery unavailable');
      final json = jsonDecode(await response.transform(utf8.decoder).join().timeout(const Duration(seconds: 15))) as Map;
      final pages = ((json['query'] as Map?)?['pages'] as Map? ?? {}).values.whereType<Map>().map((page) => Map<String,dynamic>.from(page)).where((page) {
        final title = (page['title'] ?? '').toString().toLowerCase();
        return title.isNotEmpty && title != widget.city.toLowerCase() && !title.startsWith('list of ') && !title.startsWith('tourism in ');
      }).toList()..sort((a,b) => ((a['index'] as num?) ?? 999).compareTo((b['index'] as num?) ?? 999));
      if (!mounted || request != _request) return;
      setState(() { _pages = pages; if (pages.isEmpty) _error = t('No matching articles were found. Try again later.', 'মিল পাওয়া তথ্য নেই। পরে আবার চেষ্টা করো।'); });
    } catch (_) {
      if (mounted && request == _request) setState(() => _error = t('Could not load places and photos. Check your internet and tap Retry.', 'জায়গা ও ছবি লোড হয়নি। Internet দেখে Retry চাপো।'));
    } finally {
      client.close(force: true);
      if (mounted && request == _request) setState(() => _loading = false);
    }
  }
  Future<void> _external(String url) async {
    try { await ServerSettings.channel.invokeMethod<void>('openExternalUrl', url); }
    catch (_) { if (mounted) ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(t('Could not open link.', 'লিংক খোলা যায়নি।')))); }
  }
  void _details(Map<String,dynamic> page) {
    showModalBottomSheet<void>(context: context, isScrollControlled: true, showDragHandle: true, builder: (context) => SafeArea(child: DraggableScrollableSheet(expand: false, initialChildSize: .7, minChildSize: .35, maxChildSize: .92, builder: (_, controller) => ListView(controller: controller, padding: const EdgeInsets.all(20), children: [
      Text(page['title'].toString(), style: Theme.of(context).textTheme.headlineSmall), const SizedBox(height: 14),
      Text((page['extract'] ?? t('No summary available.', 'সংক্ষিপ্ত তথ্য পাওয়া যায়নি।')).toString(), style: const TextStyle(height: 1.6)),
      const SizedBox(height: 16), Text(t('Article information from Wikipedia. Verify the place, opening hours and prices before visiting. This is not a live availability or ratings service.', 'Wikipedia-র article-এর তথ্য। যাওয়ার আগে জায়গা, সময়সূচি ও খরচ যাচাই করো। এটি live availability বা rating service নয়।')),
      TextButton.icon(onPressed: () => _external(page['fullurl']?.toString() ?? 'https://en.wikipedia.org/?curid=${page['pageid']}'), icon: const Icon(Icons.open_in_new), label: Text(t('Read source article', 'মূল source article পড়ো'))),
    ]))));
  }
  @override
  Widget build(BuildContext context) => Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
    const SizedBox(height: 20), Text(t(widget.food ? 'Discover food & markets' : 'Discover more places', widget.food ? 'খাবার ও food market খুঁজে দেখো' : 'আরও দর্শনীয় স্থান খুঁজে দেখো'), style: Theme.of(context).textTheme.titleLarge),
    const SizedBox(height: 8), Text(t('Online article results for this destination · details open inside the app. Summaries may be in English.', 'এই গন্তব্যের online article-এর ফল · বিস্তারিত app-এর ভেতরেই খুলবে। তথ্য English-এ থাকতে পারে।'), style: const TextStyle(fontSize: 12, height: 1.5)),
    if (_loading) const Padding(padding: EdgeInsets.all(20), child: LinearProgressIndicator()),
    if (_error != null) Padding(padding: const EdgeInsets.symmetric(vertical: 12), child: Column(children: [Text(_error!), TextButton.icon(onPressed: _loading ? null : _load, icon: const Icon(Icons.refresh), label: Text(t('Retry','আবার চেষ্টা')))])),
    for (final page in _pages) Padding(padding: const EdgeInsets.only(top: 16), child: Card(clipBehavior: Clip.antiAlias, child: Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
      CityPhoto(city: page['title'].toString(), contextName: '${widget.city}, ${widget.country}', imageUrl: (page['thumbnail'] as Map?)?['source']?.toString(), articleUrl: page['fullurl']?.toString(), height: 200),
      Padding(padding: const EdgeInsets.all(16), child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(page['title'].toString(), style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 20)), const SizedBox(height: 8),
        Text((page['extract'] ?? '').toString(), maxLines: 4, overflow: TextOverflow.ellipsis, style: const TextStyle(height: 1.5)),
        const SizedBox(height: 8), Wrap(spacing: 8, children: [
          FilledButton.tonal(onPressed: () => _details(page), child: Text(t('Details','বিস্তারিত'))),
          TextButton.icon(onPressed: () => _external('https://www.google.com/maps/search/?api=1&query=${Uri.encodeComponent('${page['title']}, ${widget.city}, ${widget.country}')}'), icon: const Icon(Icons.map_outlined), label: const Text('Maps')),
          TextButton.icon(onPressed: () => _external('https://www.google.com/maps/dir/?api=1&destination=${Uri.encodeComponent('${page['title']}, ${widget.city}, ${widget.country}')}'), icon: const Icon(Icons.directions_outlined), label: Text(t('Directions','পথ দেখো'))),
        ]),
      ])),
    ]))),
    if (!_loading && _pages.isNotEmpty && _limit < 40) TextButton.icon(onPressed: () { _limit += 12; _load(); }, icon: const Icon(Icons.add), label: Text(t('Load more','আরও দেখো'))),
  ]);
}
