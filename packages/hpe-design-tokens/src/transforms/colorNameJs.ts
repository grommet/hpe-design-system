// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Transform, TransformedToken } from 'style-dictionary/types';
import { excludedNameParts } from '../utils.js';

export const colorNameJs: Transform = {
  name: 'js/color-name',
  type: 'name',
  transform: (token: TransformedToken) =>
    token.name
      .split('.')
      .filter(part => !excludedNameParts.includes(part))
      .join('.'),
};
