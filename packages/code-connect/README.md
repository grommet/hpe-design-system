# HPE Design System — Figma Code Connect

> **Innovation Sprint:** Bridging the gap between Figma designs and production-ready Grommet code.

## What Is This?

This package contains **Figma Code Connect** mappings for HPE Design System components. Code Connect is a Figma feature that bridges the design-to-development handoff gap — when a designer selects a component in Figma Dev Mode, instead of seeing raw CSS or Figma auto-generated pseudo-code, they see **real, production-ready Grommet JSX** that a developer can copy directly into a project.

### Before Code Connect

A developer inspecting a Button in Figma Dev Mode would see:

```
/* Auto Layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 8px 16px;
background: #01A982;
```

### After Code Connect

The same developer now sees:

```jsx
import { Button } from 'grommet';

<Button label="Submit" primary size="medium" />;
```

---

## Why It Matters

| Problem                                               | Code Connect Solution                       |
| ----------------------------------------------------- | ------------------------------------------- |
| Developers translate Figma to code manually           | Real Grommet code shown in Dev Mode         |
| Designers don't know which component name to use      | Component linked directly to source         |
| Prop names differ between design and code             | Figma properties mapped to real React props |
| Wrong libraries imported (inline styles, wrong icons) | Correct HPE imports shown automatically     |

This directly supports the HPE Design System goal of a consistent, efficient design-to-code workflow — less handoff friction, fewer implementation mismatches.

The added benefit is direct integration with Figma's MCP server. This gives AI agents like GitHub Copilot both design context and production awareness when generating code — meaning AI output stays aligned with the HPE Design System rather than producing generic React.

---

## Components Connected (6)

| Component | Figma Node  | Variants / Key Props                                                 |
| --------- | ----------- | -------------------------------------------------------------------- |
| `Button`  | `2133-694`  | `Kind`, `Size`, `State`, `Icon`, `is Busy`, `show Badge`, `show Tip` |
| `Tag`     | `3039-2385` | `show Name`, `Value`, `Size`, `is Clickable`, `is Removable`         |
| `Menu`    | `2475-3768` | `is Icon Only`, `Aligned`, `is Open`                                 |
| `Tab`     | `59-2098`   | `show Icon`                                                          |
| `Tabs`    | `59-2087`   | `has Overflow`                                                       |
| `Card`    | `3062-2494` | `CardHeader`, `CardBody`, `CardFooter` static composition            |

---

## Project Setup

### Prerequisites

- Node.js 20+
- pnpm
- A Figma account with access to the HPE Design System Components file

### Token Setup

1. In Figma → **Settings → Security → Personal access tokens**
2. Create a token with these scopes:
   - `file_content:read` (under Files)
   - `file_code_connect:write` (under Development)
3. Copy the token into `packages/code-connect/.env`:

```
FIGMA_ACCESS_TOKEN=figd_your_token_here
```

> `.env` is gitignored — never commit your token.

### Install & Publish

```bash
# Install dependencies
pnpm install

# Publish all mappings to Figma
pnpm --filter @hpe-design/code-connect figma:sync
```

Equivalent from `packages/code-connect/`:

```bash
pnpm run figma:sync
```

---

## Adding a New Component

### Step 1 — Scaffold from Figma

```bash
cd packages/code-connect
dotenv -e .env -- figma connect create "<figma-component-url>"
```

This calls the Figma API, reads the real component properties, and generates a starter mapping file with all property names pre-filled. Move it into the appropriate location under `src/` and rename it to match the repo convention if needed: `<ComponentName>.figma.jsx`.

### Step 2 — Map the properties

