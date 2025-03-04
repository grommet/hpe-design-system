import React, { useContext } from 'react';
import {
  Box,
  Button,
  Menu,
  Text,
  Layer,
  Heading,
  ResponsiveContext,
} from 'grommet';
import { LinkNext, StatusGoodSmall } from 'grommet-icons';
import ContentPane from '../../../../components/ContentPane';
import { ResourceAlerts } from './ResourceAlerts';
import { ResourceTraits } from './ResourceTraits';
import { ResourceOverview } from './ResourceOverview';

interface ActionItem {
  label: string | JSX.Element;
  onClick: () => void;
}

const actionItems: ActionItem[] = [
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
    label: <Text color="text-critical">Remove</Text>,
    onClick: () => {},
  },
];

interface ResourceHeaderProps {
  name: string;
  ipAddress: string;
}

const ResourceHeader: React.FC<ResourceHeaderProps> = ({ name, ipAddress }) => (
  <Box pad={{ vertical: 'small' }} align="center" direction="row" gap="small">
    <StatusGoodSmall color="status-ok" />
    <Box>
      <Text weight="bold">{name}</Text>
      <Text size="small">{ipAddress}</Text>
    </Box>
  </Box>
);

interface ResourceActionsProps {
  onClose: () => void;
}

const ResourceActions: React.FC<ResourceActionsProps> = () => (
  <Menu label="Actions" items={actionItems} onClick={() => {}} />
);

interface ResourceSectionsProps {
  size: string;
}
const ResourceSections: React.FC<ResourceSectionsProps> = ({ size }) => (
  <Box gap="small">
    <Box border={{ side: 'top' }} />
    <ResourceHeader name="k8s-flow-worker02" ipAddress="172.31.47.37" />
    <Box border={{ side: 'top' }} />
    <ResourceAlerts size={size} />
    <Box border={{ side: 'top' }} />
    <ResourceOverview />
    <Box border={{ side: 'top' }} />
    <ResourceTraits />
  </Box>
);

interface ResourceDetailsProps {
  animation?: false | string[];
  layer?: boolean;
  onClose: () => void;
  [key: string]: any;
}

export const ResourceDetails: React.FC<ResourceDetailsProps> = ({
  animation,
  layer,
  onClose,
  ...rest
}) => {
  const breakpoint = useContext(ResponsiveContext);
  const metricSize = ['xsmall', 'small', 'medium'].includes(breakpoint)
    ? 'small'
    : 'medium';
  const content = (
    <ContentPane
      heading={
        <Box align="center" direction="row" gap="medium">
          <Button onClick={onClose} icon={<LinkNext />} />
          <Heading level={2} margin="none">
            Resource Details
          </Heading>
        </Box>
      }
      level={2}
      actions={<ResourceActions onClose={onClose} />}
      skeleton={undefined}
      animation={animation}
      height="fit-content"
      {...rest}
    >
      <ResourceSections size={metricSize} />
    </ContentPane>
  );

  if (layer) {
    return (
      <Layer full modal={false} animation={animation}>
        {content}
      </Layer>
    );
  }

  return content;
};
