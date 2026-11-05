import 'app_language.dart';

import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'server_settings.dart';
import 'native_home.dart';
import 'city_visuals.dart';
import 'native_discovery.dart';
import 'place_details.dart';

void main() => runApp(const BorderlessApp());

class BorderlessApp extends StatelessWidget {
  const BorderlessApp({super.key, this.guideBundle});
  final AssetBundle? guideBundle;
  @override
  Widget build(BuildContext context) => MaterialApp(
    title: 'Borderless Local',
    debugShowCheckedModeBanner: false,
    theme: ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.fromSeed(
        seedColor: const Color(0xff215e59),
        surface: const Color(0xfff8f8f1),
      ),
      scaffoldBackgroundColor: const Color(0xfff4f5ed),
      appBarTheme: const AppBarTheme(
        backgroundColor: Color(0xfff4f5ed),
        foregroundColor: Color(0xff163f3b),
        surfaceTintColor: Colors.transparent,
      ),
      navigationBarTheme: const NavigationBarThemeData(
        backgroundColor: Color(0xfff9faf4),
        indicatorColor: Color(0xffd4e6ce),
      ),
      filledButtonTheme: FilledButtonThemeData(
        style: FilledButton.styleFrom(minimumSize: const Size(48, 48)),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(minimumSize: const Size(48, 48)),
      ),
    ),
    home: guideBundle == null
        ? NativeHome(
            openCity: (context, city, bangla, api, section) {
              Navigator.of(context).push(
                MaterialPageRoute<void>(
                  builder: (_) => CityGuide(
                    city: city,
                    bangla: bangla,
                    apiBaseUrl: api,
                    initialSection: section,
                  ),
                ),
              );
            },
          )
        : GuideHome(guideBundle: guideBundle),
  );
}

class GuideHome extends StatefulWidget {
  const GuideHome({super.key, this.guideBundle});
  final AssetBundle? guideBundle;
  @override
  State<GuideHome> createState() => _GuideHomeState();
}

class _GuideHomeState extends State<GuideHome> {
  List<Map<String, dynamic>> _cities = [];
  String _query = '';
  String? _loadError;
  bool _bangla = true;
  String _apiUrl = ServerSettings.defaultUrl;
  String t(String en, String bn) =>
      AppLanguage.text(en, bn, useBangla: _bangla);
  @override
  void initState() {
    super.initState();
    _load();
    _loadSettings();
  }

  Future<void> _loadSettings() async {
    final value = await ServerSettings.load();
    if (mounted) setState(() => _apiUrl = value);
  }

  Future<void> _settings() async {
    final value = await Navigator.of(context).push<String>(
      MaterialPageRoute(
        builder: (_) =>
            ServerSettingsPage(currentUrl: _apiUrl, bangla: _bangla),
      ),
    );
    if (mounted && value != null) setState(() => _apiUrl = value);
  }

  Future<void> _load() async {
    try {
      final countries = jsonDecode(
        await (widget.guideBundle ?? rootBundle).loadString(
          'assets/destinations.json',
        ),
      ) as List;
      final cities = <Map<String, dynamic>>[];
      for (final country in countries) {
        for (final city in country['cities']) {
          cities.add({
            ...Map<String, dynamic>.from(city),
            'country': country['country'],
            'region': country['region'],
          });
        }
      }
      if (mounted)
        setState(() {
          _cities = cities;
          _loadError = null;
        });
    } catch (_) {
      if (mounted)
        setState(
          () => _loadError = t('Could not load guides.', 'গাইড লোড করা যায়নি।'),
        );
    }
  }

