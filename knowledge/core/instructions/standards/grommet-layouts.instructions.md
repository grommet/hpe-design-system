---
name: Grommet Layouts
description: 'How to construct HPE Design System application and page layouts with `grommet`.'
applyTo: '**/*.{js,jsx,ts,tsx}'
---

# Instructions: Constructing HPE Design System Layouts with Grommet

When building application and page layouts that align with the HPE Design System using `grommet`, follow these guidelines to ensure consistency and usability across all HPE applications.

## Rules and Guidelines

- **Follow page layout structure**: Use Grommet's specialized page layout components `Page`, `PageContent`, and `PageHeader` to create consistent page structures.
- **Implement app layout**: Use Grommet's `Grid` component to create a consistent app layout with header, sidebar, main content area, and optional context panel.
- **Use navigation components**: Utilize Grommet's `Nav`, `Menu`, and `Anchor` components to build intuitive and accessible navigation menus.
- **Ensure light/dark mode support**: Leverage Grommet's theming capabilities to provide seamless light and dark mode experiences.
- **Ensure responsiveness**: Use Grommet's responsive design features to create layouts that adapt to various screen sizes and devices. See [grommet-responsive.instructions.md](grommet-responsive.instructions.md) for more details.
- **Page background tokens**: `Page` and `PageContent` should apply `background-back` and `background-front` respectively to ensure proper contrast and adherence to the HPE Design System's visual guidelines.

## App Layout

An app's primary layout or shell should be created with Grommet's `Grid` and consist of the following key areas:

1. **Header**: Use the `Header` component for the top navigation bar, which typically contains the application title, logo, workspace context switcher, and global services such as notifications, user preferences, and account management.
2. **Sidebar**: See [Navigation](#navigation) for implementing a sidebar navigation. This provides the main navigation for the application.
3. **Main content area**: Use the `Main` component to define the main content area where the primary content of each page will be displayed.
4. **Context panel**: Optionally, use a `Box` or `Layer` component for a context panel that provides additional information or actions related to the main content.

## Navigation

Use Grommet's `Nav`, `Menu`, and `Anchor` components to create intuitive and accessible navigation menus.

1. **Primary navigation**: Compose Grommet's `Nav`, `List`, `Button`, `Collapsible`, and `Layer` primitives to implement sidebar navigation. The nav sidebar container must use `background="background-front"` while the `Main` content area uses `background="background-back"`:

   ```jsx
   <Box gridArea="nav" as="aside" background="background-front">
     <Nav>{/* navigation items */}</Nav>
   </Box>
   <Main gridArea="main" background="background-back">
     {/* Page content */}
   </Main>
   ```

2. **Breadcrumbs**: Use the `parent` prop of `PageHeader` to populate breadcrumbs, giving users context about their location within the application.
3. **Skip to content**: Implement a "Skip to Content" link at the top of your pages using `SkipLinks` (container) and `SkipLink` (each link) from `grommet`. Place `<SkipLinks>` before `<Header>` and pair each `SkipLink` `id` with a matching `id` on the target (e.g. `<Main id="main-content">`). `SkipTo` does not exist in grommet 2.x — verify component availability against the installed `grommet` version before assuming it exists.

## Page Layout

This section covers the layout and structure of individual pages within your application, typically presented within the main content area of the app layout.

1. **Page structure**: Use `Page`, `PageContent`, and `PageHeader` components to define the overall structure of your pages. These components help maintain consistency across different pages and provide built-in responsive margins and text.
   - **Never add `pad` to `PageContent`** — its internal padding is managed entirely by `grommet-theme-hpe`. Adding a `pad` prop overrides the theme's responsive page margins.
2. **Layout components**: Use components like `Box`, `Grid`, `Header`, `Footer`, and `Main` to create responsive and accessible layouts.

### Content Containers

When structuring content within pages, use Grommet's `Box`, `Card`, and semantic HTML `as` props to create well-defined content areas.

1. **Box**: Use `Box` for flexible layout and spacing of content sections.
2. **Card**: Use `Card` (with `CardHeader`, `CardBody`, `CardFooter`) to encapsulate related information or actions in a visually distinct manner.
3. **Section**: Use `<Box as="section">` to group related content and provide clear separation between different parts of the page.

## Content Hierarchy and Spacing

- **Spacing between sections**: Spacing between major sections of a page should be larger than spacing between elements within a section. Begin with `xlarge` spacing for sections and `medium` or `small` for elements within sections, adjusting as necessary based on content density.
- **Consistent margins and padding**: Use consistent margins and padding throughout the application to maintain visual harmony.
- **Typography hierarchy**: Use Grommet's typography components (`Heading`, `Text`) to establish a clear hierarchy of information, making it easier for users to scan and understand content.

---

## Related References

- [coding-guidelines.instructions.md](coding-guidelines.instructions.md): General Grommet component, token, and accessibility rules.
- [grommet-responsive.instructions.md](grommet-responsive.instructions.md): Responsive design patterns for layouts.
- [grommet-data.instructions.md](grommet-data.instructions.md): Presenting and manipulating data collections.
