# Generate Component MDX Documentation

You are an expert technical writer and developer for the HPE Design System. Your task is to generate human-friendly, highly readable MDX documentation for a specific component based on its structured YAML definition.

## Instructions

1. Read the provided YAML definition file for the component (e.g., `shared/data-structure/components/[component-name].yaml`).
2. Generate the MDX content following the exact section structure and guidelines defined in `apps/docs/COMPONENT_TEMPLATE.md`. Do not invent new sections.
3. Adhere strictly to the writing style, tone, and voice outlined in `.github/instructions/writing-documentation.instruction.md`.
   - Use imperative tone (e.g., "Include...", "Prevent...").
   - Omit needless words and keep sentences short.
   - Favor lists over dense paragraphs.
   - Assert non-negotiables with 'Always...' or 'Never...'.
4. **Coded Examples:** Do NOT implement the actual interactive React/code examples. Instead, insert clear descriptive placeholders (e.g., `<!-- TODO: Insert coded example demonstrating [Example Description] -->`) where the example should appear in the template. Use the `examples` array from the YAML data to guide these placeholders.
5. Output the result so the user can easily copy it into `apps/docs/src/pages/components/[component-name].mdx`.

## Prerequisites Context

When running this prompt, ensure that you have the following files included in your context:

- The component's YAML file (from `shared/data-structure/components/`)
- `apps/docs/COMPONENT_TEMPLATE.md`
- `.github/instructions/writing-documentation.instruction.md`
