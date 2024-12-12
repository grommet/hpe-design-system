import {
  v5scale as v5,
  scale16133308 as option1,
  scale16133316 as option2,
  scale16141408 as option3,
  scale24133308 as option4,
  scale24141408 as option5,
  scale24141424 as option6,
  scale24150024 as option7,
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
    page: {
      wide: { ...pageThemeObject({ scale: content, target: 1536 }) },
      narrow: { ...pageThemeObject({ scale: content, target: 768 }) },
    },
  };
};

const v5scale = createTheme({
  spacing: v5.spacing,
  content: v5.content,
});

const scale16133308 = createTheme({
  spacing: option1.spacing,
  content: option1.content,
});

const scale16133316 = createTheme({
  spacing: option2.spacing,
  content: option2.content,
});

const scale16141408 = createTheme({
  spacing: option3.spacing,
  content: option3.content,
});

const scale24133308 = createTheme({
  spacing: option4.spacing,
  content: option4.content,
});

const scale24141408 = createTheme({
  spacing: option5.spacing,
  content: option5.content,
});

const scale24141424 = createTheme({
  spacing: option6.spacing,
  content: option6.content,
});

const scale24150024 = createTheme({
  spacing: option7.spacing,
  content: option7.content,
});

export {
  v5scale,
  scale16133308,
  scale16133316,
  scale16141408,
  scale24133308,
  scale24141408,
  scale24141424,
  scale24150024,
};
