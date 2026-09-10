# pocketbase_app — Evaluation (2026-09-09)

## Summary

The service was reported as "no longer running on Cloud Run" and in need of a restart. Investigation found the opposite: **the service is live, healthy, and actively writing/backing up data**. The perception of an outage traces to a stale failed deployment, a handful of historical cold-start errors, and likely an expired admin-panel login session — not a current outage. A security review (requested separately) surfaced a fully public admin UI and an over-broad IAM grant, both of which have since been remediated, along with a dead duplicate Cloud Run service and two stale storage buckets. All P0 items are now closed — see Actions Already Taken and the P0 section below.

## Findings

### 1. Service health
- Cloud Run service `pocketbase-app` (project `hpe-design-system-adoption`, region `us-central1`) is serving 100% of traffic on revision `pocketbase-app-00028-5pc`.
- `/api/health` returns `200 OK` on both the canonical Cloud Run URL and the URL hardcoded in `apps/design-system-manager/.env` (`https://pocketbase-app-1084464911051.us-central1.run.app`).
- Cloud Storage bucket `ds-pocketbase` contains live data with **today's timestamps** (`data.db`, `auxiliary.db`, and an automatic backup `backups/pb_backup_acme_20260909232412.zip`) — PocketBase's built-in auto-backup is actively running. No data loss risk identified.

### 2. Root cause of the "it's down" perception
- A later deploy attempt, revision `pocketbase-app-00029-kvv` (2025-08-07), failed because it pushed a multi-arch OCI image index built without `--platform linux/amd64` (a classic Apple Silicon `docker build` mistake). Cloud Run rejected it and automatically kept serving the last-good revision (`00028`), but left a permanently red `RevisionFailed` condition in `gcloud run services describe` output — alarming to see, but not indicative of current downtime.
- Cloud Logging shows repeated `ERROR: request aborted, no available instance` events on ~9 separate days between 2026-08-22 and 2026-08-31 (none since). This is consistent with `maxScale: 1` and no `minScale` — a cold start from zero instances (gcsfuse mount + SQLite startup) occasionally times out an in-flight request. This is intermittent slowness, not a full outage, and stopped over a week before this evaluation.
- Recent `WARNING` logs show repeated `401` responses on `/api/settings` referred from the admin UI (`/_/`) from a real browser session — someone has been failing to authenticate into the admin panel. This is the most likely source of the "looks down" report: the API works, but admin login is failing for the person checking on it (most likely an expired PocketBase session/credential, not an infrastructure fault).

### 3. Security review
| Area | Finding | Status |
|---|---|---|
| Cloud Run invoker (ingress) | `allUsers` had `roles/run.invoker` — the API **and** the `/_/` admin UI were fully public, protected only by PocketBase's own login | ✅ Remediated 2026-09-10 — see below |
| Service account IAM scope | `pocketbase-service-account` held project-level `roles/storage.objectAdmin` (admin over *every* bucket in the project, not just `ds-pocketbase`) | ✅ Remediated — rescoped to bucket-level |
| Unused service account | A second, disabled service account `pocketbase-app@...` held leftover project-level `storage.objectUser`/`objectViewer` grants | ✅ Remediated — grants removed |
| Bucket exposure | `ds-pocketbase` has `publicAccessPrevention: enforced` and uniform bucket-level access; no `allUsers`/`allAuthenticatedUsers` bindings | ✅ Healthy, no action needed |
| Secrets handling | `.env` (project/bucket/SA identifiers) is gitignored; no long-lived key files or credentials baked into the image or generated config | ✅ Healthy, no action needed |
| Supply chain | `Dockerfile` pins `alpine:3.19` and verifies the PocketBase binary via SHA256 checksum (good), but deploys reference the mutable `:latest` tag and push to legacy GCR (deprecated in favor of Artifact Registry) | ⚠️ Hardening opportunity, not urgent |
| PocketBase version | Pinned at 0.29.1; confirmed vulnerable to **CVE-2026-82410** (High, CVSS 8.7) — see item 5 below | 🔴 Confirmed applicable, no in-branch fix available |

