# Capabilities

Task-focused bundles that contain orchestrators, local assets, and machine-readable manifests.

Capabilities remain internal by default. Only a manifest with an explicit
`spec.distribution` asset allowlist is eligible for the knowledge-agent
consumer bundle. The allowlist is narrower than `spec.assets`; validation
requires every distributed agent to be declared in the capability's full
asset inventory and every distributed file to resolve safely within the
capability directory.

- [docs-creation](docs-creation/README.md): create a new component documentation
  page, starting with optional external context and website integration.
- [docs-refactor](docs-refactor/README.md): restructure an existing documentation
  page. Its agents and migration artifacts are separate from docs-creation.
