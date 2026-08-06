# Figma Token Export Architecture

This document captures the export architecture centered on
`tokenFilesFromLocalVariables` in [src/token_export.ts](../src/token_export.ts),
including downstream normalization, import relationship context, and build
diagnostics integration.

## Current Scope

- Function: `tokenFilesFromLocalVariables`
- Called by: `src/scripts/sync_figma_to_tokens.ts` (runtime sync), `src/scripts/update-semantic-color-parity-fixtures.ts` (fixture generation), and related tests
- File: [src/token_export.ts](../src/token_export.ts)
- Focus: end-to-end context, branch-level control flow, and diagnostics surfaces

## End-to-End Export Transaction Sequence

This section captures the runtime export flow from Figma local variables to
written token files.

### Runtime caller path

1. `src/scripts/sync_figma_to_tokens.ts` requests local variables per stage.
2. `tokenFilesFromLocalVariables` transforms variables into token file objects.
3. Stage output files are sorted and written to disk by stage directory.

### Non-runtime caller path

1. `src/scripts/update-semantic-color-parity-fixtures.ts` invokes export
   logic for golden fixture generation.
2. Export-focused tests validate shape and behavior (including parity).

```mermaid
sequenceDiagram
    autonumber
    participant Sync as sync_figma_to_tokens.ts
    participant API as figma api getLocalVariables
    participant Export as token_export.ts
    participant FS as filesystem

    loop each stage file tier
        Sync->>API: getLocalVariables(fileKey)
        API-->>Sync: localVariablesResponse
        Sync->>Export: tokenFilesFromLocalVariables(response)
        Export-->>Sync: tokenFiles map by collection.mode
        loop each generated file
            Sync->>FS: write sorted JSON file
        end
    end
```

## Sequence Diagram: Export, Normalization, and Build

```mermaid
sequenceDiagram
    autonumber
    participant Sync as sync_figma_to_tokens.ts
    participant Export as token_export.ts
    participant FigmaAdapter as semantic_color_figma_adapter.ts
    participant Norm as semantic_color_normalization.ts
    participant Tokens as token files semantic
    participant Build as build-style-dictionary.js
    participant Parser as semantic_color_parser.ts
    participant Dist as dist docs outputs

    Sync->>Export: tokenFilesFromLocalVariables(localVariablesResponse)
    loop each local variable and mode
        Export->>Export: tokenValueFromVariable(variable, modeId, localVariables)
        alt variable is color
            Export->>FigmaAdapter: normalizeColorVariableNameFromFigma(variable.name)
            FigmaAdapter->>Norm: normalizeColorVariableNameFromFigmaCore(name)
            Norm-->>FigmaAdapter: canonical token path with DEFAULT and REST
            FigmaAdapter-->>Export: adjusted color token path
        else variable alias points to color variable
            Export->>FigmaAdapter: normalizeColorVariableNameFromFigma(aliasedName)
            FigmaAdapter->>Norm: normalizeColorVariableNameFromFigmaCore(aliasedName)
            Norm-->>FigmaAdapter: canonical alias path
            FigmaAdapter-->>Export: normalized alias path for token reference
        end
        Export->>Export: assign token into nested tokenFiles structure
    end
    Export-->>Sync: tokenFiles map by collection.mode filename

    Sync->>Tokens: write semantic and other token JSON files

    Build->>Tokens: read token JSON sources by mode and theme
    Build->>Parser: parseSemanticColorTokenMetadataFromTokenTree(parsedTokens)
    Parser->>Norm: canonicalTokenPathSegments and normalizeRoleSegments
    Norm-->>Parser: normalized semantic segments
    Parser-->>Build: metadataMap, errors, exceptions

    Build->>FigmaAdapter: tokenAliasToFigmaAlias(canonicalColorAlias)
    FigmaAdapter->>Norm: tokenAliasToFigmaAliasCore(alias)
    Norm-->>FigmaAdapter: figma variable style alias
    FigmaAdapter-->>Build: alias for diagnostics report entries

    Build->>Dist: write semanticColorMetadata.mode.js
    Build->>Dist: write semanticColorMetadata.report.mode.json
    Build->>Dist: write platform outputs esm, cjs, css, grommet, docs
```

