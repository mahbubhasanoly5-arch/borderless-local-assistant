import 'app_language.dart';
import 'package:flutter/material.dart';
import 'server_settings.dart';

class TravelChecklist extends StatefulWidget {
  const TravelChecklist({super.key, required this.bangla});
  final bool bangla;
  @override
  State<TravelChecklist> createState() => _TravelChecklistState();
}
class _TravelChecklistState extends State<TravelChecklist> {
  Set<String> _checked = {};
  bool _ready = false;
  bool _saving = false;
  String t(String en, String bn) => AppLanguage.text(en, bn, useBangla: widget.bangla);
  final _steps = const [
    ['documents', 'Passport, visa and document copies', 'Passport, visa ও document copy'],
    ['arrival', 'Arrival route and first-night stay', 'পৌঁছানোর পথ ও প্রথম রাতের বাসস্থান'],
    ['rules', 'Official local rules and entry conditions', 'Official local rules ও entry conditions'],
    ['health', 'Insurance and permitted medicines', 'Insurance ও medicine-এর অনুমতি'],
    ['contacts', 'University, accommodation and trusted contacts', 'University, বাসস্থান ও পরিচিতজনের contact'],
    ['money', 'Payment options and emergency funds', 'Payment ব্যবস্থা ও জরুরি খরচ'],
    ['study', 'Student work and residence conditions, if relevant', 'প্রযোজ্য হলে student work ও residence conditions'],
  ];
  @override
  void initState() { super.initState(); _load(); }
  Future<void> _load() async {
    try {
      final data = await ServerSettings.channel.invokeListMethod<String>('getTravelChecklist') ?? [];
      if (mounted) setState(() => _checked = data.toSet());
    } catch (_) { /* The checklist still opens if persistence is unavailable. */ }
    finally { if (mounted) setState(() => _ready = true); }
  }
  Future<void> _toggle(String key, bool value) async {
    if (_saving) return;
    final next = Set<String>.from(_checked);
    value ? next.add(key) : next.remove(key);
    setState(() => _saving = true);
    try {
      await ServerSettings.channel.invokeMethod<void>('setTravelChecklist', next.toList());
      if (mounted) setState(() => _checked = next);
    } catch (_) {
      if (mounted) ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(t('Could not save your checklist.', 'Checklist save হয়নি।'))));
    } finally { if (mounted) setState(() => _saving = false); }
  }
  @override
  Widget build(BuildContext context) {
    final count = _checked.intersection(_steps.map((s) => s[0]).toSet()).length;
    return Scaffold(appBar: AppBar(title: Text(t('Trip preparation', 'যাত্রার প্রস্তুতি'))), body: SafeArea(child: Center(child: ConstrainedBox(constraints: const BoxConstraints(maxWidth: 760), child: ListView(padding: const EdgeInsets.all(20), children: [
      const Icon(Icons.luggage_outlined, size: 56, color: Color(0xff183e32)),
      const SizedBox(height: 18), Text(t('A calmer start to your journey', 'প্রস্তুতি থাকুক, চিন্তা কমুক'), style: Theme.of(context).textTheme.headlineSmall),
      const SizedBox(height: 8), Text(t('Your personal checklist stays on this device. It is a planning aid, not proof that entry or visa requirements are satisfied.', 'তোমার checklist এই device-এ থাকে। এটি planning-এর সহায়তা; visa বা entry requirements পূরণের নিশ্চয়তা নয়।')),
      const SizedBox(height: 18), LinearProgressIndicator(value: count / _steps.length, minHeight: 8, borderRadius: BorderRadius.circular(8)),
      const SizedBox(height: 10), Text('$count / ${_steps.length}'),
      if (!_ready) const Center(child: CircularProgressIndicator()),
      for (final step in _steps) Card(child: CheckboxListTile(value: _checked.contains(step[0]), onChanged: !_ready || _saving ? null : (value) => _toggle(step[0], value ?? false), title: Text(step[widget.bangla ? 2 : 1]), controlAffinity: ListTileControlAffinity.leading)),
    ])))));
  }
}
