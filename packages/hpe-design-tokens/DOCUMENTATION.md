# Figma Sync Data Model Documentation

This document describes the data model and operational flows for the Figma token sync system. For setup, environment variables, and command reference, see [README.md](README.md). For CLI flag semantics and safety contracts, see [contracts/figma-sync-cli-contract.md](contracts/figma-sync-cli-contract.md).

## Entity Relationship Diagram

The diagram below models the core entities the sync system reads and writes. The three Figma files (`primitive`, `semantic`, `component`) each own local variable collections. The `semantic` and `component` files also subscribe to upstream libraries, creating remote variable references whose validity is enforced by preflight.

`CROSS_FILE_ALIAS_LOOKUP` represents the inline alias resolution performed during a push for stages that depend on another file. Because Figma assigns a unique subscription hash per subscriber relationship, the `subscribed_id` values returned by `GET /variables/published` on the dependency file do not directly match the IDs the subscriber file uses. The lookup performs a two-pass remap — extracting the subscriber's actual hash from its existing remote variables, rewriting all published `subscribed_id` values to use that hash, then filtering to IDs already present in the subscriber's local variable list — before building the `canonicalName → variableId` map passed to the POST payload.

```mermaid
erDiagram
    FIGMA_SYNC_CONFIG ||--|| ENVIRONMENT : "targets"
    ENVIRONMENT ||--o{ FIGMA_FILE : "provides file keys"
    ENVIRONMENT ||--o{ EXPECTED_COLLECTION_KEY : "defines canonical keys"

    FIGMA_FILE ||--o{ VARIABLE_COLLECTION : "contains local+remote refs"
    VARIABLE_COLLECTION ||--o{ MODE : "has"
    VARIABLE_COLLECTION ||--o{ VARIABLE : "owns"

    VARIABLE {
      string id
      string name
      boolean remote
      string variableCollectionId
      string subscribed_id "optional; populated on published vars only"
    }

    LOCAL_VARIABLE ||--o{ VARIABLE_MODE_VALUE : "valuesByMode"
    MODE ||--o{ VARIABLE_MODE_VALUE : "selects value"

    VARIABLE_MODE_VALUE {
      string variableId
      string modeId
      string valueType
      string aliasTargetId
    }

    VARIABLE_MODE_VALUE }o--|| TARGET_VARIABLE : "if valueType=VARIABLE_ALIAS"
    TARGET_VARIABLE }o--|| TARGET_COLLECTION : "belongs to"

    EXPECTED_COLLECTION_KEY {
      string collectionName
      string expectedKey
    }

    TARGET_COLLECTION ||--|| COLLECTION_NAME : "named as color/primitives/etc"
    EXPECTED_COLLECTION_KEY ||--|| COLLECTION_NAME : "matched by name"

    TARGET_COLLECTION }o--o{ EXPECTED_COLLECTION_KEY : "key must equal expectedKey"

    CROSS_FILE_ALIAS_LOOKUP }o--|| FIGMA_FILE : "fetches published vars from dep file"
    CROSS_FILE_ALIAS_LOOKUP }o--|| FIGMA_FILE : "reads local vars for hash seed"
    CROSS_FILE_ALIAS_LOOKUP ||--o{ VARIABLE : "maps canonicalName to variableId"

    %% Conceptual specializations
    VARIABLE ||--o| LOCAL_VARIABLE : "remote=false"
    VARIABLE ||--o| TARGET_VARIABLE : "remote=true"
    VARIABLE_COLLECTION ||--o| TARGET_COLLECTION : "remote collection"
```

## Preflight and Sync Flow Diagram

The diagram below shows the complete execution path from config resolution through preflight validation and the three-stage sync.

**Upper half (preflight):** if `--bootstrap` is set, the entire check is skipped and preflight immediately passes — use this only for initial setup of a new environment. Otherwise, `verifyReferences` scans remote collections by name; for any collection whose key doesn't match the expected value, it collects all member variable IDs into an invalid list, then checks whether any local variable's mode values reference those IDs. A mismatch aborts the run with `PREFLIGHT_FAILED`.

**Lower half (stage loop):** runs only after preflight passes. For stages that depend on another file (`semantic` depends on `primitive`; `component` depends on `semantic`), `buildCrossFileAliasLookup` is called before generating the POST payload.

```mermaid
flowchart TD
    A[Resolve environment config] --> B{bootstrap flag set}
    B -- Yes --> T[Preflight passes — proceed with sync stages]
    B -- No --> C[Load expected collection keys by collection name]
    C --> D[Pull local variables from Figma component + semantic files]
    D --> E[For each remote variable collection]
    E --> F{Collection name known\ncolor / dimension / primitives / global}
    F -- No --> E
    F -- Yes --> G{Collection key equals\nexpected key for that name}
    G -- Yes --> E
    G -- No --> H[Add all variables in collection\nto invalid-variables list]
    H --> E
    E -- done --> I[For each local variable mode value]
    I --> J{Mode value references\na variable in invalid list}
    J -- No --> I
    J -- Yes --> K[Log invalid reference error]
    K --> I
    I -- done --> L{Any invalid variables found}
    L -- No --> T
    L -- Yes --> M[verifyReferences throws]
    M --> N[Abort sync with PREFLIGHT_FAILED]

    T --> O[For each stage: primitive → semantic → component]
    O --> P[Fetch getLocalVariables for stage file]
    P --> Q{Stage has dependency file\nsemantic / component}
    Q -- No --> R[Generate POST payload without alias lookup]
    Q -- Yes --> S[buildCrossFileAliasLookup:\n1. Extract subscription hashes from local remote vars\n2. Fetch + remap published vars from dep file\n3. Merge and filter to in-scope IDs]
    S --> R
    R --> U[Apply mutations to Figma file]
    U --> O
```
