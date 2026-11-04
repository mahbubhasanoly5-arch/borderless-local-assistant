import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:borderless_local_assistant/main.dart';
import 'package:borderless_local_assistant/server_settings.dart';

class GuideTestBundle extends CachingAssetBundle {
  GuideTestBundle(this.contents);
  final String contents;
  @override
  Future<String> loadString(String key, {bool cache = true}) {
    if (key != 'assets/destinations.json') throw StateError('Unexpected asset: $key');
    return SynchronousFuture(contents);
  }
  @override
  Future<ByteData> load(String key) => throw UnsupportedError('Use loadString');
}

Future<void> openGuides(WidgetTester tester) async {
  // Use the real guide content with deterministic in-memory delivery.
  // Widget tests should not depend on asset I/O or isolate scheduling.
  final data = File('assets/destinations.json').readAsStringSync();
  await tester.pumpWidget(BorderlessApp(guideBundle: GuideTestBundle(data)));
  await tester.pumpAndSettle();
  expect(find.byType(CircularProgressIndicator), findsNothing);
}

void main() {
  testWidgets('Connection settings save and restore the server address', (tester) async {
    String? savedUrl;
    final messenger = TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger;
    messenger.setMockMethodCallHandler(ServerSettings.channel, (call) async {
      if (call.method == 'getServerUrl') return savedUrl;
      if (call.method == 'setServerUrl') { savedUrl = call.arguments as String; return null; }
      throw MissingPluginException();
    });
    addTearDown(() => messenger.setMockMethodCallHandler(ServerSettings.channel, null));
    await openGuides(tester);
    await tester.tap(find.text('English'));
    await tester.pumpAndSettle();
    await tester.tap(find.byIcon(Icons.settings_outlined));
    await tester.pumpAndSettle();
    await tester.enterText(find.byType(TextField), 'https://guide.example.com/');
    await tester.tap(find.text('Save'));
    await tester.pumpAndSettle();
    expect(savedUrl, 'https://guide.example.com/');
    await tester.tap(find.byIcon(Icons.settings_outlined));
    await tester.pumpAndSettle();
    final restoredField = tester.widget<TextField>(find.byType(TextField));
    expect(restoredField.controller!.text, savedUrl);
  });
  testWidgets('Search by city and open offline travel details', (tester) async {
    await openGuides(tester);
    await tester.enterText(find.byType(TextField), 'Dhaka');
    await tester.pumpAndSettle();
    // The search field also contains "Dhaka". Select the actual result tile.
    final cityResult = find.widgetWithText(ListTile, 'Dhaka');
    expect(cityResult, findsOneWidget);
    await tester.ensureVisible(cityResult);
    await tester.tap(cityResult);
    await tester.pumpAndSettle();
    expect(find.text('Dhaka, Bangladesh'), findsOneWidget);
    expect(find.textContaining('Lalbagh Fort'), findsOneWidget);
    expect(tester.takeException(), isNull);
  });
  testWidgets('Language switch and empty search results', (tester) async {
    await openGuides(tester);
    await tester.tap(find.text('English'));
    await tester.pumpAndSettle();
    expect(find.text('Search city or country'), findsOneWidget);
    await tester.enterText(find.byType(TextField), 'nonexistent-city-123');
    await tester.pumpAndSettle();
    expect(find.text('No matching city. Try another name.'), findsOneWidget);
  });
  testWidgets('Invalid guide data shows an error instead of a spinner', (tester) async {
    await tester.pumpWidget(BorderlessApp(guideBundle: GuideTestBundle('invalid json')));
    await tester.pumpAndSettle();
    expect(find.byType(CircularProgressIndicator), findsNothing);
    expect(find.text('গাইড লোড করা যায়নি।'), findsOneWidget);
  });
}
