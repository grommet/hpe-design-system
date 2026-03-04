# Special Prop Types (Non-Playground Relevant)

Some props appear in component TypeScript definitions but are not meaningful for a component playground control panel.

These typically exist to support React composition, DOM passthrough, or framework mechanics rather than component behavior.

These props **should still be extracted**, but flagged with:

```
propCategory = framework
```

This allows them to remain visible in the dataset but easily filtered out during review.

---

# React Composition Props

These props enable advanced React composition patterns.

They are not useful for playground control panels because they require external components or runtime context.

### as

Allows the component to render as another element or component.

Example:

```jsx
<Box as="section" />
```

Purpose:
Supports semantic or structural overrides.

Reason to exclude from playground controls:
Changing this dynamically can break component behavior or introduce unexpected props.

---

### ref

Provides a reference to the underlying DOM node or component instance.

Example:

```jsx
<Button ref={buttonRef} />
```

Purpose:
Allows imperative DOM access.

Reason to exclude:
Refs require external JavaScript logic and are not interactive configuration props.

---

### forwardRef

Internal React pattern used when a component forwards its ref to a child.

Example (implementation pattern):

```jsx
const Button = forwardRef((props, ref) => ...)
```

Purpose:
Enables ref forwarding through component layers.

Reason to exclude:
This is a React implementation detail, not a user prop.

---

# DOM Pass-Through Props

These props originate from HTML attributes and are passed directly to the underlying DOM element.

They are often inherited automatically through React typing.

Examples include:

```
id
className
style
title
tabIndex
role
data-*
aria-*
```

Purpose:
Provide standard HTML behavior or accessibility attributes.

Reason to exclude from control panel:

- They do not represent design system behavior
- They encourage styling overrides
- They add noise to the playground UI

However, accessibility-related props may still be documented separately.

---

# Event Handler Props

These props register callbacks for user interaction events.

Examples:

```
onClick
onChange
onFocus
onBlur
onKeyDown
```

Purpose:
Allow developers to attach event handlers.

Reason to exclude from control panel inputs:

- They require custom code logic
- They do not change component configuration
- Playground interactions should simulate these internally instead

Example:

Instead of exposing `onClick`, the playground preview should handle click events internally.

---

# Children Prop

Many components accept nested React content through the `children` prop.

Example:

```jsx
<Box>
  <Text>Hello</Text>
</Box>
```

Purpose:
Allows arbitrary nested content.

Reason not to expose as a control panel input:

- Cannot be easily represented as a simple UI control
- Better demonstrated directly in preview examples

Instead, document whether the component supports children.

---

# Dataset Handling Rule

For props matching these patterns:

- Extract them into the dataset
- Set:

```
propCategory = framework
```

This ensures:

- The dataset remains complete
- Playground filtering can ignore these props later