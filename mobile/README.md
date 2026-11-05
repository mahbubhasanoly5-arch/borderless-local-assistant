# Borderless Local Assistant — native Android and Windows

## Current architecture

Native Flutter guide screens for Home, Explore, Saved, Rules and Students. Core navigation stays in the app. Explicit Maps, directions and source links open external applications. Older WebView classes are retained for legacy paths; the main app is native.

Bundled city directory, curated guides, rules/etiquette preparation and checklists work to the extent of their bundled coverage. Online photos, article discovery and Java rules requests need internet. Eight interface language choices are partial translations, not complete translated guide coverage. GeoNames data does not include every settlement.

## Build

Flutter 3.47.7, locked packages in pubspec.lock. Android requires its SDK/JDK; Windows requires Visual Studio C++ desktop tools and Windows SDK. From this folder:

```
flutter pub get --enforce-lockfile
flutter build windows --release
flutter build apk --debug
```

These are build commands, not a claim that this revision has been built or tested. Existing build-android.ps1 also runs checks/tests; use it only when those are desired. For Android website assets on legacy paths, run sync-website.ps1 first.

Windows CI is manually dispatched from the Windows source build workflow. The previous revision 5cc27a1 built successfully on 2026-11-04; later changes require a new build. CI artifacts are unsigned and expire. Keep the Windows EXE with all DLL and data files. Windows application-control policy can block unsigned releases.

## Backend and secrets

Default HTTPS rules service: https://borderless-local-assistant.onrender.com . Database coverage is limited; static worldwide directory coverage is different. Server address can be changed or cleared in app settings. No direct database connection belongs in the app. Keep credentials in ignored local.properties/environment variables; never publish database exports or signing keys.

## Privacy and licenses

Settings → About, privacy and licenses provides a native explanation and Flutter dependency license viewer. Public policy: https://mahbubhasanoly5-arch.github.io/borderless-local-assistant/privacy.html . Original code is MIT; see ../LICENSE and ../THIRD_PARTY_NOTICES.md. Third-party media license review remains required before final signed distribution.

## Release status

Windows source build and Store package validation do not prove runtime correctness or certification. Store submission is still a draft until genuine Windows screenshots, runtime review and all declarations are complete. SignPath application was submitted; no provider approval or signed binary exists yet. iOS is not scaffolded. Do not claim Store availability.
