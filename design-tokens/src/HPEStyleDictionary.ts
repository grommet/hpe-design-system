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
  cssW3c,
  valueToCssVar,
  javascriptCss,
  javascriptW3c,
  linearGradientCss,
  nameCSS,
  numberToDimension,
  shadowCSS,
} from './transforms/index.js';

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
  name: `commonJsGrommetRefs`,
  format: commonJsGrommetRefs,
});
HPEStyleDictionary.registerFormat({
  name: `jsonFlat`,
  format: jsonFlat,
});
HPEStyleDictionary.registerTransform({
  ...nameCSS,
});
HPEStyleDictionary.registerTransform({
  ...numberToDimension,
});
HPEStyleDictionary.registerTransform({
  ...valueToCssVar,
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
HPEStyleDictionary.registerTransformGroup({
  name: 'js/obj-css',
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
