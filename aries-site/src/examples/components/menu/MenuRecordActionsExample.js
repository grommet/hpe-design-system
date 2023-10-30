import { Box, Heading, List, Menu, Notification, Text } from 'grommet';
import {
  More,
  StatusCriticalSmall,
  StatusGoodSmall,
  StatusUnknownSmall,
  StatusWarningSmall,
} from 'grommet-icons';
import { useState } from 'react';

import { TextEmphasis } from 'aries-core';
import { DestructiveConfirmation } from '../../templates';

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

const defaultActive = { id: '', path: '' };

export const MenuRecordActionsExample = () => {
  const [active, setActive] = useState(defaultActive);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(false);

  return (
    <>
      <Box gap="small" width="medium">
        <Heading level={2} size="small" margin="none">
          Server groups
        </Heading>
        <List
          data={serverGroups}
          defaultItemProps={{
            pad: { vertical: 'small' },
          }}
        >
          {(datum, index) => (
            <Box direction="row" justify="between" align="start">
              <Box gap="xsmall" fill>
                <TextEmphasis>{datum.name}</TextEmphasis>
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
                  [
                    {
                      label: 'Delete',
                      onClick: () => {
                        setActive({
                          id: datum.name,
                          path: `/servers/groups/${datum.name
                            .replace(' ', '-')
                            .toLowerCase()}`,
                        });
                        setShowModal(true);
                      },
                    },
                  ],
                ]}
              />
            </Box>
          )}
        </List>
      </Box>
      {showModal && (
        <DestructiveConfirmation
          title="Delete server group"
          message={`This will permanently delete ${active.id} 
          server group, including all history, located at:`}
          path={active.path}
          setShowModal={setShowModal}
          setToast={setToast}
          onSubmit={() => {
            // timer needs to be longer than toast's duration
            const timer = setTimeout(() => setActive(defaultActive), 10000);
            return () => {
              clearTimeout(timer);
            };
          }}
        />
      )}
      {toast && (
        <Notification
          toast
          status="normal"
          message={`Server group ${active.id} deleted.`}
          onClose={() => setToast(false)}
        />
      )}
    </>
  );
};
