# Create Figma Token Files Guide

This guide is for HPE Design System maintainers creating new design token files within Figma. New token files might be for previewing token modifications in test enviroments, staging future design token version releases, and other quality assurance tasks.

## Overview

1. [Duplicate master design token files](#duplicating-master-design-token-files).
2. [Prepare files for synchronization](#file-preparation) to `hpe-design-tokens`.
3. [Link library dependencies](#linking-library-dependencies).

## Duplicating master design token files

Master design token files are the currently published design tokens files within the 
[HPE Design System Figma library](https://www.figma.com/files/815326206297160627/project/277423868?fuid=797158032074964818).

1. In Figma, duplicate the Primitive, Semantic, and Component tokens files. The 
duplicated files will be created in your Figma "Drafts" directory.
2. Move files to a Figma Team and Project directory of your choice. As best practice, 
this Team's access should be limited to invited members only so that they are not mistaken from the published master files.

## File preparation

Technically optional, the following file preparation steps are recommended for clear 
identification and recognition of intent (i.e., non-production, testing/QA/staging/preview version).

For each file:
1. Rename the file so that it contains the intent and version. For example, `Design Tokens - Primitives (Copy)` might become ``Design Tokens - Primitives (v3.0.0-alpha)`.
2. Alter the file's "Cover" so that it is visually distinct and recognizable. For example, update the version number to match the file name and alter the background color.

## Linking library dependencies

At this point, the duplicated working files still contain library references to the master files. These references need to be replaced with references to the equivalent working file.

### Primitives working file

1. Open "Manage libraries" from the Assets menu.
2. Remove the master "Design Tokens - Semantic" library.
3. Publish the primitive working file. Ensure the publishing scope is limited to the intended team -- not to pan-HPE design teams.

### Semantic working file

1. Open "Manage libraries" from the Assets menu.
2. Add "Design Tokens - Primitives (your-working-file's-name)".
3. Replace references to the master primitive file with the working file.
  1. Note: The master file must be present in order for reference replacement. If the master file is not currently present, add it now.
  2. Select the master "Design Tokents - Primitives".
  3. Select "Swap library".
  4. From "Choose library", select "Design Tokens - Primitives (your-working-file's-name)".
  5. From the "New variable collection," select the like-named equivalent for each "Used variable collection." In this case `primitives` is the only applicable collection.
  6. Swap the libraries by clicking the "Swap library" button.
4. Reopen "Manage libraries".
5. Remove the primitives and semantic master files.
6. Publish the semantic working file. Ensure the publishing scope is limited to the intended team -- not to pan-HPE design teams.

### Component working file

1. Open "Manage libraries" from the Assets menu.
2. Add "Design Tokens - Semantic (your-working-file's-name)".
3. Pending further testing of the process, for good measure, also add:
  - "Design Tokens - Primitives"
  - "Design Tokens - Primitives (your-working-file's-name)"
4. Replace references to the master files with the working files.
  1. Select the master "Design Tokents - Primitives".
  2. Select "Swap library".
  3. From "Choose library", select "Design Tokens - Primitives (your-working-file's-name)".
  4. From the "New variable collection," select the like-named equivalent for each "Used variable collection." In this case `primitives` is the only applicable collection.
  5. Swap the libraries by clicking the "Swap library" button.
  6. Reopen "Manage libraries".
  7. Select the master "Design Tokents - Semantic".
  8. Select "Swap library".
  9. From "Choose library", select "Design Tokens - Semantic (your-working-file's-name)".
  10. From the "New variable collection," select the like-named equivalent for each "Used variable collection." In this case `color`, `dimension`, and `global`. If all three collections are not present, see [#troubleshooting] before proceeding.
  11. Swap the libraries by clicking the "Swap library" button.
5. Reopen "Manage libraries".
6. Remove the primitives and semantic master files.
7. Publish the component working file. Ensure the publishing scope is limited to the intended team -- not to pan-HPE design teams.

## Conclusion

The working tokens files have now been duplicated and their requisite library dependencies have be re-linked so that variable collection references are properly mapped within the working files.

Syncing, modifying, and testing with the `sync-tokens-to-figma` and `sync-figma-to-tokens` workflows can now be conducted.

## Troubleshooting

Variable collections may only be swapped with collections consumed in the file. If at least one variable from a collection is not used within the file, the collection will not be available for swap (there's nothing available to be swapped out!!!).

As of this writing (2026-07-02), the master "Design Tokens - Component" file does not consume any variables from the semantic/dimension variable collection. To remedy, apply at least one semantic/dimension variable -- from the master file -- to an element within the file.

Suggested remedy: Select the file's "Cover" layer, alter the cover's corner radius to consume a radius token from the **master** semantic file. Resume libray swap procedure. The `dimension` variable collection should now be available to swap.
