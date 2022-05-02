import { useEffect, useState } from 'react';
import {
  StatusCriticalSmall,
  StatusGoodSmall,
  StatusUnknownSmall,
  StatusWarningSmall,
} from 'grommet-icons';
import { Measure, StatusBar } from '../components';

const MOCK_DATA = require('../../../../data/mockData/serverhealth.json');

const STATUS_MAP = {
  Critical: {
    label: 'Critical',
    icon: <StatusCriticalSmall color="status-critical" />,
  },
  Warning: {
    label: 'Warning',
    icon: <StatusWarningSmall color="status-warning" />,
  },
  OK: {
    label: 'Okay',
    icon: <StatusGoodSmall color="status-ok" />,
  },
  Unknown: {
    label: 'Unknown',
    icon: <StatusUnknownSmall color="status-unknown" />,
  },
};

export function ServerHealth() {
  const data = MOCK_DATA;
  const [measures, setMeasures] = useState({ ...STATUS_MAP });

  useEffect(() => {
    const resetCount = {};
    Object.keys(STATUS_MAP).forEach(key => {
      resetCount[key] = true;
    });
    if (data) {
      data.forEach(datum => {
        const status = datum.hardware.health.summary;
        setMeasures(prevMeasures => {
          const nextMeasures = { ...prevMeasures };
          if (resetCount[status]) {
            nextMeasures[status].count = 0;
            resetCount[status] = false;
          }
          nextMeasures[status].count += 1;
          return nextMeasures;
        });
      });
    }
  }, [data]);

  return (
    <StatusBar
      title="Server Health"
      menuItems={[
        { label: 'Move', onClick: () => {} },
        { label: 'Share', onClick: () => {} },
      ]}
    >
      {measures &&
        Object.keys(measures).map(key => {
          const measure = measures[key];
          return (
            <Measure
              key={measure.label}
              name={measure}
              value={measure.count}
              onClick={() => {
                // eslint-disable-next-line no-alert
                alert(
                  // eslint-disable-next-line max-len
                  `${measure.count} ${measure.label} severs selected.\n\nDepending on the context, clicking a dashboard measure would act like a button and perform an action such as applying a filter to the current view, or navigating the user to a detailed view for the selected measure.`,
                );
              }}
            />
          );
        })}
    </StatusBar>
  );
}
