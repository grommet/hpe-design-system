import { dark, light, dimension } from 'hpe-design-tokens/dist/grommet';

export const base = {
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
