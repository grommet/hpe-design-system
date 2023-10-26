import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  PageHeader,
  Page,
  PageContent,
  ResponsiveContext,
  ThemeContext,
} from 'grommet';
import { ActionMenu } from 'aries-core';
import { groupActions } from './utils';
import { ReverseAnchor } from '../../templates';

// need to override the PageHeader theme values in order for our examples
// to fit their container page. Even though it is using the correct breakpoints
// our examples are only taking up half the space on the page so layout
// different than a PageHeader on a full page.
const pageHeaderSiteTheme = {
  pageHeader: {
    medium: {
      columns: [['small', 'flex'], 'auto'],
    },
    large: {
      columns: [['small', 'flex'], 'auto'],
    },
    xlarge: {
      columns: [['medium', 'flex'], 'auto'],
    },
  },
};

const deviceActions = [
  {
    label: 'Delete device',
  },

  {
    label: 'Power Off',
    secondary: true,
  },
  {
    label: 'Edit device',
    primary: true,
  },
];

export const Actions = ({ bestPractice = true, primaryAction = true }) => {
  const breakpoint = useContext(ResponsiveContext);

  const [collapsedActions, displayedActions] = groupActions(
    primaryAction
      ? deviceActions
      : deviceActions.filter(action => !action.primary),
    breakpoint,
    bestPractice,
  );

  return (
    <Box
      alignSelf={['xsmall', 'small'].includes(breakpoint) ? 'start' : 'end'}
      direction={
        ['xsmall', 'small'].includes(breakpoint) ? 'row-reverse' : 'row'
      }
      gap="small"
    >
      {collapsedActions && <ActionMenu items={collapsedActions} />}
      {displayedActions.map((action, index) => (
        <Button key={index} {...action} />
      ))}
    </Box>
  );
};

Actions.propTypes = {
  bestPractice: PropTypes.bool,
  primaryAction: PropTypes.bool,
};

export const PageHeaderResponsiveActions = ({
  bestPractice = true,
  primaryAction = true,
}) => (
  <Page>
    <PageContent>
      <ThemeContext.Extend value={pageHeaderSiteTheme}>
        <PageHeader
          title="L2Pod-FTC02 device"
          subtitle="View and edit details about this device."
          parent={<ReverseAnchor label="Devices" />}
          actions={
            <Actions
              bestPractice={bestPractice}
              primaryAction={primaryAction}
            />
          }
          // if there is a primary action, the PageHeader should
          // use responsive behavior
          responsive={primaryAction}
        />
      </ThemeContext.Extend>
    </PageContent>
  </Page>
);

PageHeaderResponsiveActions.propTypes = {
  bestPractice: PropTypes.bool,
  primaryAction: PropTypes.bool,
};
