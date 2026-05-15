# Figma Sync Data Model Documentation

This document captures the core entity relationships involved in Figma sync, alias rebinding, and preflight validation.

## Entity Relationship Diagram

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

    REMEDIATION_RUN ||--o{ TIER_RESULT : "produces"
    TIER_RESULT ||--o{ PROPOSED_REBIND : "resolvable"
    TIER_RESULT ||--o{ UNRESOLVED_ALIAS : "missing/ambiguous"

    PROPOSED_REBIND {
      string variableId
      string modeId
      string fromAliasId
      string toAliasId
    }

    UNRESOLVED_ALIAS {
      string variableId
      string modeId
      string fromAliasId
      string reason
    }

    PROPOSED_REBIND }o--|| VARIABLE_MODE_VALUE : "updates"
    UNRESOLVED_ALIAS }o--|| VARIABLE_MODE_VALUE : "blocked value"

    %% Conceptual specializations
    VARIABLE ||--o| LOCAL_VARIABLE : "remote=false"
    VARIABLE ||--o| TARGET_VARIABLE : "remote=true"
    VARIABLE_COLLECTION ||--o| TARGET_COLLECTION : "remote collection"
```

## Preflight Failure Flow Diagram

```mermaid
flowchart TD
    A[Resolve environment config] --> B[Load expected collection keys by collection name]
    B --> C[Pull local variables from Figma file]
    C --> D[For each local variable mode value]
    D --> E{Value type is VARIABLE_ALIAS}
    E -- No --> D
    E -- Yes --> F[Resolve alias target variable]
    F --> G[Resolve alias target collection name and key]
    G --> H{Collection name exists in expected keys}
    H -- No --> D
    H -- Yes --> I{Collection key equals expected key for name}
    I -- Yes --> D
    I -- No --> J[Record invalid reference]
    J --> K[Preflight verifyReferences fails]
    K --> L[Abort sync with PREFLIGHT_FAILED]

    M[Alias rebind remediation] --> N[Find canonical candidate by normalized variable name]
    N --> O{Exactly one candidate}
    O -- Yes --> P[Apply variableModeValues update]
    O -- No --> Q[Leave unresolved alias]
    P --> R[Re-run preflight]
    Q --> R
    R --> S{Any invalid references remain}
    S -- Yes --> K
    S -- No --> T[Proceed with sync stages]
```
