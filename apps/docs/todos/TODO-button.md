# TODO — Button component

Gaps identified during the `button.mdx` refactor. Resolve directly in the PR or translate into GitHub Issues.

## Missing visual assets

- [ ] **Anatomy diagram** — No image asset exists for the Button anatomy. Create a monochrome diagram annotating: button container (1), label (1a), icon (1b), badge indicator (1c). Follow the anatomy diagram rules in `apps/docs/COMPONENT_TEMPLATE.md`.

## Missing coded examples

- [ ] **Toggle button example** — No `ToggleButtonExample.js` exists in `apps/docs/src/examples/components/button/`. The `toggle` variant in `button.yaml` has no `codeFile` reference. Create a minimal example showing state toggle with icon + `a11yTitle` reflecting the resulting state.
- [ ] **Success state example** — The original docs reference "busy and success states" as a pair. No `ButtonSuccessExample.js` exists and the success state is not documented in the new MDX or YAML. Determine whether Grommet's Button supports a `success` prop/state and, if so, add the example and document the state under `## Behaviors and states > Application states`.

## Missing behavioral documentation

- [ ] **`active` state** — The original MDX references using "active" for the current item (e.g., a selected nav button). This is not captured in `behaviors.applicationStates` in `button.yaml` or documented under `## Behaviors and states`. Verify the Grommet `active` prop behavior and add it.

## Incomplete prop coverage in button.yaml

The following Grommet Button props are not documented in `shared/data-structure/components/button.yaml`. Evaluate each and add to the `props` array if relevant to HPE design system consumers:

- [ ] `active` — boolean; applies active/selected styling
- [ ] `plain` — boolean; removes all default button styling
- [ ] `fill` — `boolean | 'horizontal' | 'vertical'`; fills available space
- [ ] `gap` — string; spacing between icon and label
- [ ] `reverse` — boolean; reverses icon and label order
- [ ] `color` — string; overrides the label/icon color
- [ ] `tip` — string | object; tooltip shown on hover
- [ ] `hoverIndicator` — boolean | string | object; background shown on hover
- [ ] `focusIndicator` — boolean; controls focus ring visibility
- [ ] `type` — `'button' | 'reset' | 'submit'`; maps to the HTML button type attribute
- [ ] `as` — string | React component; renders the button as a different element