## Control Flow Diagram

```mermaid
flowchart TD
    A[Start tokenFilesFromLocalVariables] --> B[Init tokenFiles map]
    B --> C[Read collections and variables from response]
    C --> D[Init shadows by mode]
    D --> E[Loop variables]

    E --> F{variable.remote?}
    F -- Yes --> E
    F -- No --> G[Resolve collection by variableCollectionId]
    G --> H[Loop collection modes]

    H --> I[Build filename collection.mode.json]
    I --> J{Token file entry exists}
    J -- No --> K[Create empty object]
    J -- Yes --> L[Use existing file object]
    K --> M[Set obj pointer]
    L --> M

    M --> N{Name pattern check}
    N -- outline slash --> Np[Run outline subprocess]
    N -- includes boxShadow --> Op[Run boxShadow subprocess]
    N -- starts with shadow --> Pp[Run shadow subprocess]
    N -- otherwise --> Qp[Run default token subprocess]

    Np --> H
    Op --> H
    Pp --> H
    Qp --> H

    H --> R{More modes?}
    R -- Yes --> I
    R -- No --> S{More variables?}
    S -- Yes --> E
    S -- No --> T[Return tokenFiles]
```

### Subprocess Diagram: outline branch

```mermaid
flowchart TD
    A[Match outline name pattern] --> B[Split variable name path]
    B --> C[Create nested groups from keyPath]
    C --> D[Build border token with one property]
    D --> E{outline object empty?}
    E -- Yes --> F[Assign full border token]
    E -- No --> G[Patch outline value property]
    F --> H[Return to parent loop]
    G --> H
```

### Subprocess Diagram: boxShadow branch

```mermaid
flowchart TD
    A[Match includes boxShadow] --> B[Split name and compute stepIndex]
    B --> C[Create nested groups from keyPath]
    C --> D[Resolve value via tokenValueFromVariable]
    D --> E{Value string contains shadow?}
    E -- Yes --> F[Compress reference to base shadow token]
    E -- No --> G[Keep value]
    F --> H[Build shadow token shape]
    G --> H
    H --> I{boxShadow object empty?}
    I -- Yes --> J{token value is string ref?}
    J -- Yes --> K[Assign token directly]
    J -- No --> L[Create initial value array at stepIndex]
    I -- No --> M{Existing value is array?}
    M -- Yes --> N[Patch array entry property]
    M -- No --> O[No-op and continue]
    K --> P[Return to parent loop]
    L --> P
    N --> P
    O --> P
```

### Subprocess Diagram: shadow branch

```mermaid
flowchart TD
    A[Match starts with shadow] --> B[Parse shadow key and property]
    B --> C{Mode bucket exists?}
    C -- No --> D[Initialize mode bucket]
    C -- Yes --> E[Use existing mode bucket]
    D --> F{Shadow key exists?}
    E --> F
    F -- No --> G[Create shadow token with first layer]
    F -- Yes --> H[Compute layer index and patch property]
    G --> I[Assign shadow bucket into token file object]
    H --> I
    I --> J[Return to parent loop]
```

### Subprocess Diagram: default token branch

```mermaid
flowchart TD
    A[Default branch] --> B{variable name starts with color?}
    B -- Yes --> C[Normalize color name from Figma]
    B -- No --> D[Use original variable name]
    C --> E[Create nested groups by adjusted path]
    D --> E
    E --> F[Build generic token type value description extensions]
    F --> G[Assign token]
    G --> H[Return to parent loop]
```

### Notes on Data Mutation

- tokenFiles is written incrementally by fileName and nested key path.
- shadows is a temporary mode-scoped accumulator used by the shadow branch.
- tokenValueFromVariable performs alias handling and color normalization for aliased color values.

## Semantic Color Normalization and Parsing Contract

Export-side color naming is normalized through the semantic color adapter and
shared normalization core, then consumed later by semantic color parsing in
build metadata generation.

### Contract highlights

1. Export normalizes Figma color names to canonical token path shape.
2. Alias values targeting color variables are normalized before reference
   string generation.
3. Build metadata parsing consumes normalized canonical paths and emits
   metadata plus exception/error diagnostics.

