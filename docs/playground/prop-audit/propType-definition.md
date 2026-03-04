# Grommet PropType Reference

This document defines the prop types extracted from the Grommet component audit.  
The goal is to understand what each type represents so suitable control panel inputs can be determined later.

---

# Primitive Types

## boolean

A true / false value.

Example:

```jsx
<Button disabled />
<Button disabled={true} />
<Button disabled={false} />
```

Typical usage:

- enable/disable features
- toggle states
- feature flags

---

## string

A text value.

Example:

```jsx
<TextInput placeholder="Search..." />
```

Typical usage:

- labels
- identifiers
- URLs
- tokens
- configuration values

---

## number

A numeric value.

Example:

```jsx
<Meter value={40} />
```

Typical usage:

- counts
- sizes
- indexes
- percentages

---

# React Content Types

## ReactNode

Any renderable React content.

Examples:

```jsx
<Button label="Save" />

<Button label={<Text>Save</Text>} />

<Box>
  <Text>Hello</Text>
</Box>
```

Can include:

- text
- elements
- components
- fragments

---

## node

Similar to `ReactNode`.

Represents renderable JSX content.

Example:

```jsx
label={<Text>Save</Text>}
```

---

## element

A specific React element.

Example:

```jsx
icon={<Add />}
```

Often used for:

- icons
- embedded UI components

---

# Structured Data Types

## object

A structured configuration object.

Example:

```jsx
<Button badge={{ value: 20, max: 15 }} />
```

Commonly used for:

- layout configuration
- animation settings
- spacing configuration
- compound UI elements

---

## array

A list of values.

Example:

```jsx
<Select options={["A", "B", "C"]} />
```

Typical usage:

- option lists
- selections
- grouped values

---

# Functional Types

## function

A callback executed when an event occurs.

Example:

```jsx
<Button onClick={() => console.log("clicked")} />
```

Typical usage:

- event handling
- data updates
- interaction callbacks

---

# Generic Type

## any

An unrestricted type.

Example:

```jsx
value={anything}
```

Meaning the prop may accept any value.

---

# Union Types

A **union type** allows a prop to accept **multiple different types**.

Syntax example:

```
string | number
```

This means the prop can accept either a string or a number.

Example:

```jsx
value="10"
value={10}
```

Union types are commonly used when a component supports both:

- simple values
- advanced configuration objects

---

# Union Types Found in the Dataset

## string | number

The prop accepts either text or numeric values.

Example:

```jsx
value="10"
value={10}
```

---

## string | object

Allows either a simple value or a structured configuration.

Example:

```jsx
pad="small"

pad={{ horizontal: "small" }}
```

---

## number | object

Allows a numeric shortcut or detailed configuration.

Example:

```jsx
animation={100}

animation={{ type: "fade", duration: 100 }}
```

---

## boolean | object

Allows enabling a feature or providing configuration.

Example:

```jsx
animation={true}

animation={{ duration: 300 }}
```

---

## object | string

Same idea as `string | object`, order reversed.

---

## string | string[]

Allows a single value or multiple values.

Example:

```jsx
value="A"

value={["A", "B"]}
```

---

# Enum Types

## enum

An enum restricts a prop to a **fixed set of values**.

Example:

```
size: "small" | "medium" | "large"
```

Example usage:

```jsx
<Button size="small" />
```

Enums typically represent:

- size variants
- visual styles
- predefined options

---

# Boolean Presence Pattern

Some boolean props behave like variants rather than independent toggles.

Example:

```jsx
<Button primary />
<Button secondary />
```

Although typed as boolean, they function as mutually exclusive visual styles.

Equivalent interpretation:

```
variant = primary
variant = secondary
```

This pattern appears in some Grommet components where boolean flags control styling variants.