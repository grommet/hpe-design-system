import { mkdirSync, readFileSync, writeFileSync } from 'fs';

const resolveTokens = (tokens, primitives) => {
  const result = tokens;

  const descend = (node, path = []) => {
    Object.keys(node).forEach(key => {
      const value = node[key];
      const keyPath = [...path, key];
      if (typeof value === 'object') return descend(value, keyPath);
      if (key === '$value' && /^{.*}$/.test(value)) {
        let parts = value.slice(1, -1).split('.');
        let obj = primitives;
        while (obj && parts.length) obj = obj[parts.shift()];
        // referencing something already in semantic set
        if (!obj) {
          parts = value.slice(1, -1).split('.');
          obj = tokens;
          while (obj && parts.length) obj = obj[parts.shift()];
        }
        // reassign value
        let original = result;
        keyPath.pop();
        while (original && keyPath.length) original = original[keyPath.shift()];
        if (typeof obj?.$value === 'number')
          original.$value = `${obj?.$value}px`;
        else original.$value = obj?.$value;
      }
    });
  };

  descend(tokens);

  return result;
};

// primitives
const rawPrimitives = readFileSync('./tokens/primitives.base.json');
const primitives = JSON.parse(rawPrimitives);

// dark colors
const rawDark = readFileSync('./tokens/color.dark.json');
const dark = JSON.parse(rawDark);
const resolvedDark = resolveTokens(dark, primitives);

// light colors
const rawLight = readFileSync('./tokens/color.light.json');
const light = JSON.parse(rawLight);
const resolvedLight = resolveTokens(light, primitives);

// desktop dimensions
const rawDesktop = readFileSync('./tokens/dimension.large.json');
const desktop = JSON.parse(rawDesktop);
const resolvedDesktop = resolveTokens(desktop, primitives);

// mobile dimensions
const rawMobile = readFileSync('./tokens/dimension.small.json');
const mobile = JSON.parse(rawMobile);
const resolvedMobile = resolveTokens(mobile, primitives);

mkdirSync('./dist');

// do we only want to export resolved ones?
// is there any value to having the references (for example, figma uses it)
writeFileSync(
  './dist/color.dark.js',
  `export default ${JSON.stringify(resolvedDark, null, 2)}`,
);
// //
// writeFileSync(
//   './dist/color.dark-resolved.js',
//   `export default ${JSON.stringify(resolved, null, 2)}`,
// );

writeFileSync(
  './dist/color.light.js',
  `export default ${JSON.stringify(resolvedLight, null, 2)}`,
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
  `export { default as dark } from './color.dark.js';
export { default as light } from './color.light.js';
export { default as desktop } from './dimension.large.js';
export { default as mobile } from './dimension.small.js';`,
);

// const [light, dark] = splitTheme(resolved);

// const stringified = stringifyTokens(light);

// writeFileSync(
//   './structured-tokens.ts',
//   `export default ${JSON.stringify(stringified, null, 2)}`,
// );

// const stringifiedDark = stringifyTokens(dark);

// writeFileSync(
//   './structured-tokens-dark.ts',
//   `export default ${JSON.stringify(stringifiedDark, null, 2)}`,
// );

// writeFileSync('./dist/tokens.json', JSON.stringify(flat, null, 2));

// const [cssVars, cssDarkVars] = generateCssVars(flat);
// writeFileSync('./dist/tokens.css', cssVars);
// writeFileSync('./dist/tokens-dark.css', cssDarkVars);
