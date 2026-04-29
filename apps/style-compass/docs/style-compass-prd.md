# PRD: Style Compass
### VS Code Copilot Build Instructions — HPE Design System

---

## 1. Project Overview

**Style Compass** is an interactive, wizard-style decision tree that guides HPE designers and 
developers to the correct design token for their use case. It is presented as a working page 
on the HPE Design System docs site AND as a standalone app within the monorepo.

The flow works like this: the user begins at a **root fork** that asks whether they're styling 
a specific HPE component (Button, Select, Checkbox, etc.) or need a general semantic token. 
From there, a series of progressively narrower questions guide them to the correct token(s). 
At the end, the recommended design token(s) are surfaced in a result table.

**Example flow A — Semantic path:**
- **Step 1:** "Are you styling a specific HPE component, or do you need a general design 
  token?" → user picks "A general design token"
- **Step 2:** "What are you trying to style?" → options: Color, Spacing, Sizing, Typography, 
  Border, Icon sizing
- **Step 3:** "What element needs color?" → options: Background / Surface, Text, Icon, Border, 
  Foreground, Decorative, Data visualisation, Focus indicator
- **Step 4:** "What kind of surface?" → options: Page background, Container / Card, Default 
  container fill, Floating / Overlay, Screen overlay, Subtle contrast, 
  Interactive hover/active, Status communication, Selected / Checked, Primary / Brand 
  emphasis, Neutral strong, Disabled
- **Step 5:** Result — token table with swatch, token name, description, copy button

**Example flow B — Component path:**
- **Step 1:** "Are you styling a specific HPE component, or do you need a general design 
  token?" → user picks "A specific component"
- **Step 2:** "Which component are you styling?" → Anchor, Button, Checkbox, Switch, Select, 
  Menu, FormField, etc.
- **Step 3:** "What part of the Checkbox are you styling?" → The checkbox control, The label, 
  Overall spacing — with a **hint** explaining anatomy: "The 'control' is the square box you 
  tick. The 'label' is the text beside it."
- **Step 4:** Result — token table

**Example flow C — Cross-component redirect:**
- **Step 1:** User picks "A specific component"
- **Step 2:** User picks "Select (Dropdown)"
- **Step 3:** User picks "The trigger / control (the visible input area)"
- **Step 4:** Guidance result — no token table, instead a description explaining that the 
  Select trigger is styled by FormField input container tokens, with a "Related" link to 
  navigate directly to the FormField input container node

**Navigation:** The user can press **Back** to return one step, or **Restart** to return to 
step 1. There are no breadcrumb tags or trail indicators — orientation is provided entirely by 
the question text changing at each step.

---

## 2. Repository Context

**Repo:** `grommet/hpe-design-system` — a pnpm monorepo.

