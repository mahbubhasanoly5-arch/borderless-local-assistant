# Code signing policy

Status: application preparation only. No SignPath subscription, certificate, signed release or provider approval has been obtained. Existing preview downloads are unsigned.

Project maintainer, committer, reviewer and proposed release approver: [mahbubhasanoly5-arch](https://github.com/mahbubhasanoly5-arch). The maintainer must enable MFA on repository and signing accounts before signing is configured. Each signing request requires manual maintainer approval.

Source builds: the manually dispatched Windows source build workflow builds the published mobile/ native Flutter desktop source and uploads an unsigned artifact. Build success must be verified before a signing request. A build artifact is not a signed installer or a Store approval.

We intend to apply for free code signing provided by SignPath.io, certificate by SignPath Foundation. This is a proposed provider arrangement, not a claim of acceptance or current signing. Provider attribution will be updated if approval is granted.

Only reviewed, public source revisions may be used for release builds. Never upload local.properties, credentials, database exports, private keys or signing secrets. Third-party runtime libraries retain their own terms and will not be represented as original project code for signing.

Privacy: https://mahbubhasanoly5-arch.github.io/borderless-local-assistant/privacy.html

Online guide/photo/article services and explicit external Maps links have their respective privacy and licensing terms. See THIRD_PARTY_NOTICES.md. Third-party and media review remains required before final signed distribution.
