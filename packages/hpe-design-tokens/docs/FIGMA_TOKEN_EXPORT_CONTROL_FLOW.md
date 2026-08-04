# token_export Control Flow

This document captures control flow for `tokenFilesFromLocalVariables` in [src/token_export.ts](../src/token_export.ts).

## Current Scope

- Function: `tokenFilesFromLocalVariables`
- Called by: `src/scripts/sync_figma_to_tokens.ts` (runtime sync), `src/scripts/update-semantic-color-parity-fixtures.ts` (fixture generation), and related tests
- File: [src/token_export.ts](../src/token_export.ts)
- Focus: branch-level control flow and key data mutations

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

    H --> I[Build fileName: collection.mode.json]
    I --> J{"tokenFiles[fileName] exists?"}
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

### Suggested Expansion Sections

- End-to-end Figma-to-token export transaction sequence.
- Interaction with normalizeColorVariableNameFromFigma and semantic color parsing contracts.
- Relationship to import flow in token_import and alias resolution.
- Relationship to build artifact generation in scripts/build-style-dictionary.
- Error handling and diagnostics surfaces across export/import/build.

## Sequence Diagram: Export, Normalization, and Build

```mermaid
sequenceDiagram
    autonumber
    participant Sync as sync_figma_to_tokens.ts
    participant Export as token_export.ts
    participant FigmaAdapter as semantic_color_figma_adapter.ts
    participant Norm as semantic_color_normalization.ts
    participant Tokens as token files in tokens/semantic
    participant Build as build-style-dictionary.js
    participant Parser as semantic_color_parser.ts
    participant Dist as dist/docs and dist/docs/metadata

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
