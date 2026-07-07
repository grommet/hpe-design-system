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
2. Move the duplicated files into a Figma Team and Project directory of your choice. Be careful to move only duplicated files, not the master files. As best practice, 
this Team's access should be limited to invited members only so that they are not mistaken from the published master files.

## File preparation (recommended)

These steps are technically optional but strongly recommended so non-production files are clearly identifiable (testing/QA/staging/preview).

For each file:
1. Rename the file so that it contains the intent and version. For example, `Design Tokens - Primitives (Copy)` might become ``Design Tokens - Primitives (v3.0.0-alpha)`.
2. Alter the file's "Cover" so that it is visually distinct and recognizable. For example, update the version number to match the file name and alter the background color.

## Linking library dependencies

After duplication, working files still reference master libraries. These references need to be replaced with references to the equivalent working file.

### Primitives working file

1. Open "Manage libraries" from the Assets menu.
2. Remove the master "Design Tokens - Semantic" library.
3. Publish the primitive working file. Set the publishing scope to the intended team only, and **do not** publish to “everyone at HPE (organization)” (pan-HPE).

### Semantic working file

1. Open "Manage libraries" from the Assets menu.
2. Add **Design Tokens - Primitives (your duplicated/new working file name)**..
3. Replace references to the master primitives file with the working primitives file.
   1. **Note:** The master primitive file must be present to perform a library swap. If it is not present, add it temporarily.
   2. Select the master **Design Tokens - Primitives**.
   3. Select **Swap library**.
   4. From **Choose library**, select **Design Tokens - Primitives (your duplicated/new working file name)**.
   5. In **New variable collection**, map each collection to its like-named equivalent in **Used variable collection**. In this case, only `primitives` applies.
   6. Click **Swap library** to confirm.
4. Reopen "Manage libraries".
5. Remove the master Design Tokens - Primitives and master Design Tokens - Semantic libraries.
6. Publish the semantic working file. Set publishing scope to the intended team only. **Do not** publish to everyone at HPE (organization).

### Component working file

1. Open **Manage libraries** from the Assets menu.
2. Add **Design Tokens - Semantic (your duplicated/new working file name)**.
3. Pending further process validation, also add:
   - **Design Tokens - Primitives**
   - **Design Tokens - Primitives (your duplicated/new working file name)**
4. Replace references to master libraries with working-file libraries.
   1. Select the master **Design Tokens - Primitives**.
   2. Select **Swap library**.
   3. From **Choose library**, select **Design Tokens - Primitives (your duplicated/new working file name)**.
   4. In **New variable collection**, map each collection to its like-named equivalent in **Used variable collection**. In this case, only `primitives` applies.
   5. Click **Swap library**.
5. Reopen **Manage libraries**.
6. Select the master **Design Tokens - Semantic**.
7. Select **Swap library**.
8. From **Choose library**, select **Design Tokens - Semantic (your duplicated/new working file name)**.
9. In **New variable collection**, map each collection to its like-named equivalent in **Used variable collection**. In this case: `color`, `dimension`, and `global`.
   - If all three are not present, see [Troubleshooting](#troubleshooting) before continuing.
10. Click **Swap library**.
11. Reopen **Manage libraries**.
12. Remove the master **Design Tokens - Primitives** and master **Design Tokens - Semantic** libraries.
13. Publish the component working file. Set publishing scope to the intended team only; **do not** publish to **Everyone at HPE (organization)**.

## Primitives working file, again ☹️

This is a step needed to resolve semantic colors consumed in the primitives' file cover -- a bit of a circular dependency.

1. Open "Manage libraries" from the Assets menu.
2. Add "Design Tokens - Semantic" master file.
3. Add "Design Tokens - Semantic (your-working-file's-name)".
4. Replace references to the master files with the working files.
5. Select the master "Design Tokents - Semantic".
  1. Select "Swap library".
  2. From "Choose library", select "Design Tokens - Semantic (your-working-file's-name)".
  3. From the "New variable collection," select the like-named equivalent for each "Used variable collection." In this case `color` is the only applicable collection.
  4. Swap the libraries by clicking the "Swap library" button.
6. Reopen "Manage libraries".
7. Remove the semantic master file.
  
## Conclusion

The working tokens files have now been duplicated and their requisite library dependencies have be re-linked so that variable collection references are properly mapped within the working files.

Syncing, modifying, and testing with the `sync-tokens-to-figma` and `sync-figma-to-tokens` operational workflows can now be conducted.

## Troubleshooting

Variable collections can be swapped only when they are actively consumed in the file. If a collection does not appear as swappable, it usually means no variable from that collection is currently in use.

To fix this:

1. Apply at least one variable from the corresponding master library collection to any element in the file.
2. For example, apply a token such as corner radius, color, spacing, or typography to the file's cover image.
3. Reopen **Manage libraries** and retry **Swap library**.

Once the collection is consumed in the file, it should appear as available for swapping.
