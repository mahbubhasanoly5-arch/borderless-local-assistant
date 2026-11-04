# Borderless Local — Android prototype

## Website design (0.3.0, pending build)

The Android entry screen now embeds the existing website HTML/CSS/JS in an Android WebView. `sync-website.ps1` copies the actual web resources and all country directory files before each build, preserving the website design and mobile breakpoints. Packaged resources are served through AndroidX WebViewAssetLoader at a local HTTPS origin; no file access or Javascript/native object bridge is enabled. External http(s) map/source links open outside the embedded view. Location asks for Android coarse-location permission only when the website requests it; denial remains supported.

The app adds Back, Home, Reload and rules connection controls below the website. Database GET requests are forwarded only to the user-configured rules server. The website's localhost-only database guard is adapted only in the generated Android copy. Translation uses the site's direct-service fallback; its POST translation proxy is not implemented in the native request adapter. Images, online article discovery, translation and external Maps require network access. Core country/city data and curated guides are bundled locally.

Build with the `Build-Website-Android.ps1` output launcher, which preserves the older APK and writes `Borderless-Local-website-debug.apk`. This version is not yet compiled or tested in BlueStacks. HTML/CSS/metadata copies were compared with the source and generated JavaScript passed syntax checks. Android WebView hosting follows [Android's asset loader](https://developer.android.com/reference/androidx/webkit/WebViewAssetLoader) and [Flutter platform views](https://docs.flutter.dev/platform-integration/android/platform-views).

Flutter app with 44 countries / 88 curated city guides copied from the existing web guide. Country/city search, places, food and transport work offline. Bangla/English controls are included; the curated destination descriptions retain their existing English text.

The rules screen uses the existing Java `/api/cities` and `/api/cities/{id}?language=bn|en` endpoints when `API_BASE_URL` is provided. Without a configured backend it clearly says local rules are not connected. No credentials or direct MySQL connection belong in the app. Student guidance is a preparation checklist, not a country-specific legal database.

## Build on Windows

Run `./build-android.ps1` from PowerShell in this folder. It resolves dependencies, analyzes the app, runs widget tests and builds a debug APK. It stops if a required step fails. The Android scaffold uses templates and versions from the locally installed Flutter 3.47.7 SDK.

For the Android emulator and a Java server running on port 8080 on the same computer:

```powershell
./build-android.ps1 -ApiBaseUrl 'http://10.0.2.2:8080/'
```

Use the Java server's actual port if different. HTTP is allowed only for debug builds. A production backend must use HTTPS. A physical phone needs a reachable backend URL; `localhost` on a phone points to the phone itself.

To launch on an available Android emulator:

```powershell
flutter emulators
flutter emulators --launch Medium_Phone_API_37.0
flutter run --dart-define=API_BASE_URL=http://10.0.2.2:8080/
```

APK output: `build/app/outputs/flutter-apk/app-debug.apk`. Debug APKs are for local testing. Store release signing, final package identity, privacy disclosure, complete sourced rules, icons and device testing remain before publication. iOS is not scaffolded yet.

## Rules connection (0.2.0)

Home screen settings now let you save the server address locally on Android, test the actual `/api/cities` database endpoint, and return to offline mode by saving an empty address. The settings do not contain MySQL credentials. Open a city again after changing the address. The local Java server and MySQL must stay running; public HTTPS hosting is still needed for use away from the laptop.

Run `./start-local-backend.ps1` from your regular PowerShell terminal to compile/start the existing Java server and check database cities, Bangla rules and transit. It only reads database data. For Android Studio's standard emulator, try `http://10.0.2.2:8080/` in app settings. Other Android players may require the laptop's reachable network address; use Check connection to verify rather than assume.

The `Prepare-Connected-Android.ps1` deliverable starts/checks the backend and then analyzes, tests and builds the updated APK. The original working APK is preserved in outputs under its original name; the update uses `Borderless-Local-connected-debug.apk`.

## Verification status

Version 0.1.0 passed analysis and all three widget tests, built successfully and opened in BlueStacks with the Dhaka guide visible. The 0.2.0 connection update has not yet been analyzed, tested or built. Flutter execution inside the agent environment fails with Windows access-denied/canonicalization errors; Java server startup also fails with loopback permission denied. Use the prepared script from the regular user terminal; its log records the real outcome.
