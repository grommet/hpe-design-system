import { writeFileSync } from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const primitives = require('../../../../design-tokens/tokens/primitive/primitives.base.json');
const { exec } = require('child_process');

const TOKENS_DIR = '/Users/mglissmann/Code/aries/design-tokens';

const staticTokens = { ...primitives.base.static };
const { spacing } = staticTokens;
const myscale = [1, 2, 3, 4, 6, 8, 12, 16, 20, 24, 32, 44, 60, 80, 108, 140];

const runTokenBuild = () => {
  const command = `cd ${TOKENS_DIR} && yarn build`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
};

function updateTokens(scale) {
  if (scale[0] !== 0) {
    scale.unshift(0);
  }

  const mapping = {
    none: 0,
    hair: scale[1],
    xxsmall: scale[3],
    xsmall: scale[5],
    small: scale[7],
    medium: scale[10],
    large: scale[12],
    xlarge: scale[14],
  };

  const nextSpacing = { ...spacing };

  Object.keys(spacing).forEach(key => {
    nextSpacing[key]['$value'] = mapping[key];
  });

  const json = JSON.stringify(
    { ...primitives, base: { ...primitives.base, spacing: nextSpacing } },
    null,
    2,
  );

  writeFileSync(
    `${TOKENS_DIR}/tokens/primitive/primitives.base.json`,
    json,
    'utf8',
  );

  runTokenBuild();
}

updateTokens(myscale);

export { updateTokens };