### 4. Consumer/ownership gap
- `apps/design-system-manager/src` (the app expected to consume this API, per its `.env`) contains **no actual application source code** — only an empty `assets/` folder. There is no in-repo way to confirm what legitimately calls this API today.
- Confirmed with the project owner (2026-09-10): this database is currently **proof-of-concept stage** with **no production apps depending on it today**. Given that, the public invoker binding was removed (see Actions Taken) — there is no current legitimate consumer that would break.

### 4a. Recommended access policy for future consumers
Since nothing production-facing depends on this yet, the right time to design access control is now, before real consumers exist:

| Future consumer | Recommended auth model | Rationale |
|---|---|---|
| **MCP server** / any server-to-server client | Cloud Run **authenticated invoker** (IAM) — grant the MCP server's own service account `roles/run.invoker`; it calls PocketBase using a Google-signed ID token | Server-to-server calls can easily attach an ID token; no need to ever make PocketBase itself public. |
| **Internal dashboard** (HPE employees only) | Put **Identity-Aware Proxy (IAP)** in front of Cloud Run, restricted to the HPE Google Workspace domain/group; keep Cloud Run on authenticated-invoker | IAP handles the browser OAuth redirect for human users without exposing PocketBase's own login to the public internet. |
| **Public-facing dashboard** (e.g. a public adoption-metrics page) | Do **not** expose PocketBase directly. Build a narrow, purpose-built read endpoint (small Cloud Function/Cloud Run proxy) that serves only the specific non-sensitive aggregated fields, authenticating to PocketBase on the backend | A public browser SPA can't easily attach a GCP ID token, and the whole database shouldn't be reachable just to show a few public metrics. |
| **Admin UI** (`/_/`) | Same as internal dashboard — IAP restricted to specific HPE identities, or `gcloud run services proxy` for a small POC team in the interim | The admin UI should never rely solely on PocketBase's own login as the only gate for a public-facing service. |

### 5. Operational note
- `gsutil` and `gcloud storage` client commands hang indefinitely on the current network (not a TLS/certificate issue — verified the cert chain is genuine Google). Direct calls to the underlying JSON REST APIs via `curl` with a bearer token worked reliably as a workaround for all Cloud Storage / IAM / Logging checks in this evaluation.

## Actions Already Taken

1. Added a bucket-scoped `roles/storage.objectAdmin` binding for `pocketbase-service-account` directly on `gs://ds-pocketbase`.
2. Removed the over-broad project-level `roles/storage.objectAdmin` grant for that same service account (kept project-level `roles/logging.logWriter`, which has no bucket-scoped equivalent).
3. Removed leftover project-level storage grants from the disabled, unused `pocketbase-app@...` service account.
4. Verified `/api/health` returned `200` after each change above — no regression.
5. Attempted to delete the stale failed revision `pocketbase-app-00029-kvv` for cosmetic cleanup; blocked by Cloud Run (`FAILED_PRECONDITION: latest created Revision cannot be directly deleted`). It will clear automatically the next time a successful deploy is made.
6. **(2026-09-10)** Confirmed no production consumers depend on public access. Removed the `allUsers` binding on `roles/run.invoker` for the Cloud Run service and granted `roles/run.invoker` to `matthew.glissmann@hpe.com` instead. Verified (after IAM propagation, ~90s): unauthenticated requests now get `403 Forbidden`; requests with a valid identity token (`gcloud auth print-identity-token`) still get `200 OK`. To reach the admin UI (`/_/`) interactively now, use `gcloud run services proxy pocketbase-app --region=us-central1` for an authenticated local tunnel rather than navigating to the public URL directly.
7. **(2026-09-10)** Discovered a second Cloud Run service, `pocketbase-service`, coexisting with `pocketbase-app`. Confirmed it was a dead leftover: created a week before `pocketbase-app` (2025-07-28), running as the default compute service account (not the dedicated `pocketbase-service-account`), zero HTTP request log entries in its entire history, no active traffic allocation, and its most recent revisions were also broken by the same bad multi-arch image. It mounted the **same** `ds-pocketbase` bucket as `pocketbase-app`, which was a latent SQLite data-corruption risk if it were ever accidentally redeployed successfully alongside the live service. Deleted it; verified `pocketbase-app` remained healthy afterward.
8. **(2026-09-10)** Found two auxiliary storage buckets alongside `ds-pocketbase`: `hpe-design-system-adoption_cloudbuild` (Cloud Build's auto-created staging bucket) and `run-sources-hpe-design-system-adoption-us-central1` (Cloud Run's auto-created source-deploy staging bucket). Confirmed both contained only stale build artifacts from initial setup (2025-07-28 and 2025-08-04 respectively, zero activity since); Cloud Build history showed only 4 builds ever run in this project, all that same initial day. Neither is used by the current `deploy.sh` workflow (which uses `docker build`/`docker push` directly, not Cloud Build or source-based deploys). Emptied and deleted both buckets; confirmed `ds-pocketbase` and `pocketbase-app` were unaffected. GCP will auto-recreate these staging buckets if `gcloud builds submit` or `gcloud run deploy --source` is ever used again.

