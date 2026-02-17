import { useEffect, useState } from 'react';
import {
  InProgress,
  StatusWarning,
  StatusGood,
} from '@hpe-design/icons-grommet';
import { Measure, StatusBar } from '../components';

const MOCK_DATA = require('../../../../data/mockData/firmware-bundles.json');

const FIRMWARE_MAP = {
  Failed: {
    label: 'Failed',
    icon: <StatusWarning />,
  },
  'In progress': {
    label: 'In progress',
    icon: <InProgress />,
  },
  Completed: {
    label: 'Completed',
    icon: <StatusGood />,
  },
};

export const FirmwareStatus = ({ ...rest }) => {
  const data = MOCK_DATA['firmware-counts'].counts;
  const [firmwareStatus, setFirmwareStatus] = useState(undefined);

  useEffect(() => {
    if (data) {
      const nextStatus = { ...FIRMWARE_MAP };
      Object.keys(nextStatus).forEach(key => {
        nextStatus[key].count = data[key];
      });
      setFirmwareStatus(nextStatus);
    }
  }, [data]);

  return (
    <StatusBar
      title="Firmware status"
      menuItems={[
        { label: 'Move', onClick: () => {} },
        { label: 'Share', onClick: () => {} },
      ]}
      {...rest}
    >
      {firmwareStatus &&
        Object.keys(firmwareStatus).map(key => {
          const status = firmwareStatus[key];
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
