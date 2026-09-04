// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import del from 'del';
import fs from 'fs-extra';
import git from 'simple-git';
import path from 'path';
import 'dotenv/config';

// avoid hanging on an interactive credential prompt if auth is rejected
process.env.GIT_TERMINAL_PROMPT = '0';

const repoURL = `https://${process.env.GH_TOKEN}@github.com/grommet/hpe-design-system.git`;
const localFolder = path.resolve('.tmp/design-tokens');
const BUILD_DIR = 'dist';
const localDist = path.resolve(BUILD_DIR);

const [BRANCH] = process.argv
  .find(v => v.includes('--branch='))
  .split('=')
  .slice(-1);

const files = ['package.json', 'README.md', 'COPYRIGHT.md', 'LICENSE'];

const PUSH_RETRIES = 3;
const PUSH_RETRY_DELAY_MS = 5000;
const wait = ms =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });

// push to origin intermittently fails with a transient auth error; retry
async function pushWithRetry(folder, branch, attempt = 1) {
  try {
    await git(folder).push('origin', branch);
  } catch (err) {
    if (attempt >= PUSH_RETRIES) throw err;
    console.warn(
      `push attempt ${attempt} failed, retrying in ${PUSH_RETRY_DELAY_MS}ms:`,
      err.message,
    );
    await wait(PUSH_RETRY_DELAY_MS);
    return pushWithRetry(folder, branch, attempt + 1);
  }
  return undefined;
}

if (process.env.CI) {
  del(localFolder).then(() => {
    git()
      .clone(repoURL, localFolder)
      .then(() => git(localFolder).checkout(BRANCH))
      .then(() => del([`${localFolder}/**/*`]))
      .then(() => fs.copy(localDist, `${localFolder}/${BUILD_DIR}`))
      .then(() =>
        files.forEach(file =>
          fs.copyFile(path.resolve(file), `${localFolder}/${file}`),
        ),
      )
      .then(() =>
        fs.copyFile(
          `${path.resolve('src')}/types/esm/index.d.ts`,
          `${localFolder}/${BUILD_DIR}/esm/index.d.ts`,
        ),
      )
      .then(() =>
        fs.copyFile(
          `${path.resolve('src')}/types/grommet/index.d.ts`,
          `${localFolder}/${BUILD_DIR}/grommet/index.d.ts`,
        ),
      )
      .then(() => git(localFolder).add(['--all', '.']))
      .then(() => git(localFolder).commit(`${BRANCH} updated`))
      .then(() => pushWithRetry(localFolder, BRANCH))
      .catch(err => {
        console.error('failed: ', err);
        // surface the failure so CI doesn't report success on a failed release
        process.exitCode = 1;
      });
  });
} else {
  console.warn(
    'Skipping release. release-stable task should be executed by CI only.',
  );
}
