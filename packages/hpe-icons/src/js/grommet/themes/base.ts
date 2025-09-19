import { light, dark, dimension } from 'hpe-design-tokens/grommet';

type IconColorType =
  | string
  | {
      light: string;
      dark: string;
    };

type ThemeType = {
  global: {
    colors: {
      icon: IconColorType;
    };
  };
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

export const base: ThemeType = {
  global: {
    colors: {
      icon: {
        light: light.hpe.color.icon.default,
        dark: dark.hpe.color.icon.default,
      },
    },
  },
  icon: {
    size: {
      xsmall: dimension.hpe.icon.xsmall.size,
      small: dimension.hpe.icon.small.size,
      medium: dimension.hpe.icon.medium.size,
      large: dimension.hpe.icon.large.size,
      xlarge: dimension.hpe.icon.xlarge.size,
      xxlarge: dimension.hpe.icon.xxlarge.size,
    },
  },
};
