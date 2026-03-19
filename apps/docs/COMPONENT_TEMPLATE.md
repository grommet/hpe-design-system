<!-- See 'apps/docs/src/pages/components/menu.mdx' as an example of the template sections -->

## Introduction

**Do not author the component name or description in this file.** The description rendered on the page is sourced from the component's entry in `apps/docs/src/data/structures/components.js`.

**Keep `components.js` and the YAML in sync:** The `description` field in `shared/data-structure/components/[name].yaml` is the source of truth for the refactor. After finalizing the YAML description, copy it into the matching entry in `components.js`. It should be a single, precise sentence. Do not copy it into the MDX body.

<!-- Component "playground" goes here. Playground is an interactive example to explore
component properties and inspect code -- similar to an embedded Storybook example.
-->

## Use cases (mandatory)

Document the specific scenarios in which this component is the right choice. Each use case is a `###` subheading followed by one or two sentences describing the scenario, then a coded example that demonstrates it.

- **Name each use case using a gerund phrase** (verb + -ing + object), e.g., "Submitting a form", "Triggering UI changes", "Toggling between states". This creates consistent, scannable subheadings across all component pages.
- Each subheading answers: *"In what specific situation would I reach for this component?"*
- Do NOT include counter-indications ("when not to use") here. Counter-indications have a clear opposing pattern and belong in a section that documents paired do/don't comparisons. If no section fits, log the content in the TODO or DEPRECATED file.
- Do NOT use a flat bulleted list of actions. Every use case must be a named `###` subheading.

## Anatomy (mandatory)

Anatomy diagrams explain the structural composition of a component or pattern.
Use anatomy diagrams to identify the parts that form a component and clarify their relationships.

Anatomy diagrams prioritize structural clarity over visual fidelity.
Avoid using them to document behavior, styling, or implementation details.

### Purpose

Anatomy diagrams establish a shared understanding of component structure across design and engineering.

They help teams:

- Identify the elements that compose a component or pattern
- Understand component boundaries and hierarchy
- Reduce ambiguity during implementation
- Maintain consistent documentation across the design system

### Anatomy diagram rules

Follow these rules when creating anatomy diagrams

1. Use real UI by default
   Always represent anatomy diagrams using real UI components when the component fits clearly at a readable scale.

   Avoid shrinking complex components until labels become unreadable.

   Instead, represent large patterns using simplified structural diagrams.

   Examples:

   - Use real UI for buttons, inputs, tabs, dropdowns
   - Use simplified structure for wizards, dashboards, page layouts

2. Scale level of detail with component complexity
   Scale the level of detail based on the structural complexity of the component or pattern.

   Avoid labeling every internal element in large patterns.

   Instead, label the primary structural regions.

   Examples:

   - Button: icon, label
   - Wizard: stepper, content area, navigation, footer

3. Represent invisible containers with dotted lines
   Use dotted outlines to represent structural containers that do not have visible UI boundaries.

   Always use dotted lines only when the container exists in the component structure.

   Never use dotted lines for conceptual grouping or visual emphasis.

   Example uses:

   - Borderless buttons
   - Containers defined only by spacing or layout
   - Clickable regions without a visible background

4. Omit outer diagram borders
   Avoid adding a border around the entire anatomy diagram.

   Always include boundaries only when they represent a real structural container.

   Avoid decorative frames that do not communicate component structure.

5. Use monochrome visuals
   Use neutral grayscale styling for anatomy diagrams.

   Avoid decorative color, background fills, or highlighted areas.

   Color may imply semantic meaning and introduce unnecessary visual hierarchy.

6. Use realistic generic content
   Include short, realistic content in anatomy diagrams.

   Avoid placeholder labels such as “Layer title” or “Button label”.

   Instead, use neutral examples such as:

   - “Save changes”
   - “Upload file”
   - “Project settings”

   Realistic content improves readability and comprehension.

7. Separate anatomy from implementation details
   Show structure only in anatomy diagrams.

   Avoid including implementation details such as spacing or elevation values.

   Never include design tokens in anatomy labels.

   Instead, document implementation details in Specs or Properties.

   Example:

   - Avoid
     - gap="medium"
     - elevation="low"
   - Instead, document these values in the component specifications.

### Anatomy annotations

The anatomy diagram has annotation labels for each anatomical part. The annotations should appear
in a markdown table with the part name, purpose, required vs. optional, and notes.

| Label  | Region          | Purpose                                                   |                         Required                         | Notes                               |
| :----: | --------------- | --------------------------------------------------------- | :------------------------------------------------------: | ----------------------------------- |
| **1**  | **[Part Name]** | Opens the menu when clicked.                              | <span><Checkmark a11yTitle="true" size="small" /></span> | Can include a label, icon, or both. |
| **1a** | **[Sub Part]**  | Describes the menu's function or the category of actions. |                         Optional                         | --                                  |

