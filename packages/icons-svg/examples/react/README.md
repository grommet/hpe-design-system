# React Example

Demonstrates three ways to use `@hpe-design/icons-svg` in a React + Vite project.

## Setup

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install @hpe-design/icons-svg
```

Copy `App.tsx` into `src/App.tsx`, then run `npm run dev`.

## Approaches

| Approach      | Import style                                    | CSS colour control | Use when                                  |
| ------------- | ----------------------------------------------- | ------------------ | ----------------------------------------- |
| `<img>` tag   | URL (`import icon from '…/add.svg'`)            | ❌                 | Static decorative icons, no colour needed |
| Inline SVG    | Raw string (`import icon from '…/add.svg?raw'`) | ✅                 | Coloured icons, known at build time       |
| Dynamic fetch | Metadata object + `fetch()`                     | ✅                 | Icon name only known at runtime           |

## Vite configuration

The `?raw` suffix is built into Vite — no additional configuration is needed.
For URL imports (`import icon from '…/add.svg'`) Vite also works out-of-the-box.

See [`../bundlers/vite.config.example.js`](../bundlers/vite.config.example.js)
for an explicit SVG asset configuration that can replace the `?raw` suffix with
a global rule.
