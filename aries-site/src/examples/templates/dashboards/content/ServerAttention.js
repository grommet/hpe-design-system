import { useEffect, useState } from 'react';
import { CircleInformation, StatusWarning } from 'grommet-icons';
import { Measure, StatusBar } from '../components';

const MOCK_DATA = require('../../../../data/mockData/servers.json');

const ATTENTION_MAP = {
  'Not activated': {
    label: 'Not Activated',
    icon: <CircleInformation />,
  },
  'Not connected': {
    label: 'Not Connected',
    icon: <StatusWarning />,
  },
};

export const ServerAttention = () => {
  const data = MOCK_DATA['serverState-counts'].counts;
  const [connectionStatus, setConnectionStatus] = useState(undefined);

  useEffect(() => {
    if (data) {
      const nextStatus = { ...ATTENTION_MAP };
      Object.keys(nextStatus).forEach(key => {
        nextStatus[key].count = data[key];
      });
      setConnectionStatus(nextStatus);
    }
  }, [data]);

  return (
    <StatusBar title="Needs Attention">
      {connectionStatus &&
        Object.keys(connectionStatus).map(key => {
          const status = connectionStatus[key];
          return (
            <Measure
              key={status.label}
              name={status}
              value={status.count}
              onClick={() => {
                // eslint-disable-next-line no-alert
                alert(
                  // eslint-disable-next-line max-len
                  `${status.count} ${status.label} severs selected.\n\nDepending on the context, clicking a dashboard measure would act like a button and navigate the user to a detailed view for the selected.`,
                );
              }}
            />
          );
        })}
    </StatusBar>
  );
};
