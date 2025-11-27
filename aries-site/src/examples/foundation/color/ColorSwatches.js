import { Box, Text, Grid } from 'grommet';
import PropTypes from 'prop-types';

const ColorSwatch = ({ background, border, borderSize = 'xsmall', text }) => (
  <Box direction="row" gap="xsmall">
    <Box
      border={border ? { color: border, size: borderSize } : undefined}
      background={background}
      width="5xsmall"
      height="5xsmall"
      round="small"
    />
    <Box justify="center">
      <Text>{text}</Text>
    </Box>
  </Box>
);
ColorSwatch.propTypes = {
  background: PropTypes.string.isRequired,
  border: PropTypes.string,
  borderSize: PropTypes.string,
  text: PropTypes.string.isRequired,
};

const SwatchGroup = ({ children }) => (
  <Box
    background="background-front"
    pad="medium"
    gap="medium"
    width={{ max: 'xlarge', min: 'xsmall' }}
    round="medium"
  >
    <Grid columns="small" gap="medium">
      {children}
    </Grid>
  </Box>
);
SwatchGroup.propTypes = {
  children: PropTypes.node.isRequired,
};


export const BackgroundSwatch = () => (
  <SwatchGroup>
    <ColorSwatch
      background="background-default"
      border="border-weak"
      text="color.background.default"
    />
    <ColorSwatch
      background="background-back"
      text="color.background.back"
    />
    <ColorSwatch
      background="background-front"
      border="border-weak"
      text="color.background.front"
    />
    <ColorSwatch
      background="background-screenOverlay"
      text="color.background.screenOverlay"
    />
  </SwatchGroup>
);

export const BorderSwatch = () => (
  <SwatchGroup>
    <ColorSwatch
      background="background-default"
      border="border-default"
      borderSize="medium"
      text="color.border.default"
    />
    <ColorSwatch
      background="background-default"
      border="border-weak"
      borderSize="medium"
      text="color.border.weak"
    />
    <ColorSwatch
      background="background-default"
      border="border-strong"
      borderSize="medium"
      text="color.border.strong"
    />
  </SwatchGroup>
);

export const DecorativeSwatch = () => (
  <SwatchGroup>
    <ColorSwatch
      background="brand"
      text="color.decorative.brand"
    />
    <ColorSwatch
      background="decorative-green"
      text="color.decorative.green"
    />
    <ColorSwatch
      background="decorative-purple"
      text="color.decorative.purple"
    />
    <ColorSwatch
      background="decorative-blue"
      text="color.decorative.blue"
    />
    <ColorSwatch
      background="decorative-neutral"
      text="color.decorative.neutral"
    />
    <ColorSwatch
      background="decorative-neutral-hover"
      text="color.decorative.neutral-hover"
    />
    <ColorSwatch
      background="decorative-cyan"
      text="color.decorative.cyan"
    />
  </SwatchGroup>
);

export const DataVisSwatch = () => (
  <SwatchGroup>
    <ColorSwatch
      background="dataVis-categorical-10"
      text="color.dataVis.categorical.10"
    />
    <ColorSwatch
      background="dataVis-categorical-20"
      text="color.dataVis.categorical.20"
    />
    <ColorSwatch
      background="dataVis-categorical-30"
      text="color.dataVis.categorical.30"
    />
    <ColorSwatch
      background="dataVis-categorical-40"
      text="color.dataVis.categorical.40"
    />
    <ColorSwatch
      background="dataVis-categorical-50"
      text="color.dataVis.categorical.50"
    />
    <ColorSwatch
      background="dataVis-categorical-60"
      text="color.dataVis.categorical.60"
    />
    <ColorSwatch
      background="dataVis-categorical-70"
      text="color.dataVis.categorical.70"
    />
    <ColorSwatch
      background="dataVis-categorical-80"
      text="color.dataVis.categorical.80"
    />
  </SwatchGroup>
);

export const ForegroundSwatch = () => (
  <SwatchGroup>
    <ColorSwatch
      background="foreground-warning"
      text="color.foreground.warning"
    />
    <ColorSwatch
      background="foreground-critical"
      text="color.foreground.critical"
    />
    <ColorSwatch
      background="foreground-unknown"
      text="color.foreground.unknown"
    />
    <ColorSwatch
      background="foreground-primary"
      text="color.foreground.primary"
    />
  </SwatchGroup>
);