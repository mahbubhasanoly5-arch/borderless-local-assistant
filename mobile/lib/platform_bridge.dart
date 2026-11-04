import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'package:flutter/services.dart';
import 'package:geolocator/geolocator.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:url_launcher/url_launcher.dart';
import 'world_directory.dart';

/// Keeps the existing Android implementation; provides equivalent Windows APIs.
class PlatformBridge extends MethodChannel {
  const PlatformBridge() : super('borderless_local/settings');
  static final _preferences = SharedPreferencesAsync();
  static Future<void> _writes = Future.value();
  static const _stateKey = 'borderless_windows_state_v1';
  Future<Map<String, dynamic>> _read() async {
    await _writes;
    final text = await _preferences.getString(_stateKey);
    return text == null ? <String, dynamic>{} : Map<String, dynamic>.from(jsonDecode(text) as Map);
  }
  Future<void> _update(Map<String, dynamic> changes) {
    final completion = Completer<void>();
    _writes = _writes.then((_) async {
      try {
        final raw = await _preferences.getString(_stateKey);
        final state = raw == null ? <String, dynamic>{} : Map<String, dynamic>.from(jsonDecode(raw) as Map);
        state.addAll(changes);
        await _preferences.setString(_stateKey, jsonEncode(state));
        completion.complete();
      } catch (error, stack) { completion.completeError(error, stack); }
    });
    return completion.future;
  }
  @override
  Future<T?> invokeMethod<T>(String method, [dynamic arguments]) async {
    if (!Platform.isWindows) return super.invokeMethod<T>(method, arguments);
    dynamic value;
    switch (method) {
      case 'getServerUrl': value = (await _read())['server_url']; break;
      case 'setServerUrl': await _update({'server_url':arguments as String}); break;
      case 'getAppLanguage': value = (await _read())['language'] ?? 'bn'; break;
      case 'setAppLanguage': await _update({'language':arguments as String}); break;
      case 'getSavedCities': value = (await _read())['saved'] ?? <String>[]; break;
      case 'getRecentCities': value = (await _read())['recent'] ?? <String>[]; break;
      case 'getDirectoryRecords': value = (await _read())['records'] ?? '[]'; break;
      case 'getTravelChecklist': value = (await _read())['checklist'] ?? <String>[]; break;
      case 'setSavedCities': await _update({'saved':List<String>.from(arguments as List)}); break;
      case 'setRecentCities': await _update({'recent':List<String>.from(arguments as List).take(12).toList()}); break;
      case 'setTravelChecklist': await _update({'checklist':List<String>.from(arguments as List)}); break;
      case 'setSavedGuideLibrary':
      case 'setRecentGuideLibrary':
        final data = Map<String, dynamic>.from(arguments as Map);
        final keys = List<String>.from(data['keys'] as List);
        final records = data['records'] as String;
        jsonDecode(records) as List;
        if (keys.length > 1000 || records.length > 2000000) throw PlatformException(code:'invalid_library', message:'Saved guide limit exceeded.');
        await _update({method == 'setSavedGuideLibrary' ? 'saved' : 'recent':method == 'setSavedGuideLibrary' ? keys : keys.take(12).toList(), 'records':records});
        break;
      case 'getCountryDirectory':
        final code = arguments as String;
        if (!RegExp(r'^[A-Z]{2}$').hasMatch(code)) throw PlatformException(code:'invalid_country');
        final rows = await WorldDirectory.load();
        value = jsonEncode(rows.where((row) => row[2] == code).map((row) => [row[0],row[1],row[5],row[6]]).toList());
        break;
      case 'getCurrentPosition':
        if (!await Geolocator.isLocationServiceEnabled()) throw PlatformException(code:'location_disabled', message:'Windows location services are unavailable. Search for your city instead.');
        var permission = await Geolocator.checkPermission();
        if (permission == LocationPermission.denied) permission = await Geolocator.requestPermission();
        if (permission == LocationPermission.denied || permission == LocationPermission.deniedForever) throw PlatformException(code:'permission_denied');
        final fix = await Geolocator.getCurrentPosition(locationSettings: const LocationSettings(accuracy:LocationAccuracy.high, timeLimit:Duration(seconds:25)));
        value = {'latitude':fix.latitude, 'longitude':fix.longitude, 'accuracy':fix.accuracy};
        break;
      case 'openExternalUrl':
        final uri = Uri.tryParse(arguments as String);
        if (uri == null || uri.scheme != 'https' || uri.host.isEmpty || uri.userInfo.isNotEmpty) throw PlatformException(code:'invalid_url');
        if (!await launchUrl(uri, mode:LaunchMode.externalApplication)) throw PlatformException(code:'open_failed');
        break;
      default: throw MissingPluginException('Unsupported Windows method: $method');
    }
    return value as T?;
  }
  @override
  Future<List<T>?> invokeListMethod<T>(String method, [dynamic arguments]) async {
    if (!Platform.isWindows) return super.invokeListMethod<T>(method, arguments);
    final result = await invokeMethod<dynamic>(method, arguments);
    return result == null ? null : List<T>.from(result as List);
  }
  @override
  Future<Map<K,V>?> invokeMapMethod<K,V>(String method, [dynamic arguments]) async {
    if (!Platform.isWindows) return super.invokeMapMethod<K,V>(method, arguments);
    final result = await invokeMethod<dynamic>(method, arguments);
    return result == null ? null : Map<K,V>.from(result as Map);
  }
}
