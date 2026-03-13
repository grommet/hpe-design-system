## Use cases (mandatory)

The examples in this section should answer to the question: When might I use this? and provide a brief description of the use case.

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

6. Separate anatomy from implementation details
	Show structure only in anatomy diagrams.

	Avoid including implementation details such as spacing or elevation values.

	Never include design tokens in anatomy labels.

	Instead, document implementation details in Specs or Properties.

	Example:
	- Avoid
	  - gap="medium"
	  - elevation="low"
	- Instead, document these values in the component specifications.

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

## Types

This section showcases all available types/variants of the component. 

### Types section rules

- Each component “type” is represented by a well-defined object containing:
	- kind: a unique identifier for the type (string or enum).
	- coded example: reference to the coded component.
	- description: human-readable explanation of what the type is for.
	- usage: short guidance or examples on when/how to use it.
	- defaultView: preferred default view for this component instance (e.g., "table" | "list" | "grid").
- Use data and friends and viewtoggles to showcase examples in different views (table, list and grid) format.
- Each component might present better in one view type over another, so we should set a default for each. However we should save user preferences in case they change the default.
- use local storage to remember the user's preferred view selection by component
- consider creating an -use local storage- reusable hock similar to -use session storage-

## Dos and Do Nots

Area to demonstrate best practices vs. usage we do not encourage.

## Data States

If the component might have different states, such as loading, empty, etc this is the section to showcase how that would look like and provide explanations, if necessary.

## Behaviors

If the component requires behaviour specific guidelines, like scrolling behaviour, closing behaviour, etc that content should live under this section.

## Content Guidelines

If the component requires content guidelines such as content format, type of information that could be added, etc, this is the section to describe those.

## Accessibility (mandatory)

Area to describe how the component should work with assistive technologies.
