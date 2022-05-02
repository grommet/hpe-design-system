import { useContext } from 'react';
import { Box, ResponsiveContext } from 'grommet';
import { ColorRow, UsageExample } from '../../../layouts';

import { colorExamples } from '../../../data';
import { ElevationExample, TextExample } from '../..';

const {
  coreColors,
  darkColors,
  lightColors,
  primaryColors,
} = colorExamples.palettes;
const {
  contrastDark,
  contrastLight,
  darkBackgrounds,
  lightBackgrounds,
} = colorExamples.backgrounds;
const { borderDark, borderLight } = colorExamples.borders;
const { inputDark, inputLight } = colorExamples.input;
const { elevationColorsDark, elevationColorsLight } = colorExamples.elevation;
const { focusColor, layerColor, graphColor } = colorExamples;
const { statusColorsDark, statusColorsLight, textColors } = colorExamples.text;

const generateColorExamples = (colors, textColor, textSize) => (
  <Box fill>
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

export const BrandColor = () =>
  primaryColors && generateColorExamples(primaryColors, 'text-strong', 'large');

export function CorePalette() {
  return coreColors && (
    <UsageExample pad="none">{generateColorExamples(coreColors)}</UsageExample>
  );
}

export function LightPalette() {
  return lightColors && (
    <UsageExample pad="none">{generateColorExamples(lightColors)}</UsageExample>
  );
}

export function DarkPalette() {
  return darkColors && (
    <UsageExample pad="none">{generateColorExamples(darkColors)}</UsageExample>
  );
}

export function BackgroundLight() {
  return <UsageExample themeMode="light" label="Light Background" pad="none">
    {lightBackgrounds && generateColorExamples(lightBackgrounds)}
  </UsageExample>;
}

export function BackgroundDark() {
  return <UsageExample themeMode="dark" label="Dark Background" pad="none">
    {darkBackgrounds && generateColorExamples(darkBackgrounds)}
  </UsageExample>;
}

export function ContrastLight() {
  return <UsageExample themeMode="light" label="Light Background" pad="none">
    {contrastLight && generateColorExamples(contrastLight)}
  </UsageExample>;
}

export function ContrastDark() {
  return <UsageExample themeMode="dark" label="Dark Background" pad="none">
    {contrastDark && generateColorExamples(contrastDark)}
  </UsageExample>;
}

export function BordersLight() {
  return <UsageExample themeMode="light" label="Light Border" pad="none">
    {borderLight && generateColorExamples(borderLight)}
  </UsageExample>;
}
export function BordersDark() {
  return <UsageExample themeMode="dark" label="Dark Border" pad="none">
    {borderDark && generateColorExamples(borderDark)}
  </UsageExample>;
}

export function InputsLight() {
  return <UsageExample themeMode="light" label="Light Input" pad="none">
    {inputLight && generateColorExamples(inputLight)}
  </UsageExample>;
}

export function InputsDark() {
  return <UsageExample themeMode="dark" label="Dark Input" pad="none">
    {inputDark && generateColorExamples(inputDark)}
  </UsageExample>;
}

export function TextLight() {
  return <UsageExample
    themeMode="light"
    label="Light Background"
    justify="between"
    pad={{
      horizontal: 'large',
      bottom: 'large',
      top: 'medium',
      small: {
        horizontal: 'medium',
        bottom: 'large',
        top: 'small',
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
  </UsageExample>;
}

export function TextDark() {
  return <UsageExample
    themeMode="dark"
    label="Dark Background"
    justify="between"
    pad={{
      horizontal: 'large',
      bottom: 'large',
      top: 'medium',
      small: {
        horizontal: 'medium',
        bottom: 'large',
        top: 'small',
      },
    }}
  >
    {textColors &&
      textColors.map(color => (
        <TextExample key={color.name} color={color.name} hex={color.hex.dark} />
      ))}
  </UsageExample>;
}

export function StatusLight() {
  return <UsageExample themeMode="light" label="Light Background" pad="none">
    {statusColorsLight && generateColorExamples(statusColorsLight)}
  </UsageExample>;
}

export function StatusDark() {
  return <UsageExample themeMode="dark" label="Dark Background" pad="none">
    {statusColorsDark && generateColorExamples(statusColorsDark)}
  </UsageExample>;
}

export const FocusColor = () => focusColor && generateColorExamples(focusColor);

export function ElevationLight() {
  const size = useContext(ResponsiveContext);

  return (
    <UsageExample
      themeMode="light"
      label="Light Background"
      justify="between"
      direction="row-responsive"
      gap={['xsmall', 'small'].includes(size) ? 'medium' : undefined}
      pad={{
        horizontal: 'large',
        vertical: 'large',
        small: { horizontal: 'medium', vertical: 'large' },
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
}

export function ElevationDark() {
  const size = useContext(ResponsiveContext);

  return (
    <UsageExample
      themeMode="dark"
      label="Dark Background"
      justify="between"
      direction="row-responsive"
      gap={['xsmall', 'small'].includes(size) ? 'medium' : undefined}
      pad={{
        horizontal: 'large',
        vertical: 'large',
        small: { horizontal: 'medium', vertical: 'large' },
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
}

export const Overlay = () => layerColor && generateColorExamples(layerColor);

export const GraphColors = () =>
  graphColor && generateColorExamples(graphColor);
