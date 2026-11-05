import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'server_settings.dart';
import 'world_directory.dart';
import 'city_visuals.dart';
import 'travel_checklist.dart';
import 'app_language.dart';
import 'travel_style.dart';

typedef OpenCity = void Function(
  BuildContext context,
  Map<String, dynamic> city,
  bool bangla,
  String api,
  int section,
);

class NativeHome extends StatefulWidget {
  const NativeHome({super.key, required this.openCity});
  final OpenCity openCity;
  @override
  State<NativeHome> createState() => _NativeHomeState();
}

class _NativeHomeState extends State<NativeHome> {
  static const _green = Color(0xff183e32);
  final _search = TextEditingController();
  final _scroll = ScrollController();
  List<Map<String, dynamic>> _cities = [];
  Set<String> _saved = {};
  List<String> _recent = [];
  int _section = 0;
  List<Map<String, dynamic>> _directory = [];
  List<Map<String, dynamic>> _storedDirectory = [];
  bool _savingLibrary = false;
  bool _directoryLoading = false;
  String? _directoryError;
  int _directoryRequest = 0;
  final _countryCodes = <String, String>{
    'Bangladesh': 'BD',
    'Australia': 'AU',
    'Canada': 'CA',
    'China': 'CN',
    'Egypt': 'EG',
    'France': 'FR',
    'Germany': 'DE',
    'Greece': 'GR',
    'India': 'IN',
    'Indonesia': 'ID',
    'Italy': 'IT',
    'Japan': 'JP',
    'Malaysia': 'MY',
    'Mexico': 'MX',
    'Myanmar': 'MM',
    'Morocco': 'MA',
    'Portugal': 'PT',
    'Singapore': 'SG',
    'South Korea': 'KR',
    'Spain': 'ES',
    'Thailand': 'TH',
    'Türkiye': 'TR',
    'United Arab Emirates': 'AE',
    'United Kingdom': 'GB',
    'United States': 'US',
    'Vietnam': 'VN',
    'Argentina': 'AR',
    'Austria': 'AT',
    'Brazil': 'BR',
    'Cambodia': 'KH',
    'Czechia': 'CZ',
    'Ireland': 'IE',
    'Nepal': 'NP',
    'Netherlands': 'NL',
    'New Zealand': 'NZ',
    'Norway': 'NO',
    'Peru': 'PE',
    'Philippines': 'PH',
    'Qatar': 'QA',
    'South Africa': 'ZA',
    'Sri Lanka': 'LK',
    'Sweden': 'SE',
    'Switzerland': 'CH',
    'Taiwan': 'TW',
  };
  bool _bn = true;
  bool _locating = false;
  bool _loading = true;
  String? _error;
  String _country = '';
  String _api = '';
  int _tab = 0;
  String t(String en, String bn) => AppLanguage.text(en, bn, useBangla: _bn);
  Future<void> _chooseLanguage(String value) async {
    if (!AppLanguage.names.containsKey(value)) return;
    setState(() {
      AppLanguage.code = value;
      _bn = value == 'bn';
    });
    try {
      await ServerSettings.channel.invokeMethod<void>('setAppLanguage', value);
    } catch (_) {
      /* The language remains usable for this session. */
    }
  }

  String keyFor(Map<String, dynamic> c) =>
      c['directoryId'] as String? ?? '${c['country']}|${c['name']}';
  List<Map<String, dynamic>> get _available => {
    for (final city in [..._cities, ..._storedDirectory, ..._directory])
      keyFor(city): city,
  }.values.toList();
  List<Map<String, dynamic>> _recordsFor(Set<String> keys) => _available
      .where((city) => city['directory'] == true && keys.contains(keyFor(city)))
      .toList();
  Future<void> _selectCountry(String name) async {
    final request = ++_directoryRequest;
    setState(() {
      _country = name;
      _directory = [];
      _directoryError = null;
      _directoryLoading = name.isNotEmpty;
    });
    if (name.isEmpty) return;
    try {
      final code = _countryCodes[name];
      if (code == null)
        throw const FormatException('Country mapping unavailable');
      final raw = await ServerSettings.channel.invokeMethod<String>(
        'getCountryDirectory',
        code,
      );
      final rows = jsonDecode(raw ?? '[]') as List;
      final region = _cities.firstWhere(
        (city) => city['country'] == name,
        orElse: () => {'region': 'World'},
      )['region'];
      final directory = <Map<String, dynamic>>[];
      for (var index = 0; index < rows.length; index++) {
        final row = rows[index] as List;
        directory.add({
          'name': row[0],
          'alternateName': row[1],
          'admin': row[2],
          'country': name,
          'region': region,
          'directoryId': '$code|$index',
          'sights': <String>[],
          'foods': <String>[],
          'transit': <String>[],
          'directory': true,
        });
      }
      if (mounted && request == _directoryRequest)
        setState(() => _directory = directory);
    } catch (_) {
      if (mounted && request == _directoryRequest)
        setState(
          () => _directoryError = t(
            'Could not load this country directory. Try selecting the country again.',
            'এই দেশের city directory লোড হয়নি। দেশটি আবার বেছে দেখো।',
          ),
        );
    } finally {
      if (mounted && request == _directoryRequest)
        setState(() => _directoryLoading = false);
    }
  }