## Recommended Next Steps (Prioritized)

**P0 — Decisions needed from a human with business/access context**
1. ✅ **DONE (2026-09-10)**: Confirmed no production consumers exist (POC stage). Restricted the Cloud Run invoker from `allUsers` to the project owner's account. See `4a` above for the recommended access model per future consumer type (MCP server → IAM/service account; dashboard/admin UI → Identity-Aware Proxy). Follow-up: set up IAP once a real dashboard or admin UI is built, so the whole team doesn't have to rely on `gcloud run services proxy` individually.
2. ✅ **RESOLVED (2026-09-10)**: Checked PocketBase's superuser auth configuration via the (public, no-credentials-needed) `/api/collections/_superusers/auth-methods` endpoint through an authenticated `gcloud run services proxy` tunnel — email/password auth is enabled and correctly configured, no OAuth2/MFA, nothing misconfigured. The `401`/`403` responses seen earlier were PocketBase's expected behavior for unauthenticated requests, not an error. Confirmed by the project owner: admin login now succeeds via `gcloud run services proxy pocketbase-app --region=us-central1` → `http://127.0.0.1:8080/_/`. The original failures were indeed just an expired browser session against the (now-removed) public URL, not a broken account or config — no further action needed.
3. ✅ **DECIDED (2026-09-10)**: Keeping `minScale=0` (scale-to-zero) for now. Rationale: this is still POC stage where cost matters more than eliminating occasional cold-start errors; the cold-start errors haven't recurred in over a week (last seen 2026-08-31); and the setting is trivially reversible (`gcloud run services update pocketbase-app --region=us-central1 --min-instances=1`) if cold starts become a real problem once actual consumers (MCP server, dashboard) start hitting the service regularly.

**P1 — Low-risk cleanup (can be done anytime)**
4. ✅ **DONE (2026-09-10)** — see P2 item 10 below; resolved as part of the version-bump redeploy.
5. ✅ **DONE (2026-09-10)**: Checked PocketBase's GitHub Security Advisories against the pinned version (0.29.1). **Confirmed applicable**: [CVE-2026-82410](https://github.com/pocketbase/pocketbase/security/advisories/GHSA-84vh-m24q-wjjx) — "Unhandled panic in worker goroutines", **High severity (CVSS 8.7)**, network-exploitable, no authentication or user interaction required, causes the PocketBase process to crash (availability impact). Affected versions: `< v0.22.48` and `< v0.39.7`. Our `v0.29.1` falls in the gap between those two fixed branches — **the fix was only backported to the 0.22.x line, so there is no patched release available in our version's branch; the only remediation is upgrading to `v0.39.7` or later** (current latest: `v0.40.3`). Two other moderate-severity advisories (OAuth2 account-linking issues) do not apply since OAuth2 is disabled on this instance. Remediated — see P2 item 10.

