// grommet-sync.js

// Ensures the Grommet dependency https://github.com/grommet/grommet/tarball/stable
// is pointing to the latest commit on the Grommet Stable branch.
// Why neccessary? Each time a new commit is made to Grommet Stable, a new sha-1
// signature is assigned to the commit. When this project's CI build process
// goes to retrieve the dependency, it compares the sha-1 it receives to the
// sha-1 signature in the yarn.lock / build cache. If the signatures do not
// match, the CI build will fail. Because Grommet is being actively
// developed, the sha-1 changes frequently resulting in mismatching sha-1s
//  regularly, and thus, regularly failed CI builds.

const fs = require('fs');

const content = fs.readFileSync('yarn.lock', 'utf-8');
const dependency =
  '"grommet@https://github.com/grommet/grommet/tarball/stable"';

const lines = content.split('\n');
const origCount = lines.length;

const beginIndex = lines.findIndex(line => line.startsWith(dependency));

const endIndex =
  lines.findIndex(
    (line, index) => !line.startsWith(' ') && index > beginIndex,
  ) + 1;

const deleteCount = endIndex - beginIndex;

lines.splice(beginIndex, deleteCount);

if (lines.length + deleteCount === origCount) {
  fs.writeFileSync('yarn.lock', lines.join('\n'));
} else {
  console.error(
    // eslint-disable-next-line max-len
    `ERROR: Error removing ${dependency} from yarn.lock. Lines counts did not match, indicating that the yarn.lock file was not parsed correctly.`,
  );
}
