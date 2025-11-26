// import React from "react;"
import { Box, Text, Grid } from 'grommet';
// import { colors } from "grommet-theme-hpe";
export const ColorSwatch = (background, border, text) => {
  return (
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
};

export const BackgroundSwatch = () => {
  return (
    <Box
      background="background-front"
      pad="medium" gap="medium"
      width={{ max: 'xlarge', min: 'xsmall' }}
      round="medium"
    >
      <Grid columns="small" gap="medium">
        {/* <Box direction="row" gap="xsmall">
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
        </Box> */}
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
};