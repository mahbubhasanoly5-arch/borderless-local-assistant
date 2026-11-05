import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class AppInfoPage extends StatelessWidget {
  const AppInfoPage({super.key});
  static bool _licensesRegistered = false;
  static void _registerLicenses() {
    if (_licensesRegistered) return;
    _licensesRegistered = true;
    LicenseRegistry.addLicense(() async* {
      yield LicenseEntryWithLineBreaks(['Borderless Local Assistant'], await rootBundle.loadString('assets/legal/LICENSE.txt'));
      yield LicenseEntryWithLineBreaks(['Third-party data and media notices'], await rootBundle.loadString('assets/legal/THIRD_PARTY_NOTICES.txt'));
    });
  }
  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: const Text('About & privacy / পরিচিতি')),
    body: Center(child: ConstrainedBox(constraints: const BoxConstraints(maxWidth: 760), child: ListView(padding: const EdgeInsets.all(24), children: [
      Text('Borderless Local Assistant', style: Theme.of(context).textTheme.headlineSmall),
      const SizedBox(height: 16),
      const SelectableText('City guides and travel preparation for travellers and students abroad. Coverage varies. This app is not an official legal or visa authority. Confirm current rules with official sources.'),
      const SizedBox(height: 24),
      Text('Your data / তোমার তথ্য', style: Theme.of(context).textTheme.titleLarge),
      const SizedBox(height: 12),
      const SelectableText('Saved and Recent guides, checklist selections, language and the rules-server address are stored locally on your device. The app has no user account, advertising SDK or developer-operated analytics SDK. Optional location is requested only after you choose Use my location. City matching takes place on the device; background location is not requested. You can search manually without location.'),
      const SizedBox(height: 16),
      const SelectableText('Online guide requests, Wikipedia/Wikimedia photos and article discovery contact external services, which receive technical request information such as your IP address and search terms. Maps, directions and source links open an external application only when selected. Maps requests may include coordinates. Website translation can send public guide text to MyMemory; the native interface uses bundled partial translations.'),
      const SizedBox(height: 16),
      const SelectableText('The default rules service is hosted on Render. A custom server can be selected in Settings; never include passwords or tokens in its URL. Clear its address and Save to use bundled guides without that rules service. This does not disable online photos or discovery. Remove Saved entries in Saved; reset app data through the operating system to remove all local preferences. Uninstall/backup behavior depends on your operating system and its backup settings.'),
      const SizedBox(height: 16),
      const SelectableText('Privacy policy: https://mahbubhasanoly5-arch.github.io/borderless-local-assistant/privacy.html\nSupport: mahbubhasanoly@gmail.com'),
      const Divider(height: 40),
      const SelectableText('City directory: GeoNames, CC BY 4.0. GeoNames city centres are approximate and do not include every settlement. Article and image rights remain with their respective authors. Images are not covered by the app MIT license; consult their source pages for author and license information.'),
      const SizedBox(height: 12),
      FilledButton.tonalIcon(icon: const Icon(Icons.description_outlined), label: const Text('Open-source licenses / লাইসেন্স'), onPressed: () {
        _registerLicenses();
        showLicensePage(context: context, applicationName: 'Borderless Local Assistant', applicationLegalese: 'Original project code: MIT. Third-party content retains its own terms.');
      }),
    ]))),
  );
}
