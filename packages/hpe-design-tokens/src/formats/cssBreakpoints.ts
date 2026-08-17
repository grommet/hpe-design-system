// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { FormatFn, FormatFnArguments } from 'style-dictionary/types';
import { fileHeader, formattedVariables } from 'style-dictionary/utils';

export const cssBreakpoints: FormatFn = async ({
  dictionary,
  file,
  options,
}: FormatFnArguments) => {
  const { outputReferences, mediaQuery } = options;
  let output = `:root {\n${formattedVariables({
    format: 'css',
    dictionary,
    outputReferences,
    usesDtcg: true,
  })}\n}`;
  if (mediaQuery) output = `@media (${mediaQuery}) {\n${output}\n}\n`;

  return `${await fileHeader({
    file,
  })}${output}`;
};
