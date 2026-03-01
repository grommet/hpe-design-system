# Engineer Skills (PoC)

## Overview
The Engineer agent has two operational modes:
- **Remediation**: Fix issues identified by Auditor (Token Compliance, Component Usage, etc.) in existing codebases
- **Generation**: Create new feature code from text prompts, Figma JSON, or PRD documents

This document covers PoC skills (Grommet-only, Segment A only). MVP will extend to non-Grommet React libraries and add Vue/Angular in later phases.

---

## Remediation Skills

### Skill 1: Token Compliance Fix (Hardcoded Color/Size)

**Trigger:** Auditor reports `Token Compliance` violation for hardcoded color or size value.

**Input:**
```json
{
  "metric": "Token Compliance",
  "finding_type": "hardcoded_color",
  "file": "src/components/Button.tsx",
  "line": 42,
  "context": "color: '#F44336', // red",
  "recommendation": "Use hpe_color_status_critical from hpe-design-tokens"
}
```

**Algorithm:**
1. Load `hpe-design-tokens/{semantic,primitive}/colors.json` from knowledge base
2. Parse hardcoded value (hex #F44336)
3. Find best semantic token match:
   - Exact match: `hpe_color_status_critical` → replace directly
   - Close match (RGB distance < 10): `hpe_color_status_warning` → replace and flag as fuzzy
   - No match: flag as "requires custom token" (skipped in PoC; escalate to System)
4. Generate diff:
   ```diff
   - color: '#F44336',
   + color: token('hpe_color_status_critical'),
   ```
5. If using Grommet, import from `grommet-theme-hpe`:
   ```diff
   - import { grommet as theme } from 'grommet';
   + import { grommet as theme } from 'grommet-theme-hpe';
   ```

**Test cases (PoC):**
- Hardcoded `#FFFFFF` (white) → `hpe_color_ui_background`
- Hardcoded `#333333` (dark gray) → `hpe_color_ui_text_strong`
- Hardcoded `24px` size → `hpe_base_size_base` (or `hpe_base_size_medium`)
- Fuzzy match `#F45335` (close to critical red) → flag as fuzzy, replace, suggest review

**Output:**
```json
{
  "type": "remediation",
  "metric": "Token Compliance",
  "file": "src/components/Button.tsx",
  "diff": "...",
  "confidence": 0.95,
  "requires_review": false
}
```

---

### Skill 2: Component Usage Fix (Invalid Props)

**Trigger:** Auditor reports `Component Usage` violation for invalid Grommet prop or deprecated component.

**Input:**
```json
{
  "metric": "Component Usage",
  "finding_type": "invalid_prop",
  "file": "src/components/Card.tsx",
  "line": 8,
  "context": "<Button color='blue' />",
  "recommendation": "Grommet Button no longer supports 'color' prop; use 'primary' or 'secondary' instead"
}
```

**Algorithm:**
1. Load `prompts/auditor/knowledge/components/grommet-button.yaml` from knowledge base
2. Check props schema: `color` not in supported props
3. Infer replacement:
   - If color='blue' → primary={true}
   - If color='secondary' → secondary={true}
   - Else add TODO comment and flag for manual review
4. Generate diff:
   ```diff
   - <Button color='blue' />
   + <Button primary />
   ```

**Test cases (PoC):**
- Deprecated prop `colorIndex` → use `color` instead
- Invalid prop `color='blue'` → infer `primary={true}`
- Missing required prop `icon` (if Button has icon variant) → add TODO and flag for review

**Output:**
```json
{
  "type": "remediation",
  "metric": "Component Usage",
  "file": "src/components/Card.tsx",
  "diff": "...",
  "confidence": 0.80,
  "requires_review": false,
  "manual_review_needed": [
    { "reason": "Inferred primary=true; please verify visual intent" }
  ]
}
```

---

### Skill 3: Component Upgrade (Deprecated to Current)

**Trigger:** Auditor reports `Component Usage` violation for deprecated component.

**Input:**
```json
{
  "metric": "Component Usage",
  "finding_type": "deprecated_component",
  "file": "src/components/Layout.tsx",
  "line": 12,
  "context": "<Box fill='horizontal'>",
  "recommendation": "Grommet Box 'fill' prop should use 'responsive' or explicit width; see migration guide"
}
```

**Algorithm:**
1. Load component schema for `Box` from knowledge base
2. Check deprecation status and migration guide
3. If `fill='horizontal'` is deprecated but `width='100%'` is modern:
   ```diff
   - <Box fill='horizontal'>
   + <Box width='100%'>
   ```
4. If migration is complex (e.g., layout system overhaul), flag for manual review

**Test cases (PoC):**
- `fill='horizontal'` → `width='100%'`
- `flex` prop → Map to `flex={true}` or `flex='grow'` based on context

**Output:**
```json
{
  "type": "remediation",
  "metric": "Component Usage",
  "file": "src/components/Layout.tsx",
  "diff": "...",
  "confidence": 0.85,
  "requires_review": true,
  "migration_guide": "https://..."
}
```

---

### Skill 4: Rollback (Undo Applied Diffs)

**Trigger:** User runs `hpe-ds-ai undo` or Engineer post-apply validation detects regression.

**Algorithm:**
1. Load checkpoint from `.hpeds-undo-checkpoint/{file_path}`
2. Restore each file to checkpoint state
3. Return list of restored files
4. Delete checkpoint

**Test cases (PoC):**
- Restore single file from checkpoint
- Restore multiple files
- Handle missing checkpoint gracefully

**Output:**
```json
{
  "type": "rollback",
  "restored_files": ["src/components/Button.tsx", "src/components/Card.tsx"],
  "checkpoint_deleted": true
}
```

---

## Generation Skills

### Skill 1: Text Prompt → React + Grommet Code

**Trigger:** User runs `hpe-ds-ai gen --prompt "Create a login form with Grommet"`

**Input:**
```json
{
  "mode": "generation",
  "input_type": "text_prompt",
  "prompt": "Create a login form using Grommet and hpe-design-tokens",
  "framework": "react",
  "ui_library": "grommet",
  "repo_path": "/path/to/repo"
}
```

**Algorithm:**
1. Parse prompt for intent keywords (login, form, table, dashboard, etc.)
2. Load pattern from `prompts/auditor/knowledge/patterns/` matching intent:
   - "login form" → `login-form.yaml`
   - "data table" → `data-table-with-filtering.yaml`
   - Default fallback: generic "form-with-validation"
3. Load pattern template: `template.tsx` from pattern definition
4. Extract component slots from prompt (if any):
   - "login form with email and password" → {email: true, password: true, remember_me: false}
5. Render template with slots:
   - Replace `{COMPONENT_FIELDS}` with email + password fields
   - Apply hpe-design-tokens for colors, typography, spacing
   - Ensure TypeScript types are valid
6. Generate file(s):
   ```
   /tmp/generated/LoginForm.tsx
   /tmp/generated/LoginForm.stories.tsx (Storybook story)
   ```

**Constraints:**
- Only generate patterns already in knowledge base (login-form, data-table, etc.)
- Do not generate arbitrary UI (e.g., "build a 3D visualization") → reject with helpful error
- Generated code must be TypeScript + React + Grommet
- Must import from `grommet` and `grommet-theme-hpe`

**Test cases (PoC):**
- "Create a login form" → generates LoginForm.tsx with email, password, submit button
- "Create a data table with filtering" → generates DataTable.tsx with 5 columns, filter input, pagination
- "Create a dashboard layout" → generates Dashboard.tsx with sidebar, header, main content area
- "Create a 3D scene" → reject with "Pattern not supported"

**Output:**
```json
{
  "type": "generation",
  "mode": "text_prompt",
  "generated_files": [
    {
      "path": "src/components/LoginForm.tsx",
      "content": "import React from 'react';\nimport { Box, Button, TextInput } from 'grommet';\nimport { hpe_color_status_ok as successColor } from 'hpe-design-tokens';\n...",
      "imports": ["react", "grommet", "grommet-theme-hpe", "hpe-design-tokens"],
      "exports": ["LoginForm"],
      "lines_of_code": 45,
      "has_storybook": true
    }
  ],
  "confidence": 0.90,
  "pattern_used": "login-form",
  "notes": ["Email and password fields included per prompt"]
}
```

---

### Skill 2: Figma JSON → React + Grommet Code

**Trigger:** User runs `hpe-ds-ai gen --figma-json figma-export.json`

**Input:**
```json
{
  "mode": "generation",
  "input_type": "figma_json",
  "figma_export": {...figma JSON...},
  "framework": "react",
  "ui_library": "grommet"
}
```

**Algorithm:**
1. Parse Figma JSON frame hierarchy
2. For each Figma component (Button, TextField, etc.):
   - Map Figma component to Grommet component (e.g., Figma Button → Grommet Button)
   - Extract props (label, size, color, disabled, etc.)
   - Map Figma colors to hpe-design-tokens (semantic match)
   - Map Figma sizes to Grommet sizes (small, medium, large)
3. Generate React component tree
4. Add proper TypeScript types, imports, exports
5. Output single .tsx file or component directory if complex

**Constraints:**
- Only map Figma components to Grommet equivalents (Button → Button, TextField → TextInput, etc.)
- Complex layouts (e.g., custom shapes, complex transforms) → flag as "requires manual review"
- Ensure generated code is valid TypeScript + React

**Test cases (PoC):**
- Single-frame Figma export (login form) → generates LoginForm.tsx
- Multi-frame export (dashboard with multiple sections) → generates Dashboard.tsx + helper components
- Custom shape that doesn't map to Grommet → flag for manual implementation

**Output:**
```json
{
  "type": "generation",
  "mode": "figma_json",
  "generated_files": [...],
  "confidence": 0.85,
  "mapping_notes": [
    "Figma Button 'Primary' → Grommet Button primary={true}",
    "Figma TextField → Grommet TextInput"
  ],
  "manual_review_items": []
}
```

---

### Skill 3: PRD → Architecture + Components

**Trigger:** User runs `hpe-ds-ai gen --prd product-requirements.md`

**Input:**
```json
{
  "mode": "generation",
  "input_type": "prd_path",
  "prd_path": "docs/product-requirements.md",
  "framework": "react",
  "ui_library": "grommet"
}
```

**Algorithm:**
1. Load and parse PRD (Markdown)
2. Extract feature list, user stories, acceptance criteria
3. For each user story, infer component needs:
   - "User can log in" → LoginForm component
   - "User sees list of items" → DataTable component
   - "User can create item" → CreateItemForm component
4. Generate component scaffold directory:
   ```
   src/components/
     ├─ LoginForm.tsx
     ├─ DataTable.tsx
     ├─ CreateItemForm.tsx
     └─ index.ts
   ```
5. Each component is a minimal, functional skeleton with props interface

**Constraints:**
- Generate only component scaffolds (not business logic or API calls)
- Add TODO comments for features that need manual implementation
- Only generate Grommet-based components

**Test cases (PoC):**
- Simple 2-page PRD (login + dashboard) → generates 3-4 components
- Complex multi-page PRD → generates 8+ components, each with TODO for business logic

**Output:**
```json
{
  "type": "generation",
  "mode": "prd",
  "generated_files": [...],
  "component_count": 5,
  "confidence": 0.75,
  "scaffold_notes": [
    "LoginForm: generated with all Grommet components",
    "DataTable: generated scaffold; hook up to API in implementation",
    "..."
  ]
}
```

---

## PoC Constraints

1. **Remediation scope:** Token Compliance and Component Usage only
   - Accessibility, Type Safety, DX metrics → escalated to System (no auto-fix in PoC)
2. **Generation scope:** Pre-defined patterns only (login-form, data-table, dashboard-layout, etc.)
   - No arbitrary code generation
3. **Framework scope:** React + Grommet only (Segment A)
   - Non-Grommet React → escalated to System
4. **File formats:** .tsx (TypeScript React) only
   - .jsx, .vue, .svelte → unsupported in PoC
5. **Complexity:** No nested component generation
   - Single-file or simple directory structure only

---

## Test matrix (PoC exit criteria)

| Skill | Test cases | Pass rate | Confidence threshold |
| --- | --- | --- | --- |
| Token Compliance Fix | 5 (hardcoded colors + sizes) | 5/5 (100%) | ≥90% |
| Component Usage Fix | 5 (invalid props + deprecated components) | 5/5 (100%) | ≥80% |
| Component Upgrade | 3 (deprecated components) | 3/3 (100%) | ≥85% |
| Rollback | 3 (single/multi/missing checkpoint) | 3/3 (100%) | N/A |
| Text Prompt Generation | 3 (login form, data table, dashboard) | 3/3 valid code | ≥90% |
| Figma JSON Generation | 2 (simple + multi-frame) | 2/2 valid code | ≥85% |
| PRD Generation | 2 (simple + complex) | 2/2 valid scaffolds | ≥75% |

---

## Future enhancements (MVP+)

- Pattern-aware remediation (e.g., "upgrade this login pattern to match current best practices")
- Non-Grommet React libraries (Material-UI, Chakra, Bootstrap, etc.)
- Vue and Angular generation skills (Segments E-F)
- Inline documentation generation (JSDoc, Storybook descriptions)
- Test generation (vitest, jest test suites)
