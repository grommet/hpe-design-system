# Code Connect Authoring Patterns

Use these repo-specific patterns when writing Code Connect v2 `.figma.ts` templates.

## Common Patterns

### Property-driven mapping

Read properties from `figma.selectedInstance` and interpolate them into a single
`figma.code` snippet using `figma.helpers.react.renderProp`.

### Structural variants

Branch in TypeScript using `getPropertyValue` when a Figma state changes snippet
structure. Export the selected template once.

Typical examples in this repo:

- `Avatar` branches on `Kind`
- `Menu` branches on `is Icon Only`

### Static composition mapping

Use a static `figma.code` example when the component is best represented as a fixed
composition rather than a property-driven surface.

Typical example in this repo:

- `Card` uses a representative composition of `CardHeader`, `CardBody`, and `CardFooter`

### Composite components backed by data

When Figma represents repeated or nested parts as child instances but the public
component API accepts structured data, keep one template for the parent and
convert the child instances into that data model. Preserve their order and
hierarchy, and derive required current-item props from the selected child.

```ts
type Layer = ReturnType<typeof figma.selectedInstance.findLayers>[number];
type ComponentInstance = Extract<Layer, { type: 'INSTANCE' }>;

const stepInstances = figma.selectedInstance
  .findLayers(
    layer => layer.type === 'INSTANCE' && layer.name === '⌽ Step',
    { traverseInstances: true },
  )
  .filter((layer): layer is ComponentInstance => layer.type === 'INSTANCE');
```

Convert each instance's exact text, boolean, and variant properties into
`figma.helpers.react.object` values, then wrap the ordered result with
`figma.helpers.react.array`. For nested items, traverse from each parent and
emit the result under the API's child field. Validate required state such as a
current item, and explicitly handle unsupported values or empty collections.

Create separate templates for child nodes only when the codebase exposes a
meaningful standalone public component. Otherwise, map visual parts through the
parent API and document states that the API cannot represent. See the
[Stepper template](../../../../code-connect/src/visualisations/Stepper.figma.ts)
for a complete example.

## Optional and Structured Props

Read real BOOLEAN toggles with `getBoolean`, not string comparisons. Use code
helpers for object, array, and function values:

```ts
const tip = figma.selectedInstance.getBoolean('show Tip', {
  true: figma.helpers.react.object({ content: 'Tip' }),
  false: undefined,
});
const example = figma.code`<Button${figma.helpers.react.renderProp('tip', tip)} />`;
```

For callbacks, map the enabled state to
`figma.helpers.react.function('() => {}')`, not an actual runtime function.
For action arrays, use `figma.helpers.react.array` with `.object` entries. See the
[Button template](../../../../code-connect/src/controls/Button.figma.ts)
as a component-specific reference.

`renderProp` omits `false` and `undefined`. If a component defaults a prop to
`true`, emit an explicit `prop={false}` snippet when disabling it instead.

## Swapped Instances

```ts
const iconInstance = figma.selectedInstance.getInstanceSwap('Icon');
const icon =
  iconInstance?.type === 'INSTANCE'
    ? iconInstance.executeTemplate().example
    : undefined;
const example = figma.code`<Button${figma.helpers.react.renderProp('icon', icon)} />`;
```

Check the handle's type because failed lookups may return a truthy ERROR handle.
Do not concatenate the returned sections or require `hasCodeConnect()` before
execution. Use `getSlot` only for actual SLOT properties.

## Template Safety

- Use `.figma.ts`, never JSX or `figma.connect`.
- Render every mapped value.
- Interpolate structured snippet sections; never string-concatenate or join them.
- Keep runtime imports limited to `figma`; export snippet imports separately.
- Validate with package typecheck and CLI parse before publishing.
- Review generated IDs, source links, and boolean branches after migration.
- Use a unique mapping ID even when two templates emit the same Grommet component.
