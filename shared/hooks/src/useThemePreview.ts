'use client';

import { useMemo } from 'react';
import { buildTheme } from 'grommet-theme-hpe/dist/es6/themes/hpe.js';
import {
  primitives,
  dark,
  light,
  dimension,
  small,
  global,
  components,
} from 'hpe-design-tokens/grommet';

const defaultTokens = {
  primitives,
  dark,
  light,
  large: dimension,
  small,
  global,
  components,
};

const defaultBuildOptions = {
  'v6-backwards-compatibility': false,
} as const;

type PlainObject = Record<string, unknown>;

const isPlainObject = (value: unknown): value is PlainObject =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends readonly unknown[]
    ? T[K]
    : T[K] extends object
      ? DeepPartial<T[K]>
      : T[K];
};

export type ThemePreviewTokens = typeof defaultTokens;

export type ThemePreviewBuildOptions = {
  'v6-backwards-compatibility'?: boolean;
};

export interface UseThemePreviewOptions {
  tokenOverrides?: DeepPartial<ThemePreviewTokens>;
  buildOptions?: ThemePreviewBuildOptions;
}

export interface ThemePreviewResult {
  theme: ReturnType<typeof buildTheme>;
  tokens: ThemePreviewTokens;
  options: Required<ThemePreviewBuildOptions>;
}

const deepMerge = <T extends PlainObject>(
  target: T,
  source?: DeepPartial<T>,
): T => {
  if (!source) return { ...target };

  const output: PlainObject = { ...target };
  for (const key of Object.keys(source)) {
    const targetValue = output[key];
    const sourceValue = source[key as keyof T] as unknown;

    if (sourceValue === undefined) continue;

    if (isPlainObject(targetValue) && isPlainObject(sourceValue)) {
      output[key] = deepMerge(targetValue, sourceValue as DeepPartial<PlainObject>);
    } else {
      output[key] = sourceValue;
    }
  }

  return output as T;
};

const resolveOptions = (
  buildOptions?: ThemePreviewBuildOptions,
): Required<ThemePreviewBuildOptions> => ({
  ...defaultBuildOptions,
  ...buildOptions,
});

const resolveTokens = (tokenOverrides?: DeepPartial<ThemePreviewTokens>) =>
  deepMerge(defaultTokens, tokenOverrides);

export const buildThemePreview = (
  options: UseThemePreviewOptions = {},
): ThemePreviewResult => {
  const tokens = resolveTokens(options.tokenOverrides);
  const resolvedOptions = resolveOptions(options.buildOptions);

  return {
    theme: buildTheme(tokens, resolvedOptions),
    tokens,
    options: resolvedOptions,
  };
};

/**
 * Generates an HPE Grommet theme from canonical design tokens.
 *
 * Use this for token QA and preview surfaces where token overrides are useful.
 */
export const useThemePreview = (
  options: UseThemePreviewOptions = {},
): ThemePreviewResult => {
  const tokens = useMemo(
    () => resolveTokens(options.tokenOverrides),
    [options.tokenOverrides],
  );

  const resolvedOptions = useMemo(
    () => resolveOptions(options.buildOptions),
    [options.buildOptions],
  );

  const theme = useMemo(
    () => buildTheme(tokens, resolvedOptions),
    [tokens, resolvedOptions],
  );

  return useMemo(
    () => ({
      theme,
      tokens,
      options: resolvedOptions,
    }),
    [theme, tokens, resolvedOptions],
  );
};
