import React from 'react';
import { Box, NameValueList, NameValuePair } from 'grommet';
import { sentenceCase } from '../../../../utils/format';
import { statusMap } from '../../../../utils/status';

const iLOSecurity = {
  critical: {
    servers: [],
    label: 'At risk',
  },
  warning: {
    servers: [{ id: 'server1', name: 'Server 1', url: '#' }],
    label: 'Needs attention',
  },
  ok: {
    servers: [{ id: 'server2', name: 'Server 2', url: '#' }],
    label: 'Okay',
  },
  unknown: {
    servers: [],
    label: 'Unknown',
  },
  unsupported: {
    servers: [],
    label: 'Unsupported',
  },
};

const nameProps = {
  width: ['xsmall', 'max-content'],
};

export const ILOSecurity: React.FC = () => {
  return (
    <NameValueList nameProps={nameProps}>
      {Object.entries(iLOSecurity).map(([key, detail]) => (
        <NameValuePair key={key} name={sentenceCase(detail.label)}>
          <Box direction="row" align="center" gap="small">
            {React.cloneElement(statusMap.get(key)!.icon, {
              color: statusMap.get(key)!.color,
            })}
            {detail.servers.length} servers
          </Box>
        </NameValuePair>
      ))}
    </NameValueList>
  );
};
