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
import {
  LinkNext,
  StatusGoodSmall,
  StatusCriticalSmall,
  StatusUnknownSmall,
  StatusPlaceholderSmall,
  MoreVertical,
} from 'grommet-icons';
import ContentPane from '../../../../components/ContentPane';
import { ResourceAlerts } from './ResourceAlerts';
import { ResourceTraits } from './ResourceTraits';
import { ResourceOverview } from './ResourceOverview';

const statusMap: { [key: string]: JSX.Element | null } = {
  up: <StatusGoodSmall aria-label="up status" color="status-ok" />,
  down: (
    <StatusCriticalSmall aria-label="down status" color="status-critical" />
  ),
  unknown: (
    <StatusUnknownSmall aria-label="unknown status" color="status-unknown" />
  ),
  undefined: <StatusPlaceholderSmall aria-label="undefined status" />,
};

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
  status: string;
}

const ResourceHeader: React.FC<ResourceHeaderProps> = ({
  name,
  ipAddress,
  status,
}) => (
  <Box pad={{ vertical: 'small' }} align="center" direction="row" gap="small">
    {statusMap[status]}
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
  <Menu
    dropAlign={{ top: 'bottom', right: 'right' }}
    // label="Actions"
    items={actionItems}
    onClick={() => {}}
    icon={<MoreVertical />}
  />
);

interface ResourceSectionsProps {
  size: string;
  name: string;
  ipAddress: string;
  status: string;
}
const ResourceSections: React.FC<ResourceSectionsProps> = ({
  size,
  name,
  ipAddress,
  status,
}) => (
  <Box gap="small">
    <Box border={{ side: 'top', color: 'border-weak' }} />
    <ResourceHeader status={status} name={name} ipAddress={ipAddress} />
    <Box border={{ side: 'top', color: 'border-weak' }} />
    <ResourceAlerts size={size} />
    <Box border={{ side: 'top', color: 'border-weak' }} />
    <ResourceOverview />
    <Box border={{ side: 'top', color: 'border-weak' }} />
    <ResourceTraits />
  </Box>
);

interface ResourceDetailsProps {
  onClose: () => void;
  [key: string]: any;
  animation?: false | string[];
  layer?: boolean;
}

export const ResourceDetails: React.FC<ResourceDetailsProps> = ({
  animation,
  layer,
  name,
  ipAddress,
  status,
  onClose,
  ...rest
}) => {
  const breakpoint = useContext(ResponsiveContext);
  const metricSize = ['xsmall', 'small', 'medium'].includes(breakpoint)
    ? 'small'
    : 'medium';

  const content = (
    <ContentPane
      flex={false}
      heading={
        <Box align="center" direction="row" gap="xsmall">
          <Button onClick={onClose} icon={<LinkNext />} />
          {/* the heading here sematically should be h2 however thats very large so
          passing size to make it smaller */}
          <Heading level={2} size="small" margin="none">
            {/* instead of resource details do we maybe just put name
             of the resource here their size of this is alot smaller 12px */}
            Resource Details
          </Heading>
        </Box>
      }
      level={2}
      // possible to use responsive container to change the
      // menu label to be icon to save space for smaller screens
      actions={<ResourceActions onClose={onClose} />}
      skeleton={undefined}
      animation={animation}
      height="fit-content"
      {...rest}
    >
      <ResourceSections
        size={metricSize}
        name={name}
        status={status}
        ipAddress={ipAddress}
      />
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
