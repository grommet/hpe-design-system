/* eslint-disable max-len */
import * as fs from 'fs';
import { HPEStyleDictionary } from '../HPEStyleDictionary.ts';
import {
  filterColorTokens,
  getThemeAndMode,
  numberToPixel,
  COPYRIGHT,
} from '../utils.ts';

const TOKENS_DIR = 'tokens';
const ESM_DIR = 'dist/esm/';
const GROMMET_DIR = 'dist/grommet/';
const GROMMET_CJS_DIR = 'dist/grommet/cjs/';
const CJS_DIR = 'dist/cjs/';
const CSS_DIR = 'dist/css/';
const DOCS_DIR = 'dist/docs/';
const PREFIX = 'hpe';
/**
 * Design tokens that should only exist in Figma but not be output to hpe-design-tokens
 */
const FIGMA_PREFIX = 'fig';
const DEPRECATED_PREFIX = 'deprecated';
const defaultOptions = {
  fileHeader: 'hpe-file-header',
};

await HPEStyleDictionary.hasInitialized;

let extendedDictionary = HPEStyleDictionary;

const filterPrimitives = token =>
  token.filePath.includes(`${TOKENS_DIR}/primitive/`) &&
  !token.path.includes(DEPRECATED_PREFIX);

/** -----------------------------------
 * Primitive tokens
 * ----------------------------------- */
try {
  extendedDictionary = await HPEStyleDictionary.extend({
    source: [`${TOKENS_DIR}/primitive/primitives.default.json`],
    platforms: {
      grommet: {
        transformGroup: 'js/w3c',
        buildPath: GROMMET_DIR,
        prefix: PREFIX,
        options: defaultOptions,
        files: [
          {
            destination: 'primitives.js',
            format: 'javascript/esm',
            filter: token => filterPrimitives(token),
          },
        ],
      },
      'grommet/cjs': {
        transformGroup: 'js/w3c',
        buildPath: GROMMET_CJS_DIR,
        prefix: PREFIX,
        options: defaultOptions,
        files: [
          {
            destination: 'primitives.cjs',
            format: 'javascript/commonJs',
            filter: token => filterPrimitives(token),
          },
        ],
      },
      js: {
        transformGroup: 'js/css',
        buildPath: ESM_DIR,
        prefix: PREFIX,
        options: defaultOptions,
        files: [
          {
            destination: 'primitives.js',
            format: 'javascript/esm',
            filter: token => filterPrimitives(token),
          },
        ],
      },
      'js/cjs': {
        transformGroup: 'js/css',
        buildPath: CJS_DIR,
        prefix: PREFIX,
        options: defaultOptions,
        files: [
          {
            destination: 'primitives.cjs',
            format: 'javascript/commonJs',
            filter: token => filterPrimitives(token),
          },
        ],
      },
      css: {
        transformGroup: 'css/w3c',
        buildPath: CSS_DIR,
        prefix: PREFIX,
        options: defaultOptions,
        files: [
          {
            destination: 'primitives.css',
            format: 'css/variables',
            filter: token => filterPrimitives(token),
            options: {
              outputReferences: true,
            },
          },
        ],
      },
      docs: {
        transformGroup: 'js/w3c',
        buildPath: DOCS_DIR,
        prefix: PREFIX,
        options: defaultOptions,
        files: [
          {
            destination: 'primitives.js',
            format: 'jsonFlat',
            filter: token => filterPrimitives(token),
          },
        ],
      },
    },
  });
  await extendedDictionary.buildAllPlatforms();
} catch (e) {
  console.error('🛑 Error building primitive tokens:', e);
}

const filterGlobal = token =>
  token.filePath === `${TOKENS_DIR}/semantic/global.default.json` &&
  !token.path.includes(FIGMA_PREFIX);

/** -----------------------------------
 * Global tokens
 * ----------------------------------- */
