declare module 'grommet-theme-hpe/dist/es6/themes/hpe.js' {
  export function buildTheme(
    tokens: unknown,
    options?: {
      'v6-backwards-compatibility'?: boolean;
    },
  ): unknown;
}

declare module 'hpe-design-tokens/grommet' {
  export const primitives: unknown;
  export const dark: unknown;
  export const light: unknown;
  export const dimension: unknown;
  export const small: unknown;
  export const global: unknown;
  export const components: unknown;
}
