import StyleDictionary from 'style-dictionary-utils';
import {
  commonJs,
  commonJsGrommetRefs,
  cssColorModes,
  cssBreakpoints,
  esmGrommetRefs,
} from './formats/index.js';
import {
  cssW3c,
  javascriptW3c,
  numberToDimension,
} from './transforms/index.js';

StyleDictionary.registerFormat({
  name: 'javascript/commonJs',
  formatter: commonJs,
});
StyleDictionary.registerFormat({
  name: 'css/variables-themed',
  formatter: cssColorModes,
});
StyleDictionary.registerFormat({
  name: 'css/variables-breakpoints',
  formatter: cssBreakpoints,
});
StyleDictionary.registerFormat({
  name: `esmGrommetRefs`,
  formatter: esmGrommetRefs,
});
StyleDictionary.registerFormat({
  name: `commonJsGrommetRefs`,
  formatter: commonJsGrommetRefs,
});
StyleDictionary.registerTransform({
  name: 'numberToDimension',
  ...numberToDimension,
});
StyleDictionary.registerTransformGroup({
  name: 'js/w3c',
  transforms: javascriptW3c,
});
StyleDictionary.registerTransformGroup({
  name: 'css/w3c',
  transforms: cssW3c,
});

export const HPEStyleDictionary: StyleDictionary.Core = StyleDictionary;