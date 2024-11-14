/* eslint-disable max-len */
import * as fs from 'fs';
import { HPEStyleDictionary } from '../HPEStyleDictionary.ts';
import { getThemeAndMode, numberToPixel } from '../utils.ts';

const TOKENS_DIR = 'tokens';
const ESM_DIR = 'dist/esm/';
const CJS_DIR = 'dist/cjs/';
const CSS_DIR = 'dist/css/';
const DOCS_DIR = 'dist/docs/';
const PREFIX = 'hpe';

HPEStyleDictionary.extend({
  source: [`${TOKENS_DIR}/primitive/primitives.base.json`],
  platforms: {
    js: {
      transformGroup: 'js/w3c',
      buildPath: ESM_DIR,
      prefix: PREFIX,
      files: [
        {
          destination: 'base.js',
          format: 'javascript/esm',
        },
      ],
    },
    'js/cjs': {
      transformGroup: 'js/w3c',
      buildPath: CJS_DIR,
      prefix: PREFIX,
      files: [
        {
          destination: 'base.cjs',
          format: 'javascript/commonJs',
        },
      ],
    },
    css: {
      transformGroup: 'css/w3c',
      buildPath: CSS_DIR,
      prefix: PREFIX,
      files: [
        {
          destination: 'base.css',
          format: 'css/variables',
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
      files: [{ destination: 'base.js', format: 'jsonFlat' }],
    },
  },
}).buildAllPlatforms();

HPEStyleDictionary.extend({
  source: [
    `${TOKENS_DIR}/primitive/primitives.base.json`,
    `${TOKENS_DIR}/semantic/color.light.json`, // using light mode to have a reference name available
    `${TOKENS_DIR}/semantic/global.default.json`,
  ],
  platforms: {
    js: {
      transformGroup: 'js/w3c',
      buildPath: ESM_DIR,
      prefix: PREFIX,
      files: [
        {
          destination: 'global.js',
          format: 'esmGrommetRefs',
          filter: token =>
            token.filePath === `${TOKENS_DIR}/semantic/global.default.json`,
        },
      ],
    },
    'js/cjs': {
      transformGroup: 'js/w3c',
      buildPath: CJS_DIR,
      prefix: PREFIX,
      files: [
        {
          destination: 'global.cjs',
          format: 'commonJsGrommetRefs',
          filter: token =>
            token.filePath === `${TOKENS_DIR}/semantic/global.default.json`,
        },
      ],
    },
    css: {
      transformGroup: 'css/w3c',
      buildPath: CSS_DIR,
      prefix: PREFIX,
      files: [
        {
          destination: 'global.css',
          format: 'css/variables',
          filter: token =>
            token.filePath === `${TOKENS_DIR}/semantic/global.default.json`,
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
      files: [
        {
          destination: 'global.js',
          format: 'jsonFlat',
          filter: token =>
            token.filePath === `${TOKENS_DIR}/semantic/global.default.json`,
        },
      ],
    },
  },
}).buildAllPlatforms();

const colorModeFiles = fs
  .readdirSync(`${TOKENS_DIR}/semantic`)
  .map(file =>
    file.includes('color') ? `${TOKENS_DIR}/semantic/${file}` : undefined,
  )
  .filter(file => file);

const global = fs.readFileSync(`${TOKENS_DIR}/semantic/global.default.json`);
const parsedGlobal = JSON.parse(global);

colorModeFiles.forEach(file => {
  const [theme, mode] = getThemeAndMode(file);
  HPEStyleDictionary.extend({
    source: [`${TOKENS_DIR}/primitive/primitives.base.json`, file],
    platforms: {
      js: {
        transformGroup: 'js/w3c',
        buildPath: ESM_DIR,
        prefix: PREFIX,
        files: [
          {
            destination: `color.${
              theme ? `${theme}-${mode}` : `${mode || ''}`
            }.js`,
            format: 'javascript/esm',
            filter: token => token.filePath === file,
          },
        ],
      },
      'js/cjs': {
        transformGroup: 'js/w3c',
        buildPath: CJS_DIR,
        prefix: PREFIX,
        files: [
          {
            destination: `color.${
              theme ? `${theme}-${mode}` : `${mode || ''}`
            }.cjs`,
            format: 'javascript/commonJs',
            filter: token => token.filePath === file,
          },
        ],
      },
      css: {
        transformGroup: 'css/w3c',
        buildPath: CSS_DIR,
        prefix: PREFIX,
        files: [
          {
            destination: `color.${
              theme ? `${theme}-${mode}` : `${mode || ''}`
            }.css`,
            format: 'css/variables-themed',
            options: {
              outputReferences: true,
              mode: mode === 'dark' ? 'dark' : undefined,
              theme,
            },
            // TO DO revisit should "light" mode be part of base.css?
            filter: token => token.filePath === file,
          },
        ],
      },
      docs: {
        transformGroup: 'js/w3c',
        buildPath: DOCS_DIR,
        prefix: PREFIX,
        files: [
          {
            destination: `color.${
              theme ? `${theme}-${mode}` : `${mode || ''}`
            }.js`,
            filter: token => token.filePath === file,
            format: 'jsonFlat',
          },
        ],
      },
    },
  }).buildAllPlatforms();
});

const dimensionFiles = fs
  .readdirSync(`${TOKENS_DIR}/semantic`)
  .map(file =>
    file.includes('dimension') ? `${TOKENS_DIR}/semantic/${file}` : undefined,
  )
  .filter(file => file);

dimensionFiles.forEach(file => {
  const res = getThemeAndMode(file);
  const mode = res[1];
  HPEStyleDictionary.extend({
    source: [
      `${TOKENS_DIR}/primitive/primitives.base.json`,
      `${TOKENS_DIR}/semantic/color.light.json`,
      `${TOKENS_DIR}/semantic/global.default.json`,
      file,
    ],
    platforms: {
      js: {
        transformGroup: 'js/w3c',
        buildPath: ESM_DIR,
        prefix: PREFIX,
        files: [
          {
            destination: `dimension.${mode}.js`,
            format: 'javascript/esm',
            filter: token => token.filePath === file,
          },
        ],
      },
      'js/cjs': {
        transformGroup: 'js/w3c',
        buildPath: CJS_DIR,
        prefix: PREFIX,
        files: [
          {
            destination: `dimension.${mode}.cjs`,
            format: 'javascript/commonJs',
            filter: token => token.filePath === file,
          },
        ],
      },
      css: {
        transformGroup: 'css',
        buildPath: CSS_DIR,
        prefix: PREFIX,
        files: [
          {
            destination: `dimension.${mode}.css`,
            format: 'css/variables-breakpoints',
            options: {
              outputReferences: true,
              mediaQuery:
                parsedGlobal.breakpoint?.[mode] &&
                !['large', 'xlarge'].includes(mode) &&
                `max-width: ${numberToPixel(
                  parsedGlobal.breakpoint[mode].$value,
                )}`,
            },
            filter: token => token.filePath === file,
          },
        ],
      },
      docs: {
        transformGroup: 'js/w3c',
        buildPath: DOCS_DIR,
        prefix: PREFIX,
        files: [
          {
            destination: `dimension.${mode}.js`,
            filter: token => token.filePath === file,
            format: 'jsonFlat',
          },
        ],
      },
    },
  }).buildAllPlatforms();
});

HPEStyleDictionary.extend({
  source: [
    `${TOKENS_DIR}/primitive/primitives.base.json`,
    `${TOKENS_DIR}/semantic/global.default.json`,
    `${TOKENS_DIR}/semantic/color.light.json`, // using light mode to have a reference name available
    `${TOKENS_DIR}/semantic/dimension.medium.json`, // using medium mode to have a reference name available
    `${TOKENS_DIR}/component/element.default.json`,
    `${TOKENS_DIR}/component/component.default.json`,
  ],
  platforms: {
    js: {
      transformGroup: 'js/w3c',
      buildPath: ESM_DIR,
      prefix: PREFIX,
      files: [
        {
          destination: 'components.default.js',
          filter: token => token.filePath.includes(`${TOKENS_DIR}/component/`),
          format: 'esmGrommetRefs',
        },
      ],
    },
    'js/cjs': {
      transformGroup: 'js/w3c',
      buildPath: CJS_DIR,
      prefix: PREFIX,
      files: [
        {
          destination: 'components.default.cjs',
          filter: token => token.filePath.includes(`${TOKENS_DIR}/component/`),
          format: 'commonJsGrommetRefs',
        },
      ],
    },
    css: {
      transformGroup: 'css/w3c',
      buildPath: CSS_DIR,
      prefix: PREFIX,
      files: [
        {
          destination: 'components.css',
          format: 'css/variables',
          filter: token => token.filePath.includes(`${TOKENS_DIR}/component/`),
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
      files: [
        {
          destination: 'components.js',
          filter: token => token.filePath.includes(`${TOKENS_DIR}/component/`),
          format: 'jsonFlat',
        },
      ],
    },
  },
}).buildAllPlatforms();

// create CommonJS index.js
const collections = [];
fs.readdirSync(CJS_DIR)
  .filter(file => file !== 'index.cjs')
  .forEach(file => {
    if (file.toLowerCase().endsWith('.cjs')) {
      const filename = file.replace('.cjs', '');
      const parts = filename.split('.');
      let mode = parts[1];
      // special case for base.js and components
      if (mode === 'default' || !mode) [mode] = parts;
      fs.appendFileSync(
        `${CJS_DIR}index.cjs`,
        `const ${mode} = require('./${file}');\n`,
      );
      collections.push(mode);
    }
  });

const output = `\nmodule.exports = { ${collections.map(
  collection => collection,
)} };\n`;
fs.appendFileSync(`${CJS_DIR}index.cjs`, output);

// create ESM index.js
const esmCollections = [];
fs.readdirSync(ESM_DIR)
  .filter(file => file !== 'index.js')
  .forEach(file => {
    if (file.toLowerCase().endsWith('.js')) {
      const filename = file.replace('.js', '');
      const parts = filename.split('.');
      let mode = parts[1];
      // special case for base.js and components
      if (mode === 'default' || !mode) [mode] = parts;
      fs.appendFileSync(
        `${ESM_DIR}index.js`,
        `export { default as ${mode} } from './${filename}.js';\n`,
      );
      esmCollections.push(mode);
    }
  });

const docsCollections = [];
fs.readdirSync(DOCS_DIR)
  .filter(file => file !== 'index.js')
  .forEach(file => {
    if (file.toLowerCase().endsWith('.js')) {
      const filename = file.replace('.js', '');
      const parts = filename.split('.');
      let mode = parts[1];
      // special case for base.js and components
      if (mode === 'default' || !mode) [mode] = parts;
      fs.appendFileSync(
        `${DOCS_DIR}index.js`,
        `export { default as ${mode} } from './${filename}.js';\n`,
      );
      docsCollections.push(mode);
    }
  });

console.log('✅ Style system outputs have been generated.');