try {
  extendedDictionary = await HPEStyleDictionary.extend({
    source: [
      `${TOKENS_DIR}/primitive/primitives.default.json`,
      `${TOKENS_DIR}/semantic/color.light.json`, // using light mode to have a reference name available
      `${TOKENS_DIR}/semantic/global.default.json`,
    ],
    platforms: {
      grommet: {
        transformGroup: 'js/w3c',
        buildPath: GROMMET_DIR,
        prefix: PREFIX,
        options: defaultOptions,
        files: [
          {
            destination: 'global.js',
            format: 'esmGrommetRefs',
            filter: token => filterGlobal(token),
          },
        ],
      },
      'grommet/cjs': {
        transformGroup: 'js/w3c',
        buildPath: GROMMET_CJS_DIR,
        prefix: PREFIX,
        options: defaultOptions,
        files: [
          {
            destination: 'global.cjs',
            format: 'commonJsGrommetRefs',
            filter: token => filterGlobal(token),
          },
        ],
      },
      js: {
        transformGroup: 'js/css',
        buildPath: ESM_DIR,
        prefix: PREFIX,
        options: defaultOptions,
        files: [
          {
            destination: 'global.js',
            format: 'javascript/esm',
            filter: token => filterGlobal(token),
          },
        ],
      },
      'js/cjs': {
        transformGroup: 'js/css',
        buildPath: CJS_DIR,
        prefix: PREFIX,
        options: defaultOptions,
        files: [
          {
            destination: 'global.cjs',
            format: 'javascript/commonJs',
            filter: token => filterGlobal(token),
          },
        ],
      },
      css: {
        transformGroup: 'css/w3c',
        buildPath: CSS_DIR,
        prefix: PREFIX,
        options: defaultOptions,
        files: [
          {
            destination: 'global.css',
            format: 'css/variables',
            filter: token => filterGlobal(token),
            options: {
              outputReferences: true,
            },
          },
        ],
      },
      docs: {
        transformGroup: 'js/w3c',
        buildPath: DOCS_DIR,
        prefix: PREFIX,
        options: defaultOptions,
        files: [
          {
            destination: 'global.js',
            format: 'jsonFlat',
            filter: token => filterGlobal(token),
          },
        ],
      },
    },
  });

  await extendedDictionary.buildAllPlatforms();
} catch (e) {
  console.error('🛑 Error building global tokens:', e);
}

/** -----------------------------------
 * Color tokens
 * ----------------------------------- */
const colorModeFiles = fs
  .readdirSync(`${TOKENS_DIR}/semantic`)
  .map(file =>
    file.includes('color') && !file.includes('v1') && !file.includes('v0')
      ? `${TOKENS_DIR}/semantic/${file}`
      : undefined,
  )
  .filter(file => file);

const global = fs.readFileSync(`${TOKENS_DIR}/semantic/global.default.json`);
const parsedGlobal = JSON.parse(global);

// in order to support scoped modes, include component colors in CSS color files
const componentTokens = fs.readFileSync(
  `${TOKENS_DIR}/component/component.default.json`,
);
const parsedComponentTokens = JSON.parse(componentTokens);
const componentColorTokens = filterColorTokens(parsedComponentTokens);
delete componentColorTokens.fig; // remove figma specific tokens
const tempDir = 'tokens/.tmp';
if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true });
}
fs.mkdirSync(tempDir, { recursive: true });
fs.appendFileSync(
  `${tempDir}/component-color-tokens.default.json`,
  JSON.stringify(componentColorTokens),
  err => {
    if (err) throw err;
  },
);

const filterColor = (token, file) =>
  token.filePath === file && !token.path.includes(FIGMA_PREFIX);

