/// <reference types="vite/client" />

type IconColorTokens = {
  default: string;
  strong: string;
  medium: string;
  weak: string;
  disabled: string;
  critical: string;
  info: string;
  ok: string;
  warning: string;
  unknown: string;
  primary: string;
  'primary-hover': string;
  onPrimaryStrong: string;
  onSelectedPrimaryStrong: string;
  onSelectedPrimary: string;
  onStrong: string;
};

declare module 'hpe-design-tokens/grommet' {
  export const light: {
    hpe: {
      color: {
        icon: IconColorTokens;
      };
    };
  };

  export const dark: {
    hpe: {
      color: {
        icon: IconColorTokens;
      };
    };
  };

  export const dimension: {
    hpe: {
      icon: {
        xsmall: { size: string };
        small: { size: string };
        medium: { size: string };
        large: { size: string };
        xlarge: { size: string };
        xxlarge: { size: string };
      };
    };
  };
}
