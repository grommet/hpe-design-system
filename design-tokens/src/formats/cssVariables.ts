import { FormatFn, FormatFnArguments } from 'style-dictionary/types';
import { fileHeader } from 'style-dictionary/utils';
import { formatCssVariables } from './utils/formatCssVariables.js';

export const cssVariables: FormatFn = async ({
  dictionary,
  file,
  options,
  platform,
}: FormatFnArguments) => {
  const tokens = formatCssVariables({ dictionary, file, options, platform });

  return `${await fileHeader({ file })}:root {\n${tokens}\n}`;
};
