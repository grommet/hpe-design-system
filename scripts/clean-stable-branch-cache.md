Instructions for clearing pnpm cache of stable branch tarballs.

```shell
STORE=$(pnpm store path)

# 1. Clear URL-level integrity cache for the tarball
rm -rf "$STORE/https+++codeload.github.com+grommet+grommet-theme-hpe+legacy.tar.gz+refs+heads+stable"

# 2. Update the catalog URL to pin the new commit SHA
#    (edit pnpm-workspace.yaml)

# 3. Install — pnpm will download the new tarball
pnpm install

# 4. Patch the shared store index with the new tarball's manifest
NEW_SHA=<commit-sha>
python3 -c "
import json
tarball = json.load(open('$STORE/https+++github.com+grommet+grommet-theme-hpe+tarball+${NEW_SHA}/integrity.json'))
# find the existing index file: ls $STORE/index/*/grommet-theme-hpe@8.1.4.json
old_index = '<path-to-old-index>'
json.dump(tarball, open(old_index, 'w'), separators=(',', ':'))
"

# 5. Clear the virtual store entry and reinstall
rm -rf node_modules/.pnpm/grommet-theme-hpe@8.1.4_*
pnpm install
```