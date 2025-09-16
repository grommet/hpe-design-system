/// <reference types="vite/client" />

declare module 'hpe-design-tokens/grommet' {
  export const light: {
    hpe: {
      color: {
        icon: {
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
      };
    };
  };

  export const dimension: {
    hpe: {
      icon: {
        size: {
          xsmall: string;
          small: string;
          medium: string;
          large: string;
          xlarge: string;
          xxlarge: string;
        };
      };
    };
  };
}
