# HPE Design System Documentation Refactor

## Overview

This prompt is designed to assist in refactoring the documentation for the HPE Design System. The goal is to improve clarity, organization, and accessibility of the documentation while ensuring it remains comprehensive and user-friendly.

## Objectives

1. **Improve Structure**: Reorganize the documentation to create a more logical flow, following a consistent component documenation template and content sections.
2. **Data-Driven Content**: All component definitions are defined in a structured data format (YAML). The documentation should be generated from this data to ensure consistency and ease of updates.
3. **Enhanced Readability**: See `writing-documentation.instruction.md` for guidelines on tone, voice, and style to ensure the documentation is clear and engaging.

## Scope

- Limited to Components. Foundation, Design Tokens, Templates, and Learn sections are out of scope.
- The documentation template will be a combination of copy plus interactive coded examples.
  - For the first phase, the focus will be on copy and rearranging where examples appear. Altering the examples themselves is out of scope. If an example is missing, a placeholder should be added.
  - Placeholders should state the purpose of the example and what it should be demonstrating.
  - Implementation of the examples is out of scope.

## Implementation approach

1. Define component data structure in YAML format.
2. Define documentation template for components, including sections such as Overview, Usage, API Reference, Examples, and Accessibility.
3. Extract existing documentation content for each component and populate the YAML data structure.
4. Generate new documentation pages for each component using the defined template and populated data.
5. Review and refine the generated documentation to ensure it meets quality standards (`writing-documentation.instruction.md`) and is free of errors (accuracy, completeness, and comprehension).

- If there are gaps in the data or content, they should be flagged and documented in a TODO list for further research and completion. Do not make assumptions or fabricate information to fill gaps. Instead, clearly identify what information is missing and needs to be researched or provided by the team.
- If there is content which seems valuable, but does not fit within the defined template or structure, it should be flagged and documented in a TODO list for further review and consideration. Clearly articulate why the content is valuable and how it could potentially be integrated into the documentation, while also acknowledging that it may require adjustments to the template or structure to accommodate it effectively.
