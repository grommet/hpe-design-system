import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import { Box, Grid, Heading, Paragraph, ResponsiveContext } from 'grommet';
import { Actions } from './PageHeaderResponsiveActions';
import { ReverseAnchor } from '../../templates';

export const PageHeaderContentRegions = ({ background, pad, ...rest }) => {
  const theme = useContext(ThemeContext);
  const breakpoint = useContext(ResponsiveContext);

  return (
    <Box
      align="start"
      background={background}
      fill
      gap="medium"
      pad={pad || { top: 'large', bottom: 'medium' }}
      {...rest}
    >
      <Grid {...theme.pageHeader[breakpoint]} fill="horizontal">
        <Box
          id="parent"
          gridArea="parent"
          border={{ style: 'dashed' }}
          round="xxsmall"
        >
          <ReverseAnchor label="Devices" />
        </Box>
        <Box
          id="title-region"
          gridArea="title"
          border={{ style: 'dashed' }}
          round="xxsmall"
        >
          <Heading size="small" margin="none">
            L2Pod-FTC02 Device
          </Heading>
        </Box>
        <Box
          id="subtitle-region"
          gridArea="subtitle"
          border={{ style: 'dashed' }}
          round="xxsmall"
        >
          <Paragraph size="large" margin="none">
            View and edit details for this device.
          </Paragraph>
        </Box>
        {!['xsmall', 'small'].includes(breakpoint) && (
          <Box
            id="actions"
            alignSelf="start"
            gridArea="actions"
            border={{ style: 'dashed' }}
            round="xxsmall"
          >
            <Actions />
          </Box>
        )}
      </Grid>
      {['xsmall', 'small'].includes(breakpoint) && (
        <Box
          id="actions"
          align="start"
          border={{ style: 'dashed' }}
          round="xxsmall"
        >
          <Actions />
        </Box>
      )}
    </Box>
  );
};

PageHeaderContentRegions.propTypes = {
  background: PropTypes.string,
  pad: PropTypes.string,
};
