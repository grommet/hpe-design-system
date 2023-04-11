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
      .then(() => git(localFolder).checkout('gh-pages'))
      .then(() =>
        fs.copy(
          `${localDist}/grommet-theme-hpe.min.js`,
          `${localFolder}/grommet-theme-hpe-2.min.js`,
        ),
      )
      .then(() =>
        fs.copy(
          `${localDist}/grommet-theme-hpe.json`,
          `${localFolder}/grommet-theme-hpe-2.json`,
        ),
      )
      .then(() => git(localFolder).add(['--all', '.']))
      .then(() =>
        git(localFolder).commit('grommet-theme-hpe .min.js and .json updated'),
      )
      .then(() => git(localFolder).push('origin', 'gh-pages'))
      .catch((err) => console.error('failed: ', err));
  });
} else {
  console.warn(
    'Skipping release. Release-gh-pages task should be executed by CI only.',
  );
}
