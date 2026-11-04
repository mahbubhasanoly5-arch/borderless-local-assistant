import 'dart:io';
import 'package:flutter_test/flutter_test.dart';
import 'package:borderless_local_assistant/server_settings.dart';

void main() {
  test('Server URLs accept an empty offline choice and reject embedded secrets', () {
    expect(ServerSettings.validate(''), isNull);
    expect(ServerSettings.validate('http://10.0.2.2:8080/'), isNull);
    expect(ServerSettings.validate('https://guide.example.com/'), isNull);
    expect(ServerSettings.validate('https://user:password@example.com/'), isNotNull);
    expect(ServerSettings.validate('file:///tmp/data'), isNotNull);
    expect(ServerSettings.validate('https://example.com/?key=secret'), isNotNull);
  });
  test('Connection check reads the database cities API', () async {
    final server = await HttpServer.bind(InternetAddress.loopbackIPv4, 0);
    addTearDown(() => server.close(force: true));
    server.listen((request) async {
      expect(request.uri.path, '/api/cities');
      request.response.headers.contentType = ContentType.json;
      request.response.write('[{"cityId":1,"cityName":"Dhaka"}]');
      await request.response.close();
    });
    expect(await ServerSettings.check('http://127.0.0.1:${server.port}/'), 1);
  });
  test('A health page or malformed response is not treated as database success', () async {
    final server = await HttpServer.bind(InternetAddress.loopbackIPv4, 0);
    addTearDown(() => server.close(force: true));
    server.listen((request) async {
      request.response.write('{"status":"ok"}');
      await request.response.close();
    });
    await expectLater(ServerSettings.check('http://127.0.0.1:${server.port}/'), throwsFormatException);
  });
}
