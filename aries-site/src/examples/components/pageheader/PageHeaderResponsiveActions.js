import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Anchor,
  Box,
  Button,
  Menu,
  PageHeader,
  Page,
  PageContent,
  ResponsiveContext,
} from 'grommet';
import { FormPrevious, MoreVertical } from 'grommet-icons';
import { groupActions } from './utils';

const deviceActions = [
  {
    label: 'Delete Device',
  },

  {
    label: 'Power Off',
    secondary: true,
  },
  {
    label: 'Edit Device',
    primary: true,
  },
];

const Actions = ({ bestPractice }) => {
  const breakpoint = useContext(ResponsiveContext);

  const [collapsedActions, displayedActions] = groupActions(
    deviceActions,
    breakpoint,
    bestPractice,
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

Actions.propTypes = {
  bestPractice: PropTypes.bool,
};

export const PageHeaderResponsiveActions = ({ bestPractice = true }) => {
  const breakpoint = useContext(ResponsiveContext);
  return (
    <Page>
      <PageContent>
        <PageHeader
          title="L2Pod-FTC02 Device"
          parent={<Anchor icon={<FormPrevious />} label="Devices" />}
          actions={<Actions bestPractice={bestPractice} />}
        >
          {bestPractice && ['xsmall', 'small'].includes(breakpoint) && (
            <Button
              alignSelf="start"
              {...deviceActions[deviceActions.length - 1]}
            />
          )}
        </PageHeader>
      </PageContent>
    </Page>
  );
};

PageHeaderResponsiveActions.propTypes = {
  bestPractice: PropTypes.bool,
};
