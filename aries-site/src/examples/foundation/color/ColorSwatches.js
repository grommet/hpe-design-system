import { Box, Text, Grid } from 'grommet';
import PropTypes from 'prop-types';

const ColorSwatch = ({ background, border, text }) => (
  <Box direction="row" gap="xsmall">
    <Box
      border={border}
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
  text: PropTypes.string.isRequired,
};

// Create a component to handle the Grid and the Box around
// the Grid, so that the code doesn't need to be duplicated
// for each group of swatches.
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

// Create Swatches for Borders, Decorative, DataVis, etc.
// export const BorderSwatch = () => ( ... );