try {
  colorModeFiles.forEach(async file => {
    const [theme, mode] = getThemeAndMode(file);
    extendedDictionary = await HPEStyleDictionary.extend({
      source: [
        `${TOKENS_DIR}/primitive/primitives.default.json`,
        file,
        `${TOKENS_DIR}/.tmp/component-color-tokens.default.json`, // temp file with component color tokens
      ],
      platforms: {
        grommet: {
          transformGroup: 'js/w3c',
          buildPath: GROMMET_DIR,
          prefix: PREFIX,
          options: defaultOptions,
          files: [
            {
              destination: `color.${theme ? `${theme}-${mode}` : `${mode || ''}`
                }.js`,
              format: 'javascript/esm',
              filter: token => filterColor(token, file),
            },
          ],
        },
        'grommet/cjs': {
          transformGroup: 'js/w3c',
          buildPath: GROMMET_CJS_DIR,
          prefix: PREFIX,
          options: defaultOptions,
          files: [
            {
              destination: `color.${theme ? `${theme}-${mode}` : `${mode || ''}`
                }.cjs`,
              format: 'javascript/commonJs',
              filter: token => filterColor(token, file),
            },
          ],
        },
        js: {
          transformGroup: 'js/css',
          buildPath: ESM_DIR,
          prefix: PREFIX,
          options: defaultOptions,
          files: [
            {
              destination: 'color.js',
              format: 'javascript/esm',
              filter: token => filterColor(token, file),
            },
          ],
        },
        'js/cjs': {
          transformGroup: 'js/css',
          buildPath: CJS_DIR,
          prefix: PREFIX,
          options: defaultOptions,
          files: [
            {
              destination: 'color.cjs',
              format: 'javascript/commonJs',
              filter: token => filterColor(token, file),
            },
          ],
        },
        css: {
          transformGroup: 'css/w3c',
          buildPath: CSS_DIR,
          prefix: PREFIX,
          options: defaultOptions,
          files: [
            {
              destination: `color.${theme ? `${theme}-${mode}` : `${mode || ''}`
                }.css`,
              format: 'css/variables-themed',
              options: {
                outputReferences: true,
                mode: mode === 'dark' ? 'dark' : undefined,
                theme,
              },
              // include component colors in the CSS output to ensure
              // proper CSS inheritance when doing scoped mode sections
              // component color tokens should already be filtered to just
              // color tokens, but adding this condition here for safety
              filter: token =>
                (token.filePath === file || token.$type === 'color') &&
                !token.path.includes(FIGMA_PREFIX),
            },
          ],
        },
        docs: {
          transformGroup: 'js/w3c',
          buildPath: DOCS_DIR,
          prefix: PREFIX,
          options: defaultOptions,
          files: [
            {
              destination: `color.${theme ? `${theme}-${mode}` : `${mode || ''}`
                }.js`,
              filter: token => filterColor(token, file),
              format: 'jsonFlat',
            },
          ],
        },
      },
    });
    await extendedDictionary.buildAllPlatforms();
  });
} catch (e) {
  console.error('🛑 Error building color tokens:', e);
}

/** -----------------------------------
 * Dimension tokens
 * ----------------------------------- */
const dimensionFiles = fs
  .readdirSync(`${TOKENS_DIR}/semantic`)
  .map(file =>
    file.includes('dimension') && !file.includes('v1') && !file.includes('v0')
      ? `${TOKENS_DIR}/semantic/${file}`
      : undefined,
  )
  .filter(file => file);

try {
  dimensionFiles.forEach(async file => {
    const [theme, mode] = getThemeAndMode(file);
    const modeSuffix = theme ? `${theme}-${mode}` : mode;
    extendedDictionary = await HPEStyleDictionary.extend({
      source: [
        `${TOKENS_DIR}/primitive/primitives.default.json`,
        `${TOKENS_DIR}/semantic/color.light.json`,
        `${TOKENS_DIR}/semantic/global.default.json`,
        file,
      ],
      platforms: {
        grommet: {
          transformGroup: 'js/w3c',
          buildPath: GROMMET_DIR,
          prefix: PREFIX,
          options: defaultOptions,
          files: [
            {
              destination: `dimension.${modeSuffix}.js`,
              format: 'javascript/esm',
              filter: token =>
                token.filePath === file && !token.path.includes(FIGMA_PREFIX),
            },
          ],
        },
        'grommet/cjs': {
          transformGroup: 'js/w3c',
          buildPath: GROMMET_CJS_DIR,
          prefix: PREFIX,
          options: defaultOptions,
          files: [
            {
              destination: `dimension.${modeSuffix}.cjs`,
              format: 'javascript/commonJs',
              filter: token =>
                token.filePath === file && !token.path.includes(FIGMA_PREFIX),
            },
          ],
        },
        js: {
          transformGroup: 'js/css',
          buildPath: ESM_DIR,
          prefix: PREFIX,
          options: defaultOptions,
          files: [
            {
              destination: 'dimension.js',
              format: 'javascript/esm',
              filter: token =>
                token.filePath === file && !token.path.includes(FIGMA_PREFIX),
            },
          ],
        },
        'js/cjs': {
          transformGroup: 'js/css',
          buildPath: CJS_DIR,
          prefix: PREFIX,
          options: defaultOptions,
          files: [
            {
              destination: 'dimension.cjs',
              format: 'javascript/commonJs',
              filter: token =>
                token.filePath === file && !token.path.includes(FIGMA_PREFIX),
            },
          ],
        },
        css: {
          transformGroup: 'css/w3c',
          buildPath: CSS_DIR,
          prefix: PREFIX,
          options: defaultOptions,
          files: [
            {
              destination: `dimension.${modeSuffix}.css`,
              format: 'css/variables-breakpoints',
              options: {
                outputReferences: true,
                mediaQuery:
                  parsedGlobal.breakpoint?.[mode] &&
                  !['medium', 'large', 'xlarge'].includes(mode) &&
                  `max-width: ${numberToPixel(
                    parsedGlobal.breakpoint[mode].$value,
                  )}`,
              },
              filter: token =>
                token.filePath === file && !token.path.includes(FIGMA_PREFIX),
            },
          ],
        },
        docs: {
          transformGroup: 'js/w3c',
          buildPath: DOCS_DIR,
          prefix: PREFIX,
          options: defaultOptions,
          files: [
            {
              destination: `dimension.${modeSuffix}.js`,
              filter: token =>
                token.filePath === file && !token.path.includes(FIGMA_PREFIX),
              format: 'jsonFlat',
            },
          ],
        },
      },
    });

    await extendedDictionary.buildAllPlatforms();
  });
} catch (e) {
  console.error('🛑 Error building dimension tokens:', e);
}

