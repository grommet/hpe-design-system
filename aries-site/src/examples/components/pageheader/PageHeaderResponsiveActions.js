import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  PageHeader,
  Page,
  PageContent,
  ResponsiveContext,
} from 'grommet';
import { groupActions } from './utils';
import { ActionMenu, ReverseAnchor } from '../../templates';

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
      <PageHeader
        title="L2Pod-FTC02 Device"
        subtitle="View and edit details about this device."
        parent={<ReverseAnchor label="Devices" />}
        actions={
          <Actions bestPractice={bestPractice} primaryAction={primaryAction} />
        }
        // if there is a primary action, the PageHeader should
        // use responsive behavior
        responsive={primaryAction}
      />
    </PageContent>
  </Page>
);

PageHeaderResponsiveActions.propTypes = {
  bestPractice: PropTypes.bool,
  primaryAction: PropTypes.bool,
};
