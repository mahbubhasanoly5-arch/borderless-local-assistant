import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'server_settings.dart';

class WebsiteHome extends StatefulWidget {
  const WebsiteHome({super.key, this.action = '', this.query = '', this.title = 'World guide'});
  final String action;
  final String query;
  final String title;
  @override
  State<WebsiteHome> createState() => _WebsiteHomeState();
}

class _WebsiteHomeState extends State<WebsiteHome> {
  MethodChannel? _web;
  Future<void> _settings() async {
    final url = await ServerSettings.load();
    if (!mounted) return;
    final saved = await Navigator.of(context).push<String>(MaterialPageRoute(
      builder: (_) => ServerSettingsPage(currentUrl: url, bangla: true)));
    if (saved != null) await _web?.invokeMethod<void>('reload');
  }
  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: Text(widget.title)),
    backgroundColor: const Color(0xfff3f5ef),
    body: SafeArea(child: AndroidView(viewType: 'borderless_local/website',
      creationParams: {'action': widget.action, 'query': widget.query},
      creationParamsCodec: const StandardMessageCodec(),
      onPlatformViewCreated: (id) => _web = MethodChannel('borderless_local/website/$id'))),
    bottomNavigationBar: SafeArea(top: false, child: SizedBox(height: 48,
      child: Row(mainAxisAlignment: MainAxisAlignment.spaceEvenly, children: [
        IconButton(tooltip: 'Back', icon: const Icon(Icons.arrow_back), onPressed: () => _web?.invokeMethod<void>('back')),
        IconButton(tooltip: 'Home', icon: const Icon(Icons.home_outlined), onPressed: () => _web?.invokeMethod<void>('home')),
        IconButton(tooltip: 'Reload', icon: const Icon(Icons.refresh), onPressed: () => _web?.invokeMethod<void>('reload')),
        IconButton(tooltip: 'Rules connection', icon: const Icon(Icons.settings_outlined), onPressed: _settings),
      ]))),
  );
}
