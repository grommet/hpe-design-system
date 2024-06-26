import del from 'del';
import fs from 'fs-extra';
import git from 'simple-git';
import path from 'path';
import 'dotenv/config';

const repoURL = `https://${process.env.GH_TOKEN}@github.com/grommet/hpe-design-system.git`;
const localFolder = path.resolve('.tmp/design-tokens');
const localDist = path.resolve('dist');

const BRANCH = 'design-tokens-alpha-stable';

if (process.env.CI) {
  del(localFolder).then(() => {
    git()
      .clone(repoURL, localFolder)
      .then(() => git(localFolder).checkout(BRANCH))
    //   .then(() => del([`${localFolder}/**/*`]))
      .then(() => fs.copy(localDist, localFolder))
      .then(() => git(localFolder).add(['--all', '.']))
      .then(() => git(localFolder).commit(`${BRANCH} updated`))
      .then(() => git(localFolder).push('origin', BRANCH))
      .catch((err) => console.error('failed: ', err));
  });
} else {
  console.warn(
    'Skipping release. release-stable task should be executed by CI only.',
  );
}