```mermaid
flowchart TD
    A[Figma color variable name] --> B[normalizeColorVariableNameFromFigma]
    B --> C[normalizeColorVariableNameFromFigmaCore]
    C --> D[Canonical color token path]
    D --> E[Written in tokenFiles output]
    E --> F[build-style-dictionary reads token JSON]
    F --> G[parseSemanticColorTokenMetadataFromTokenTree]
    G --> H[semantic metadata plus errors and exceptions]
```

## Relationship to Import Flow and Alias Resolution

Export and import are complementary but not identical. Export focuses on
transforming local Figma variables into token files, while import focuses on
flattening token files and generating POST payload mutations for Figma.

### Symmetry and asymmetry

| Concern               | Export flow                                                          | Import flow                                                                         |
| --------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Color naming boundary | normalize Figma names to canonical paths                             | convert canonical aliases back to Figma naming when resolving alias targets         |
| Alias handling        | normalize color alias target names during export value serialization | resolve aliases against existing and planned variables, with lookup/error reporting |
| Output                | tokens grouped by collection/mode files                              | API payload with CREATE/UPDATE/DELETE operations                                    |

```mermaid
flowchart LR
    A[token_export tokenFilesFromLocalVariables] --> B[canonical token files]
    B --> C[token_import flatten and transform]
    C --> D[generatePostVariablesPayload]
    D --> E[alias lookup and resolution]
    E --> F[POST payload for Figma]
```

## Relationship to Build Artifact Generation

After export and token writing, the build pipeline consumes token JSON and
produces runtime artifacts plus semantic metadata documentation artifacts.

### Artifact mapping

| Source                                 | Processor                                     | Output                                                          |
| -------------------------------------- | --------------------------------------------- | --------------------------------------------------------------- |
| `tokens/semantic/color.*.json`         | `build-style-dictionary.js` + semantic parser | `dist/docs/metadata/semanticColorMetadata.*.js`                 |
| `tokens/semantic/color.*.json`         | metadata report writer                        | `dist/docs/metadata/semanticColorMetadata.report.*.json`        |
| primitive/global/component token files | style dictionary platforms                    | `dist/esm`, `dist/cjs`, `dist/css`, `dist/grommet`, `dist/docs` |

### Build linkage notes

1. Build script parses semantic color token trees into metadata.
2. Build script cross-checks canonical token names against Figma alias form for
   report generation.
3. Build emits both runtime token bundles and docs/report artifacts.

## Error Handling and Diagnostics Surfaces

The following table maps key diagnostic surfaces across export, import, and
build.

| Component                   | Error or warning type                             | Surface                                         | Typical remediation                                                |
| --------------------------- | ------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------ |
| `token_export.ts`           | invalid variable value format throw               | sync script runtime failure                     | inspect offending variable shape and source collection data        |
| `token_import.ts`           | alias resolution errors (`ALIAS_NOT_FOUND`, etc.) | payload generation callback and stage reporting | verify alias target exists in lookup or planned payload set        |
| `semantic_color_parser.ts`  | parse errors and semantic exceptions              | metadata export and report JSON                 | normalize token path segments or explicitly handle exceptions      |
| `build-style-dictionary.js` | semantic metadata export failure (`failOnErrors`) | build failure                                   | fix invalid semantic color token names before rebuild              |
| style dictionary platforms  | filtered reference warnings in CSS outputs        | build logs warnings                             | validate intended filter/reference behavior and token dependencies |

### Diagnostics output locations

1. Stage/run status events from sync scripts.
2. Semantic metadata error/exception exports in docs metadata artifacts.
3. Semantic report JSON files under `dist/docs/metadata`.

### Exception taxonomy in metadata reports

The report now uses a generalized `exceptions` bucket instead of a
`noRoleExceptions` bucket:

1. `canonical.exceptions` for parser exceptions generated from canonical token
    trees.
2. `figmaVariables.exceptions` for Figma-normalized path exceptions.

Current exception codes:

1. `NO_ROLE_EXCEPTION`: token has no semantic role and requires explicit
    downstream handling.
2. `NON_CANONICAL_ROLE_EXCEPTION`: token role payload is non-canonical but
    accepted in soft-exception mode for reporting and remediation.
