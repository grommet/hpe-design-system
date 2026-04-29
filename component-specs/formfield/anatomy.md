# FormField — Anatomy

> Status: v1 draft
> Token naming pattern: see `select/select-tokens-guide.md → Token naming pattern`

---

## What FormField is

FormField is a layout and labelling wrapper. It is not an input itself — it
provides the label, help text, error messaging, and visual container that
surrounds any input control (TextInput, Select, TextArea, CheckBox, etc.).

In Grommet, `<FormField>` wraps any child input and applies consistent
spacing, typography, and state styling across all form controls.

In a Radix implementation, `@radix-ui/react-form` provides the structural
primitives. FormField itself has no interactive behaviour — it is purely
presentational and structural.

---

## Anatomy parts

```
┌─────────────────────────────────────┐
│ Label                    [Required] │  ← Label row
│─────────────────────────────────────│
│ ┌─────────────────────────────────┐ │
│ │ [Input control lives here]      │ │  ← Input container
│ └─────────────────────────────────┘ │
│ Help text or error message          │  ← Message row
└─────────────────────────────────────┘
```

| Part | Description | Always present |
|---|---|---|
| **Root** | Outer wrapper — provides form context and state | Yes |
| **Label** | Text label above the input | Yes |
| **Required indicator** | Asterisk appended to label when field is required | Conditional |
| **Input container** | Styled border box that wraps the child input control | Yes |
| **Child input** | The actual control (Select, TextInput, etc.) — not styled by FormField | Yes |
| **Help text** | Descriptive text below the input — shown at rest | Conditional |
| **Error message** | Validation error below the input — replaces help text | Conditional |
| **Success message** | Positive validation feedback — replaces help text | Conditional |
| **Info message** | Neutral informational message — replaces help text | Conditional |

---

## States

| State | What changes |
|---|---|
| **rest** | Default — no interaction |
| **focus** | Input container border highlighted; focus ring on child input |
| **error** | Input container border becomes error color; error message shown |
| **disabled** | Entire field reduced opacity; cursor blocked |
| **success** | Input container border becomes success color; success message shown |
| **required** | Required indicator shown on label |

> Note: FormField does not apply focus styles directly — it responds to
> focus on the child input via `:focus-within`. The child input manages
> its own focus ring (see Select constraints §1).

---

## Layout behaviour

- FormField is full-width by default (`width: 100%`)
- Label sits above the input container with a fixed margin below
- Help/error/success/info text sits below the input container with a fixed margin above
- The input container height is determined by the child input — FormField never sets height
- Multiple FormFields in a form stack vertically with a consistent gap between them
  (gap is set on the `<Form>` container, not on FormField itself)

---

## Sizes

| Size | Applies to |
|---|---|
| `medium` | Default — used unless overridden |
| `small` | Compact variant — smaller padding and font size |
| `large` | Spacious variant |

Only `medium` is fully specified in v1. Small and large tokens are pending.

---

## What FormField does NOT do

- It does not render the input control — that is always a child
- It does not validate — validation state is passed as a prop
- It does not manage focus — `:focus-within` on the container is sufficient
- It does not provide icons — icon slots are the responsibility of the child input