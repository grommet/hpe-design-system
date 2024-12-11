import {
  v5scale as v5,
  scale1613338 as option1,
  scale16133316 as option2,
} from './scale-options';

const scaleToThemeObject = ({ scale, index = 0 }) => {
  const result = {};
  scale.forEach((step, i) => {
    const { size, value } = step;
    if (index !== 0) {
      result[size] =
        i + index >= 0 ? `${scale[i + index].value}px` : `${scale[0].value}px`;
    } else {
      result[size] = `${value}px`;
    }
  });
  return result;
};

const createTheme = ({ spacing, content }) => {
  return {
    global: {
      breakpoints: {
        xsmall: {
          edgeSize: {
            ...scaleToThemeObject({ scale: spacing, index: -1 }),
          },
          size: {
            ...scaleToThemeObject({ scale: content, index: -1 }),
          },
        },
        small: {
          edgeSize: {
            ...scaleToThemeObject({ scale: spacing, index: -1 }),
          },
          size: {
            ...scaleToThemeObject({ scale: content, index: -1 }),
          },
        },
      },
      edgeSize: {
        ...scaleToThemeObject({ scale: spacing }),
      },
      size: {
        ...scaleToThemeObject({ scale: content }),
      },
    },
  };
};

const v5scale = createTheme({
  spacing: v5.spacing,
  content: v5.content,
});

const scale1613338 = createTheme({
  spacing: option1.spacing,
  content: option1.content,
});

const scale16133316 = createTheme({
  spacing: option2.spacing,
  content: option2.content,
});

export { v5scale, scale1613338, scale16133316 };
