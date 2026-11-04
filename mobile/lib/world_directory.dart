import 'dart:convert';
import 'dart:math' as math;
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'app_language.dart';

List<List<dynamic>> _decodePlaces(String text) => (jsonDecode(text) as List).map((row) => List<dynamic>.from(row as List)).toList();

class WorldDirectory {
  static Future<List<List<dynamic>>>? _pending;
  static Future<List<List<dynamic>>> load() async {
    _pending ??= rootBundle.loadString('assets/world_locations.json').then((text) => compute(_decodePlaces, text));
    try { return await _pending!; } catch (_) { _pending = null; rethrow; }
  }
  static Future<Map<String, String>> countries() async => Map<String, String>.from(jsonDecode(await rootBundle.loadString('assets/world_countries.json')) as Map);
  static double distance(double lat, double lon, List<dynamic> row) {
    final a = lat * math.pi / 180, b = (row[3] as num).toDouble() * math.pi / 180;
    final dlat = b - a, dlon = ((row[4] as num).toDouble() - lon) * math.pi / 180;
    final value = math.pow(math.sin(dlat / 2), 2) + math.cos(a) * math.cos(b) * math.pow(math.sin(dlon / 2), 2);
    return 6371 * 2 * math.asin(math.sqrt(value.clamp(0, 1)));
  }
}

class WorldCitySearch extends StatefulWidget {
  const WorldCitySearch({super.key, required this.bangla, this.query = ''});
  final bool bangla;
  final String query;
  @override
  State<WorldCitySearch> createState() => _WorldCitySearchState();
}

class _WorldCitySearchState extends State<WorldCitySearch> {
  late final TextEditingController _query = TextEditingController(text: widget.query);
  List<List<dynamic>>? _rows;
  Map<String, String> _countries = {};
  String? _error;
  @override
  void initState() { super.initState(); _load(); }
  Future<void> _load() async {
    try {
      final names = await WorldDirectory.countries();
      final rows = await WorldDirectory.load();
      if (mounted) setState(() { _countries = names; _rows = rows; _error = null; });
    } catch (_) { if (mounted) setState(() => _error = widget.bangla ? 'শহরের তালিকা লোড হয়নি।' : 'Could not load the city directory.'); }
  }
  @override
  void dispose() { _query.dispose(); super.dispose(); }
  @override
  Widget build(BuildContext context) {
    final term = _query.text.trim().toLowerCase();
    final matches = (_rows ?? []).where((row) => term.isNotEmpty && '${row[0]} ${row[1]} ${_countries[row[2]] ?? row[2]}'.toLowerCase().contains(term)).take(80).toList();
    return Scaffold(appBar: AppBar(title: Text(AppLanguage.text('Search cities worldwide', 'বিশ্বজুড়ে শহর খোঁজো', useBangla: widget.bangla))),
      body: Column(children: [Padding(padding: const EdgeInsets.all(16), child: TextField(controller: _query, autofocus: true, onChanged: (_) => setState(() {}), decoration: InputDecoration(labelText: AppLanguage.text('City or country', 'শহর বা দেশের নাম', useBangla: widget.bangla), prefixIcon: const Icon(Icons.search), border: const OutlineInputBorder()))),
        if (_rows == null && _error == null) const LinearProgressIndicator(),
        if (_error != null) TextButton(onPressed: _load, child: Text(_error!)),
        if (_rows != null && term.isEmpty) Padding(padding: const EdgeInsets.all(20), child: Text(widget.bangla ? 'নিজের শহরের নাম লিখে জায়গা বেছে নাও।' : 'Type your city and choose the right place.')),
        if (_rows != null && term.isNotEmpty && matches.isEmpty) Text(widget.bangla ? 'কোনো শহর মেলেনি। অন্য বানান চেষ্টা করো।' : 'No matching city. Try another spelling.'),
        Expanded(child: ListView.builder(itemCount: matches.length, itemBuilder: (_, index) { final row = matches[index]; return ListTile(leading: const Icon(Icons.location_city), title: Text(row[0] as String), subtitle: Text('${_countries[row[2]] ?? row[2]} · ${row[5]}'), trailing: const Icon(Icons.chevron_right), onTap: () => Navigator.pop(context, row)); })),
        Padding(padding: const EdgeInsets.all(12), child: Text(widget.bangla ? 'GeoNames city directory · সব ছোট বসতি এতে নেই।' : 'GeoNames city directory · not every settlement is included.', style: const TextStyle(fontSize: 12))),
      ]));
  }
}
