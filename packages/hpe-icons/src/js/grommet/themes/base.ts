import { light, dimension } from 'hpe-design-tokens/grommet';

type ThemeType = {
  global: {
    colors: {
      icon: (typeof light)['hpe']['color']['icon'][keyof (typeof light)['hpe']['color']['icon']];
    };
  };
  icon: (typeof dimension)['hpe']['icon'];
};

export const base: ThemeType = {
  global: {
    colors: {
      icon: light.hpe.color.icon.default,
    },
  },
  icon: {
    size: dimension.hpe.icon.size,
  },
};
