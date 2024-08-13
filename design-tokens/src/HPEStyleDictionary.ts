import StyleDictionary from 'style-dictionary-utils';
import { commonJs, cssColorModes, cssBreakpoints } from './formats/index.js';
import { cssW3c, javascriptW3c } from './transforms/index.js';

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
StyleDictionary.registerTransformGroup({
  name: 'js/w3c',
  transforms: javascriptW3c,
});
StyleDictionary.registerTransformGroup({
  name: 'css/w3c',
  transforms: cssW3c,
});

export const HPEStyleDictionary: StyleDictionary.Core = StyleDictionary;
