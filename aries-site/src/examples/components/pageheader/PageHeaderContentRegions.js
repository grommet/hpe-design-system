import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import {
  Anchor,
  Box,
  Button,
  Grid,
  Heading,
  Menu,
  Paragraph,
  ResponsiveContext,
} from 'grommet';
import { FormPrevious, MoreVertical } from 'grommet-icons';
import { groupActions } from './utils';

const actions = [
  {
    label: 'Delete Device',
    secondary: true,
  },
  {
    label: 'Edit Device',
    primary: true,
  },
];

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
          <Actions />
        </Box>
      </Grid>
      {['xsmall', 'small'].includes(breakpoint) && (
        <Button alignSelf="start" {...actions[actions.length - 1]} />
      )}
    </Box>
  );
};

PageHeaderContentRegions.propTypes = {
  background: PropTypes.string,
};

const Actions = () => {
  const breakpoint = useContext(ResponsiveContext);

  const [collapsedActions, displayedActions] = groupActions(
    actions,
    breakpoint,
  );

  return (
    <Box direction="row" gap="small">
      {collapsedActions && (
        <Menu
          dropAlign={{ top: 'bottom', right: 'right' }}
          icon={<MoreVertical />}
          items={collapsedActions}
        />
      )}
      {displayedActions.map((action, index) => (
        <Button key={index} {...action} />
      ))}
    </Box>
  );
};
