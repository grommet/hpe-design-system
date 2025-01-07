import { FormatFnArguments } from 'style-dictionary/types';
import { createPropertyFormatter } from 'style-dictionary/utils';
import { removeDefaults } from './removeDefaults.js';

export const formatCssVariables = ({
  dictionary,
  options,
}: FormatFnArguments) => {
  const { outputReferences } = options;
  const propertyFormatter = createPropertyFormatter({
    outputReferences,
    dictionary,
    format: 'css',
    usesDtcg: true,
  });
  const cssVars = dictionary.allTokens
    .map(token => {
      let formattedVar = propertyFormatter(token);
      return removeDefaults(formattedVar);
    })
    .filter(value => !!value)
    .join('\n');

  return cssVars;
};
