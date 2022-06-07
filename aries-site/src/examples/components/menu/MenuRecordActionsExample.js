import { Box, Heading, List, Menu, Text } from 'grommet';
import {
  More,
  StatusCriticalSmall,
  StatusGoodSmall,
  StatusUnknownSmall,
  StatusWarningSmall,
} from 'grommet-icons';

const serverGroups = require('../../../data/mockData/serverGroups.json').groups;

const STATUS_MAP = {
  Critical: {
    label: 'Critical',
    icon: <StatusCriticalSmall color="status-critical" size="small" />,
  },
  Warning: {
    label: 'Warning',
    icon: <StatusWarningSmall color="status-warning" size="small" />,
  },
  OK: {
    label: 'Okay',
    icon: <StatusGoodSmall color="status-ok" size="small" />,
  },
  Unknown: {
    label: 'Unknown',
    icon: <StatusUnknownSmall color="status-unknown" size="small" />,
  },
};

export const MenuRecordActionsExample = () => (
  <Box gap="small" width="medium">
    <Heading level={2} size="small" margin="none">
      Server Groups
    </Heading>
    <List
      data={serverGroups}
      defaultItemProps={{
        border: 'border-weak',
        margin: { vertical: 'small' },
        round: 'small',
      }}
    >
      {(datum, index) => (
        <Box direction="row" justify="between" align="start">
          <Box gap="xsmall" fill>
            <Text weight="bold" size="large">
              {datum.name}
            </Text>
            <Box gap="xxsmall">
              <Text>{datum.servers.length} Servers</Text>
              <Box direction="row" gap="xsmall" align="center">
                {STATUS_MAP[datum.status].icon}
                {STATUS_MAP[datum.status].label}
              </Box>
            </Box>
          </Box>
          <Menu
            icon={<More />}
            open={index === 0}
            items={[
              [
                { label: 'Edit', onClick: () => {} },
                { label: 'View servers', onClick: () => {} },
                { label: 'Add servers', onClick: () => {} },
                { label: 'Remove servers', onClick: () => {} },
              ],
              [
                { label: 'Update firmware', onClick: () => {} },
                { label: 'Update BIOS settings', onClick: () => {} },
              ],
              [{ label: 'Delete', onClick: () => {} }],
            ]}
          />
        </Box>
      )}
    </List>
  </Box>
);
