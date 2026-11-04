import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'app_language.dart';
import 'city_visuals.dart';
import 'server_settings.dart';

class PlaceDetails extends StatefulWidget {
  const PlaceDetails({super.key, required this.name, required this.city, required this.country, required this.bangla});
  final String name, city, country;
  final bool bangla;
  @override
  State<PlaceDetails> createState() => _PlaceDetailsState();
}
class _PlaceDetailsState extends State<PlaceDetails> {
  String? _summary;
  bool _loading = true;
  String? _error;
  HttpClient? _client;
  String t(String en, String bn) => AppLanguage.text(en, bn, useBangla: widget.bangla);
  @override
  void initState() { super.initState(); _load(); }
  @override
  void dispose() { _client?.close(force: true); super.dispose(); }
  Future<void> _load() async {
    _client?.close(force: true);
    final client = HttpClient()..connectionTimeout = const Duration(seconds: 12);
    _client = client;
    setState(() { _loading = true; _error = null; });
    try {
      final call = await client.getUrl(Uri.https('en.wikipedia.org', '/api/rest_v1/page/summary/${widget.name}')).timeout(const Duration(seconds: 12));
      call.headers.set(HttpHeaders.userAgentHeader, 'BorderlessLocal/0.9 (travel guide; mahbubhasanoly@gmail.com)');
      final response = await call.close().timeout(const Duration(seconds: 12));
      if (response.statusCode != 200) throw const HttpException('No summary');
      final data = jsonDecode(await response.transform(utf8.decoder).join().timeout(const Duration(seconds: 12))) as Map;
      if (!mounted) return;
      setState(() => _summary = data['extract']?.toString());
    } catch (_) { if (mounted) setState(() => _error = t('Summary unavailable. Check your internet or retry.', 'বিস্তারিত লোড হয়নি। Internet দেখো বা আবার চেষ্টা করো।')); }
    finally { client.close(force: true); if (mounted) setState(() => _loading = false); }
  }
  Future<void> _maps(bool directions) async {
    final query = Uri.encodeComponent('${widget.name}, ${widget.city}, ${widget.country}');
    final url = directions ? 'https://www.google.com/maps/dir/?api=1&destination=$query' : 'https://www.google.com/maps/search/?api=1&query=$query';
    try { await ServerSettings.channel.invokeMethod<void>('openExternalUrl', url); }
    catch (_) { if (mounted) ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(t('Could not open Maps.', 'Maps খোলা যায়নি।')))); }
  }
  @override
  Widget build(BuildContext context) => Scaffold(appBar: AppBar(title: Text(widget.name)), body: ListView(padding: const EdgeInsets.all(16), children: [
    ClipRRect(borderRadius: BorderRadius.circular(24), child: CityPhoto(city: widget.name, contextName: '${widget.city}, ${widget.country}', height: 240)),
    const SizedBox(height: 18), Text(widget.name, style: Theme.of(context).textTheme.headlineSmall), Text('${widget.city} · ${widget.country}'),
    const SizedBox(height: 16), if (_loading) const LinearProgressIndicator(),
    if (_summary != null) Text(_summary!, style: const TextStyle(height: 1.7)),
    if (_error != null) Text(_error!),
    if (!_loading && _summary == null) TextButton.icon(onPressed: _load, icon: const Icon(Icons.refresh), label: Text(t('Retry', 'আবার চেষ্টা'))),
    const SizedBox(height: 16), Text(t('Summary: Wikipedia · may be in English. Check current opening hours, prices and local notices before visiting.', 'তথ্য: Wikipedia · English-এ থাকতে পারে। যাওয়ার আগে সময়সূচি, খরচ ও স্থানীয় notice যাচাই করো।')),
    const SizedBox(height: 12), Wrap(spacing: 8, children: [OutlinedButton.icon(onPressed: () => _maps(false), icon: const Icon(Icons.map), label: const Text('Maps')), FilledButton.tonalIcon(onPressed: () => _maps(true), icon: const Icon(Icons.directions), label: Text(t('Directions', 'পথ দেখো')))]),
  ]));
}