  @override
  Widget build(BuildContext context) {
    final filtered = _cities
        .where(
          (c) => '${c['name']} ${c['country']} ${c['region']}'
              .toLowerCase()
              .contains(_query.toLowerCase()),
        )
        .toList();
    return Scaffold(
      appBar: AppBar(
        title: const Text('Borderless Local'),
        actions: [
          IconButton(
            onPressed: _settings,
            tooltip: t('Rules connection', 'নিয়মের সেবার সংযোগ'),
            icon: const Icon(Icons.settings_outlined),
          ),
          TextButton(
            onPressed: () => setState(() => _bangla = !_bangla),
            child: Text(_bangla ? 'English' : 'বাংলা'),
          ),
        ],
      ),
      body: SafeArea(
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 720),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Padding(
                  padding: const EdgeInsets.fromLTRB(20, 16, 20, 8),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        t(
                          'Feel local. Wherever you go.',
                          'পৃথিবীর যেখানেই যাও, সহজে মানিয়ে নাও।',
                        ),
                        style: Theme.of(context).textTheme.headlineSmall,
                      ),
                      const SizedBox(height: 8),
                      Text(
                        t(
                          'City guides for travellers and students abroad',
                          'ভ্রমণকারী ও বিদেশে পড়তে যাওয়া শিক্ষার্থীদের সিটি গাইড',
                        ),
                      ),
                      const SizedBox(height: 20),
                      TextField(
                        onChanged: (v) => setState(() => _query = v),
                        decoration: InputDecoration(
                          prefixIcon: const Icon(Icons.search),
                          hintText: t(
                            'Search city or country',
                            'শহর বা দেশের নাম ইংরেজিতে খোঁজো',
                          ),
                          border: const OutlineInputBorder(),
                          filled: true,
                        ),
                      ),
                      const SizedBox(height: 12),
                      Text(
                        t(
                          '${filtered.length} city guides',
                          '${filtered.length}টি শহরের গাইড',
                        ),
                      ),
                    ],
                  ),
                ),
                if (_loadError != null)
                  Padding(
                    padding: const EdgeInsets.all(20),
                    child: Text(_loadError!),
                  )
                else if (_cities.isEmpty)
                  const Expanded(
                    child: Center(child: CircularProgressIndicator()),
                  )
                else
                  Expanded(
                    child: filtered.isEmpty
                        ? Center(
                            child: Text(
                              t(
                                'No matching city. Try another name.',
                                'কোনো শহর পাওয়া যায়নি। অন্য নাম দিয়ে খোঁজো।',
                              ),
                            ),
                          )
                        : ListView.builder(
                            padding: const EdgeInsets.all(12),
                            itemCount: filtered.length,
                            itemBuilder: (context, i) {
                              final city = filtered[i];
                              return Card(
                                child: ListTile(
                                  contentPadding: const EdgeInsets.symmetric(
                                    horizontal: 16,
                                    vertical: 10,
                                  ),
                                  leading: const CircleAvatar(
                                    child: Icon(Icons.explore_outlined),
                                  ),
                                  title: Text(city['name'] as String),
                                  subtitle: Text(
                                    '${city['country']} · ${city['region']}',
                                  ),
                                  trailing: const Icon(Icons.chevron_right),
                                  onTap: () => Navigator.of(context).push(
                                    MaterialPageRoute<void>(
                                      builder: (_) => CityGuide(
                                        city: city,
                                        bangla: _bangla,
                                        apiBaseUrl: _apiUrl,
                                      ),
                                    ),
                                  ),
                                ),
                              );
                            },
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

class CityGuide extends StatefulWidget {
  const CityGuide({
    super.key,
    required this.city,
    required this.bangla,
    this.apiBaseUrl = '',
    this.initialSection = 0,
  });
  final int initialSection;
  final String apiBaseUrl;
  final Map<String, dynamic> city;
  final bool bangla;
  @override
  State<CityGuide> createState() => _CityGuideState();
}

class _CityGuideState extends State<CityGuide> {
  String get _api => widget.apiBaseUrl;
  List<dynamic> _rules = [];
  List<dynamic> _transit = [];
  bool _loading = false;
  String? _message;
  int _request = 0;
  Map<String, dynamic> _public = {};
  Future<void> _loadPublicRules() async {
    try {
      final data = jsonDecode(
        await rootBundle.loadString('assets/public_rules.json'),
      ) as Map<String, dynamic>;
      if (mounted)
        setState(
          () => _public = Map<String, dynamic>.from(
            data[widget.city['country']] as Map? ?? {},
          ),
        );
    } catch (_) {
      /* General checklists remain available offline. */
    }
  }

  String t(String en, String bn) =>
      AppLanguage.text(en, bn, useBangla: widget.bangla);
  @override
  void initState() {
    super.initState();
    _loadRules();
    _loadPublicRules();
  }

  Future<dynamic> _get(HttpClient client, Uri uri) async {
    final request = await client
        .getUrl(uri)
        .timeout(const Duration(seconds: 12));
    final response = await request.close().timeout(const Duration(seconds: 12));
    if (response.statusCode != 200)
      throw const HttpException('Guide unavailable');
    return jsonDecode(
      await response
          .transform(utf8.decoder)
          .join()
          .timeout(const Duration(seconds: 12)),
    );
  }

  Future<void> _loadRules() async {
    if (_api.isEmpty) {
      _message = t(
        'Local rules are not connected yet. Set your server address in the home screen settings.',
        'স্থানীয় নিয়মের সেবা এখনো সংযুক্ত হয়নি। Home screen-এর settings-এ server-এর ঠিকানা দাও।',
      );
      return;
    }
    final requestId = ++_request;
    setState(() {
      _loading = true;
      _message = null;
    });
    final client = HttpClient()
      ..connectionTimeout = const Duration(seconds: 12);
    try {
      final base = Uri.parse(_api.endsWith('/') ? _api : '$_api/');
      final cities = await _get(client, base.resolve('api/cities')) as List;
      final matches = cities
          .where(
            (c) =>
                c['cityName'].toString().toLowerCase() ==
                widget.city['name'].toString().toLowerCase(),
          )
          .toList();
      if (matches.length != 1)
        throw const HttpException('No unique city guide');
      final overview = await _get(
        client,
        base.resolve(
          'api/cities/${matches.single['cityId']}?language=${widget.bangla ? 'bn' : 'en'}',
        ),
      );
      if (!mounted || requestId != _request) return;
      setState(() {
        _rules = overview['rules'] as List;
        _transit = overview['transitGuides'] as List;
        if (_rules.isEmpty)
          _message = t(
            'No local rules in this language yet.',
            'এই ভাষায় স্থানীয় নিয়ম এখনো যোগ করা হয়নি।',
          );
      });
    } catch (_) {
      if (mounted && requestId == _request)
        setState(
          () => _message = t(
            'Local rules unavailable. Check your connection or try again later.',
            'স্থানীয় নিয়ম এখন পাওয়া যাচ্ছে না। সংযোগ দেখে আবার চেষ্টা করো।',
          ),
        );
    } finally {
      client.close(force: true);
      if (mounted && requestId == _request) setState(() => _loading = false);
    }
  }

  Widget section(String title, IconData icon, List<String> items) => Card(
    child: Padding(
      padding: const EdgeInsets.all(18),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(icon),
              const SizedBox(width: 10),
              Expanded(
                child: Text(
                  title,
                  style: Theme.of(context).textTheme.titleLarge,
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          for (final item in items)
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 6),
              child: Text('• $item', style: const TextStyle(height: 1.5)),
            ),
        ],
      ),
    ),
  );
  Future<void> _openLink(String url) async {
    try {
      await ServerSettings.channel.invokeMethod<void>('openExternalUrl', url);
    } catch (_) {
      if (mounted)
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(t('Could not open link.', 'লিংক খোলা যায়নি।')),
          ),
        );
    }
  }

  Widget _sourceCards(String kind) => Column(
    children: [
      for (final entry in (_public[kind] as List? ?? []))
        Card(
          child: Padding(
            padding: const EdgeInsets.all(18),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  '${widget.city['country']} · ${t('Official source', 'সরকারি সূত্র')}',
                  style: const TextStyle(fontWeight: FontWeight.w700),
                ),
                const SizedBox(height: 10),
                Text(
                  entry[widget.bangla ? 'bn' : 'en'] as String,
                  style: const TextStyle(height: 1.6),
                ),
                const SizedBox(height: 8),
                Text(
                  '${t('Source checked', 'সূত্র দেখা হয়েছে')}: ${entry['checked']}',
                  style: const TextStyle(fontSize: 12),
                ),
                TextButton.icon(
                  onPressed: () => _openLink(entry['url'] as String),
                  icon: const Icon(Icons.open_in_new, size: 16),
                  label: Text(t('Read official guidance', 'সরকারি তথ্য পড়ো')),
                ),
              ],
            ),
          ),
        ),
    ],
  );
  Widget _page(List<Widget> children) => ListView(
    padding: const EdgeInsets.fromLTRB(16, 20, 16, 30),
    children: children,
  );
  @override
  Widget build(BuildContext context) => DefaultTabController(
    length: 5,
    initialIndex: widget.initialSection.clamp(0, 4).toInt(),
    child: Scaffold(
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              widget.city['name'] as String,
              style: const TextStyle(fontWeight: FontWeight.w800),
            ),
            Text(
              widget.city['country'] as String,
              style: const TextStyle(fontSize: 12),
            ),
          ],
        ),
        bottom: TabBar(
          isScrollable: true,
          tabAlignment: TabAlignment.start,
          tabs: [
            Tab(
              icon: const Icon(Icons.landscape_outlined),
              text: t('Places', 'দর্শনীয় স্থান'),
            ),
            Tab(
              icon: const Icon(Icons.restaurant_outlined),
              text: t('Food', 'খাবার'),
            ),
            Tab(
              icon: const Icon(Icons.train_outlined),
              text: t('Transport', 'যাতায়াত'),
            ),
            Tab(
              icon: const Icon(Icons.fact_check_outlined),
              text: t('Rules', 'নিয়ম'),
            ),
            Tab(
              icon: const Icon(Icons.school_outlined),
              text: t('Students', 'শিক্ষার্থী'),
            ),
          ],
        ),
      ),
      body: SafeArea(
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 760),
            child: TabBarView(
              children: [
                _page([
                  ClipRRect(
                    borderRadius: BorderRadius.circular(24),
                    child: CityPhoto(
                      city: widget.city['name'] as String,
                      contextName: widget.city['country'] as String,
                      height: 220,
                      overlay: Positioned(
                        left: 18,
                        right: 18,
                        bottom: 18,
                        child: Text(
                          '${widget.city['name']} · ${widget.city['country']}',
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 24,
                            fontWeight: FontWeight.w800,
                          ),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                  Text(
                    t('Places to explore', 'দর্শনীয় স্থান'),
                    style: Theme.of(context).textTheme.titleLarge,
                  ),
                  const SizedBox(height: 12),
                  if (widget.city['directory'] == true)
                    section(
                      t('Directory city', 'City directory'),
                      Icons.info_outline,
                      [
                        t(
                          'This city comes from GeoNames. Online place information appears below; it is article discovery, not a verified recommendation or live listing.',
                          'এই city GeoNames থেকে এসেছে। নিচে app-এর ভেতরেই online জায়গার তথ্য দেখাবে; এগুলো article-এর ফল, যাচাই করা recommendation বা live listing নয়।',
                        ),
                      ],
                    ),
                  for (final sight in List<String>.from(widget.city['sights']))
                    Padding(
                      padding: const EdgeInsets.only(bottom: 16),
                      child: Card(
                        margin: EdgeInsets.zero,
                        clipBehavior: Clip.antiAlias,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(24),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.stretch,
                          children: [
                            CityPhoto(
                              city: sight,
                              contextName:
                                  '${widget.city['name']}, ${widget.city['country']}',
                              height: 218,
                              overlay: Positioned(
                                left: 18,
                                right: 18,
                                bottom: 18,
                                child: Text(
                                  sight,
                                  style: const TextStyle(
                                    color: Colors.white,
                                    fontSize: 22,
                                    fontWeight: FontWeight.w800,
                                  ),
                                ),
                              ),
                            ),
                            Padding(
                              padding: const EdgeInsets.fromLTRB(
                                12,
                                10,
                                12,
                                12,
                              ),
                              child: Wrap(
                                spacing: 8,
                                runSpacing: 4,
                                children: [
                                  TextButton.icon(
                                    onPressed: () => Navigator.of(context).push(
                                      MaterialPageRoute<void>(
                                        builder: (_) => PlaceDetails(
                                          name: sight,
                                          city: widget.city['name'] as String,
                                          country:
                                              widget.city['country'] as String,
                                          bangla: widget.bangla,
                                        ),
                                      ),
                                    ),
                                    icon: const Icon(Icons.info_outline),
                                    label: Text(t('Details', 'বিস্তারিত')),
                                  ),
                                  FilledButton.tonalIcon(
                                    onPressed: () => _openLink(
                                      'https://www.google.com/maps/dir/?api=1&destination=${Uri.encodeComponent('$sight, ${widget.city['name']}, ${widget.city['country']}')}',
                                    ),
                                    icon: const Icon(Icons.near_me_outlined),
                                    label: Text(t('Directions', 'পথ দেখো')),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  NativeDiscovery(
                    city: widget.city['name'] as String,
                    country: widget.city['country'] as String,
                    bangla: widget.bangla,
                  ),
                  Text(
                    t(
                      'Curated suggestions. Check current hours before visiting.',
                      'বাছাই করা পরামর্শ। যাওয়ার আগে বর্তমান সময়সূচি যাচাই করো।',
                    ),
                  ),
                ]),
                _page([
                  if (List<String>.from(widget.city['foods']).isNotEmpty)
                    section(
                      t('Local food', 'স্থানীয় খাবার'),
                      Icons.restaurant_outlined,
                      List<String>.from(widget.city['foods']),
                    )
                  else
                    section(
                      t('Find local food', 'স্থানীয় খাবার খুঁজো'),
                      Icons.restaurant_outlined,
                      [
                        t(
                          'A curated food guide is not available for this directory city. Find restaurants, menus and current listings on Maps.',
                          'এই directory city-র বাছাই করা food guide নেই। Maps-এ restaurant, menu ও বর্তমান listing খুঁজো।',
                        ),
                      ],
                    ),
                  NativeDiscovery(
                    city: widget.city['name'] as String,
                    country: widget.city['country'] as String,
                    bangla: widget.bangla,
                    food: true,
                  ),
                  for (final food in List<String>.from(widget.city['foods']))
                    Card(
                      clipBehavior: Clip.antiAlias,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: [
                          CityPhoto(
                            city: food,
                            contextName: widget.city['country'] as String,
                            height: 180,
                          ),
                          ListTile(
                            title: Text(food),
                            trailing: const Icon(Icons.chevron_right),
                            subtitle: Text(t('Details', 'বিস্তারিত')),
                            onTap: () => Navigator.of(context).push(
                              MaterialPageRoute<void>(
                                builder: (_) => PlaceDetails(
                                  name: food,
                                  city: widget.city['name'] as String,
                                  country: widget.city['country'] as String,
                                  bangla: widget.bangla,
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                ]),
                _page([
                  section(
                    t('Getting around', 'যাতায়াত'),
                    Icons.train_outlined,
                    [
                      ...List<String>.from(widget.city['transit']),
                      ..._transit.map(
                        (g) => '${g['transportType']}: ${g['instructions']}',
                      ),
                    ],
                  ),
                  if (widget.city['directory'] == true)
                    Text(
                      t(
                        'Check the local operator for routes, fares and last services. This directory entry does not contain verified transit instructions.',
                        'Route, fare ও শেষ service স্থানীয় operator-এর কাছে যাচাই করো। এই directory entry-তে যাচাই করা transit instruction নেই।',
                      ),
                    ),
                  TextButton.icon(
                    onPressed: () => _openLink(
                      'https://www.google.com/maps/search/?api=1&query=${Uri.encodeComponent('public transport in ${widget.city['name']}, ${widget.city['country']}')}',
                    ),
                    icon: const Icon(Icons.map_outlined),
                    label: Text(
                      t('Explore transport on Maps', 'Maps-এ যাতায়াত দেখো'),
                    ),
                  ),
                ]),
                _page([
                  section(
                    t('Local rules & etiquette', 'স্থানীয় নিয়ম ও শিষ্টাচার'),
                    Icons.fact_check_outlined,
                    [
                      t(
                        'General checklist, not a complete statement of local law.',
                        'এটি সাধারণ checklist; স্থানীয় সম্পূর্ণ আইন নয়।',
                      ),
                      t(
                        'Check visa, customs and medicine permissions with destination authorities.',
                        'Visa, customs ও medicine-এর অনুমতি destination authority-তে যাচাই করো।',
                      ),
                      t(
                        'Check posted rules for smoking, photography, religious sites, dress and public transport.',
                        'Smoking, photography, ধর্মীয় স্থান, পোশাক ও public transport-এর posted rules দেখো।',
                      ),
                    ],
                  ),
                  _sourceCards('rules'),
                  TextButton.icon(
                    onPressed: () =>
                        _openLink('https://www.gov.uk/foreign-travel-advice'),
                    icon: const Icon(Icons.open_in_new),
                    label: Text(
                      t('Government travel advice', 'সরকারি travel advice'),
                    ),
                  ),
                  Text(
                    t(
                      'FCDO entry advice may be for UK passports. Check your own nationality and local authorities.',
                      'FCDO entry advice UK passport-ভিত্তিক হতে পারে। নিজের nationality অনুযায়ী তথ্য ও স্থানীয় কর্তৃপক্ষ যাচাই করো।',
                    ),
                  ),
                  if (_rules.isNotEmpty)
                    section(
                      t('Saved database rules', 'Database-এর saved rules'),
                      Icons.storage_outlined,
                      _rules
                          .map((r) => '${r['title']}\n${r['description']}')
                          .toList(),
                    ),
                  if (_loading)
                    const Padding(
                      padding: EdgeInsets.all(16),
                      child: Center(child: CircularProgressIndicator()),
                    ),
                  if (_message != null)
                    Padding(
                      padding: const EdgeInsets.all(12),
                      child: Text(_message!),
                    ),
                  if (_api.isNotEmpty && !_loading)
                    TextButton.icon(
                      onPressed: _loadRules,
                      icon: const Icon(Icons.refresh),
                      label: Text(t('Refresh rules', 'নিয়ম আবার লোড করো')),
                    ),
                ]),
                _page([
                  section(
                    t('Before studying abroad', 'বিদেশে পড়তে যাওয়ার আগে'),
                    Icons.school_outlined,
                    [
                      t(
                        'Check your own visa conditions, work permission and permitted hours before accepting work.',
                        'কাজ নেওয়ার আগে নিজের visa conditions, work permission ও hours যাচাই করো।',
                      ),
                      t(
                        'Ask your university about enrolment, housing and health cover.',
                        'ভর্তি, বাসস্থান ও স্বাস্থ্যবিমা বিষয়ে university-তে যোগাযোগ করো।',
                      ),
                      t(
                        'Check residence registration, renewal deadlines and university support contacts.',
                        'Residence registration, renewal deadline ও university support contact যাচাই করো।',
                      ),
                    ],
                  ),
                  _sourceCards('students'),
                ]),
              ],
            ),
          ),
        ),
      ),
    ),
  );
}
