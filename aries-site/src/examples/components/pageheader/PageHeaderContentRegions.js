import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import {
  Anchor,
  Box,
  Button,
  Grid,
  Heading,
  Paragraph,
  ResponsiveContext,
} from 'grommet';
import { FormPrevious } from 'grommet-icons';

export const PageHeaderContentRegions = ({ background, ...rest }) => {
  const theme = useContext(ThemeContext);
  const breakpoint = useContext(ResponsiveContext);
  return (
    <Box background={background} fill {...rest}>
      <Grid {...theme.pageHeader[breakpoint]} fill="horizontal">
        <Box
          id="parent"
          gridArea="parent"
          border={{ style: 'dashed' }}
          round="xxsmall"
        >
          <Anchor label="Devices" icon={<FormPrevious />} />
        </Box>
        <Box
          id="title"
          gridArea="title"
          border={{ style: 'dashed' }}
          round="xxsmall"
        >
          <Heading size="small" margin="none">
            L2Pod-FTC02 Device
          </Heading>
        </Box>
        <Box
          id="subtitle"
          gridArea="subtitle"
          border={{ style: 'dashed' }}
          round="xxsmall"
        >
          <Paragraph size="large" margin="none">
            View and edit details for this device.
          </Paragraph>
        </Box>
        <Box
          id="actions"
          alignSelf="start"
          gridArea="actions"
          border={{ style: 'dashed' }}
          round="xxsmall"
        >
          <Box justify="end" direction="row" gap="small">
            <Button label="Delete Device" secondary />
            <Button label="Edit Device" primary />
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

PageHeaderContentRegions.propTypes = {
  background: PropTypes.string,
};
