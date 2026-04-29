# FormField — Radix UI Mapping

> Maps the platform-agnostic FormField spec to Radix UI's Form primitive.
> Read alongside: `../anatomy.md`, `../tokens.md`, `../constraints.md`
>
> Radix package: `@radix-ui/react-form`
> Install: `npm install @radix-ui/react-form`
> Radix docs: https://www.radix-ui.com/primitives/docs/components/form
>
> Token consumption: CSS custom properties via `hpe-design-tokens`
> Token naming pattern: camelCase — see `select/select-tokens-guide.md`
> Status: v1 draft

---

## How Radix implements FormField

`@radix-ui/react-form` provides accessible form primitives that handle
validation messaging and ARIA association automatically. It is the
closest Radix equivalent to Grommet's `<FormField>`.

Key behaviour provided by Radix Form at no cost:
- `<Form.Message>` is automatically associated with `<Form.Control>`
  via `aria-describedby` — satisfies constraints §6
- `<Form.Field>` provides context so Label and Control are linked
- Built-in validation states via `data-invalid` attributes
- `required` propagated to the underlying control — satisfies constraints §5

### Anatomy part → Radix part mapping

| Anatomy part | Radix component | Notes |
|---|---|---|
| Root | `<Form.Root>` | Wraps the entire form |
| Field | `<Form.Field>` | Wraps one label + input + message group |
| Label | `<Form.Label>` | Associated with control automatically |
| Required indicator | Rendered inside `<Form.Label>` | `aria-hidden="true"` on the `*` span |
| Input container | `<div>` with `.hpe-form-field__input-container` | No Radix part — styled wrapper only |
| Child input | `<Form.Control>` as child | Passes Radix context to native or custom inputs |
| Help text | `<Form.Description>` | Always present when help text is provided |
| Error message | `<Form.Message match="...">` | Shown by Radix when validation fails |
| Success message | `<Form.Message>` with custom show logic | Radix has no built-in success state |
| Info message | `<Form.Description>` variant | Rendered conditionally |

> **Notable differences from Grommet:**
> - Radix Form has no built-in success or info message state —
>   these are implemented with conditional rendering
> - `<Form.Control>` renders the underlying `<input>` by default;
>   for Radix Select, pass `asChild` and compose with `<Select.Trigger>`
> - Radix handles `aria-describedby` wiring automatically — do not add it manually

---

## State → data-attribute mapping

| Anatomy state | Radix data-attribute | Applies to |
|---|---|---|
| invalid / error | `[data-invalid]` | `Form.Field`, `Form.Label`, `Form.Control`, `Form.Message` |
| valid | `[data-valid]` | `Form.Field`, `Form.Label`, `Form.Control` |
| focus | `:focus-within` | `.hpe-form-field__input-container` |
| disabled | `[data-disabled]` | `Form.Field` (propagated) |

> Note: Radix Form does not provide a `data-disabled` attribute natively.
> Apply disabled state via the `disabled` prop on the child control
> and use `:has([disabled])` on the container, or pass a `data-disabled`
> attribute manually to the Field wrapper.

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
        {/* Child input goes here — e.g. <HPESelect />, <input />, <textarea /> */}
        {children}
      </Form.Control>
    </div>

    {/* Message row — mutually exclusive, in priority order */}
    {/* Error — highest priority, shown by Radix when validation fails */}
    {error && (
      <Form.Message className="hpe-form-field__message hpe-form-field__message--error">
        {error}
      </Form.Message>
    )}

    {/* Success — shown when valid and success message provided */}
    {!error && success && (
      <p className="hpe-form-field__message hpe-form-field__message--success">
        {success}
      </p>
    )}

    {/* Info — shown when no error or success */}
    {!error && !success && info && (
      <Form.Description className="hpe-form-field__message hpe-form-field__message--info">
        {info}
      </Form.Description>
    )}

    {/* Help — lowest priority, shown by default */}
    {!error && !success && !info && help && (
      <Form.Description className="hpe-form-field__message hpe-form-field__message--help">
        {help}
      </Form.Description>
    )}

  </Form.Field>
);
```

> **Note on `<Form.Control asChild>`:** The `asChild` prop tells Radix to
> merge its behaviour onto the child element rather than rendering a new DOM
> node. This allows `<HPESelect>` or any custom input to participate in
> Radix Form's validation and ARIA wiring without wrapping in a redundant
> `<input>`.

---

## CSS

```css
/* ===========================================
   HPE FormField — Radix UI
   Tokens from hpe-design-tokens
   See: component-specs/form-field/tokens.md
   Token naming pattern: camelCase
   =========================================== */

/* -------------------------------------------
   1. Field root
   ------------------------------------------- */

.hpe-form-field {
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
}

/* Disabled — opacity applied to entire field root */
/* See constraints §4 */

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
  gap: var(--hpe-formField-default-medium-requiredIndicator-marginLeft)*;

  font-size: var(--hpe-formField-default-label-fontSize)*;
  font-weight: var(--hpe-formField-default-label-fontWeight)*;
  color: var(--hpe-formField-default-label-rest-color)*;

  margin-bottom: var(--hpe-formField-default-medium-label-marginBottom)*;
}