const filterComponent = token =>
  token.filePath.includes(`${TOKENS_DIR}/component/`) &&
  !token.path.includes(FIGMA_PREFIX);

/** -----------------------------------
 * Component tokens
 * ----------------------------------- */
try {
  extendedDictionary = await HPEStyleDictionary.extend({
    source: [
      `${TOKENS_DIR}/primitive/primitives.default.json`,
      `${TOKENS_DIR}/semantic/global.default.json`,
      `${TOKENS_DIR}/semantic/color.light.json`, // using light mode to have a reference name available
      `${TOKENS_DIR}/semantic/dimension.default.json`, // using default mode to have a reference name available
      `${TOKENS_DIR}/component/element.default.json`,
      `${TOKENS_DIR}/component/component.default.json`,
    ],
    platforms: {
      grommet: {
        transformGroup: 'js/w3c',
        buildPath: GROMMET_DIR,
        prefix: PREFIX,
        options: defaultOptions,
        files: [
          {
            destination: 'components.js',
            filter: token => filterComponent(token),
            format: 'esmGrommetRefs',
          },
        ],
      },
      'grommet/cjs': {
        transformGroup: 'js/w3c',
        buildPath: GROMMET_CJS_DIR,
        prefix: PREFIX,
        options: defaultOptions,
        files: [
          {
            destination: 'components.cjs',
            filter: token => filterComponent(token),
            format: 'commonJsGrommetRefs',
          },
        ],
      },
      js: {
        transformGroup: 'js/css',
        buildPath: ESM_DIR,
        prefix: PREFIX,
        options: defaultOptions,
        files: [
          {
            destination: 'components.js',
            filter: token => filterComponent(token),
            format: 'javascript/esm',
          },
        ],
      },
      'js/cjs': {
        transformGroup: 'js/css',
        buildPath: CJS_DIR,
        prefix: PREFIX,
        options: defaultOptions,
        files: [
          {
            destination: 'components.cjs',
            filter: token => filterComponent(token),
            format: 'javascript/commonJs',
          },
        ],
      },
      css: {
        transformGroup: 'css/w3c',
        buildPath: CSS_DIR,
        prefix: PREFIX,
        options: defaultOptions,
        files: [
          {
            destination: 'components.css',
            format: 'css/variables',
            filter: token =>
              filterComponent(token) &&
              // color variables are included per CSS theme mode
              // excluding here to minimize the CSS output
              token.$type !== 'color',
            options: {
              outputReferences: true,
            },
          },
        ],
      },
      docs: {
        transformGroup: 'js/w3c',
        buildPath: DOCS_DIR,
        prefix: PREFIX,
        options: defaultOptions,
        files: [
          {
            destination: 'components.js',
            filter: token => filterComponent(token),
            format: 'jsonFlat',
          },
        ],
      },
    },
  });

  await extendedDictionary.buildAllPlatforms();
} catch (e) {
  console.error('🛑 Error building component tokens:', e);
}

/** -----------------------------------
 * Create CommonJS index.js
 * ----------------------------------- */
const toCamelCase = str =>
  str.replace(/-([a-z])/g, (_, char) => char.toUpperCase());

