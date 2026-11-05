# 0.9.1 release preparation

Prepared 2026-11-05; build and runtime verification pending.

Changes:
- Native Settings → About/privacy/licences page; no website redirect for this content.
- Bundled original MIT license and third-party notices, alongside Flutter dependency license viewer.
- Updated website privacy disclosures for Windows, Saved/Recent/checklists, default rules server and OS backups.
- Replaced stale mobile README with native Android/Windows build and release instructions.

No signed release, Microsoft certification or successful runtime test is claimed. Public website changes require Pages deployment; native changes require rebuilding Android/Windows. Version: 0.9.1+14.

Outstanding final distribution work:
- SignPath response and signing configuration; private account/MFA/secrets stay with owner.
- Genuine Windows app launch, behaviour review and screenshots.
- Resolve per-image Wikimedia attribution/licensing (article link alone does not identify every image author/license); do not label all online images MIT.
- Final Store package version matching screenshots and declarations; certification submission.
