// scale-to-theme.js
// Utility functions to convert scale definitions and t-shirt sizes to theme objects
// Scale definition example:
// {
//   name: string,
//   description: string,
//   settings: {
//     base: integer,
//     contentBase: integer,
//     factor: number,
//     steps: integer,
//     nearest: integer,
//   },
//   scale: integer[];
//   content: { size: string, value: integer }[];
// }

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

const pageThemeObject = ({ scale, target }) => {
  const max = scale.reduce(
    (acc, { size, value }) => {
      // Minimizing the difference between the target and the value
      const test =
        !acc.value || Math.abs(target - value) < Math.abs(target - acc.value);
      acc.size = test ? size : acc.size;
      acc.value = test ? value : acc.value;
      return acc;
    },
    { size: undefined, value: undefined },
  );

  return { width: { max: max.size } };
};

export const createTheme = ({ spacing, content }) => {
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
    page: {
      wide: { ...pageThemeObject({ scale: content, target: 1536 }) },
      narrow: { ...pageThemeObject({ scale: content, target: 768 }) },
    },
  };
};
