# Extract MDX to YAML Component Definition

You are an expert technical writer and developer for the HPE Design System. Your task is to reverse-engineer existing human-readable `.mdx` documentation into a highly structured `YAML` data format.

## Instructions

1. Read the provided existing component MDX documentation file.
2. Read the `ComponentDefinition` interface schema found in `shared/data-structure/types.ts`.
3. Extract all relevant information from the MDX (description, props, usage, accessibility, etc.) and map it into the `YAML` format strictly matching the `ComponentDefinition` schema. Ensure `contentGuidelines` and `dosAndDonts` are properly populated if applicable. Unmappable or lengthy legacy content that doesn't fit should be logged by you into `apps/docs/todos/DEPRECATED-[component-name].md`.
4. **Code Examples:** Do NOT extract or write the raw code into the YAML `examples` array. Instead, provide relative paths pointing to the existing example files located in `apps/docs/src/examples/components/`. For example: `path: apps/docs/src/examples/components/[component-name]/[ExampleName].js`.
5. **Distinguish Variants vs. Behaviors:** Morphological types (e.g., Icon-only, Toggle, Sizes) belong in `variants`. Transient states (e.g., Disabled, Loading, Validation/Error) belong in the `behaviors` object (split appropriately into `interactiveStates`, `applicationStates`, or `dataStates`).
6. If there is missing information in the MDX that is required by the `ComponentDefinition` schema, leave it blank or omit the field if optional, so we can identify the gaps later.
7. Output the resulting YAML content so it can be saved as `shared/data-structure/components/[component-name].yaml`.

## Prerequisites Context

When running this prompt, ensure that you have the following files included in your context:

- The component's existing `.mdx` file (e.g. `apps/docs/src/pages/components/button.mdx`)
- `shared/data-structure/types.ts`
- `shared/data-structure/COMPONENT_EXAMPLE.yaml` (as a structural reference)