  @override
  void initState() {
    super.initState();
    _load();
  }

  @override
  void dispose() {
    _search.dispose();
    _scroll.dispose();
    super.dispose();
  }

  Future<void> _world(String action) async {
    if (action == 'location') {
      await _nearMe();
      return;
    }
    final row = await Navigator.of(context).push<List<dynamic>>(
      MaterialPageRoute(
        builder: (_) =>
            WorldCitySearch(bangla: _bn, query: _search.text.trim()),
      ),
    );
    if (row != null && mounted) await _openWorldRow(row);
  }

  Future<void> _openWorldRow(List<dynamic> row) async {
    final names = await WorldDirectory.countries();
    if (!mounted) return;
    final name = names[row[2]] ?? row[2].toString();
    final known = _cities
        .where(
          (city) =>
              _countryCodes[city['country']] == row[2] &&
              city['name'].toString().toLowerCase() ==
                  row[0].toString().toLowerCase(),
        )
        .toList();
    final city = known.isNotEmpty
        ? known.first
        : <String, dynamic>{
            'name': row[0],
            'alternateName': row[1],
            'admin': row[5],
            'country': name,
            'region': 'World',
            'directoryId': '${row[2]}|${row[3]}|${row[4]}',
            'sights': <String>[],
            'foods': <String>[],
            'transit': <String>[],
            'directory': true,
          };
    setState(() {
      _storedDirectory = [
        ..._storedDirectory.where((entry) => keyFor(entry) != keyFor(city)),
        city,
      ];
    });
    await _open(city);
  }

