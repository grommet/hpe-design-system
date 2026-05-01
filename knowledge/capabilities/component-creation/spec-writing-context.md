# Spec Writing Context

This file explains what this project is, why it exists, and what problem
it is solving. Read this before running any prompt in the component-creation
pipeline.

---

## What this is

This is a proof-of-concept AI agent pipeline for writing HPE Design System
component specs. It was created during an innovation sprint to test whether
AI agents can reliably produce accurate, validated component specs that are
consistent with the HPE token system and ready for implementation.

The pipeline produces a complete, multi-document spec for any component —
covering visual tokens, structural anatomy, implementation constraints, public
API props, and platform-specific implementation mappings.

---

## Why it exists

The HPE Design System is built on top of `hpe-design-tokens` — a package
of CSS custom properties that encode every visual design decision. When
building a new component or porting an existing Grommet component to a new
framework (e.g. Radix UI), a developer needs to know:

- What tokens exist and what they are called
- What visual states the component has
- What rules must never be broken regardless of framework
- What the public API should look like
- How to wire the spec to a specific framework's primitives

Without a spec, each developer makes these decisions independently — leading
to inconsistent token usage, missed states, and components that drift from
the HPE visual language.

---

## What we learned from the Select and FormField sprints

This pipeline was built based on real findings from speccing Select and
FormField in Radix UI. The key lessons are encoded throughout the prompts
and conventions:

### Token naming is the single biggest source of errors

The `hpe-design-tokens` package uses camelCase for all multi-word segments
(`--hpe-formField-default-medium-input-container-paddingX`) but the
logical name you might guess would be kebab-case
(`--hpe-form-field-default-medium-input-container-padding-x`).
Every token name in a spec must be verified against the actual built CSS
output — never assumed.

### The focus indicator is always two parts

The HPE focus ring is a two-colour ring achieved by combining `outline`
and `box-shadow`. Both must always be applied together. Applying only the
`outline` produces an incomplete, non-compliant focus indicator.

### Radix cannot always consume CSS variables

Some Radix props (e.g. `sideOffset`) accept only JavaScript numbers —
not CSS variable strings. This is a structural conflict between the
token system and the framework API that must be logged as a gap rather
than silently worked around.

### The spec and the framework are separate concerns

The four agnostic documents (tokens, anatomy, constraints, props) describe
what the component is — independently of any framework. The mapping
documents describe how to build it in a specific framework. Keeping these
separate means the same spec can drive a Radix implementation, a Grommet
implementation, and a Web Component implementation without rewriting
the core spec.

### Gaps are findings, not failures

The gap log is the primary output of the spec process. A gap means the
token system, the spec, or the framework has a missing or incorrect piece.
Gaps should be logged precisely and completely — they are the evidence
base for improving the token package, the spec conventions, and the
framework mappings over time.

---

## The token system

The HPE Design System uses three layers of tokens:

| Layer | Prefix | Purpose |
|---|---|---|
| Primitive | `--hpe-static-*` | Raw values — never used directly in components |
| Semantic | `--hpe-color-*`, `--hpe-shadow-*` etc. | Intent-based values — used for shared properties like focus, text color |
| Component | `--hpe-formField-*`, `--hpe-select-*` etc. | Component-specific values — used for everything specific to one component |

Component specs should prefer component tokens. Fall back to semantic tokens
only when no component token exists. Never use primitive tokens directly.

---

## The reference system

When a component already exists in Grommet, the `grommet-theme-hpe` package
contains the design decisions for that component — what values are used for
each state, what the intended visual output is. This is used as the visual
source of truth when writing a spec.

When a component does not exist in Grommet (e.g. Notification, Toast as a
web component), the spec is derived from the token package and HPE design
principles. More gaps are expected in this case — that is normal.

---

## The intended audience for specs

Specs produced by this pipeline are written for:

- **Developers** implementing the component in a specific framework
- **Designers** validating that the implementation matches the HPE visual language
- **AI agents** running the mapping-writer prompt to produce framework-specific code

Specs must therefore be:
- Precise enough for a developer to implement without asking questions
- Token-referenced so a designer can validate against the source of truth
- Structured consistently so an AI agent can parse them reliably