**P2 — Recommended soon, given the confirmed CVE (bundle these together into one redeploy)**
6. Bump the PocketBase binary from `v0.29.1` to `v0.39.7`+ (ideally current latest `v0.40.3`) in the [Dockerfile](apps/pocketbase_app/Dockerfile) to remediate CVE-2026-82410. Test locally first (`./pocketbase serve` against a copy of the data) given PocketBase's own release notes note potential breaking changes between major internal versions (e.g. `encoding/json/v2` migration in v0.40.0) — do not push an update to production without a local smoke test.
7. Any redeploy **must** use `docker build --platform linux/amd64 ...` (the last real attempt didn't, which is what produced the broken revision `pocketbase-app-00029-kvv`, which will also finally clear once this succeeds — see P1 item 4). Confirm this is called out clearly in `deploy.sh` and `DEPLOYMENT.md` before anyone runs it again.
8. Consider migrating from the deprecated GCR (`gcr.io/...`) to Artifact Registry, and pinning deployed images by digest instead of the mutable `:latest` tag, while already touching the build/deploy pipeline for the above.
9. This redeploy should **not** be done casually given the track record here (the last two attempts both failed) — recommend scheduling it deliberately with a rollback plan (keep the current working revision `pocketbase-app-00028-5pc` as fallback; Cloud Run keeps prior revisions available for manual traffic rollback) rather than doing it reactively.
10. ✅ **DONE (2026-09-10)**: Completed the redeploy with the project owner walking through it live. Root cause of the original broken build confirmed: `docker buildx` attaches provenance/SBOM attestation manifests by default, which produces an OCI image index that Cloud Run rejects even for a single-platform build — the missing `--platform linux/amd64` flag alone wasn't the whole story. Process followed:
    1. Built a local test image (`--platform linux/amd64`, PocketBase v0.40.3) and smoke-tested it against a **downloaded read-only copy** of the real production database (never touched the live bucket) — confirmed clean startup, no panics/errors, and identical auth configuration to production.
    2. Built and pushed the production image with `docker buildx build --platform linux/amd64 --provenance=false --sbom=false --build-arg PB_VERSION=0.40.3`, tagged both `:0.40.3` and `:latest`. Confirmed the push produced a single manifest (no attestation/image-index this time).
    3. Updated [Dockerfile](apps/pocketbase_app/Dockerfile) version metadata/default `PB_VERSION` to `0.40.3`, and pinned [cloud-run-service.yaml](apps/pocketbase_app/cloud-run-service.yaml) to the exact image digest instead of the mutable `:latest` tag.
    4. Deployed via `gcloud run services replace cloud-run-service.yaml --region=us-central1`. New revision `pocketbase-app-00030-nj4` came up `Ready: True` / `ConfigurationsReady: True` / `RoutesReady: True` with 100% traffic.
    5. Verified: `/api/health` → `200`, auth-methods config identical to before, and the previously-broken revision `pocketbase-app-00029-kvv` is now marked `Retired` (superseded) rather than `RevisionFailed` — the service's overall status conditions are now all clean (`True`), no more alarming red state.
    6. Confirmed the Cloud Run invoker IAM policy (restricted to the project owner) was **not** reset by `services replace` — IAM bindings are a separate resource from the service manifest.
    - This closes out P1 item 4 (stale revision) and the P2 redeploy/version-bump work together, and remediates CVE-2026-82410.

**P3 — Modernization (deferred, out of scope for this evaluation)**
10. Add CI/CD (e.g., GitHub Actions) for deploys instead of the current fully-manual `deploy.sh` process.
11. Add real schema migrations under `pb_migrations/` instead of relying solely on live database state.
12. Move sensitive configuration from local `.env` files to a secret manager.
13. Restore/rebuild `apps/design-system-manager` (currently has no source) if it's still meant to be the consumer of this backend, or formally decommission this PocketBase instance if it no longer has a purpose.

## Verification Performed

- `curl https://pocketbase-app-1084464911051.us-central1.run.app/api/health` → `200 OK`, both before and after all IAM changes.
- Bucket contents listed via the Cloud Storage JSON API confirm live, recently-updated data (today's date).
- Project IAM policy confirmed `pocketbase-service-account` no longer holds project-level `storage.objectAdmin`, and the disabled `pocketbase-app@...` account no longer holds any storage roles.
- Bucket IAM policy confirmed the new bucket-scoped `storage.objectAdmin` binding is in place for `pocketbase-service-account`.