  Future<void> _nearMe() async {
    if (_locating) return;
    setState(() => _locating = true);
    try {
      final fix = await ServerSettings.channel.invokeMapMethod<String, dynamic>(
        'getCurrentPosition',
      );
      if (fix == null) throw const FormatException('No location');
      final accuracy = (fix['accuracy'] as num).toDouble();
      if (!accuracy.isFinite || accuracy > 20000)
        throw const FormatException('Imprecise location');
      final rows = await WorldDirectory.load();
      List<dynamic>? nearest;
      var firstDistance = double.infinity, secondDistance = double.infinity;
      for (final row in rows) {
        if (row[7] == 'PPLX') continue;
        final distance = WorldDirectory.distance(
          (fix['latitude'] as num).toDouble(),
          (fix['longitude'] as num).toDouble(),
          row,
        );
        if (distance < firstDistance) {
          secondDistance = firstDistance;
          firstDistance = distance;
          nearest = row;
        } else if (distance < secondDistance) {
          secondDistance = distance;
        }
      }
      if (!mounted) return;
      if (nearest == null ||
          firstDistance > 50 ||
          secondDistance - firstDistance < accuracy / 500) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
              t(
                'Location is uncertain. Search and choose your city.',
                'শহর নিশ্চিত করা যাচ্ছে না। Search করে নিজের শহর বেছে নাও।',
              ),
            ),
          ),
        );
        return;
      }
      final picked = nearest;
      final confirmed = await showDialog<bool>(
        context: context,
        builder: (context) => AlertDialog(
          title: Text(t('Nearby city', 'কাছের শহর')),
          content: Text(
            '${picked[0]} · ${picked[2]}\n${firstDistance.toStringAsFixed(1)} km · ±${accuracy.round()} m\n${t('Approximate city match. Is this the right place?', 'এটি আনুমানিক city match। এই জায়গাটিই কি ঠিক?')}',
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context, false),
              child: Text(t('Search instead', 'নিজে খুঁজি')),
            ),
            FilledButton(
              onPressed: () => Navigator.pop(context, true),
              child: Text(t('Open guide', 'গাইড খোলো')),
            ),
          ],
        ),
      );
      if (!mounted) return;
      if (confirmed == true) {
        await _openWorldRow(picked);
      } else if (confirmed == false) {
        await _world('search');
      }
    } catch (_) {
      if (mounted)
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
              t(
                'Could not get a precise location. Check location permission and device location, or search your city.',
                'অবস্থান পাওয়া যায়নি। Location permission ও GPS দেখো, অথবা নিজের শহর search করো।',
              ),
            ),
          ),
        );
    } finally {
      if (mounted) setState(() => _locating = false);
    }
  }

  void _changeTab(int value) {
    setState(() {
      _tab = value;
      _section = 0;
      _search.clear();
    });
    if (_scroll.hasClients) _scroll.jumpTo(0);
  }

  Future<void> _load() async {
    try {
      final data = jsonDecode(
        await rootBundle.loadString('assets/destinations.json'),
      ) as List;
      final cities = <Map<String, dynamic>>[];
      for (final country in data) {
        for (final city in country['cities'] as List) {
          cities.add({
            ...Map<String, dynamic>.from(city as Map),
            'country': country['country'],
            'region': country['region'],
          });
        }
      }
      final api = await ServerSettings.load();
      try {
        final savedLanguage = await ServerSettings.channel.invokeMethod<String>(
          'getAppLanguage',
        );
        if (AppLanguage.names.containsKey(savedLanguage)) {
          AppLanguage.code = savedLanguage!;
          _bn = savedLanguage == 'bn';
        }
      } catch (_) {
        /* Older installations start in Bangla. */
      }
      final countryNames = await WorldDirectory.countries();
      for (final entry in countryNames.entries) {
        _countryCodes.putIfAbsent(entry.value, () => entry.key);
      }
      List<String> saved = [];
      List<String> recent = [];
      List<Map<String, dynamic>> records = [];
      try {
        saved =
            await ServerSettings.channel.invokeListMethod<String>(
              'getSavedCities',
            ) ??
            [];
      } on PlatformException {
        /* Saved guides are optional until Android is available. */
      } on MissingPluginException {
        /* Allows non-Android previews. */
      }
      try {
        recent =
            await ServerSettings.channel.invokeListMethod<String>(
              'getRecentCities',
            ) ??
            [];
      } catch (_) {
        /* Optional history. */
      }
      try {
        final raw = await ServerSettings.channel.invokeMethod<String>(
          'getDirectoryRecords',
        );
        records = (jsonDecode(raw ?? '[]') as List)
            .map((entry) => Map<String, dynamic>.from(entry as Map))
            .toList();
      } catch (_) {
        /* Older versions have no stored directory records. */
      }
      if (mounted)
        setState(() {
          _cities = cities;
          _api = api;
          _saved = saved.toSet();
          _recent = recent;
          _storedDirectory = records;
          _loading = false;
          _error = null;
        });
    } catch (_) {
      if (mounted)
        setState(() {
          _loading = false;
          _error = t('Could not load guides.', 'গাইড লোড করা যায়নি।');
        });
    }
  }

  Future<void> _save(Map<String, dynamic> city) async {
    if (_savingLibrary) return;
    final next = Set<String>.from(_saved);
    final key = keyFor(city);
    next.contains(key) ? next.remove(key) : next.add(key);
    final records = _recordsFor({...next, ..._recent});
    setState(() => _savingLibrary = true);
    try {
      await ServerSettings.channel.invokeMethod<void>('setSavedGuideLibrary', {
        'keys': next.toList(),
        'records': jsonEncode(records),
      });
      if (mounted)
        setState(() {
          _saved = next;
          _storedDirectory = records;
        });
    } catch (_) {
      if (mounted)
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
              t(
                'Could not save. Please try again.',
                'Save হয়নি। আবার চেষ্টা করো।',
              ),
            ),
          ),
        );
    } finally {
      if (mounted) setState(() => _savingLibrary = false);
    }
  }

  Future<void> _settings() async {
    final value = await Navigator.of(context).push<String>(
      MaterialPageRoute(
        builder: (_) => ServerSettingsPage(currentUrl: _api, bangla: _bn),
      ),
    );
    if (mounted && value != null) setState(() => _api = value);
  }

  Future<void> _open(Map<String, dynamic> city) async {
    final key = keyFor(city);
    final recent = [
      key,
      ..._recent.where((entry) => entry != key),
    ].take(12).toList();
    setState(() => _recent = recent);
    final records = _recordsFor({..._saved, ...recent});
    try {
      await ServerSettings.channel.invokeMethod<void>('setRecentGuideLibrary', {
        'keys': recent,
        'records': jsonEncode(records),
      });
      if (mounted) setState(() => _storedDirectory = records);
    } catch (_) {
      /* Opening a guide does not require history storage. */
    }
    if (mounted)
      widget.openCity(
        context,
        city,
        _bn,
        _api,
        _tab == 3
            ? 3
            : _tab == 4
            ? 4
            : _section,
      );
  }

  Widget _photoCard(Map<String, dynamic> city, {double width = 258}) =>
      SizedBox(
        width: width,
        child: ClipRRect(
          borderRadius: BorderRadius.circular(30),
          child: Stack(
            children: [
              CityPhoto(
                city: city['name'] as String,
                contextName: city['country'] as String,
                height: 286,
              ),
              Positioned(
                left: 12,
                right: 12,
                bottom: 12,
                child: TravelGlass(
                  padding: const EdgeInsets.all(15),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        city['country'] as String,
                        style: const TextStyle(
                          color: Color(0xffdfead9),
                          fontSize: 12,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        city['name'] as String,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.w800,
                          fontSize: 25,
                        ),
                      ),
                      const SizedBox(height: 10),
                      SizedBox(
                        width: double.infinity,
                        child: FilledButton.icon(
                          style: FilledButton.styleFrom(
                            backgroundColor: const Color(0xffdbedb5),
                            foregroundColor: const Color(0xff183e32),
                          ),
                          onPressed: () => _open(city),
                          icon: const Icon(Icons.north_east, size: 18),
                          label: Text(t('Open guide', 'গাইড খোলো')),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              Positioned(
                right: 8,
                top: 42,
                child: IconButton.filledTonal(
                  tooltip: t('Save guide', 'গাইড সেভ'),
                  onPressed: () => _save(city),
                  icon: Icon(
                    _saved.contains(keyFor(city))
                        ? Icons.bookmark
                        : Icons.bookmark_border,
                  ),
                ),
              ),
            ],
          ),
        ),
      );
  Widget _journeyHero() => LayoutBuilder(
    builder: (context, constraints) {
      final largeText = MediaQuery.textScalerOf(context).scale(1) > 1.3;
      final height = largeText ? 490.0 : 365.0;
      return ClipRRect(
        borderRadius: BorderRadius.circular(32),
        child: SizedBox(
          height: height,
          child: Stack(
            fit: StackFit.expand,
            children: [
              CityPhoto(city: 'Bali', contextName: 'Indonesia', height: height),
              const DecoratedBox(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [Color(0x15112f2d), Color(0xee112f2d)],
                  ),
                ),
              ),
              Positioned(
                left: 20,
                right: 20,
                bottom: 20,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Row(
                      children: [
                        const Icon(
                          Icons.explore_outlined,
                          color: Color(0xffdbedb5),
                          size: 18,
                        ),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            t('GO FAR. FEEL LOCAL.', 'দূরে যাও, আপন করে নাও।'),
                            style: const TextStyle(
                              color: Color(0xffdbedb5),
                              letterSpacing: 1.2,
                              fontWeight: FontWeight.w700,
                              fontSize: 11,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    Text(
                      t('Where will you go next?', 'এবার কোন পথে যাত্রা?'),
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: constraints.maxWidth < 340 ? 29 : 35,
                        fontWeight: FontWeight.w800,
                        height: 1.12,
                      ),
                    ),
                    const SizedBox(height: 10),
                    Text(
                      t(
                        'Places, local life and a little more confidence.',
                        'দর্শনীয় স্থান, স্থানীয় জীবন আর নিশ্চিন্তে পথচলা।',
                      ),
                      style: const TextStyle(
                        color: Color(0xffe2ebe5),
                        height: 1.45,
                      ),
                    ),
                    const SizedBox(height: 16),
                    TravelGlass(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 10,
                        vertical: 5,
                      ),
                      child: SizedBox(
                        width: double.infinity,
                        child: TextButton.icon(
                          style: TextButton.styleFrom(
                            foregroundColor: Colors.white,
                            minimumSize: const Size(48, 48),
                          ),
                          onPressed: () => _changeTab(1),
                          icon: const Icon(Icons.north_east),
                          label: Text(
                            t('Explore the world', 'পৃথিবীটা ঘুরে দেখো'),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      );
    },
  );
  @override
  Widget build(BuildContext context) {
    final countries = _countryCodes.keys.toList()..sort();
    final query = _search.text.trim().toLowerCase();
    final available = _available;
    final filtered = available
        .where(
          (c) =>
              (_country.isEmpty || c['country'] == _country) &&
              (_tab != 2 || _saved.contains(keyFor(c))) &&
              '${c['name']} ${c['alternateName'] ?? ''} ${c['country']} ${c['region']} ${c['admin'] ?? ''}'
                  .toLowerCase()
                  .contains(query),
        )
        .toList();
    final titles = [
      t('Your next journey', 'তোমার পরের যাত্রা'),
      t('Explore destinations', 'গন্তব্য খুঁজো'),
      t('Saved guides', 'সেভ করা গাইড'),
      t('Know before you go', 'যাওয়ার আগে জেনে নাও'),
      t('Study abroad', 'বিদেশে পড়াশোনা'),
    ];
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Borderless Local',
          style: TextStyle(fontWeight: FontWeight.w800, fontSize: 18),
        ),
        actions: [
          PopupMenuButton<String>(
            tooltip: t('Language', 'ভাষা'),
            onSelected: (value) {
              _chooseLanguage(value);
            },
            itemBuilder: (_) => [
              for (final entry in AppLanguage.names.entries)
                CheckedPopupMenuItem(
                  value: entry.key,
                  checked: AppLanguage.code == entry.key,
                  child: Text(entry.value),
                ),
            ],
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 8),
              child: Row(
                children: [
                  const Icon(Icons.language, size: 20),
                  const SizedBox(width: 4),
                  Text(AppLanguage.names[AppLanguage.code] ?? 'English'),
                  const Icon(Icons.arrow_drop_down),
                ],
              ),
            ),
          ),
          IconButton(
            onPressed: _settings,
            tooltip: t('Settings', 'সেটিংস'),
            icon: const Icon(Icons.tune_rounded),
          ),
        ],
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(132),
          child: Padding(
            padding: const EdgeInsets.fromLTRB(16, 0, 16, 12),
            child: Column(
              children: [
                TextField(
                  controller: _search,
                  onChanged: (_) => setState(() {}),
                  textInputAction: TextInputAction.search,
                  onSubmitted: (_) => _world('search'),
                  decoration: InputDecoration(
                    labelText: t('Search city or country', 'শহর বা দেশ খোঁজো'),
                    hintText: t(
                      'Osaka, Dhaka, London…',
                      'Osaka, Dhaka, London…',
                    ),
                    prefixIcon: const Icon(Icons.search_rounded),
                    suffixIcon: _search.text.isEmpty
                        ? null
                        : IconButton(
                            tooltip: t('Clear', 'মুছো'),
                            icon: const Icon(Icons.close),
                            onPressed: () => setState(_search.clear),
                          ),
                    filled: true,
                    fillColor: Colors.white,
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(18),
                      borderSide: BorderSide.none,
                    ),
                  ),
                ),
                const SizedBox(height: 8),
                Row(
                  children: [
                    Expanded(
                      child: FilledButton.icon(
                        onPressed: _locating ? null : () => _world('location'),
                        icon: Icon(
                          _locating ? Icons.hourglass_top : Icons.my_location,
                          size: 18,
                        ),
                        label: Text(
                          _locating
                              ? t('Locating…', 'অবস্থান খুঁজছি…')
                              : t('Use my location', 'আমার অবস্থান'),
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: OutlinedButton.icon(
                        onPressed: () => _world('search'),
                        icon: const Icon(Icons.public, size: 18),
                        label: Text(
                          t('World search', 'বিশ্বজুড়ে খোঁজো'),
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _tab,
        onDestinationSelected: _changeTab,
        destinations: [
          NavigationDestination(
            icon: const Icon(Icons.home_outlined),
            selectedIcon: const Icon(Icons.home_rounded),
            label: t('Home', 'হোম'),
          ),
          NavigationDestination(
            icon: const Icon(Icons.travel_explore),
            label: t('Explore', 'খুঁজো'),
          ),
          NavigationDestination(
            icon: const Icon(Icons.bookmark_border),
            selectedIcon: const Icon(Icons.bookmark),
            label: t('Saved', 'সেভ'),
          ),
          NavigationDestination(
            icon: const Icon(Icons.fact_check_outlined),
            label: t('Rules', 'নিয়ম'),
          ),
          NavigationDestination(
            icon: const Icon(Icons.school_outlined),
            label: t('Students', 'শিক্ষার্থী'),
          ),
        ],
      ),
      body: SafeArea(
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 760),
            child: CustomScrollView(
              controller: _scroll,
              slivers: [
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(20, 16, 20, 12),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          t('GO FAR. FEEL LOCAL.', 'দূরে যাও, আপন করে নাও।'),
                          style: const TextStyle(
                            fontSize: 11,
                            letterSpacing: 1.5,
                            color: _green,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          titles[_tab],
                          style: const TextStyle(
                            fontSize: 29,
                            height: 1.15,
                            fontWeight: FontWeight.w800,
                          ),
                        ),
                        if (!['bn', 'en'].contains(AppLanguage.code))
                          Padding(
                            padding: const EdgeInsets.only(top: 8),
                            child: Text(
                              t(
                                'Interface language only. Guide content may be in English.',
                                'শুধু interface-এর ভাষা বদলাবে। Guide-এর লেখা English-এ থাকতে পারে।',
                              ),
                              style: const TextStyle(fontSize: 12),
                            ),
                          ),
                        if (_tab == 0) ...[
                          const SizedBox(height: 20),
                          _journeyHero(),
                        ],
                        if (_tab == 3 || _tab == 4) ...[
                          const SizedBox(height: 12),
                          Text(
                            _tab == 3
                                ? t(
                                    'Choose a city for rules, local customs and official sources.',
                                    'শহর বেছে নিয়ম, স্থানীয় আচরণ ও সরকারি সূত্র দেখো।',
                                  )
                                : t(
                                    'Visa, work permission and settling into student life. Choose your destination.',
                                    'Visa, কাজের অনুমতি ও শিক্ষার্থী জীবন—গন্তব্য বেছে শুরু করো।',
                                  ),
                            style: const TextStyle(height: 1.5),
                          ),
                        ],
                        const SizedBox(height: 16),
                        Text(
                          t(
                            'Your journey starts with a place. Pick a country or search worldwide.',
                            'একটি গন্তব্য থেকেই শুরু। দেশ বেছে নাও, অথবা বিশ্বজুড়ে খোঁজো।',
                          ),
                          style: const TextStyle(
                            height: 1.5,
                            color: Color(0xff5d6e65),
                          ),
                        ),
                        const SizedBox(height: 12),
                        DropdownButtonFormField<String>(
                          key: ValueKey(_tab),
                          initialValue: _country,
                          isExpanded: true,
                          decoration: InputDecoration(
                            labelText: t('Country', 'দেশ'),
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(16),
                            ),
                          ),
                          items: [
                            DropdownMenuItem(
                              value: '',
                              child: Text(
                                t('All curated guides', 'বাছাই করা সব গাইড'),
                              ),
                            ),
                            ...countries.map(
                              (c) => DropdownMenuItem(value: c, child: Text(c)),
                            ),
                          ],
                          onChanged: (v) => _selectCountry(v ?? ''),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          t(
                            'Select a country to load every entry available in its bundled GeoNames directory. This source does not include every settlement.',
                            'দেশ বাছলে bundled GeoNames directory-র সব entry লোড হবে। এই source-এ প্রতিটি ছোট বসতি নেই।',
                          ),
                          style: const TextStyle(fontSize: 12, height: 1.4),
                        ),
                        if (_directoryLoading)
                          const Padding(
                            padding: EdgeInsets.all(12),
                            child: LinearProgressIndicator(),
                          ),
                        if (_directoryError != null) Text(_directoryError!),
                        const SizedBox(height: 18),
                        Wrap(
                          spacing: 8,
                          runSpacing: 8,
                          children: [
                            for (final category in [
                              (
                                0,
                                Icons.landscape_outlined,
                                t('Places', 'ঘোরাঘুরি'),
                              ),
                              (
                                1,
                                Icons.restaurant_outlined,
                                t('Food', 'খাবার'),
                              ),
                              (
                                2,
                                Icons.train_outlined,
                                t('Transport', 'যাতায়াত'),
                              ),
                              (
                                3,
                                Icons.fact_check_outlined,
                                t('Rules', 'নিয়ম'),
                              ),
                              (
                                4,
                                Icons.school_outlined,
                                t('Students', 'শিক্ষার্থী'),
                              ),
                            ])
                              ChoiceChip(
                                avatar: Icon(category.$2, size: 18),
                                label: Text(category.$3),
                                selected:
                                    (_tab == 3
                                        ? 3
                                        : _tab == 4
                                        ? 4
                                        : _section) ==
                                    category.$1,
                                onSelected: (_) => setState(() {
                                  _section = category.$1;
                                  _tab = category.$1 == 3
                                      ? 3
                                      : category.$1 == 4
                                      ? 4
                                      : 1;
                                }),
                              ),
                          ],
                        ),
                        if (_tab == 0 && filtered.isNotEmpty) ...[
                          const SizedBox(height: 22),
                          Text(
                            t(
                              'Find your next favourite place',
                              'পরের প্রিয় গন্তব্য খুঁজে নাও',
                            ),
                            style: const TextStyle(
                              fontWeight: FontWeight.w800,
                              fontSize: 20,
                            ),
                          ),
                          const SizedBox(height: 12),
                          SizedBox(
                            height: 286,
                            child: ListView.separated(
                              scrollDirection: Axis.horizontal,
                              itemCount: filtered.take(8).length,
                              separatorBuilder: (_, index) =>
                                  const SizedBox(width: 12),
                              itemBuilder: (_, index) =>
                                  _photoCard(filtered[index]),
                            ),
                          ),
                          if (_recent.isNotEmpty) ...[
                            const SizedBox(height: 22),
                            Text(
                              t('Recently opened', 'সম্প্রতি দেখা'),
                              style: const TextStyle(
                                fontWeight: FontWeight.w800,
                                fontSize: 20,
                              ),
                            ),
                            const SizedBox(height: 10),
                            Wrap(
                              spacing: 8,
                              children: [
                                for (final key in _recent)
                                  for (final city in _available.where(
                                    (city) => keyFor(city) == key,
                                  ))
                                    ActionChip(
                                      avatar: const Icon(
                                        Icons.history,
                                        size: 17,
                                      ),
                                      label: Text(city['name'] as String),
                                      onPressed: () => _open(city),
                                    ),
                              ],
                            ),
                          ],
                          const SizedBox(height: 16),
                          Card(
                            color: const Color(0xffe2e9d5),
                            child: ListTile(
                              contentPadding: const EdgeInsets.all(16),
                              leading: const Icon(
                                Icons.luggage_outlined,
                                size: 32,
                              ),
                              title: Text(
                                t(
                                  'Ready for take-off?',
                                  'যাত্রার জন্য প্রস্তুত?',
                                ),
                                style: const TextStyle(
                                  fontWeight: FontWeight.w800,
                                ),
                              ),
                              subtitle: Text(
                                t(
                                  'Your personal trip checklist',
                                  'তোমার ব্যক্তিগত প্রস্তুতির checklist',
                                ),
                              ),
                              trailing: const Icon(Icons.arrow_forward),
                              onTap: () => Navigator.of(context).push(
                                MaterialPageRoute<void>(
                                  builder: (_) => TravelChecklist(bangla: _bn),
                                ),
                              ),
                            ),
                          ),
                        ],
                        const SizedBox(height: 20),
                        Text(
                          t(
                            '${filtered.length} cities and guides',
                            '${filtered.length}টি city ও guide',
                          ),
                          style: const TextStyle(fontWeight: FontWeight.w700),
                        ),
                        if (_tab == 2 && filtered.isEmpty)
                          Padding(
                            padding: const EdgeInsets.symmetric(vertical: 26),
                            child: Text(
                              t(
                                'Tap the bookmark beside a city to keep its guide here.',
                                'শহরের পাশের bookmark চাপলে গাইড এখানে থাকবে।',
                              ),
                            ),
                          ),
                        if (!_loading && filtered.isEmpty && _tab != 2)
                          Padding(
                            padding: const EdgeInsets.all(20),
                            child: Text(
                              t(
                                'No matching city. Try another name.',
                                'কোনো শহর মেলেনি। অন্য নাম দিয়ে খোঁজো।',
                              ),
                            ),
                          ),
                        if (_error != null)
                          Column(
                            children: [
                              Text(_error!),
                              TextButton(
                                onPressed: _load,
                                child: Text(t('Try again', 'আবার চেষ্টা')),
                              ),
                            ],
                          ),
                        if (_loading)
                          const Padding(
                            padding: EdgeInsets.all(30),
                            child: Center(child: CircularProgressIndicator()),
                          ),
                      ],
                    ),
                  ),
                ),
                SliverList.builder(
                  itemCount: filtered.length,
                  itemBuilder: (context, index) {
                    final city = filtered[index];
                    return Padding(
                      padding: const EdgeInsets.fromLTRB(20, 0, 20, 12),
                      child: Card(
                        margin: EdgeInsets.zero,
                        elevation: 0,
                        color: Colors.white,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(22),
                        ),
                        child: ListTile(
                          contentPadding: const EdgeInsets.symmetric(
                            horizontal: 16,
                            vertical: 10,
                          ),
                          leading: SizedBox(
                            width: 76,
                            height: 72,
                            child: ClipRRect(
                              borderRadius: BorderRadius.circular(14),
                              child: CityPhoto(
                                city: city['name'] as String,
                                contextName: city['country'] as String,
                                height: 72,
                                compact: true,
                              ),
                            ),
                          ),
                          title: Text(
                            city['name'] as String,
                            style: const TextStyle(fontWeight: FontWeight.w700),
                          ),
                          subtitle: Text(
                            '${city['country']} · ${city['directory'] == true ? '${city['admin']} · GeoNames directory' : city['region']}',
                          ),
                          onTap: () => _open(city),
                          trailing: IconButton(
                            tooltip: _saved.contains(keyFor(city))
                                ? t('Remove saved guide', 'সেভ থেকে সরাও')
                                : t('Save guide', 'গাইড সেভ করো'),
                            onPressed: () => _save(city),
                            icon: Icon(
                              _saved.contains(keyFor(city))
                                  ? Icons.bookmark_rounded
                                  : Icons.bookmark_border_rounded,
                              color: _green,
                            ),
                          ),
                        ),
                      ),
                    );
                  },
                ),
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(20, 4, 20, 28),
                    child: Column(
                      children: [
                        Text(
                          t(
                            'Core city guides stay on your phone. Current rules, online photos and maps may need internet.',
                            'মূল সিটি গাইড ফোনে থাকে। হালনাগাদ নিয়ম, online ছবি ও maps-এর জন্য internet লাগতে পারে।',
                          ),
                          style: const TextStyle(
                            fontSize: 12,
                            height: 1.5,
                            color: Color(0xff5d6e65),
                          ),
                        ),
                        TextButton(
                          onPressed: () async {
                            try {
                              await ServerSettings.channel.invokeMethod<void>(
                                'openExternalUrl',
                                'https://www.geonames.org/',
                              );
                            } catch (_) {
                              if (context.mounted)
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(
                                    content: Text(
                                      t(
                                        'Could not open source.',
                                        'Source খোলা যায়নি।',
                                      ),
                                    ),
                                  ),
                                );
                            }
                          },
                          child: const Text(
                            'City directory: GeoNames · CC BY 4.0',
                          ),
                        ),
                        TextButton.icon(
                          onPressed: () => _world('search'),
                          icon: const Icon(Icons.public),
                          label: Text(
                            t(
                              'Full world city directory',
                              'সম্পূর্ণ world city directory',
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
