# PropType Aggregation – Observed Type Patterns

The extracted `propType` values fall into several distinct categories.  
These categories help interpret the dataset and determine how props may later map to control panel inputs.

---

## 1. Primitive Types

Basic data types used directly by props.

Examples:

- `array`
- `boolean`
- `function`
- `node`
- `number`
- `object`
- `string`

These represent the core JavaScript/React value types used in component configuration.

---

## 2. Grommet Type Aliases

Named types defined in the Grommet codebase that typically resolve to structured objects or shared configuration schemas.

Examples:

- `BackgroundType`
- `BorderType`
- `ColorType`
- `EdgeType`
- `MarginType`
- `PadType`
- `SizeType`

These usually represent **design system configuration objects** and often resolve internally to combinations of strings, objects, or nested types.

---

## 3. Enum Literal Types

Fixed sets of allowed values represented as literal unions.

Examples:

- `"small" | "medium" | "large"`
- `"primary" | "secondary" | "default"`
- `"horizontal" | "vertical"`
- `"single" | "multiple"`
- `"start" | "center" | "end"`

These represent **restricted option sets** and typically correspond to predefined configuration values.

---

## 4. Union Types

Types that allow multiple value forms.

Examples:

- `boolean | object`
- `number | string`
- `object | string`
- `string | object | boolean`
- `string[]`

These indicate props that accept either simple values or more advanced structured configuration.

---

## 5. Function Signatures

Props that accept callback functions or render functions.

Examples:

- `(event: object) => void`
- `(value: string) => void`
- `(option: string | object) => ReactNode`

These typically represent **event handlers or render callbacks** used for interaction logic rather than configuration.




# PropType Normalization Map (Coarse Model)

| rawPropType | normalizedPropType |
|---|---|
| boolean | boolean |
| string | string |
| number | number |
| array | array |
| object | object |
| function | function |
| node | ReactNode |
| element | element |
| ReactNode | ReactNode |
| string[] | array |
| boolean \| object | union |
| number \| string | union |
| object \| string | union |
| string \| object \| boolean | union |
| string \| number | union |
| string \| object | union |
| number \| object | union |
| object \| string | union |
| BackgroundType | object |
| BorderType | object |
| ColorType | object |
| EdgeType | object |
| MarginType | object |
| PadType | object |
| SizeType | object |
| "button" \| "reset" \| "submit" | enum |
| "coarse" \| "fine" | enum |
| "column" \| "row" \| "row-reverse" \| "column-reverse" | enum |
| "horizontal" \| "vertical" | enum |
| "none" \| "xsmall" \| "small" \| "medium" \| "large" \| "xlarge" \| "xxlarge" | enum |
| "primary" \| "secondary" \| "default" | enum |
| "single" \| "multiple" | enum |
| "small" \| "medium" \| "large" | enum |
| "start" \| "center" \| "end" | enum |
| "start" \| "center" \| "end" \| "between" \| "around" \| "evenly" | enum |
| "top" \| "bottom" \| "left" \| "right" | enum |
| "_blank" \| "_self" \| "_parent" \| "_top" | enum |
| (event: object) => void | function |
| (option: string \| object) => ReactNode | function |
| (value: string) => void | function |