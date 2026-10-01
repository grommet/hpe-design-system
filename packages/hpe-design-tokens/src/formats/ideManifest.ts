// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import {
  FormatFn,
  FormatFnArguments,
  TransformedToken,
} from 'style-dictionary/types';

const cssVariableName = (name: string) =>
  `--${name
    .split('.')
    .map(part => part.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`))
    .join('-')}`;

const ideToken = (token: TransformedToken) => {
  const source = token.original?.$value;

  return {
    value: token.$value,
    type: token.$type,
    cssVariable: cssVariableName(token.name),
    ...(token.$description ? { description: token.$description } : {}),
    ...(typeof source === 'string' ? { source } : {}),
  };
};

export const ideManifest: FormatFn = async ({
  dictionary,
}: FormatFnArguments) =>
  `${JSON.stringify(
    {
      schemaVersion: 1,
      tokens: Object.fromEntries(
        dictionary.allTokens.map(token => [token.name, ideToken(token)]),
      ),
    },
    null,
    2,
  )}\n`;
