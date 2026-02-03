import { useContext } from 'react';
import { Box, ResponsiveContext, ThemeContext } from 'grommet';
import { ColorRow, UsageExample } from '../../../layouts';

import { getColorExamples } from '../../../data';
import {
  ElevationExample,
  TextExample,
  StatusExample,
  GraphExample,
} from '../..';

const generateColorExamples = (colors, textColor, textSize) => (
  <Box fill="horizontal" flex={false}>
    {colors.map(color => (
      <ColorRow
        colorSpec={color}
        key={color.name}
        textColor={textColor}
        textSize={textSize}
      />
    ))}
  </Box>
);

export const BrandColor = () => {
  const theme = useContext(ThemeContext);
  const { palettes } = getColorExamples(theme);
  const { primaryColors } = palettes;
  return (
    primaryColors &&
    generateColorExamples(primaryColors, 'text-strong', 'large')
  );
};

export const CorePalette = () => {
  const theme = useContext(ThemeContext);
  const { palettes } = getColorExamples(theme);
  const { coreColors } = palettes;
  return (
    coreColors && (
      <UsageExample pad="none">
        {generateColorExamples(coreColors)}
      </UsageExample>
    )
  );
};

export const LightPalette = () => {
  const theme = useContext(ThemeContext);
  const { palettes } = getColorExamples(theme);
  const { lightColors } = palettes;
  return (
    lightColors && (
      <UsageExample pad="none">
        {generateColorExamples(lightColors)}
      </UsageExample>
    )
  );
};

export const DarkPalette = () => {
  const theme = useContext(ThemeContext);
  const { palettes } = getColorExamples(theme);
  const { darkColors } = palettes;
  return (
    darkColors && (
      <UsageExample pad="none">
        {generateColorExamples(darkColors)}
      </UsageExample>
    )
  );
};

export const BackgroundLight = () => {
  const theme = useContext(ThemeContext);
  const { backgrounds } = getColorExamples(theme);
  const { lightBackgrounds } = backgrounds;
  return (
    <UsageExample themeMode="light" label="Light Background" pad="none">
      {lightBackgrounds && generateColorExamples(lightBackgrounds)}
    </UsageExample>
  );
};

export const BackgroundDark = () => {
  const theme = useContext(ThemeContext);
  const { backgrounds } = getColorExamples(theme);
  const { darkBackgrounds } = backgrounds;
  return (
    <UsageExample themeMode="dark" label="Dark Background" pad="none">
      {darkBackgrounds && generateColorExamples(darkBackgrounds)}
    </UsageExample>
  );
};

export const ContrastLight = () => {
  const theme = useContext(ThemeContext);
  const { backgrounds } = getColorExamples(theme);
  const { contrastLight } = backgrounds;
  return (
    <UsageExample themeMode="light" label="Light Background" pad="none">
      {contrastLight && generateColorExamples(contrastLight)}
    </UsageExample>
  );
};

export const ContrastDark = () => {
  const theme = useContext(ThemeContext);
  const { backgrounds } = getColorExamples(theme);
  const { contrastDark } = backgrounds;
  return (
    <UsageExample themeMode="dark" label="Dark Background" pad="none">
      {contrastDark && generateColorExamples(contrastDark)}
    </UsageExample>
  );
};

export const BordersLight = () => {
  const theme = useContext(ThemeContext);
  const { borders } = getColorExamples(theme);
  const { borderLight } = borders;
  return (
    <UsageExample themeMode="light" label="Light Border" pad="none">
      {borderLight && generateColorExamples(borderLight)}
    </UsageExample>
  );
};

export const BordersDark = () => {
  const theme = useContext(ThemeContext);
  const { borders } = getColorExamples(theme);
  const { borderDark } = borders;
  return (
    <UsageExample themeMode="dark" label="Dark Border" pad="none">
      {borderDark && generateColorExamples(borderDark)}
    </UsageExample>
  );
};

export const InputsLight = () => {
  const theme = useContext(ThemeContext);
  const { input } = getColorExamples(theme);
  const { inputLight } = input;
  return (
    <UsageExample themeMode="light" label="Light Input" pad="none">
      {inputLight && generateColorExamples(inputLight)}
    </UsageExample>
  );
};

export const InputsDark = () => {
  const theme = useContext(ThemeContext);
  const { input } = getColorExamples(theme);
  const { inputDark } = input;
  return (
    <UsageExample themeMode="dark" label="Dark Input" pad="none">
      {inputDark && generateColorExamples(inputDark)}
    </UsageExample>
  );
};

