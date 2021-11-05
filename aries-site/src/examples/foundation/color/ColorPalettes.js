import { Box } from 'grommet';
import { ColorRow, UsageExample } from '../../../layouts';

import { colorExamples } from '../../../data';

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

const generateColorExamples = (colors, textColor) => (
  <Box fill>
    {colors.map(color => (
      <ColorRow colorSpec={color} key={color.name} textColor={textColor} />
    ))}
  </Box>
);

export const BrandColor = () =>
  primaryColors && (
    <UsageExample pad="none">
      {generateColorExamples(primaryColors)}
    </UsageExample>
  );

export const CorePalette = () =>
  coreColors && (
    <UsageExample pad="none">{generateColorExamples(coreColors)}</UsageExample>
  );

export const LightPalette = () =>
  lightColors && (
    <UsageExample pad="none">{generateColorExamples(lightColors)}</UsageExample>
  );

export const DarkPalette = () =>
  darkColors && (
    <UsageExample pad="none">{generateColorExamples(darkColors)}</UsageExample>
  );

export const BackgroundLight = () => (
  <UsageExample themeMode="light" label="Light Background" pad="none">
    {lightBackgrounds && generateColorExamples(lightBackgrounds)}
  </UsageExample>
);

export const BackgroundDark = () => (
  <UsageExample themeMode="dark" label="Dark Background" pad="none">
    {darkBackgrounds && generateColorExamples(darkBackgrounds)}
  </UsageExample>
);

export const ContrastLight = () => (
  <UsageExample themeMode="light" label="Light Background" pad="none">
    {contrastLight && generateColorExamples(contrastLight)}
  </UsageExample>
);

export const ContrastDark = () => (
  <UsageExample themeMode="dark" label="Dark Background" pad="none">
    {contrastDark && generateColorExamples(contrastDark)}
  </UsageExample>
);
