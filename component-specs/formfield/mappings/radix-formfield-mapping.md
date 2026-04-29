# FormField — Radix UI Mapping

> Maps the platform-agnostic FormField spec to Radix UI's Form primitive.
> Read alongside: `../anatomy.md`, `../tokens.md`, `../constraints.md`
>
> Radix package: `@radix-ui/react-form`
> Radix docs: https://www.radix-ui.com/primitives/docs/components/form
> Token setup: see `component-specs/tokens-usage.md`
> Status: v3 — GAP-006, GAP-007, GAP-008, GAP-011 corrected

---

## Changelog

| Version | Change |
|---|---|
| v1 | Initial mapping |
| v3 | GAP-006: Focus border-color rules removed — focus ring only |
| v3 | GAP-007: `min-height` added to input container CSS |
| v3 | GAP-008: `font-size` and `line-height` noted as child input responsibility |
| v3 | GAP-011: Label margin workaround documented — token missing from package |

---

## How Radix implements FormField

`@radix-ui/react-form` provides accessible form primitives that handle
validation messaging and ARIA association automatically.

Key behaviour provided by Radix Form at no cost:
- `<Form.Message>` automatically associated with `<Form.Control>` via `aria-describedby`
- `<Form.Field>` links Label and Control
- Built-in validation states via `[data-invalid]` and `[data-valid]`
- `required` propagated to the underlying control

### Anatomy part → Radix part mapping

| Anatomy part | Radix component | Notes |
|---|---|---|
| Root | `<Form.Root>` | Wraps the entire form |
| Field | `<Form.Field>` | Wraps one label + input + message group |
| Label | `<Form.Label>` | Associated with control automatically |
| Required indicator | Span inside `<Form.Label>` | `aria-hidden="true"` on the `*` span |
| Input container | `<div className="hpe-form-field__input-container">` | No Radix part — styled wrapper |
| Child input | `<Form.Control asChild>` | Passes Radix context to child |
| Help text | `<Form.Description>` | Always present when provided |
| Error message | `<Form.Message>` | Shown when validation fails |
| Success / Info message | Conditional `<p>` or `<Form.Description>` | Radix has no built-in success/info state — see GAP-005 |

---

## State → data-attribute mapping

| Anatomy state | Radix data-attribute | Applies to |
|---|---|---|
| invalid / error | `[data-invalid]` | `Form.Field`, `Form.Label`, `Form.Control`, `Form.Message` |
| valid | `[data-valid]` | `Form.Field`, `Form.Label`, `Form.Control` |
| focus | `:focus-within` | `.hpe-form-field__input-container` |
| disabled | `[data-disabled]` (manual) | `Form.Field` — see GAP-004 |

---

## Component structure

```jsx
import * as Form from '@radix-ui/react-form';
import './form-field.css';

export const HPEFormField = ({
  name,
  label,
  help,
  error,
  success,
  info,
  required,
  disabled,
  children,
}) => (
  <Form.Field
    name={name}
    className="hpe-form-field"
    data-disabled={disabled || undefined}
  >

    {/* Label row */}
    <Form.Label className="hpe-form-field__label">
      {label}
      {required && (
        <span className="hpe-form-field__required" aria-hidden="true">
          {' *'}
        </span>
      )}
    </Form.Label>

    {/* Input container */}
    <div className="hpe-form-field__input-container">
      <Form.Control asChild>
        {children}
      </Form.Control>
    </div>

    {/* Message row — mutually exclusive, priority order — see constraints §2 */}
    {error && (
      <Form.Message className="hpe-form-field__message hpe-form-field__message--error">
        {error}
      </Form.Message>
    )}
    {!error && success && (
      <p className="hpe-form-field__message hpe-form-field__message--success">
        {success}
      </p>
    )}
    {!error && !success && info && (
      <Form.Description className="hpe-form-field__message hpe-form-field__message--info">
        {info}
      </Form.Description>
    )}
    {!error && !success && !info && help && (
      <Form.Description className="hpe-form-field__message hpe-form-field__message--help">
        {help}
      </Form.Description>
    )}

  </Form.Field>
);
```

---

## CSS