export const TextLight = () => {
  const theme = useContext(ThemeContext);
  const { text } = getColorExamples(theme);
  const { textColors } = text;
  return (
    <UsageExample
      themeMode="light"
      label="Light Background"
      justify="between"
      pad={{
        horizontal: 'xlarge',
        bottom: 'xlarge',
        top: 'medium',
        small: {
          horizontal: 'medium',
          bottom: 'xlarge',
          top: 'xsmall',
        },
      }}
    >
      {textColors &&
        textColors.map(color => (
          <TextExample
            key={color.name}
            color={color.name}
            hex={color.hex.light}
          />
        ))}
    </UsageExample>
  );
};

export const TextDark = () => {
  const theme = useContext(ThemeContext);
  const { text } = getColorExamples(theme);
  const { textColors } = text;
  return (
    <UsageExample
      themeMode="dark"
      label="Dark Background"
      justify="between"
      pad={{
        horizontal: 'xlarge',
        bottom: 'xlarge',
        top: 'medium',
        small: {
          horizontal: 'medium',
          bottom: 'xlarge',
          top: 'xsmall',
        },
      }}
    >
      {textColors &&
        textColors.map(color => (
          <TextExample
            key={color.name}
            color={color.name}
            hex={color.hex.dark}
          />
        ))}
    </UsageExample>
  );
};

export const StatusLight = () => {
  const theme = useContext(ThemeContext);
  const { text } = getColorExamples(theme);
  const { statusColorsLight } = text;
  return (
    <UsageExample themeMode="light" label="Light Background" justify="between">
      {statusColorsLight.map(color => (
        <StatusExample key={color.name} color={color.name} hex={color.value} />
      ))}
    </UsageExample>
  );
};

export const StatusDark = () => {
  const theme = useContext(ThemeContext);
  const { text } = getColorExamples(theme);
  const { statusColorsDark } = text;
  return (
    <UsageExample themeMode="dark" label="Dark Background" justify="between">
      {statusColorsDark.map(color => (
        <StatusExample key={color.name} color={color.name} hex={color.value} />
      ))}
    </UsageExample>
  );
};

export const FocusColor = () => {
  const theme = useContext(ThemeContext);
  const { focusColor } = getColorExamples(theme);
  return focusColor && generateColorExamples(focusColor);
};

export const ElevationLight = () => {
  const size = useContext(ResponsiveContext);
  const theme = useContext(ThemeContext);
  const { elevation } = getColorExamples(theme);
  const { elevationColorsLight } = elevation;

  return (
    <UsageExample
      themeMode="light"
      label="Light Background"
      justify="between"
      direction="row-responsive"
      gap={['xsmall', 'small'].includes(size) ? 'medium' : undefined}
      pad={{
        horizontal: 'xlarge',
        vertical: 'xlarge',
        small: { horizontal: 'medium', vertical: 'xlarge' },
      }}
    >
      {elevationColorsLight &&
        elevationColorsLight.map(color => (
          <ElevationExample
            key={color.name}
            color={color.name}
            hex={color.hex}
          />
        ))}
    </UsageExample>
  );
};

export const ElevationDark = () => {
  const size = useContext(ResponsiveContext);
  const theme = useContext(ThemeContext);
  const { elevation } = getColorExamples(theme);
  const { elevationColorsDark } = elevation;

  return (
    <UsageExample
      themeMode="dark"
      label="Dark Background"
      justify="between"
      direction="row-responsive"
      gap={['xsmall', 'small'].includes(size) ? 'medium' : undefined}
      pad={{
        horizontal: 'xlarge',
        vertical: 'xlarge',
        small: { horizontal: 'medium', vertical: 'xlarge' },
      }}
    >
      {elevationColorsDark &&
        elevationColorsDark.map(color => (
          <ElevationExample
            key={color.name}
            color={color.name}
            hex={color.hex}
          />
        ))}
    </UsageExample>
  );
};

export const Overlay = () => {
  const theme = useContext(ThemeContext);
  const { layerColor } = getColorExamples(theme);
  return layerColor && generateColorExamples(layerColor);
};

export const GraphColorsLight = () => {
  const theme = useContext(ThemeContext);
  const { graph } = getColorExamples(theme);
  const { graphColorsLight } = graph;
  return (
    <UsageExample themeMode="light" label="Light Background" justify="between">
      {graphColorsLight?.map(color => (
        <GraphExample key={color.name} color={color} />
      ))}
    </UsageExample>
  );
};

export const GraphColorsDark = () => {
  const theme = useContext(ThemeContext);
  const { graph } = getColorExamples(theme);
  const { graphColorsDark } = graph;
  return (
    <UsageExample themeMode="dark" label="Dark Background" justify="between">
      {graphColorsDark?.map(color => (
        <GraphExample key={color.name} color={color} />
      ))}
    </UsageExample>
  );
};
