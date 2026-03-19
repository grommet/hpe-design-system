# Generate Component MDX Documentation

You are an expert technical writer and developer for the HPE Design System. Your task is to generate human-friendly, highly readable MDX documentation for a specific component based on its structured YAML definition.

## Instructions

1. Read the provided YAML definition file for the component (e.g., `shared/data-structure/components/[component-name].yaml`).
2. Generate the MDX content following the exact section structure and guidelines defined in `apps/docs/COMPONENT_TEMPLATE.md`. Do not invent new sections.
   - **Do not render the component's `name` or `description` fields from the YAML as prose in the MDX.** These are injected by the page layout from the YAML automatically. Begin the MDX body directly with the playground `<Example>` block.
   - **Use cases:** Render each item in `usage.whenToUse` as a `###` subheading. Each subheading must be a gerund phrase (verb + -ing + object), e.g., "Submitting a form", "Triggering UI changes". Follow with one or two sentences describing the scenario. Then: if a purpose-built example file exists in the `examples` array specifically for this use case, include it as a live `<Example>` block; if no dedicated example exists, insert a `{/* TODO: Add a coded example that demonstrates [use case description] */}` placeholder instead. Do NOT repurpose examples from Variants or other sections to fill a use case slot. Do NOT render `usage.whenToAvoid` items here — surface them as `dont` entries in `## Dos and Don'ts` instead.
3. Adhere strictly to the writing style, tone, and voice outlined in `.github/instructions/writing-documentation.instruction.md`.
   - Use imperative tone (e.g., "Include...", "Prevent...").
   - Omit needless words and keep sentences short.
   - Favor lists over dense paragraphs.
   - Assert non-negotiables with 'Always...' or 'Never...'.
4. **Coded Examples:** Do NOT implement the actual interactive React/code examples. Instead, insert clear descriptive placeholders (e.g., `{/* TODO: Insert coded example demonstrating [Example Description] */}`) where the example should appear in the template. Use the `examples` array from the YAML data to guide these placeholders.
5. **Anatomy Annotations:** When generating the Anatomy section from the YAML `anatomy` array, strictly format the output as a Markdown table matching the columns in `apps/docs/COMPONENT_TEMPLATE.md` (`Label`, `Region`, `Purpose`, `Required`, `Notes`). For `Required` properties set to true, use `<span><Checkmark a11yTitle="true" size="small" /></span>`. For optional properties, write `Optional`.
6. **Behaviors and States:** When generating the `## Behaviors and States` section, map `behaviors.interactiveStates`, `behaviors.applicationStates`, and `behaviors.dataStates` to their respective `### ` subheaders. Only generate subheaders if data exists.
7. Ensure that `contentGuidelines` and `dosAndDonts` objects from the YAML configuration are correctly translated into the `## Content Guidelines` and `## Dos and Do Nots` sections using appropriate lists or `<BestPracticeGroup>` layouts as appropriate (do not mock real code, just content).
8. Output the result so the user can easily copy it into `apps/docs/src/pages/components/[component-name].mdx`.

## Prerequisites Context

When running this prompt, ensure that you have the following files included in your context:

- The component's YAML file (from `shared/data-structure/components/`)
- `apps/docs/COMPONENT_TEMPLATE.md`
- `.github/instructions/writing-documentation.instruction.md`
