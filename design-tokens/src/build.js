import { mkdirSync, readFileSync, writeFileSync, readdirSync } from 'fs';

// for now, convert from number (which Figma wants) to dimension with units
const numberToDimension = (primitives, component, unit = 'px') => {
  const result = primitives;

  const descend = (node, path = []) => {
    Object.keys(node).forEach(key => {
      const value = node[key];
      const keyPath = [...path, key];
      if (typeof value === 'object') return descend(value, keyPath);
      if (key === '$value') {
        let obj = primitives;

        // TO DO make this block less brittle
        if (
          (typeof value === 'number' &&
            (keyPath.includes('dimension') || component === true)) ||
          keyPath.includes('breakpoint') ||
          (keyPath.includes('font') && keyPath.includes('size'))
        ) {
          keyPath.pop(); // remove $value
          const fontToken =
            unit === 'rem' ||
            (keyPath.includes('font') && keyPath.includes('size'));
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

// primitives
const rawPrimitives = readFileSync(`./${TOKENS_DIR}/primitives.base.json`);
const primitives = JSON.parse(rawPrimitives);
const dimensionPrimitives = numberToDimension(primitives);

const rawComponents = readFileSync(`./${TOKENS_DIR}/component.default.json`);
const components = JSON.parse(rawComponents);
const dimensionComponents = numberToDimension(components, true);

// typography
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
    `./dist/${file.replace(TOKENS_DIR, '')}`,
    `${JSON.stringify(formatted, null, 2)}`,
  );
});

// currently used by style-dictionary. Figma Variables doesn't want units,
// but code needs
writeFileSync(
  './dist/primitives.base.json',
  `${JSON.stringify(dimensionPrimitives, null, 2)}`,
);
writeFileSync(
  './dist/component.default.json',
  `${JSON.stringify(dimensionComponents, null, 2)}`,
);
