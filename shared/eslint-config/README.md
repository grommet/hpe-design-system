# @hpe/eslint-config

Internal sharable ESLint flat-config package for the HPE Design System monorepo.

## Usage

In a project `eslint.config.mjs`:

```js
import { createNextRules } from '@hpe/eslint-config';

export default createNextRules();
```

Other presets/factories are exported from `@hpe/eslint-config` for React/Vite, TypeScript-only, and legacy React/Airbnb rule behavior.
