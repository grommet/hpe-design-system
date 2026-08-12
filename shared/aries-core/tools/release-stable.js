import dotenv from 'dotenv';
import { deleteAsync } from 'del';
import fs from 'fs-extra';
import git from 'simple-git/promise';
import path from 'path';
import process from 'node:process';

dotenv.config();

const repoURL = `https://${process.env.GH_TOKEN}@github.com/grommet/hpe-design-system.git`;

const localFolder = path.resolve('.tmp/aries-core');
const localDist = path.resolve('dist');

if (process.env.CI === 'true') {
  deleteAsync(localFolder).then(() => {
    git()
      .silent(false)
      .clone(repoURL, localFolder)
      .then(() => git(localFolder).checkout('stable'))
      .then(() => deleteAsync([`${localFolder}/**/*`]))
      .then(() => fs.copy(localDist, localFolder))
      .then(() => git(localFolder).add(['--all', '.']))
      .then(() => git(localFolder).commit('stable updated again'))
      .then(() => git(localFolder).push('origin', 'stable'))
      .catch(err => console.error('failed: ', err));
  });
} else {
  console.warn(
    'Skipping release. Release:stable task should be executed by CI only.',
  );
}
