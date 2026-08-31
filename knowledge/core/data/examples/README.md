# Design System Examples

The examples directory serves as a **reference implementation library** for the design system patterns. Each example demonstrates best practices for composing Grommet components according to HPE Design System principles.

## Role in the Project

The examples are **tightly integrated with pattern definitions** in `design-system/patterns/`. Each pattern YAML file references example code files from this directory.

For example, in `design-system/patterns/application-shell.yaml`:

```yaml
examples:
- description: Complete Application Shell with Navigation
  codeFile: design-system/examples/application-shell/complete-application-shell-with-navigation.tsx
- description: Mobile-Responsive Navigation with Layer
  codeFile: design-system/examples/application-shell/mobile-responsive-navigation-with-layer.tsx
```

## Data Flow

1. **Pattern YAML** → defines `examples` array with `codeFile` references
2. **Build System** (`npm run build:data`) → aggregates patterns and **inlines example code** into `design-system.json`
3. **Consumer Apps** → access full example code via the design system data
4. **Context Generator** → surfaces example code when responding to queries like *"Build an application shell"*

## Current Examples Structure

| Pattern | Example Files | Purpose |
|---------|--------------|---------|
| `application-shell/` | 4 files + `template.tsx` | Complete app layouts with navigation, context panes, responsive behavior |
| `dashboard-layout/` | 3 files + `template.tsx` | Metric cards, activity feeds, responsive grids |
| `data-table-with-filtering/` | 3 files + `template.tsx` | Tables with search, sorting, custom filters |
| `form-with-validation/` | 2 files + `template.tsx` | Contact forms, custom validation logic |
| `login-form/` | `template.tsx` | Authentication form pattern |
| `navigation-menu/` | 5 files + `template.tsx` | Flat, hierarchical, grouped, mobile navigation |

## Key Principles

- **No hardcoded values** — all examples use Grommet props + HPE design tokens (`pad="medium"`, `background="background-front"`)
- **Copy-paste ready** — developers can use these as starting points when building with the design system
- **AI-friendly** — context generator includes full example code in responses to help AI agents understand composition patterns
- **Pattern-aligned** — each example demonstrates the documented pattern's "problem/solution/usage" rules

## Creating New Examples

When adding a new pattern to the design system:

1. Create a directory in `design-system/examples/` matching the pattern name
2. Add one or more `.tsx` example files demonstrating the pattern
3. Include a `template.tsx` as the canonical/simplest implementation
4. Reference the example files in the pattern's YAML definition
5. Run `npm run build:data` to inline the examples into the build output

See [`.github/copilot-instructions.md`](../../.github/copilot-instructions.md) for complete guidance on pattern creation and the agentic development protocol.
