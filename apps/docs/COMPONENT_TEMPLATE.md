<!-- See 'apps/docs/src/pages/components/menu.mdx' as an example of the template sections -->

## Introduction

Component name and brief description.

<!-- Component "playground" goes here. Playground is an interactive example to explore
component properties and inspect code -- similar to an embedded Storybook example.
-->

## Use cases (mandatory)

Use this section to answer: When might I use this? Provide a short description that clarifies intent, audience, and typical contexts.

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

## Dos and Do Nots

Show approved patterns and discouraged patterns. Use side-by-side comparisons and clear labels, and explain the reason behind each recommendation in one sentence.

- You might also use caution, where we enourage the user to make a decision with care.

## Data States

Document any states the component can show (loading, empty, error, success, disabled, etc). Include what triggers each state, what the user sees, and any guidance for content or actions in that state.

## Behaviors

If the component requires behaviour specific guidelines, like scrolling behaviour, closing behaviour, etc that content should live under this section.

## Content Guidelines

If the component requires content guidelines such as content format, type of information that could be added, etc, this is the section to describe those.

## Accessibility (mandatory)

Explain the expected experience for assistive technologies. Include required semantics, ARIA usage when relevant, focus order, keyboard support, announced states, and any exceptions or known limitations.

### WCAG compliance

<AccessibilitySection title="[Component]" />
