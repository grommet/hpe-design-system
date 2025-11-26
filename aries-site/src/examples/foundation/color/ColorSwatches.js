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
// const SwatchGroup = () => { ... }

export const BackgroundSwatch = () => (
  // Replace Box and Grid with SwatchGroup component
  <Box
    background="background-front"
    pad="medium"
    gap="medium"
    width={{ max: 'xlarge', min: 'xsmall' }}
    round="medium"
  >
    <Grid columns="small" gap="medium">
      <ColorSwatch
        background="background-default"
        border="border-weak"
        text="color.background.default"
      />

      <Box direction="row" gap="xsmall">
        <Box
          border="border-weak"
          background="background-default"
          width="5xsmall"
          height="5xsmall"
          round="small"
        />
        <Box justify="center">
          <Text>color.background.default</Text>
        </Box>
      </Box>
      <Box direction="row" gap="xsmall">
        <Box
          border="border-weak"
          background="background-default"
          width="5xsmall"
          height="5xsmall"
          round="small"
        />
        <Box justify="center">
          <Text>color.background.default</Text>
        </Box>
      </Box>
      <Box direction="row" gap="xsmall">
        <Box
          border="border-weak"
          background="background-default"
          width="5xsmall"
          height="5xsmall"
          round="small"
        />
        <Box justify="center">
          <Text>color.background.default</Text>
        </Box>
      </Box>
    </Grid>
  </Box>
);

// Create Swatches for Borders, Decorative, DataVis, etc.
// export const BorderSwatch = () => ( ... );
