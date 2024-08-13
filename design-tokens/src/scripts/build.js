import { mkdirSync, readFileSync, writeFileSync, readdirSync } from 'fs';
import { access, isReference, nonComponentTokens } from '../utils.ts';

// for now, convert from number (which Figma wants) to dimension with units
// TO DO clean up this function
const numberToDimension = (primitives, component, unit = 'px') => {
  const result = primitives;

  const descend = (node, path = []) => {
    Object.keys(node).forEach(key => {
      const value = node[key];
      const keyPath = [...path, key];
      if (typeof value === 'object') return descend(value, keyPath);
      if (key === '$value') {
        let obj = primitives;

        // convert numbers to "px" (for non-typography dimension tokens)
        // or "rem" (for font size and line height)
        // should not convert font weight
        if (
          typeof value === 'number' &&
          !keyPath.includes('fontWeight') &&
          !keyPath.includes('weight') &&
          (keyPath.includes('breakpoint') ||
            keyPath.includes('dimension') ||
            component === true ||
            keyPath.includes('font') ||
            keyPath.includes('fontSize') ||
            keyPath.includes('lineHeight'))
        ) {
          keyPath.pop(); // remove $value
          const fontToken =
            unit === 'rem' ||
            keyPath.includes('fontSize') ||
            keyPath.includes('lineHeight') ||
            (keyPath.includes('font') && keyPath.includes('size')) ||
            keyPath.includes('height');
          while (obj && keyPath.length) obj = obj[keyPath.shift()];

          if (fontToken) obj.$value /= 16;
          obj.$value = `${obj.$value}${fontToken ? 'rem' : unit}`;
          obj.$type = 'dimension';
        }
      }
    });
  };
  descend(primitives);
  return result;
};

const TOKENS_DIR = 'tokens';

mkdirSync('./dist');

mkdirSync('./dist/esm-unresolved');
let esm = '';

const dimensionFiles = readdirSync(TOKENS_DIR)
  .map(file =>
    file.includes('small') || file.includes('large')
      ? `${TOKENS_DIR}/${file}`
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

readdirSync(TOKENS_DIR).forEach(file => {
  if (!file.includes('large') && !file.includes('small')) {
    const raw = readFileSync(`${TOKENS_DIR}/${file}`);
    const parsed = JSON.parse(raw);
    const mode = file.includes('component') ? 'components' : file.split('.')[1];
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

// primitives
const rawPrimitives = readFileSync(`./${TOKENS_DIR}/primitives.base.json`);
const primitives = JSON.parse(rawPrimitives);
const dimensionPrimitives = numberToDimension(primitives);

const rawComponents = readFileSync(`./${TOKENS_DIR}/component.default.json`);
const components = JSON.parse(rawComponents);
const dimensionComponents = numberToDimension(components, true);

// currently used by style-dictionary. Figma Variables doesn't want units,
// but code needs them
writeFileSync(
  './dist/primitives.base.json',
  `${JSON.stringify(dimensionPrimitives, null, 2)}`,
);
writeFileSync(
  './dist/component.default.json',
  `${JSON.stringify(dimensionComponents, null, 2)}`,
);

const typographyFiles = readdirSync(TOKENS_DIR)
  .map(file =>
    file.includes('typography') ? `${TOKENS_DIR}/${file}` : undefined,
  )
  .filter(file => file);

typographyFiles.forEach(file => {
  const raw = readFileSync(file);
  const parsed = JSON.parse(raw);
  const formatted = numberToDimension(parsed, 'rem');
  writeFileSync(
    `./dist/${file.replace(TOKENS_DIR, '').replace(' - semantic', '')}`,
    `${JSON.stringify(formatted, null, 2)}`,
  );
});

// ---------------- Build step for Grommet components ----------------- //
const tokens = readdirSync(TOKENS_DIR).map(file => `${TOKENS_DIR}/${file}`);
let allTokens = {};
tokens.forEach(file => {
  const raw = readFileSync(file);
  const parsed = JSON.parse(raw);
  allTokens = { ...allTokens, ...parsed };
});

const getValue = valueArg => {
  let value = valueArg;
  if (
    typeof value === 'string' &&
    (value.split('.')[0].includes('base') ||
      value.split('.')[0].includes('static'))
  ) {
    value = value.slice(1, -1);
    const a = access(value, allTokens).$value;
    value = getValue(a);
  } else if (
    // keep as grommet-like reference. For example,
    // '{spacing.small}' --> 'small'
    // '{color.text.strong} --> 'text-strong'
    // 'color.background.validation.critical' --> 'validation-critical'
    // 'color.background.back' --> 'background-back'
    // NOTE: We may not be able to fully automate this process,
    // so we may need to maintain a map of the exceptions
    // (e.g., validation-critical)
    // OR in grommet-theme-hpe, we can add the new namespace
    // and in a future major version deprecate the old value
    typeof value === 'string' &&
    // TO DO can we automate this list?
    (value.split('.')[0].includes('spacing') ||
      value.split('.')[0].includes('radius') ||
      value.split('.')[0].includes('content') ||
      value.split('.')[0].includes('borderWidth') ||
      value.split('.')[0].includes('color'))
  ) {
    value = value.slice(1, -1);
    value = value.split('.');
    value.shift();
    value = value.join('-');
    // TO DO improve, but this is because Figma doesn't have concept of 'em'
    if (value === 'full') value = '2em';
  }
  // when referencing another component token, resolve
  // down to the nearest semantic or primitive token
  else if (
    isReference(value) &&
    !value.includes('base') &&
    !value.includes('static')
  ) {
    value = value.slice(1, -1);
    const a = access(value, allTokens).$value;
    value = getValue(a);
    if (value === 'full') value = '2em';
  }

  return value;
};

const jsonToNestedValue = token => {
  // is non-object value
  if (!token || typeof token !== 'object') return token;
  // is design token
  if ('$value' in token) {
    let value = token.$value;
    // if reference
    if (/{.*}/.test(value)) {
      value = getValue(value);
    }
    return value;
  }
  // is obj
  const nextObj = {};
  Object.entries(token).forEach(([prop, value]) => {
    nextObj[prop] = jsonToNestedValue(value);
  });

  return nextObj;
};

allTokens = numberToDimension(allTokens, true);
let res = jsonToNestedValue(allTokens);

// TO DO make prefix dynamic
const PREFIX = 'hpe';

nonComponentTokens.forEach(category => {
  delete res[category];
});

res = { [PREFIX]: { ...res } };
mkdirSync('./dist/esm/');
writeFileSync(
  './dist/esm/components.default.js',
  `export default ${JSON.stringify(res, null, 2)}`,
);
writeFileSync(
  './dist/esm/index.js',
  "export { default as components } from './components.default';\n",
);
mkdirSync('./dist/cjs/');
writeFileSync(
  './dist/cjs/components.default.cjs',
  `module.exports = ${JSON.stringify(res, null, 2)}`,
);

console.log('✅ components.default.js have been generated.');
