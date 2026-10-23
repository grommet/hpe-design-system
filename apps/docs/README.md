# HPE Design System Site

For HPE designers and developers, this is the documentation site for the HPE Design System. 

## Structure Validation Policy

The docs structure data is validated during build and in CI.

- Default behavior is strict: validation errors fail the process.
- CI should remain strict and fail on data integrity issues.
- Warn-only mode is for local migration/debug workflows only.

Environment flags supported by the structure runtime:

- `STRICT_STRUCTURE_VALIDATION=false` enables warn-only behavior.
- `STRUCTURE_VALIDATION_WARN_ONLY=true` enables warn-only behavior.

Common commands:

```bash
# Validate build-time structure constraints
pnpm --filter docs validate:structure

# Full strict build (default)
pnpm --filter docs build

# Local warn-only build (do not use in CI)
STRICT_STRUCTURE_VALIDATION=false pnpm --filter docs build
```

CI workflow behavior:

- `docs-validate-and-test`: structure validation + unit tests
- `docs-build` (pull requests only): full docs production build gate

## Contributing Content

### Last modified dates

Every MDX page displays a "Last modified" date in its page header, immediately
below the description or WCAG tag when present.
JavaScript pages, including category landing pages, do not display this date.
The date comes from the latest Git commit changing reader-facing MDX content,
following renames. The build parses historical versions of each page rather
than counting every file edit.

- Counts changes to prose, headings, lists, tables, Markdown links and images,
  inline expressions, and code snippets.
- Counts JSX content and reader-facing attributes such as `message`, `label`,
  `title`, `description`, `caption`, `alt`, and `href`, including instructional
  messages inside `bestPractice` objects.
- Ignores imports/exports, comments, ordinary whitespace/reflow, file moves,
  example source URLs (`code`, `docs`, `figma`, etc.), and presentation props
  such as example height or width.

Changes to imported examples, shared components, or other files do not affect
the date, and uncommitted edits are not reflected. Reader-facing JSX attributes
are explicitly listed in `src/scripts/page-metadata.mjs`; extend that list if a
new component uses another prop for guidance. Exported data changes are not
tracked as content, even if an inline expression references that data.
This is a content-change date, not confirmation of an editorial review.

Dates are displayed in English using the UTC calendar date, with the full ISO
timestamp available in the HTML `time` element.

Next.js generates the route-to-date metadata automatically when its configuration
loads for development or production. To generate it separately, run:

```bash
pnpm --filter docs build-page-metadata
```

The generated metadata is ignored by Git. Builds require a Git checkout with
full history; for shallow clones run `git fetch --unshallow`, and in GitHub
Actions use `actions/checkout` with `fetch-depth: 0`. Configure other deployment
providers to supply full history as well. Missing history fails generation
instead of substituting the build date. New MDX files must have a commit before
they can be built.

Standard MDX pages receive the date through the shared documentation header.
MDX pages with a custom/plain layout, such as [What's New](src/pages/whats-new.mdx),
should import `LastModified` from the documentation components and render it
immediately after their main heading. Do not add it to JavaScript landing pages.

TODOs:
- Add background on markdown, .mdx files
- Include instructions for how to find and edit documentation
for templates, components, and any other MDX-based pages.

## Editing "What's New" Page

The ["What's New" page](https://design-system.hpe.design/whats-new) acts as a journal for which Design System stakeholders may 
keep informed with the latest enhancements to the HPE Design System.

Contributors to the HPE Design System should share their contributions with 
community members and stakeholders by adding a brief note about the contribution 
and hyperlinks to relevant content or GitHub issues

The "What's New" page can be found at [src/pages/whats-new.mdx](https://github.com/grommet/hpe-design-system/blob/master/apps/docs/src/pages/whats-new.mdx).
- The file may be [edited directly](https://github.com/grommet/hpe-design-system/blob/master/apps/docs/src/pages/whats-new.mdx) in GitHub.
  1. Enter edit mode
  1. Make Markdown edits
  1. Select "Preview changes" to ensure your edits appear as desired.
  1. Commit changes by selecting "Create a new branch ..." and clicking "Propose changes" button.
- Content may be added / modified within the file by using [basic Markdown syntax](https://www.markdownguide.org/basic-syntax/).

### "What's New" Entry Template

Entries follow the Markdown format:

```
## Week of entry in Month Days, Year format

### Feature 1

- Note highlighting item 1 and [text link](url demonstrating item1)
- Item 2
- ...
- Item n

### Feature 2

- Item 1
- ...
- Item n

...

### Feature n

- Item 1
- ...
- Item n

---------------------------

```
