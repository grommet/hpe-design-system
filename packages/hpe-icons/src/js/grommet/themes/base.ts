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
      xsmall?: string;
      small: string;
      medium: string;
      large: string;
      xlarge: string;
      xxlarge?: string;
    };
  };
};

export const base: ThemeType = {
  global: {
    colors: {
      icon: {
        light: '#555555',
        dark: '#FFFFFF',
      },
    },
  },
  icon: {
    size: {
      small: '14px',
      medium: '18px',
      large: '24px',
      xlarge: '36px',
    },
  },
};