Open the generated file and replace placeholder mappings with real ones. Use the [Authoring Patterns](#authoring-patterns) section below as a reference.

### Step 3 — Validate and publish

```bash
pnpm --filter @hpe-design/code-connect figma:sync
```

Fix any validation errors (property name typos, wrong node type, etc.) then re-run.

### Step 4 — Verify in Figma Dev Mode

Open the Figma file, select the component, open Dev Mode, and confirm the code panel shows your JSX.

---

## How It Works — The Data Flow

```
Designer selects component in Figma Dev Mode
              ↓
  Figma reads component property values
  (e.g. Kind="primary", Size="large")
              ↓
    figma.* mapping functions translate
    Figma properties → React prop values
              ↓
    example() function called with those values
              ↓
    JSX rendered and shown to developer
```

There are three mapping primitives:

### `figma.string('PropertyName')`

Reads a Figma text property and passes the string through as-is.

```js
label: figma.string('Label');
// Figma: Label = "Submit"  →  label="Submit"
```

### `figma.boolean('PropertyName')`

Reads a Figma boolean toggle. Use a value map when `false` should omit the prop rather than pass `false`:

```js
badge: figma.boolean('show Badge', { true: true, false: undefined });
// show Badge = ✓  →  badge={true}
// show Badge = ✗  →  (prop omitted)
```

### `figma.enum('PropertyName', { figmaValue: reactValue })`

Maps specific Figma variant values to React prop values. Unmapped values produce `undefined` (prop omitted):

```js
size: figma.enum('Size', {
  xSmall: 'xsmall',
  large: 'large',
});
// Figma: Size = "large"  →  size="large"
// Figma: Size = "xSmall" →  size="xsmall"
```

---

## Authoring Patterns

### 1. The `variant` pattern — structurally different JSX per Figma state

When a single Figma boolean/enum should produce **different JSX structure** (not just a different prop value), split into multiple `figma.connect` calls with a `variant` filter:

```js
// When "show Name" toggle is ON — include name prop
figma.connect(Tag, FIGMA_URL, {
  variant: { 'show Name': 'True' },
  props: { name: figma.string('Name'), ...sharedProps },
  example: ({ name, value }) => <Tag name={name} value={value} />,
});

// When "show Name" toggle is OFF — name prop absent entirely
figma.connect(Tag, FIGMA_URL, {
  variant: { 'show Name': 'False' },
  props: sharedProps,
  example: ({ value }) => <Tag value={value} />,
});
```

Used in: **Tag** (`show Name`), **Menu** (`is Icon Only`)

### 2. Enum for boolean-sourced non-boolean outputs

When a single Figma enum/variant drives **two separate React boolean props**, map them independently:

```js
// Both driven by the same Figma "Kind" property
primary:   figma.enum('Kind', { primary: true }),
secondary: figma.enum('Kind', { secondary: true }),
```

When `Kind = "primary"` → `primary={true}`, `secondary={undefined}`. Used in: **Button**

### 3. Icons must use `@hpe-design/icons-grommet`

Always import icons from `@hpe-design/icons-grommet`, not `grommet-icons`:

```js
// ✓ Correct
import { Home, More, Add } from '@hpe-design/icons-grommet';

// ✗ Wrong
import { CircleInformation } from 'grommet-icons';
```

### 4. Grouped Menu items use nested arrays

Grommet `Menu` groups items by nesting arrays — each sub-array becomes a separator group:

```js
items={[
  [{ label: 'Action 1' }, { label: 'Action 2' }],  // group 1
  [{ label: 'Delete' }],                             // group 2 (separated)
]}
```

Figma's "show 2nd Group" / "show 5th Group" toggles are prototype design-time conveniences — they don't map to React props.

### 5. `variant` only works on the connected node's own properties

The `variant` filter can only reference properties belonging to **the exact Figma node** in the `figma.connect` URL. `show Icon` belongs to `Tab` (`59-2098`) — not `Tabs` (`59-2087`) — so it can only be used as a variant in `controls/Tab.figma.jsx`.

### 6. No conditionals or `.map()` in `example`

The Code Connect parser requires the `example` function to produce statically analyzable JSX:

```js
// ✗ Rejected — conditional
example: ({ busy }) => <Button busy={busy && true} />;

// ✗ Rejected — map
example: () => (
  <Tabs>
    {tabs.map(t => (
      <Tab title={t} />
    ))}
  </Tabs>
);

// ✓ Correct — static JSX, prop omitted via undefined
example: ({ busy }) => <Button busy={busy} />;
```

### 7. Declaring a prop is not the same as using it

Every prop declared in `props` must also be destructured and passed in `example` — Code Connect will not warn you if you forget:

```js
// ✗ badge mapped but never used — silently dropped from output
props: { badge: figma.boolean('show Badge') },
example: ({ label }) => <Button label={label} />

// ✓ badge declared AND wired through
props: { badge: figma.boolean('show Badge', { true: true, false: undefined }) },
example: ({ label, badge }) => <Button label={label} badge={badge} />
```

---

## Limitations

| Limitation                             | Impact                                          | Workaround                                         |
| -------------------------------------- | ----------------------------------------------- | -------------------------------------------------- |
| No conditionals in `example`           | Can't show/hide optional JSX blocks             | `variant` pattern for structural differences       |
| No `.map()` in `example`               | Can't generate dynamic child counts             | Static hardcoded children                          |
| Prototype-only Figma props             | Figma group toggles have no React equivalent    | Dropped from mapping, static representative shown  |
| `variant` filter scoped to node        | Can't cross-reference child component props     | Keep variant logic in the child's own `.figma.jsx` |
| Figma Dev Mode shows duplicate imports | Visual issue when parent + child both connected | Figma display behaviour, not fixable               |

---

## File Structure

```
packages/code-connect/
├── src/
│   ├── controls/
│   │   ├── Button.figma.jsx # Button — Kind, Size, State, Icon, Badge, Tip
│   │   ├── Menu.figma.jsx   # Menu — icon-only vs labeled variants, grouped items
│   │   ├── Tab.figma.jsx    # Tab — show Icon variant
│   │   ├── Tabs.figma.jsx   # Tabs — has Overflow, static representative tabs
│   │   └── Tag.figma.jsx    # Tag — show Name variant, removable, clickable
│   └── inputs/
│      ├── CheckBox.figma.jsx
│      ├── DateInput.figma.jsx
│      └── NumberInput.figma.jsx
│   └── layouts/
│      └── Card.figma.jsx   # Card — CardHeader, CardBody, CardFooter composition
├── .env                   # FIGMA_ACCESS_TOKEN (gitignored)
└── package.json           # figma:sync script
```

---

## Lessons Learned

### What was harder than expected

- **Token scopes aren't obvious** — need both `file_content:read` AND `file_code_connect:write`; missing either gives a cryptic 403
- **Figma node type matters** — connect to a `COMPONENT` or `COMPONENT_SET` node, not a Frame; always copy the link from the component itself not the surrounding frame
- **The parser is stricter than it looks** — no conditionals (`&&`, ternaries), no `.map()`, no dynamic expressions; all JSX in `example` must be fully static
- **Parent and child components need separate files** — `Tabs` and `Tab` are two different Figma nodes with separate property sets; you can't reference a child's property as a `variant` filter on the parent
- **Grommet and Figma attributes are not always 1:1** — Figma uses `Icon = left/right` for position; Grommet uses `icon={<Add />}` plus a separate `reverse` prop. One Figma property mapped to two React props
- **Declaring a prop is not the same as using it** — declaring a prop in `props` only reads it from Figma; you still have to use it in `example` or it disappears from the output with no warning
- **Figma prototype toggles ≠ React props** — design-time visibility toggles (e.g. "show 2nd Group") have no code equivalent; mapping them creates noise

### What we'd do differently

- Always start with `figma connect create` — never hand-author property names
- Audit `props` vs `example` as a checklist — every mapped prop must appear in both
- Add `figma.config.json` from day one to avoid CLI path detection issues
- Store the token in a shared secrets manager, not per-developer `.env` files
- Prefer the package sync command directly from the repo root so publish behavior stays consistent across contributors

---

## To Be Done — Scaling to All Components

Getting to full coverage across the HPE Design System is the long-term goal. Here's a realistic path for how to get there.

### Full Component Inventory

The HPE Design System has ~55 components with documented Figma counterparts. Based on the current docs examples, here's a prioritised breakdown:

**Tier 1 — High frequency, simple props (easiest wins)**

| Component          | Key Props to Map                                     |
| ------------------ | ---------------------------------------------------- |
| `TextInput`        | `placeholder`, `disabled`, `icon`, `reverse`, `size` |
| `CheckBox`         | `checked`, `disabled`, `label`, `toggle`             |
| `RadioButtonGroup` | `options`, `disabled`                                |
| `Select`           | `options`, `placeholder`, `disabled`, `multiple`     |
| `SelectMultiple`   | `options`, `placeholder`, `limit`                    |
| `Avatar`           | `name`, `src`, `size`, `background`                  |
| `Spinner`          | `size`, `message`                                    |
| `Anchor`           | `label`, `href`, `icon`, `reverse`                   |
| `Tip`              | `content`, `plain`                                   |
| `Skeleton`         | `height`, `width`, `round`                           |

**Tier 2 — Medium complexity, high designer-dev friction**

| Component           | Key Props to Map                                 |
| ------------------- | ------------------------------------------------ |
| `Notification`      | `status`, `title`, `message`, `toast`, `onClose` |
| `DataTable`         | Static column + data example                     |
| `Pagination`        | `numberItems`, `step`, `page`                    |
| `PageHeader`        | `title`, `subtitle`, `parent`, `actions`         |
| `Header` / `Footer` | Layout composition examples                      |
| `Accordion`         | Static multi-item example                        |
| `DropButton`        | `label`, `dropContent`, `open`                   |
| `Search`            | `placeholder`, `onChange`                        |
| `ToggleGroup`       | `options`, `value`                               |
| `NameValueList`     | Static composition example                       |

**Tier 3 — Complex / data-driven (need static representative examples)**

| Component             | Notes                                    |
| --------------------- | ---------------------------------------- |
| `Data` + `DataTable`  | Needs representative static dataset      |
| `Chart` / `DataChart` | Static data props only                   |
| `Meter`               | `values`, `type`, `max`                  |
| `Diagram`             | Static nodes and connections             |
| `Calendar`            | `date`, `disabled`                       |
| `Layer`               | Modal/panel pattern, `modal`, `position` |
| `Drop`                | `target`, `align`, `stretch`             |
| `Carousel`            | Static slides example                    |

### Recommended Approach to Scale

**1. One component per sprint**
Use `figma connect create` to scaffold, refine the mapping, and publish in the same session. Aim for 2-3 components per innovation sprint.

**2. Use a config file for multi-directory support**
As the mapping count grows, add a `figma.config.json` to the package root:

```json
{
  "codeConnect": {
    "parser": "react",
    "include": ["src/**/*.figma.{jsx,tsx}"],
    "figmaFileUrl": "https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2"
  }
}
```

**3. Add a CI publish step**
Wire `pnpm run figma:sync` into a GitHub Actions workflow so Code Connect stays in sync automatically:

```yaml
# .github/workflows/figma-code-connect.yml (future)
on:
  push:
    branches: [main]
    paths:
      - 'packages/code-connect/src/**'
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pnpm install
      - run: pnpm --filter @hpe-design/code-connect run figma:sync
        env:
          FIGMA_ACCESS_TOKEN: ${{ secrets.FIGMA_ACCESS_TOKEN }}
```

### Coverage Tracker

| Component          | Status         |
| ------------------ | -------------- |
| `Button`           | ✅ Connected   |
| `Tag`              | ✅ Connected   |
| `Menu`             | ✅ Connected   |
| `Tab`              | ✅ Connected   |
| `Tabs`             | ✅ Connected   |
| `Card`             | ✅ Connected   |
| `TextInput`        | 🔲 Not started |
| `CheckBox`         | 🔲 Not started |
| `RadioButtonGroup` | 🔲 Not started |
| `Select`           | 🔲 Not started |
| `SelectMultiple`   | 🔲 Not started |
| `Avatar`           | 🔲 Not started |
| `Spinner`          | 🔲 Not started |
| `Anchor`           | 🔲 Not started |
| `Tip`              | 🔲 Not started |
| `Skeleton`         | 🔲 Not started |
| `Notification`     | 🔲 Not started |
| `DataTable`        | 🔲 Not started |
| `Pagination`       | 🔲 Not started |
| `PageHeader`       | 🔲 Not started |
| `Header`           | 🔲 Not started |
| `Footer`           | 🔲 Not started |
| `Accordion`        | 🔲 Not started |
| `DropButton`       | 🔲 Not started |
| `Search`           | 🔲 Not started |
| `ToggleGroup`      | 🔲 Not started |
| `NameValueList`    | 🔲 Not started |
| `Data`             | 🔲 Not started |
| `Chart`            | 🔲 Not started |
| `Meter`            | 🔲 Not started |
| `Diagram`          | 🔲 Not started |
| `Calendar`         | 🔲 Not started |
| `Layer`            | 🔲 Not started |
| `Drop`             | 🔲 Not started |
| `Carousel`         | 🔲 Not started |

---

## References

- [Figma Code Connect docs](https://github.com/figma/code-connect)
- [HPE Design System Components (Figma)](https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2)
- [Grommet component docs](https://v2.grommet.io/components)
- [HPE Design System site](https://design.hpe.com)
