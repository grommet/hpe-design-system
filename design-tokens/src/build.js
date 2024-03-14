import { mkdirSync, readFileSync, writeFileSync } from 'fs';

const resolveTokens = (tokens, primitives) => {
  const result = tokens;

  const descend = (node, path = []) => {
    Object.keys(node).forEach(key => {
      const value = node[key];
      const keyPath = [...path, key];
      if (typeof value === 'object') return descend(value, keyPath);
      // resolve reference to primitive, e.g. {color.green.30}
      if (key === '$value' && /^{.*}$/.test(value)) {
        let parts = value.slice(1, -1).split('.');
        let obj = primitives;
        while (obj && parts.length) obj = obj[parts.shift()];
        // did not exist in primitives, so must be referencing something
        // already in semantic set
        if (!obj) {
          parts = value.slice(1, -1).split('.');
          obj = tokens;
          while (obj && parts.length) obj = obj[parts.shift()];
        }
        // reassign value
        let original = result;
        keyPath.pop(); // remove $value
        while (original && keyPath.length) original = original[keyPath.shift()];
        if (typeof obj?.$value === 'number') {
          original.$value = `${obj?.$value}px`;
        } else {
          original.$value = obj?.$value;
        }
      }
    });
  };

  descend(tokens);

  return result;
};

// for now, convert from number (which Figma wants) to dimension with units
const numberToDimension = primitives => {
  const result = primitives;

  const descend = (node, path = []) => {
    Object.keys(node).forEach(key => {
      const value = node[key];
      const keyPath = [...path, key];
      if (typeof value === 'object') return descend(value, keyPath);
      if (key === '$value') {
        let obj = primitives;

        if (typeof value === 'number') {
          keyPath.pop(); // remove $value
          while (obj && keyPath.length) obj = obj[keyPath.shift()];
          obj.$value = `${obj.$value}px`;
          obj.$type = 'dimension';
        }
      }
    });
  };
  descend(primitives);
  return result;
};

// primitives
const rawPrimitives = readFileSync('./tokens/primitives.base.json');
const primitives = JSON.parse(rawPrimitives);
const dimensionPrimitives = numberToDimension(primitives);

// --------- COLORS ------------ //

// dark colors
const rawDark = readFileSync('./tokens/color.dark.json');
const dark = JSON.parse(rawDark);
const resolvedDark = resolveTokens(dark, dimensionPrimitives);

// light colors
const rawLight = readFileSync('./tokens/color.light.json');
const light = JSON.parse(rawLight);
const resolvedLight = resolveTokens(light, dimensionPrimitives);

// warm dark colors
const rawWarmDark = readFileSync('./tokens/color.warm-dark.json');
const warmDark = JSON.parse(rawWarmDark);
const resolvedWarmDark = resolveTokens(warmDark, dimensionPrimitives);

// warm light colors
const rawWarmLight = readFileSync('./tokens/color.warm-light.json');
const warmlight = JSON.parse(rawWarmLight);
const resolvedWarmLight = resolveTokens(warmlight, dimensionPrimitives);

// --------- BREAKPOINTS ------------ //

// desktop dimensions
const rawDesktop = readFileSync('./tokens/dimension.large.json');
const desktop = JSON.parse(rawDesktop);
const resolvedDesktop = resolveTokens(desktop, dimensionPrimitives);

// mobile dimensions
const rawMobile = readFileSync('./tokens/dimension.small.json');
const mobile = JSON.parse(rawMobile);
const resolvedMobile = resolveTokens(mobile, dimensionPrimitives);

mkdirSync('./dist');

writeFileSync(
  './dist/primitives.base.js',
  `export default ${JSON.stringify(dimensionPrimitives, null, 2)}`,
);

// currently used by style-dictionary
writeFileSync(
  './dist/primitives.base.json',
  `${JSON.stringify(dimensionPrimitives, null, 2)}`,
);

writeFileSync(
  './dist/color.dark.js',
  `export default ${JSON.stringify(resolvedDark, null, 2)}`,
);

writeFileSync(
  './dist/color.light.js',
  `export default ${JSON.stringify(resolvedLight, null, 2)}`,
);

writeFileSync(
  './dist/color.warm-dark.js',
  `export default ${JSON.stringify(resolvedWarmDark, null, 2)}`,
);

writeFileSync(
  './dist/color.warm-light.js',
  `export default ${JSON.stringify(resolvedWarmLight, null, 2)}`,
);

writeFileSync(
  './dist/dimension.large.js',
  `export default ${JSON.stringify(resolvedDesktop, null, 2)}`,
);

writeFileSync(
  './dist/dimension.small.js',
  `export default ${JSON.stringify(resolvedMobile, null, 2)}`,
);

writeFileSync(
  './dist/index.js',
  `export { default as primitives } from './primitives.base.js';
export { default as dark } from './color.dark.js';
export { default as light } from './color.light.js';
export { default as warmLight } from './color.warm-light.js';
export { default as warmDark } from './color.warm-dark.js';
export { default as desktop } from './dimension.large.js';
export { default as mobile } from './dimension.small.js';`,
);