### Anatomy diagram checklist

Before publishing an anatomy diagram, verify the following:

- Real UI is used when the component fits at readable scale
- Large patterns use simplified structural diagrams
- Dotted lines represent invisible containers only
- No outer frame surrounds the diagram
- Visuals use neutral monochrome styling
- Content uses realistic generic examples
- Anatomy labels identify structure only
- Design tokens appear only in the specifications section

## Variants

This section showcases all available types/variants of the component.

### Variants section rules

- Each component “variant” is represented by a well-defined object containing:
  - kind: a unique identifier for the variant (string or enum).
  - coded example: reference to the coded component.
  - description: human-readable explanation of what the variant is for.
  - usage: short guidance or examples on when/how to use it.
  - defaultView: preferred default view for this component instance (e.g., "table" | "list" | "grid").
- Use data and friends and viewtoggles to showcase examples in different views (table, list and grid) format.
- Each component might present better in one view variant over another, so we should set a default for each. However we should save user preferences in case they change the default.
- use local storage to remember the user's preferred view selection by component
- consider creating an -use local storage- reusable hock similar to -use session storage-

**Belongs here:** Distinct visual or functional forms of the component that a developer explicitly opts into (e.g., primary, icon-only, toolbar). A variant is a stable, named configuration.
**Does not belong here:** Transient states triggered by interaction or application logic (e.g., disabled, loading, hover) — those are states. If a form of the component is determined by data or context rather than an explicit prop choice, log it in the TODO or DEPRECATED file rather than forcing it into a variant.

## Dos and Do Nots

Show approved patterns and discouraged patterns. Use side-by-side comparisons and clear labels, and explain the reason behind each recommendation in one sentence.

- You might also use caution, where we enourage the user to make a decision with care.
- **Do not add a `###` subheading or a prose description above each pair.** The `message` prop on each `<Example bestPractice>` is the only label needed. Place `<BestPracticeGroup>` blocks directly under the `## Dos and Don'ts` heading with no surrounding headings or paragraphs.

**Belongs here:** Any guidance that has a clear approved pattern paired with a discouraged one — a rule with two sides.
**Does not belong here:** Rules that have no opposing pattern, or rules about what to write rather than how to design. If a piece of content doesn't have a natural do/don't pairing, place it in the most specific section that fits. If no section fits, log it in the TODO or DEPRECATED file.

## Behaviors and States

Document transient states and behavioral guidelines for the component.

### Interactive States

Document states like hover, active, or focus.

**Belongs here:** Visual or behavioral changes driven directly by user input — hover, focus, active, pressed.
**Does not belong here:** States set programmatically by the application (e.g., disabled, loading) or driven by data.

### Application States

Document states like loading, disabled, success, or error/validation. Include what triggers each state and what the user sees.

**Belongs here:** States set by application logic regardless of user interaction — disabled, loading, success, error, read-only.
**Does not belong here:** States triggered directly by user input, or states that reflect data content rather than application control.

### Data States

Document states like empty or populated. Include any guidance for content or actions in that state.

**Belongs here:** States driven by the presence or absence of data — empty, populated, loading data, error fetching.
**Does not belong here:** States controlled by the application or triggered by user interaction.

### General Behaviors

If the component requires behavior specific guidelines, like scrolling behavior, closing behavior, etc., that content should live under this section.

**Belongs here:** Any rule about how the component acts or positions itself in context — layout, ordering, responsive behavior, focus management, closing behavior. If the rule describes what the component *does*, it lives here.
**Does not belong here:** Rules about what to *write* inside the component, or pattern-level do/don't comparisons. If no subsection of Behaviors and States fits, log the content in the TODO or DEPRECATED file rather than placing it here by default.

## Content Guidelines

Document rules for what to **write** inside the component — label text, placeholder text, error messages, character limits, tone, and terminology.

**Belongs here:** Any rule that governs the words, phrasing, or tone of the content placed inside the component.
**Does not belong here:** Rules about how the component behaves, how it is laid out, or whether to use it at all. If a piece of content isn't a writing rule, place it in the most specific section that fits. If no section fits, log it in the TODO or DEPRECATED file rather than placing it here by default.

## Accessibility (mandatory)

Explain the expected experience for assistive technologies. Include required semantics, ARIA usage when relevant, focus order, keyboard support, announced states, and any exceptions or known limitations.

**Belongs here:** Keyboard interaction patterns, ARIA roles and attributes, screen reader announcements, focus order, and known AT limitations specific to this component.
**Does not belong here:** General UX guidance, visual design rules, or behavioral rules that apply regardless of assistive technology. If accessibility-adjacent content doesn't fit here, log it in the TODO or DEPRECATED file.

### WCAG compliance

<AccessibilitySection title="[Component]" />