**Tech stack:**
- React (JSX/TSX), Vite
- [Grommet](https://v2.grommet.io/) — all UI components must come from `grommet`
- [`grommet-theme-hpe`](https://github.com/grommet/grommet-theme-hpe) — the HPE theme applied 
  at the root `<Grommet>` wrapper. **Do not override or extend styles inline.** All visual 
  styling (colors, spacing, borders, typography, border-radius, shadows) is provided by this 
  theme. Trust it completely.
- `@shared/aries-core` — shared internal component library. Includes `Selector` and 
  `SelectorGroup` — the primary selection controls for this feature.
- `@hpe-design/icons-grommet` — HPE icon package
- `hpe-design-tokens` — workspace package containing the design token JSON (provided 
  separately)

**Existing reference app — use as structural template:**
```
apps/design-tokens-manager/
  src/
    App.jsx          ← Grommet root, BrowserRouter, sidebar nav, routes
    main.jsx         ← ReactDOM entry point
    components/      ← Shared UI pieces (Header, ContentPane, CopyButton, etc.)
    routes/          ← Page-level route components
  package.json       ← Uses grommet, grommet-theme-hpe, react-router-dom, vite
  vite.config.ts
  index.html
```

**Key reusable components already in the repo — import, do not reimplement:**

| Component | Path |
|---|---|
| `CopyButton` | `apps/design-tokens-manager/src/components/CopyButton.jsx` |
| `ColorPreview`, `DimensionPreview`, `RadiusPreview`, `BorderPreview`, `WeightPreview`, `TextPreview` | `apps/docs/src/components/content/DesignTokensTable.js` |
| `DesignTokensTable` | `apps/docs/src/components/content/DesignTokensTable.js` |
| `structuredTokens`, `getTokens` | `apps/docs/src/components/content/designTokenUtils.js` |
| `SelectorGroup`, `Selector` | `@shared/aries-core` |
| `ContentPane` | `apps/design-tokens-manager/src/components/ContentPane.jsx` |

---

## 3. Deliverables — What to Build

### A. New standalone app: `apps/style-compass/`

Mirror the structure of `apps/design-tokens-manager/`. Key files:

```
apps/style-compass/
  index.html
  package.json           ← same dependencies as design-tokens-manager
  vite.config.ts
  src/
    main.jsx
    App.jsx              ← Grommet root with hpe theme + BrowserRouter
    data/
      styleCompassTree.js  ← The decision tree data (provided separately)
    lib/
      treeUtils.js       ← Tree traversal, node type detection, token resolution
    components/
      StepQuestion.jsx   ← Renders the current question + hint + Selector options
      ResultCard.jsx     ← Renders the final token recommendation(s)
    routes/
      StyleCompass.jsx   ← Orchestrates state, flow logic, renders steps
```

### B. New docs page: `apps/docs/src/pages/foundation/style-compass.mdx`

A foundation page within the existing docs site, sitting alongside `color.mdx`, 
`typography.mdx`, etc. This page:
- Introduces Style Compass with a short description
- Embeds the live interactive `StyleCompass` component as an `<Example>` (matching the pattern 
  used in other foundation/template pages)
- Does **not** duplicate the app — it imports and renders the same component

Also register the page in `apps/docs/src/data/structure.tsx` with:
```js
{
  name: 'Style Compass',
  description: 'An interactive guide to choosing the right HPE design token for your use case.',
  available: true,
}
```

---

## 4. Architecture Principle — Separation of Concerns

> ⚠️ **The app must be built systematically. Data drives the UI — the UI never hard-codes 
> data.**

The decision tree JSON is the **single source of truth**. The components (`StepQuestion`, 
`ResultCard`) are generic renderers that work with any tree node shape. This means:

1. **The JSON can be edited** (add new components, rename options, restructure branches) **and 
   the UI will render it correctly** without any code changes. No per-node special cases.

2. **All rendering logic is structural**, based on detecting node shape (does it have 
   `question`? `result`? `hint`? `seeAlso`?), never based on specific node IDs or labels.

3. **Token resolution** (looking up resolved CSS values and types for swatch rendering) is a 
   separate utility layer (`treeUtils.js`) that maps token name strings to display data using 
   the existing `structuredTokens` from `designTokenUtils.js`. The JSON stays lean (just token 
   name strings), and resolved values are always current.

4. **Reuse existing assets.** Preview components, copy buttons, and token resolution all come 
   from the existing codebase. Do not reimplement them.

5. **No hacks for specific results.** If a result has no tokens (e.g. the Select trigger 
   redirects to FormField), the same `ResultCard` component handles it gracefully via 
   structural checks, not `if (nodeId === 'select-trigger')` guards.

6. **Cross-component relationships are expressed in the JSON, not in code.** When one 
   component delegates its styling to another (e.g. the Select trigger is styled by FormField 
   input container tokens, because Select always appears inside a FormField in the HPE Design 
   System), this is captured as a `seeAlso` reference and a descriptive `description` in the 
   result node. The `ResultCard` renders this generically — it doesn't know or care that 
   Select specifically redirects to FormField. Any future component that delegates styling can 
   use the same pattern.

---

## 5. UX & Interaction Specification

### State model

```js
{
  history: [],            // Stack of prior node references — used to power "Back"
  currentNode: tree       // The current node object from the decision tree
}
```

### Node type detection

The JSON does **not** use an explicit `type` field. Instead, detect the node type structurally:

```js
// A question node has 'question' and 'options' properties
const isQuestionNode = (node) => 'question' in node && 'options' in node;

// A result is found on an option, not a standalone node
// An option is a leaf when it has a 'result' property
const isLeafOption = (option) => 'result' in option;

// An option leads to another question when it has 'next' containing a question node
const isNavigationOption = (option) => 'next' in option && isQuestionNode(option.next);
```

### Page heading area

The heading, subheading, and navigation buttons are laid out in a single horizontal row — 
buttons are inline with the heading on the right, **not** in a sticky or fixed header:

```jsx
<Box direction="row" justify="between" align="start">
  <Box>
    <Heading level={1} margin="none">Style compass</Heading>
    <Paragraph>
      Use this tokens compass to find the right tokens for your use-case.
    </Paragraph>
  </Box>
  <Box direction="row" gap="small" align="center" flex={false}>
    {history.length > 0 && (
      <Button
        icon={<FormPrevious aria-hidden="true" />}
        label="Back"
        onClick={handleBack}
      />
    )}
    <Button
      label="Restart"
      onClick={handleReset}
      disabled={history.length === 0}
    />
  </Box>
</Box>
```

### Back button behaviour
- Shown only when `history.length > 0` — **conditionally rendered, not just disabled**
- On step 1, Back is completely absent from the UI
- On steps 2+ it appears with a left-chevron icon to the left of the "Back" label
- Clicking it pops the last entry from `history` and sets `currentNode` to it

### Restart button behaviour
- Always rendered
- Label is `"Restart"` — text only, **no icon**
- Disabled when `history.length === 0` (i.e. on step 1, the user hasn't gone anywhere yet)
- Clicking it clears `history` and sets `currentNode` back to the tree root

### On each selection

When the user clicks a `Selector` option:

1. **If the option has a `result` property** (leaf): push `currentNode` onto `history`, then 
   render `ResultCard` with the result data.

2. **If the option has a `next` property containing a node object**: push `currentNode` onto 
   `history`, set `currentNode` to `option.next`.

3. **If the option has `next` as a string reference** (e.g. `"_semantic"`): resolve the 
   reference to the actual node object, then navigate to it. The `"_semantic"` reference 
   resolves to the semantic subtree (the `next` of the "A general design token" option at 
   root level).

### String reference resolution

The JSON contains one string reference: `"next": "_semantic"` on the "Not sure / Not listed" 
option in the component tree. This redirects users to the semantic token tree.

Resolve it at app initialization:

```js
// In treeUtils.js
const REFS = {
  '_semantic': tree.options[1].next  // "A general design token" → its next node
};

const resolveNext = (next) => typeof next === 'string' ? REFS[next] : next;
```

### Animation / Reveal
New questions and the result appear with a subtle fade using Grommet's built-in animation prop. 
Do **not** use CSS keyframes or styled-components animations:

```jsx
<Box animation={{ type: 'fadeIn', duration: 300 }}>
  {/* StepQuestion or ResultCard */}
</Box>
```

---

## 6. Component Specifications

### `treeUtils.js` — Tree traversal and token resolution

This utility module provides all logic for navigating the tree and resolving token display 
data. It keeps rendering components stateless and data-driven.

```js
import { structuredTokens } from '../../docs/src/components/content/designTokenUtils';

// Node type detection
export const isQuestionNode = (node) => 
  node && 'question' in node && 'options' in node;

export const isLeafOption = (option) => 'result' in option;

// String reference resolution
export const buildRefMap = (tree) => ({
  '_semantic': tree.options[1].next,
});

export const resolveNext = (refMap, next) => 
  typeof next === 'string' ? refMap[next] : next;

// Find a node by ID anywhere in the tree (used for seeAlso navigation)
export const findNodeById = (node, id) => {
  if (node.id === id) return node;
  if (node.options) {
    for (const option of node.options) {
      if (option.next && typeof option.next === 'object') {
        const found = findNodeById(option.next, id);
        if (found) return found;
      }
    }
  }
  return null;
};

// Token resolution — turns a token name string into display data
// by looking it up in the structuredTokens from designTokenUtils.js
export const resolveToken = (tokenName) => {
  // tokenName e.g. "hpe.color.background.front"
  // Look up in structuredTokens to get type, value, description
  const parts = tokenName.replace(/^hpe\./, '').split('.');
  const category = parts[0]; // e.g. "color"
  const fullKey = `hpe.${parts.join('.')}`;
  
  // Search across semantic, component, primitives
  for (const level of ['semantic', 'component', 'primitives']) {
    if (structuredTokens[level]?.[category]?.[fullKey]) {
      const entry = structuredTokens[level][category][fullKey];
      const mode = entry.modes.light ?? entry.modes.default ?? 
                   Object.values(entry.modes)[0];
      return {
        token: tokenName,
        type: mode?.$type ?? 'unknown',
        description: mode?.$description ?? '',
        value: mode?.$value ?? '',
      };
    }
  }
  
  // Fallback: return the token name with unknown type
  return { token: tokenName, type: 'unknown', description: '', value: '' };
};

// Resolve an entire result node's tokens array into display data
export const resolveResultTokens = (result) => {
  return result.tokens.map(tokenName => resolveToken(tokenName));
};
```

### `StepQuestion.jsx`

Renders the current question, optional hint, and its selector options.

```jsx
<Box>
  <Heading level={3} margin={{ top: 'medium', bottom: 'small' }}>
    {currentNode.question}
  </Heading>
  {currentNode.hint && (
    <Paragraph size="medium" margin={{ bottom: 'small' }}>
      {currentNode.hint}
    </Paragraph>
  )}
  <Box width="medium">
    <SelectorGroup a11yTitle={currentNode.question}>
      {currentNode.options.map(option => (
        <Selector
          key={option.label}
          value={option.label}
          title={option.label}
          description={option.description}
          onClick={() => handleSelection(option)}
        />
      ))}
    </SelectorGroup>
  </Box>
</Box>
```

**Layout rules:**
- Selectors stack in a **single vertical column** — no `columns` prop on `SelectorGroup`
- The `SelectorGroup` is wrapped in `<Box width="medium">` to constrain it to ~300px
- Each `Selector` shows a **bold title** and **smaller description** below it
- `value` and `key` use `option.label` (the JSON has no separate `value` field)
- Do not add `background`, `border`, `color`, or `pad` props to `Selector` or `SelectorGroup` 
  beyond what is shown above — visual treatment is fully handled by `grommet-theme-hpe`

### `ResultCard.jsx`

Renders the result node. Handles three cases structurally (not by node ID):

1. **Tokens present** → DataTable with swatch, name, description, copy
2. **No tokens but description present** → Guidance text only (e.g. "Use FormField tokens...")
3. **`seeAlso` present** → Navigation buttons to related tree nodes

**`seeAlso` navigation:** When a user clicks a `seeAlso` button, the `onNavigate` callback 
should find the referenced node by ID in the tree and navigate to it (pushing the current 
node onto history). For example, the Select trigger has no tokens of its own — it renders 
guidance text explaining that Select always lives inside a FormField, and a "Related" link 
to `formfield-input-container` so the user can jump directly to those tokens.

```jsx
import { DataTable, Box, Text, Heading, Paragraph, Button } from 'grommet';
import { CopyButton } from '../../../components/CopyButton';
import {
  ColorPreview,
  DimensionPreview,
  RadiusPreview,
  BorderPreview,
  WeightPreview,
  TextPreview,
} from '../../../components/content/DesignTokensTable';
import { resolveResultTokens } from '../lib/treeUtils';

const getPreview = datum => {
  if (datum.type === 'color') return <ColorPreview datum={datum} />;
  if (datum.token.includes('size') || datum.token.includes('spacing') || 
      datum.token.includes('gap'))
    return <DimensionPreview datum={datum} />;
  if (/border.*[Rr]adius/.test(datum.token) || datum.token.includes('radius'))
    return <RadiusPreview datum={datum} />;
  if (datum.token.includes('border'))
    return <BorderPreview datum={datum} />;
  if (datum.token.includes('weight') || datum.token.includes('fontWeight'))
    return <WeightPreview datum={datum} />;
  if (datum.token.includes('fontSize'))
    return <TextPreview datum={datum} />;
  return (
    <Box
      height="36px"
      width="36px"
      flex={false}
      round="xsmall"
      background={datum.value}
      border={{ color: 'border-weak', size: 'xsmall' }}
    />
  );
};

const resultColumns = [
  {
    property: 'id',
    header: '',
    render: datum => getPreview(datum),
    size: 'xsmall',
    pin: true,
  },
  {
    property: 'token',
    header: '',
    render: datum => (
      <Text size="small" style={{ fontFamily: 'Menlo, monospace' }}>
        {datum.token}
      </Text>
    ),
  },
  {
    property: 'description',
    header: '',
    render: datum => <Text>{datum.description || '--'}</Text>,
    size: 'medium',
  },
  {
    property: 'copy',
    header: '',
    render: datum => (
      <CopyButton content={datum.token} tip="Copy token name" />
    ),
    size: 'xxsmall',
  },
];

export const ResultCard = ({ result, onNavigate }) => {
  const resolvedTokens = result.tokens.length > 0 
    ? resolveResultTokens(result) 
    : [];

  return (
    <Box animation={{ type: 'fadeIn', duration: 300 }}>
      {resolvedTokens.length > 0 ? (
        <>
          <Heading level={3} margin={{ top: 'medium', bottom: 'small' }}>
            Here are your tokens:
          </Heading>
          {result.description && (
            <Paragraph size="medium" margin={{ bottom: 'small' }}>
              {result.description}
            </Paragraph>
          )}
          <DataTable
            primaryKey="token"
            columns={resultColumns}
            data={resolvedTokens}
          />
        </>
      ) : (
        <>
          <Heading level={3} margin={{ top: 'medium', bottom: 'small' }}>
            Guidance
          </Heading>
          <Paragraph size="medium">
            {result.description}
          </Paragraph>
        </>
      )}
      {result.seeAlso && result.seeAlso.length > 0 && (
        <Box margin={{ top: 'medium' }} gap="small">
          <Text weight="bold">Related:</Text>
          <Box direction="row" gap="small">
            {result.seeAlso.map(ref => (
              <Button
                key={ref}
                label={ref}
                onClick={() => onNavigate(ref)}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};
```

### `Selector` and `SelectorGroup` (from `@shared/aries-core`)

Reference implementation: 
`apps/docs/src/examples/templates/selector/SupportSelector.js`

**Key props:**
- `SelectorGroup` wraps multiple `Selector` items
- `Selector` props:
  - `value` — uses `option.label` (the JSON has no separate value field)
  - `title` — the **Selector Label / Identifier** → uses the JSON `label` field
  - `description` — supporting detail → uses the JSON `description` field
  - `direction="row"` — for horizontal layout if needed

### Grommet layout component reference

Use these for all layout and typography — do not use raw HTML `<div>`, `<p>`, `<h1>` etc.:

| Need | Component |
|---|---|
| Page structure | `<Page>`, `<PageContent>` |
| Layout containers | `<Box>` |
| Page title | `<Heading level={1}>` |
| Question text | `<Heading level={3}>` |
| Hint text | `<Paragraph size="medium">` |
| Body / intro text | `<Paragraph>` |
| Token name | `<Text size="small" style={{ fontFamily: 'Menlo, monospace' }}>` |
| Buttons | `<Button label="Restart">`, `<Button icon={<FormPrevious/>} label="Back">` |

---

## 7. Data / JSON Structure

The decision tree is supplied as a JS export. **The JSON is the single source of truth — the 
UI renders it generically based on structural shape, never based on specific node IDs.**

### Node detection (no `type` field)

The JSON does **not** use an explicit `type` field. Node type is determined structurally:

| Shape | Interpretation | Renders |
|---|---|---|
| Object with `question` + `options` | Question node | `StepQuestion` |
| Option with `result` property | Leaf / result | `ResultCard` |
| Option with `next` (object) | Navigation to next question | Push + traverse |
| Option with `next` (string) | Reference to another subtree | Resolve + traverse |

### Tree root shape

```js
export const styleCompassTree = {
  id: 'root',
  question: 'Are you styling a specific HPE component, or do you need a general design token?',
  options: [
    {
      label: 'A specific component',
      description: "I'm styling a known component like a Button, Select, Checkbox, etc.",
      hint: 'HPE guidance: always prefer component tokens over semantic tokens when available.',
      next: {
        id: 'component',
        question: 'Which component are you styling?',
        options: [ /* ... component subtree ... */ ]
      }
    },
    {
      label: 'A general design token',
      description: 'I need a semantic token for color, spacing, typography, border, or sizing.',
      next: {
        id: 'semantic',
        question: 'What are you trying to style?',
        options: [ /* ... semantic subtree ... */ ]
      }
    }
  ]
};
```

### Question node shape

```js
{
  id: 'checkbox',                    // unique identifier for navigation/seeAlso
  question: 'What part of the Checkbox are you styling?',
  hint: "The 'control' is the square box you tick. The 'label' is the text beside it.",  // optional
  options: [ /* ... */ ]
}
```

### Option shapes

**Navigation option** (leads to another question):
```js
{
  label: 'The checkbox control (the square box)',  // → Selector title + value
  description: '',                                  // → Selector description (can be empty)
  next: { id: '...', question: '...', options: [...] }
}
```

**Leaf option** (has a result):
```js
{
  label: 'Unchecked (rest)',
  result: {
    tokens: [
      'hpe.checkbox.default.control.rest.background',
      'hpe.checkbox.default.control.rest.borderColor'
    ],
    description: 'The empty, unchecked checkbox at rest.'  // optional
  }
}
```

**Guidance-only result** (empty tokens with cross-reference):
```js
{
  label: 'The trigger / control (the visible input area)',
  result: {
    tokens: [],
    description: 'The Select trigger is styled by FormField input container tokens...',
    seeAlso: ['formfield-input-container']
  }
}
```

**Redirect option** (string reference):
```js
{
  label: 'Not sure / Not listed',
  description: "My component isn't in this list.",
  hint: 'Fall back to semantic tokens. They work for any component.',
  next: '_semantic'   // resolved at runtime to the semantic subtree
}
```

### Result shape

```js
{
  tokens: ['hpe.color.background.front', 'hpe.color.background.default'],  // array of token name strings
  description: 'Optional description of the result set.',                    // optional
  seeAlso: ['formfield-input-container']                                     // optional — node IDs to cross-reference
}
```

**Key:** The `tokens` array contains **only token name strings**, not resolved values. Token 
resolution (getting the CSS value, type, and per-token description for swatch rendering) is 
performed at runtime by `treeUtils.resolveResultTokens()`, which looks up each token in the 
existing `structuredTokens` from `designTokenUtils.js`. This keeps the JSON lean, avoids 
duplicating resolved values, and ensures swatches always reflect current token values.

**Empty tokens:** When `tokens` is an empty array `[]`, `ResultCard` renders only the 
`description` as guidance text (no DataTable). This is used for cross-component redirects 
like the Select trigger, which explains that Select always lives inside a FormField and points 
the user to FormField input container tokens via `seeAlso`.

---

## 8. Theming Rules — CRITICAL

> ⚠️ **Copilot must not override grommet-theme-hpe styles.**

- Do **not** pass `style={{}}` props with color, font, spacing, or border values (except 
  `fontFamily` on monospace token names, which has no theme equivalent)
- Do **not** use hardcoded hex colors or pixel values — use Grommet's semantic token props 
  instead (e.g. `background="background-front"`, `color="text-strong"`)
- Do **not** wrap components in `styled-components` with HPE-specific visual overrides
- The `<Grommet theme={hpe}>` wrapper at the app root handles all visual styling. Trust it.
- `grommet-theme-hpe` controls disabled state appearance, selected state on Selectors, focus 
  rings, hover states — do not attempt to replicate or override any of these

---

## 9. Docs Site Page Structure

Follow the exact pattern of existing foundation pages (e.g. 
`apps/docs/src/pages/foundation/color.mdx`). New file:

```
apps/docs/src/pages/foundation/style-compass.mdx
```

Register in `apps/docs/src/data/structure.tsx` in the foundation section:
```js
{
  name: 'Style Compass',
  available: true,
  description: 'An interactive guide to choosing the right HPE design token for your use case.',
  seoDescription: 'Use the HPE Design System Style Compass to find the correct design token 
    for your styling need.',
  sections: [],
  relatedContent: ['Design tokens', 'Color', 'All design tokens'],
  tags: ['tokens', 'decision tree', 'style', 'compass', 'token picker'],
}
```

---

## 10. Build Checklist

### Architecture & data
- [ ] Decision tree JSON is the single source of truth — UI renders it generically
- [ ] `treeUtils.js` handles all tree traversal, node type detection, reference resolution, 
      and token value resolution
- [ ] Token resolution uses existing `structuredTokens` from `designTokenUtils.js` — token 
      name strings are resolved to `{ token, type, value, description }` at runtime
- [ ] No per-node-ID special cases in rendering components
- [ ] Editing the JSON (adding nodes, renaming options, restructuring) produces correct UI 
      without code changes
- [ ] Cross-component relationships (e.g. Select → FormField) are expressed as `seeAlso` 
      references in the JSON, rendered generically by `ResultCard`

### App scaffolding
- [ ] New app at `apps/style-compass/` mirroring `apps/design-tokens-manager/` structure
- [ ] `package.json` includes `grommet`, `grommet-theme-hpe`, `@shared/aries-core`, 
      `@hpe-design/icons-grommet`, `hpe-design-tokens`, `react-router-dom`, `vite`
- [ ] `App.jsx` wraps with `<Grommet theme={hpe} themeMode="light">` and `<BrowserRouter>`

### Flow logic (`StyleCompass.jsx`)
- [ ] State: `{ history: [], currentNode: tree }` managed with `useState`
- [ ] Node type detected structurally: `isQuestionNode()` checks for `question` + `options`; 
      `isLeafOption()` checks for `result` property
- [ ] `handleSelection(option)`:
  - If `option.result` exists → push `currentNode` to history, render `ResultCard`
  - If `option.next` is an object → push `currentNode` to history, set `currentNode` to 
    `option.next`
  - If `option.next` is a string → resolve via `refMap`, then navigate
- [ ] `handleBack()` pops last item from `history`, restores it as `currentNode`
- [ ] `handleReset()` clears `history`, sets `currentNode` to tree root
- [ ] String reference `"_semantic"` resolved at init via `buildRefMap(tree)`
- [ ] `seeAlso` navigation uses `findNodeById()` to locate target node, then navigates
- [ ] Each new step/result is wrapped in `<Box animation={{ type: 'fadeIn', duration: 300 }}>`

### Page heading area
- [ ] `<Heading level={1}>Style compass</Heading>` and `<Paragraph>` subheading on the left
- [ ] Back and Restart buttons on the right, inline with heading (`justify="between"`)
- [ ] **Back button** is conditionally *rendered* (not just disabled) — absent on step 1, 
      present on steps 2+
- [ ] Back button has left-chevron icon (`<FormPrevious>`) to the left of "Back" label
- [ ] **Restart button** uses `label="Restart"` only — no icon
- [ ] Restart button is disabled when `history.length === 0`

### `StepQuestion.jsx`
- [ ] Question text uses `<Heading level={3}>`
- [ ] **Hint text** rendered below the question when `currentNode.hint` exists, as 
      `<Paragraph size="medium">`
- [ ] `SelectorGroup` has **no** `columns` prop — single column layout
- [ ] `SelectorGroup` wrapped in `<Box width="medium">` to constrain width
- [ ] `Selector` `title` prop receives the JSON `label` field
- [ ] `Selector` `value` prop receives the JSON `label` field (no separate `value` in JSON)
- [ ] `Selector` `description` prop receives the JSON `description` field
- [ ] No extra styling props on `Selector` or `SelectorGroup`

### `ResultCard.jsx`
- [ ] **When `tokens` array is non-empty:** Heading reads "Here are your tokens:", followed by 
      optional result-level description, then DataTable
- [ ] **When `tokens` array is empty:** Heading reads "Guidance", followed by description 
      text — no DataTable rendered
- [ ] **When `seeAlso` is present:** Render a "Related" section with Button links that 
      navigate to the referenced node IDs via `findNodeById()`
- [ ] DataTable has 4 columns: Swatch, Token name, Description, Copy
- [ ] **No column headers** on the DataTable — `header: ''` on every column
- [ ] Preview type determined by `datum.type` and token name pattern — reuse preview 
      components from `DesignTokensTable.js`
- [ ] Token name column: monospace font (`fontFamily: 'Menlo, monospace'`), full dot-notation
- [ ] Copy button reuses `CopyButton` from `design-tokens-manager` — copies `datum.token` 
      string

### Theming
- [ ] No inline `style={{}}` with color, spacing, or border values (except `fontFamily`)
- [ ] No hardcoded hex colors outside of resolved `datum.value` in the swatch background
- [ ] No styled-components overrides of HPE visual tokens
- [ ] No `<Tag>` components anywhere in the implementation

### Docs site
- [ ] MDX page created at `apps/docs/src/pages/foundation/style-compass.mdx`
- [ ] Page registered in `apps/docs/src/data/structure.tsx` with correct metadata
- [ ] `StyleCompass` component imported and rendered in the MDX page via `<Example>`