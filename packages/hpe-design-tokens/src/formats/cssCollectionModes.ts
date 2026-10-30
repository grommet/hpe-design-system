// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { FormatFn, FormatFnArguments } from 'style-dictionary/types';
import { formattedVariables, fileHeader } from 'style-dictionary/utils';

/**
 * CSS custom properties for a collection that carries its own mode axis,
 * independent of the colour mode. The output is scoped to a data attribute
 * ([data-<attribute>=<mode>]) and the default mode is also applied to :root.
 *
 * Values are emitted as references, so a collection that aliases the colour
 * collection (for example the Surface collection aliasing color.surface.*)
 * stays mode-agnostic: `--hpe-color-background-surface-base:
 * var(--hpe-color-surface-10)` is correct in light and dark because the
 * referenced property is what changes with [data-mode].
 */
export const cssCollectionModes: FormatFn = async ({
  dictionary,
  file,
  options,
}: FormatFnArguments) => {
  const {
    outputReferences,
    attribute = 'data-surface',
    mode,
    defaultMode = 'default',
  } = options;
  const tokens = formattedVariables({
    format: 'css',
    dictionary,
    outputReferences,
    usesDtcg: true,
  });

  const isDefault = mode === defaultMode;
  const selector = `[${attribute}=${mode}]`;

  return `${await fileHeader({ file })}${
    isDefault ? ':root, ' : ''
  }${selector} {\n${tokens}\n}\n`;
};