```css
/* ===========================================
   HPE FormField v3 — Radix UI
   Tokens from hpe-design-tokens
   See: component-specs/formfield/tokens.md v3
   =========================================== */

/* -------------------------------------------
   1. Field root
   ------------------------------------------- */

.hpe-form-field {
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;

  /* GAP-011: --hpe-formField-default-medium-label-marginBottom missing
     from package. Using gap on the field root as workaround.
     Remove and replace with label margin-bottom when token lands. */
  gap: 4px;
}

.hpe-form-field[data-disabled] {
  opacity: 0.3;
  pointer-events: none;
  cursor: default;
}


/* -------------------------------------------
   2. Label
   ------------------------------------------- */

.hpe-form-field__label {
  display: flex;
  align-items: baseline;

  font-size: var(--hpe-formField-default-label-fontSize);
  font-weight: var(--hpe-formField-default-label-fontWeight);
  color: var(--hpe-formField-default-label-rest-color);

  /* GAP-011: margin-bottom token missing — spacing handled by gap on root */
}


/* -------------------------------------------
   3. Required indicator
   ------------------------------------------- */

.hpe-form-field__required {
  color: var(--hpe-formField-default-requiredIndicator-color);
  margin-left: var(--hpe-formField-default-medium-requiredIndicator-marginLeft);
}


/* -------------------------------------------
   4. Input container
   ------------------------------------------- */

.hpe-form-field__input-container {
  display: flex;
  align-items: stretch;
  width: 100%;
  box-sizing: border-box;

  /* GAP-007: min-height now applied */
  min-height: var(--hpe-formField-default-medium-input-container-minHeight);

  border-width: var(--hpe-formField-default-medium-input-container-borderWidth);
  border-style: solid;
  border-color: var(--hpe-formField-default-input-container-rest-borderColor);
  border-radius: var(--hpe-formField-default-medium-input-container-borderRadius);
  background: var(--hpe-formField-default-input-container-rest-background);

  /* DO NOT set height — see constraints §7 */
  /* DO NOT set padding — that is the child input's responsibility */
}

/* Focus — border-color intentionally NOT changed on focus
   GAP-006: focus border-color token missing from package
   Focus is communicated by the child input's focus ring only */
.hpe-form-field__input-container:focus-within {
  /* No border-color change — see constraints §1 and GAP-006 */
}

/* Error state */
.hpe-form-field[data-invalid] .hpe-form-field__input-container {
  border-color: var(--hpe-formField-default-input-container-error-rest-borderColor);
}

/* Success state */
.hpe-form-field[data-valid] .hpe-form-field__input-container {
  border-color: var(--hpe-formField-default-input-container-success-rest-borderColor);
}

/* Disabled — inherited via opacity on root — no separate rule needed */


/* -------------------------------------------
   5. Message row
   All variants share the same base styles — see constraints §2
   ------------------------------------------- */

.hpe-form-field__message {
  font-size: var(--hpe-formField-default-help-fontSize);
  margin-top: var(--hpe-formField-default-medium-help-marginTop);
  margin-bottom: 0;
}

.hpe-form-field__message--help {
  color: var(--hpe-formField-default-help-rest-color);
}

.hpe-form-field__message--error {
  color: var(--hpe-formField-default-error-rest-color);
}

.hpe-form-field__message--success {
  color: var(--hpe-formField-default-success-rest-color);
}

.hpe-form-field__message--info {
  color: var(--hpe-formField-default-info-rest-color);
}
```

---

## Radix-specific implementation notes

| Topic | Note |
|---|---|
| **`Form.Control asChild`** | Use `asChild` to avoid wrapping child inputs in an extra DOM node |
| **`data-invalid`** | Radix sets this on Field, Label, Control, and Message automatically |
| **`data-valid`** | Only set after field has been interacted with — see GAP-005 |
| **`aria-describedby`** | Radix wires this automatically — never add manually |
| **Disabled** | Pass `data-disabled={disabled || undefined}` manually — see GAP-004 |
| **Focus border** | Intentionally absent — GAP-006 confirmed token missing; focus ring on child input is sufficient |
| **Label gap** | Using `gap` on field root as workaround for GAP-011 — replace when token lands |

---

## Gaps between Radix Form and HPE spec

| Gap | Detail | Recommendation |
|---|---|---|
| No `data-disabled` on Field | Radix does not set this automatically | Pass manually — see GAP-004 |
| No success / info state | Radix only tracks invalid/valid | Conditional JSX rendering — see GAP-005 |
| `data-valid` timing | Only set after field interaction | Don't rely on it for initial success styling |
| Focus border token missing | `--hpe-formField-default-input-container-focus-borderColor` doesn't exist | Use focus ring only — see GAP-006 |
| Label margin token missing | `--hpe-formField-default-medium-label-marginBottom` doesn't exist | Use `gap` on field root — see GAP-011 |