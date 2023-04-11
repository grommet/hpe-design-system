/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import del from 'del';
import fs from 'fs-extra';
import path from 'path';
import { simpleGit as git } from 'simple-git';

const repoURL = `https://${process.env.GH_TOKEN}@github.com/grommet/grommet-theme-hpe`;
const localFolder = path.resolve('.tmp/grommet-theme-hpe');
const localDist = path.resolve('dist');

if (process.env.CI) {
  del(localFolder).then(() => {
    git()
      .clone(repoURL, localFolder)
      .then(() => git(localFolder).checkout('NEXT-stable'))
      .then(() => del([`${localFolder}/**/*`]))
      .then(() => fs.copy(localDist, localFolder))
      .then(() => git(localFolder).add(['--all', '.']))
      .then(() => git(localFolder).commit('NEXT-stable updated'))
      .then(() => git(localFolder).push('origin', 'NEXT-stable'))
      .catch((err) => console.error('failed: ', err));
  });
} else {
  console.warn(
    'Skipping release. Release:next-stable task should be executed by CI only.',
  );
}
