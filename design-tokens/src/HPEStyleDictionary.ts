import { StyleDictionary } from 'style-dictionary-utils';
import {
  commonJs,
  commonJsGrommetRefs,
  cssColorModes,
  cssBreakpoints,
  esmGrommetRefs,
  javascriptEsm,
  jsonFlat,
} from './formats/index.js';
import {
  colorNameJs,
  cssW3c,
  javascriptCss,
  javascriptW3c,
  linearGradientCss,
  nameCSS,
  numberToDimension,
  shadowCSS,
  valueToCssVar,
} from './transforms/index.js';
import { COPYRIGHT } from './utils.js';

export const HPEStyleDictionary = new StyleDictionary({
  log: {
    verbosity: 'verbose',
  },
});

HPEStyleDictionary.registerFormat({
  name: 'javascript/commonJs',
  format: commonJs,
});
HPEStyleDictionary.registerFormat({
  name: `commonJsGrommetRefs`,
  format: commonJsGrommetRefs,
});
HPEStyleDictionary.registerFormat({
  name: 'javascript/esm',
  format: javascriptEsm,
});
HPEStyleDictionary.registerFormat({
  name: 'css/variables-themed',
  format: cssColorModes,
});
HPEStyleDictionary.registerFormat({
  name: 'css/variables-breakpoints',
  format: cssBreakpoints,
});
HPEStyleDictionary.registerFormat({
  name: `esmGrommetRefs`,
  format: esmGrommetRefs,
});
HPEStyleDictionary.registerFormat({
  name: `jsonFlat`,
  format: jsonFlat,
});
HPEStyleDictionary.registerTransform({
  ...colorNameJs,
});
HPEStyleDictionary.registerTransform({
  ...nameCSS,
});
HPEStyleDictionary.registerTransform({
  ...numberToDimension,
});
HPEStyleDictionary.registerTransform({
  ...shadowCSS,
});
HPEStyleDictionary.registerTransform({
  name: 'name/dot',
  type: 'name',
  transform: (token, config) => {
    return [config.prefix].concat(token.path).join('.');
  },
});
HPEStyleDictionary.registerTransform({
  ...linearGradientCss,
});
HPEStyleDictionary.registerTransform({
  ...valueToCssVar,
});
HPEStyleDictionary.registerTransformGroup({
  name: 'js/css',
  transforms: javascriptCss,
});
HPEStyleDictionary.registerTransformGroup({
  name: 'js/w3c',
  transforms: javascriptW3c,
});
HPEStyleDictionary.registerTransformGroup({
  name: 'css/w3c',
  transforms: cssW3c,
});
HPEStyleDictionary.registerFileHeader({
  name: 'hpe-file-header',
  fileHeader: async (defaultMessages = []) => {
    return [...defaultMessages, COPYRIGHT];
  },
});
