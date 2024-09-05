import { mkdirSync, readFileSync, writeFileSync, readdirSync } from 'fs';

const TOKENS_DIR = 'tokens';

mkdirSync('./dist');

mkdirSync('./dist/esm-unresolved');
let esm = '';

const dimensionFiles = readdirSync(`${TOKENS_DIR}/semantic`)
  .map(file =>
    file.includes('small') || file.includes('large')
      ? `${TOKENS_DIR}/semantic/${file}`
      : undefined,
  )
  .filter(file => file);

const dimensionTokens = {};
dimensionFiles.forEach(file => {
  const raw = readFileSync(file);
  const parsed = JSON.parse(raw);
  const mode = file.split('.')[1];
  if (!(mode in dimensionTokens)) dimensionTokens[mode] = {};
  dimensionTokens[mode] = { ...dimensionTokens[mode], ...parsed };
});

Object.keys(dimensionTokens).forEach(key => {
  writeFileSync(
    `./dist/esm-unresolved/dimension.${key}.js`,
    `export default ${JSON.stringify(dimensionTokens[key], null, 2)}`,
  );
  esm += `export { default as ${key} } from './dimension.${key}';\n`;
});

const tokenDirs = readdirSync(TOKENS_DIR, { withFileTypes: true })
  .filter(dir => dir.isDirectory())
  .map(dir => dir.name);

tokenDirs.forEach(dir => {
  readdirSync(`${TOKENS_DIR}/${dir}`).forEach(file => {
    if (!file.includes('large') && !file.includes('small')) {
      const raw = readFileSync(`${TOKENS_DIR}/${dir}/${file}`);
      const parsed = JSON.parse(raw);
      let mode = file.includes('component') ? 'components' : file.split('.')[1];
      if (file.includes('elevation')) mode = `elevation${mode}`;
      esm += `export { default as ${mode} } from './${file.replace(
        '.json',
        '',
      )}';\n`;
      writeFileSync('./dist/esm-unresolved/index.js', esm);
      writeFileSync(
        `./dist/esm-unresolved/${file.replace('json', 'js')}`,
        `export default ${JSON.stringify(parsed, null, 2)}`,
      );
    }
  });
});