const toIdentifier = filename => {
  const parts = filename.split('.');
  const collectionName = parts[0];
  const mode = parts[1];
  if (collectionName === 'dimension' && mode) {
    const camel = toCamelCase(mode);
    return collectionName + camel.charAt(0).toUpperCase() + camel.slice(1);
  }
  let m = mode;
  if (m === 'default' || !m) [m] = parts;
  return toCamelCase(m);
};

const collections = [];
fs.appendFileSync(`${CJS_DIR}index.cjs`, `/**\n * ${COPYRIGHT}\n */\n\n`);
fs.readdirSync(CJS_DIR)
  .filter(file => file !== 'index.cjs')
  .forEach(file => {
    if (file.toLowerCase().endsWith('.cjs')) {
      const filename = file.replace('.cjs', '');
      const identifier = toIdentifier(filename);
      fs.appendFileSync(
        `${CJS_DIR}index.cjs`,
        `const ${identifier} = require('./${file}');\n`,
      );
      collections.push(identifier);
    }
  });

const output = `\nmodule.exports = { ${collections.map(
  collection => collection,
)} };\n`;
fs.appendFileSync(`${CJS_DIR}index.cjs`, output);

/** -----------------------------------
 * Create ESM index.js
 * ----------------------------------- */
const esmCollections = [];
fs.appendFileSync(`${ESM_DIR}index.js`, `// ${COPYRIGHT}\n\n`);
fs.readdirSync(ESM_DIR)
  .filter(file => file !== 'index.js')
  .forEach(file => {
    if (file.toLowerCase().endsWith('.js')) {
      const filename = file.replace('.js', '');
      const identifier = toIdentifier(filename);
      fs.appendFileSync(
        `${ESM_DIR}index.js`,
        `export { default as ${identifier} } from './${filename}.js';\n`,
      );
      esmCollections.push(identifier);
    }
  });

/** -----------------------------------
 * Create Grommet index.js
 * ----------------------------------- */
const grommetCollections = [];
fs.appendFileSync(`${GROMMET_DIR}index.js`, `// ${COPYRIGHT}\n\n`);
fs.readdirSync(GROMMET_DIR)
  .filter(file => file !== 'index.js')
  .forEach(file => {
    if (file.toLowerCase().endsWith('.js')) {
      const filename = file.replace('.js', '');
      const identifier = toIdentifier(filename);
      fs.appendFileSync(
        `${GROMMET_DIR}index.js`,
        `export { default as ${identifier} } from './${filename}.js';\n`,
      );
      grommetCollections.push(identifier);
    }
  });

/** -----------------------------------
 * Create Grommet CommonJS index.js
 * ----------------------------------- */
const grommetCjsCollections = [];
fs.appendFileSync(
  `${GROMMET_CJS_DIR}index.cjs`,
  `/**\n * ${COPYRIGHT}\n */\n\n`,
);
fs.readdirSync(GROMMET_CJS_DIR)
  .filter(file => file !== 'index.cjs')
  .forEach(file => {
    if (file.toLowerCase().endsWith('.cjs')) {
      const filename = file.replace('.cjs', '');
      const identifier = toIdentifier(filename);
      fs.appendFileSync(
        `${GROMMET_CJS_DIR}index.cjs`,
        `const ${identifier} = require('./${file}');\n`,
      );
      grommetCjsCollections.push(identifier);
    }
  });

const grommetCjsOutput = `\nmodule.exports = { ${grommetCjsCollections.map(
  collection => collection,
)} };\n`;
fs.appendFileSync(`${GROMMET_CJS_DIR}index.cjs`, grommetCjsOutput);

/** -----------------------------------
 * Create docs index.js
 * ----------------------------------- */
const docsCollections = [];
fs.appendFileSync(`${DOCS_DIR}index.js`, `// ${COPYRIGHT}\n\n`);
fs.readdirSync(DOCS_DIR)
  .filter(file => file !== 'index.js')
  .forEach(file => {
    if (file.toLowerCase().endsWith('.js')) {
      const filename = file.replace('.js', '');
      const identifier = toIdentifier(filename);
      fs.appendFileSync(
        `${DOCS_DIR}index.js`,
        `export { default as ${identifier} } from './${filename}.js';\n`,
      );
      docsCollections.push(identifier);
    }
  });

console.log('✅ Style system outputs have been generated.');
