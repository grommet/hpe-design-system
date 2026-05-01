# Component Creation Prompts

Run these prompts in order. Each is self-contained — open a new
Copilot chat for each step.

---

## Pipeline overview

```
Step 1 — spec-writer.prompt.md
  Writes: tokens.md, anatomy.md, constraints.md, gaps.md (created empty)
  Platform agnostic — no framework assumptions
  Input:  {{COMPONENT_NAME}}, {{REFERENCE_COMPONENT}},
          {{REFERENCE_THEME}}, {{REFERENCE_PACKAGE}}

Step 2 — props-writer.prompt.md
  Writes: props.md
  Logs to: component-specs/{{COMPONENT_NAME}}/gaps.md
  Platform agnostic — defines the ideal public API contract
  Input:  {{COMPONENT_NAME}}

Step 3 — spec-reviewer.prompt.md
  Reads:  tokens.md, anatomy.md, constraints.md, props.md, gaps.md
  Output: Appends findings to component-specs/{{COMPONENT_NAME}}/gaps.md
  When:   After Steps 1 and 2 are complete

Step 4 — mapping-writer.prompt.md
  Writes: mappings/{{platform}}.md
  Logs to: component-specs/{{COMPONENT_NAME}}/gaps.md
  Platform specific — one run per target platform
  Input:  {{COMPONENT_NAME}}, {{PLATFORM}}, {{PLATFORM_PRIMITIVE}}
  When:   After Step 3 gaps are resolved

Step 5 — mapping-reviewer.prompt.md
  Reads:  mappings/{{platform}}.md + all agnostic docs + gaps.md
  Output: Appends findings to component-specs/{{COMPONENT_NAME}}/gaps.md
  When:   After Step 4 is complete
```

---

## File structure produced by this pipeline

```
knowledge/capabilities/component-creation/component-specs/
└── {{component-name}}/
    ├── tokens.md           ← platform agnostic
    ├── anatomy.md          ← platform agnostic
    ├── constraints.md      ← platform agnostic
    ├── props.md            ← platform agnostic
    ├── gaps.md             ← all gaps for this component, all steps
    └── mappings/
        ├── radix.md        ← Radix-specific
        ├── grommet.md      ← Grommet-specific (future)
        └── webcomponent.md ← Web component-specific (future)
```

---

## Shared knowledge structure

```
knowledge/
├── core/
│   └── token-conventions.md     ← camelCase rules, layer symbols, focus
│                                   indicator pattern. Shared across ALL
│                                   capabilities — not specific to spec writing.
└── capabilities/
    └── component-creation/
        ├── spec-writing-instructions.md  ← how to write specs
        ├── spec-writing-context.md       ← why this project exists
        ├── prompts/
        └── component-specs/
```

---

## Why gaps.md is per component

Gaps discovered when speccing Select are irrelevant when working on
Notification. Keeping gaps scoped to a component means:

- Gaps are findable — `select/gaps.md` not a global file of hundreds of entries
- Gaps are actionable — every entry is specific to one component
- Gaps accumulate across steps — spec-writer, props-writer, spec-reviewer,
  mapping-writer, and mapping-reviewer all append to the same file
- Gaps can be resolved and closed without affecting other components

---

## Variables reference

| Variable | Description | Example |
|---|---|---|
| `{{COMPONENT_NAME}}` | Component folder name, lowercase | `notification` |
| `{{REFERENCE_COMPONENT}}` | Existing reference component to study | `Select` |
| `{{REFERENCE_THEME}}` | Theme package with design decisions | `grommet-theme-hpe` |
| `{{REFERENCE_PACKAGE}}` | UI library the reference component lives in | `grommet` |
| `{{PLATFORM}}` | Target platform for mapping, lowercase | `radix` |
| `{{PLATFORM_PRIMITIVE}}` | The specific primitive used | `@radix-ui/react-toast` |

---

## When {{REFERENCE_COMPONENT}} is `none`

Set `{{REFERENCE_COMPONENT}}` to `none` when the component does not exist
in any reference library — for example a brand new component like
Notification or Toast that has no Grommet equivalent.

When `none` is set, the spec-writer skips the reference source reading
steps and derives the spec from `hpe-design-tokens` and HPE design
principles in `spec-writing-context.md`. More gaps are expected — that
is normal and correct.

Even when `{{REFERENCE_COMPONENT}}` is `none`, always provide
`{{REFERENCE_THEME}}` — the token values in `grommet-theme-hpe` are
still useful context for colour, spacing, and typographic decisions.

---

## Reference component examples

| Component being specced | `{{REFERENCE_COMPONENT}}` | `{{REFERENCE_THEME}}` | `{{REFERENCE_PACKAGE}}` |
|---|---|---|---|
| Select | `Select` | `grommet-theme-hpe` | `grommet` |
| FormField | `FormField` | `grommet-theme-hpe` | `grommet` |
| TextInput | `TextInput` | `grommet-theme-hpe` | `grommet` |
| Notification | `none` | `grommet-theme-hpe` | `grommet` |
| Toast | `none` | `grommet-theme-hpe` | `grommet` |

---

## Prerequisites

Before running any prompt, confirm these exist:
- `knowledge/core/token-conventions.md`
- `knowledge/capabilities/component-creation/spec-writing-instructions.md`
- `knowledge/capabilities/component-creation/spec-writing-context.md`
- `hpe-design-tokens` installed in the project
- `grommet` and `grommet-theme-hpe` installed (if using a reference component)

---

## Key principle

**Steps 1–3 are platform agnostic.**
They describe what the component is, what it looks like, and what rules
it must follow — independently of any framework.

**Steps 4–5 are platform specific.**
They describe how to build the component in a given framework.

The same four agnostic documents can drive mappings for Radix, Grommet,
Web Components, or any future framework — without rewriting the spec.
