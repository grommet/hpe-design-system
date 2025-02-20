import React from 'react';
import { Box, Menu, Layer, Text } from 'grommet';
import { LinkNext, StatusGoodSmall } from 'grommet-icons';
import ContentPane from '../../../../components/ContentPane';
import { ResourceAlerts } from './ResourceAlerts';
import { ResourceTraits } from './ResourceTraits';
import { ResourceOverview } from './ResourceOverview';

const actionItems = [
  { label: 'View details', onClick: () => {} },
  { label: 'Copy ID', onClick: () => {} },
  { label: 'Add relationships', onClick: () => {} },
  { label: 'Assign credential', onClick: () => {} },
  { label: 'Assign custom attribute', onClick: () => {} },
  { label: 'Assign monitoring template', onClick: () => {} },
  { label: 'Add maintenance window', onClick: () => {} },
  { label: 'Add note', onClick: () => {} },
  { label: 'Unmanage', onClick: () => {} },
  {
    label: <Text color="status-critical">Remove</Text>,
    onClick: () => {},
  },
];

const ResourceHeader = ({ name, ipAddress }) => (
  <Box pad={{ vertical: 'small' }} align="center" direction="row" gap="small">
    <StatusGoodSmall color="status-ok" />
    <Box>
      <Text weight="bold">{name}</Text>
      <Text size="small">{ipAddress}</Text>
    </Box>
  </Box>
);

const ResourceActions = ({ onClose }) => (
  <Menu label="Actions" items={actionItems} onClick={onClose} />
);

export const ResourceDetails = ({ animation, layer, onClose, ...rest }) => {
  const content = (
    <ContentPane
      gap="small"
      heading={
        <Box align="center" direction="row" gap="medium">
          <LinkNext />
          <Text>Resource Details</Text>
        </Box>
      }
      level={2}
      actions={<ResourceActions onClose={onClose} />}
      skeleton={undefined}
      animation={animation}
      {...rest}
    >
      <ResourceHeader name="k8s-flow-worker02" ipAddress="172.31.47.37" />
      <Box border={{ side: 'top' }} />
      <ResourceAlerts />
      <Box border={{ side: 'top' }} />
      <ResourceOverview />
      <Box border={{ side: 'top' }} />
      <ResourceTraits />
    </ContentPane>
  );

  if (layer) {
    return (
      <Layer full modal={false}>
        {content}
      </Layer>
    );
  }

  return content;
};

export default ResourceDetails;