/* Error state — Radix sets [data-invalid] on Form.Label */

.hpe-form-field__label[data-invalid] {
  color: var(--hpe-formField-default-label-rest-color)*;
  /* Label color does not change on error in HPE spec —
     only the input container border and message color change */
}


/* -------------------------------------------
   3. Required indicator
   ------------------------------------------- */

.hpe-form-field__required {
  color: var(--hpe-formField-default-requiredIndicator-color)*;
  /* aria-hidden="true" is set in JSX — this is visual only */
}


/* -------------------------------------------
   4. Input container
   ------------------------------------------- */

.hpe-form-field__input-container {
  display: flex;
  align-items: stretch;
  width: 100%;
  box-sizing: border-box;

  border-width: var(--hpe-formField-default-medium-input-container-borderWidth)*;
  border-style: solid;
  border-color: var(--hpe-formField-default-input-container-rest-borderColor)*;
  border-radius: var(--hpe-formField-default-medium-input-container-borderRadius)*;
  background: var(--hpe-formField-default-input-container-rest-background)*;

  /* DO NOT set height — see constraints §7 */
  /* DO NOT set padding here — padding is the child input's responsibility */
}

/* Focus — responds to focus on any child control */
/* See constraints §1 — border-width must not change */

.hpe-form-field__input-container:focus-within {
  border-color: var(--hpe-formField-default-input-container-focus-borderColor)*;
}

/* Error state — applied via [data-invalid] on Form.Field,
   which cascades to the container via the class selector */

.hpe-form-field[data-invalid] .hpe-form-field__input-container {
  border-color: var(--hpe-formField-default-input-container-error-rest-borderColor)*;
}

.hpe-form-field[data-invalid] .hpe-form-field__input-container:focus-within {
  border-color: var(--hpe-formField-default-input-container-error-focus-borderColor)*;
}

/* Success state */

.hpe-form-field[data-valid] .hpe-form-field__input-container {
  border-color: var(--hpe-formField-default-input-container-success-rest-borderColor)*;
}

/* Disabled — inherited via opacity on root; no separate border rule needed */
/* See constraints §4 */


/* -------------------------------------------
   5. Message row (help, error, success, info)
   All variants share the same base styles — see constraints §2
   ------------------------------------------- */

.hpe-form-field__message {
  font-size: var(--hpe-formField-default-help-fontSize)*;
  margin-top: var(--hpe-formField-default-medium-help-marginTop)*;
  margin-bottom: 0;
  /* All message types use the same font-size and margin-top
     to prevent layout shift when switching between them */
}

.hpe-form-field__message--help {
  color: var(--hpe-formField-default-help-rest-color)*;
}

.hpe-form-field__message--error {
  color: var(--hpe-formField-default-error-rest-color)*;
}

.hpe-form-field__message--success {
  color: var(--hpe-formField-default-success-rest-color)*;
}

.hpe-form-field__message--info {
  color: var(--hpe-formField-default-info-rest-color)*;
}
```

> **Note on `*` in CSS:** The `*` markers in the CSS above are documentation
> annotations only — they must be removed before use. They indicate variables
> pending verification against `dist/css/components.css`.

---

## Radix-specific implementation notes

| Topic | Note |
|---|---|
| **`Form.Control asChild`** | Use `asChild` to avoid wrapping child inputs in an extra DOM node. Without it Radix renders a plain `<input>` which conflicts with custom inputs |
| **`data-invalid`** | Radix sets `[data-invalid]` on `Form.Field`, `Form.Label`, `Form.Control`, and `Form.Message` when validation fails. Use this for all error state CSS — do not add a separate class |
| **`data-valid`** | Radix sets `[data-valid]` when the field passes validation. Use this for success border color |
| **`Form.Message match`** | `<Form.Message>` accepts a `match` prop for built-in validation rules (e.g. `match="valueMissing"`). For custom validation, pass `forceMatch` or control visibility manually |
| **`aria-describedby`** | Radix wires `<Form.Description>` and `<Form.Message>` to the control automatically. Never add `aria-describedby` manually |
| **Disabled** | Radix Form does not set `data-disabled` on `Form.Field` natively. Pass `data-disabled={disabled || undefined}` manually on the Field wrapper to enable the CSS opacity rule |
| **Success / info states** | Radix Form has no built-in success or info concept. Use conditional rendering in JSX — see component structure above |
| **`:focus-within`** | Used on the input container to detect focus on any child. This works correctly with Radix Select because `<Select.Trigger>` is a focusable button |

---

## Gaps between Radix Form and HPE spec

| Gap | Detail | Recommendation |
|---|---|---|
| No `data-disabled` on Field | Radix does not set this attribute automatically | Pass `data-disabled` manually as shown in component structure |
| No success / info state | Radix only tracks invalid/valid — no success or info concept | Use conditional rendering controlled by props |
| `data-valid` only set after interaction | Radix only sets `[data-valid]` after the field has been touched | May need to track touched state in React to show success styling correctly |
| No built-in `required` visual | Radix does not render the required indicator | Render `*` span in JSX with `aria-hidden="true"` as shown |