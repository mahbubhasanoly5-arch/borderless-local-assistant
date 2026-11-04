import 'app_language.dart';
import 'platform_bridge.dart';
import 'dart:convert';
import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class ServerSettings {
  static const channel = PlatformBridge();
  static const defaultUrl = String.fromEnvironment('API_BASE_URL', defaultValue: 'https://borderless-local-assistant.onrender.com');
  static Future<String> load() async {
    try { return await channel.invokeMethod<String>('getServerUrl') ?? defaultUrl; }
    on MissingPluginException { return defaultUrl; }
    on PlatformException { return defaultUrl; }
  }
  static Future<void> save(String url) => channel.invokeMethod<void>('setServerUrl', url);
  static String? validate(String input) {
    if (input.trim().isEmpty) return null;
    final uri = Uri.tryParse(input.trim());
    if (uri == null || !uri.hasAuthority || uri.host.isEmpty ||
        !['http', 'https'].contains(uri.scheme) || uri.userInfo.isNotEmpty ||
        uri.hasQuery || uri.hasFragment || (kReleaseMode && uri.scheme != 'https')) {
      return 'Use a server URL such as https://guide.example.com/ without login details.';
    }
    return null;
  }
  static Future<int> check(String input) async {
    final url = input.trim();
    if (url.isEmpty || validate(url) != null) throw const FormatException('Invalid server URL');
    final base = Uri.parse(url.endsWith('/') ? url : '$url/');
    final client = HttpClient()..connectionTimeout = const Duration(seconds: 10);
    try {
      final request = await client.getUrl(base.resolve('api/cities')).timeout(const Duration(seconds: 10));
      final response = await request.close().timeout(const Duration(seconds: 10));
      if (response.statusCode != 200) throw const HttpException('Database API unavailable');
      final data = jsonDecode(await response.transform(utf8.decoder).join().timeout(const Duration(seconds: 10)));
      if (data is! List || data.any((c) => c is! Map || c['cityId'] is! num || c['cityName'] is! String)) {
        throw const FormatException('Unexpected cities response');
      }
      return data.length;
    } finally { client.close(force: true); }
  }
}

class ServerSettingsPage extends StatefulWidget {
  const ServerSettingsPage({super.key, required this.currentUrl, required this.bangla});
  final String currentUrl;
  final bool bangla;
  @override
  State<ServerSettingsPage> createState() => _ServerSettingsPageState();
}

class _ServerSettingsPageState extends State<ServerSettingsPage> {
  late final TextEditingController _url;
  bool _checking = false;
  bool _saving = false;
  String? _status;
  String t(String en, String bn) => AppLanguage.text(en, bn, useBangla: widget.bangla);
  @override
  void initState() { super.initState(); _url = TextEditingController(text: widget.currentUrl); }
  @override
  void dispose() { _url.dispose(); super.dispose(); }
  Future<void> _check() async {
    setState(() { _checking = true; _status = null; });
    try {
      final count = await ServerSettings.check(_url.text);
      if (mounted) setState(() => _status = t('Connected. $count database cities available.', 'সংযোগ হয়েছে। Database-এ $countটি শহর পাওয়া গেছে।'));
    } catch (_) {
      if (mounted) setState(() => _status = t('Could not connect. Check the address and start your Java/MySQL server.', 'সংযোগ হয়নি। ঠিকানা যাচাই করো এবং Java/MySQL server চালু রাখো।'));
    } finally { if (mounted) setState(() => _checking = false); }
  }
  Future<void> _save() async {
    final value = _url.text.trim();
    if (ServerSettings.validate(value) != null) {
      setState(() => _status = t('Enter a valid http/https URL without passwords, query or fragment.', 'সঠিক http/https ঠিকানা দাও; password, query বা fragment রেখো না।'));
      return;
    }
    setState(() => _saving = true);
    try {
      await ServerSettings.save(value);
      if (mounted) Navigator.pop(context, value);
    } catch (_) {
      if (mounted) setState(() => _status = t('Could not save settings. Try again.', 'Settings সংরক্ষণ হয়নি। আবার চেষ্টা করো।'));
    } finally { if (mounted) setState(() => _saving = false); }
  }
  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: Text(t('Rules connection', 'নিয়মের সেবার সংযোগ'))),
    body: Center(child: ConstrainedBox(constraints: const BoxConstraints(maxWidth: 720),
      child: ListView(padding: const EdgeInsets.all(20), children: [
        Text(t('Connect your city rules service', 'শহরের নিয়মের সেবায় সংযোগ করো'), style: Theme.of(context).textTheme.headlineSmall),
        const SizedBox(height: 12),
        Text(t('Travel guides work offline. Local rules come from your Java server. Leave this empty for offline guides only.', 'ট্রাভেল গাইড অফলাইনে চলে। স্থানীয় নিয়ম Java server থেকে আসে। শুধু অফলাইন গাইড চাইলে ঘরটি ফাঁকা রাখো।')),
        const SizedBox(height: 20),
        TextField(controller: _url, enabled: !_checking && !_saving,
          keyboardType: TextInputType.url, autocorrect: false,
          onChanged: (_) => setState(() => _status = null),
          decoration: InputDecoration(labelText: t('Server address', 'Server-এর ঠিকানা'), hintText: 'https://guide.example.com/', border: const OutlineInputBorder())),
        const SizedBox(height: 16),
        FilledButton.icon(onPressed: _checking || _saving || _url.text.trim().isEmpty ? null : _check,
          icon: const Icon(Icons.wifi_find), label: Text(t('Check connection', 'সংযোগ পরীক্ষা করো'))),
        TextButton(onPressed: _checking || _saving ? null : _save, child: Text(t('Save', 'সংরক্ষণ করো'))),
        if (_checking || _saving) const Center(child: CircularProgressIndicator()),
        if (_status != null) Padding(padding: const EdgeInsets.symmetric(vertical: 16), child: Text(_status!)),
      ]))),
  );
}
