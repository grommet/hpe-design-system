import { useEffect, useState } from 'react';
import {
  StatusCritical,
  StatusGood,
  StatusUnknown,
  StatusWarning,
} from '@hpe-design/icons-grommet';
import { Measure, StatusBar } from '../components';

const MOCK_DATA = require('../../../../data/mockData/serverhealth.json');

const STATUS_MAP = {
  Critical: {
    label: 'Critical',
    icon: <StatusCritical color="status-critical" />,
  },
  Warning: {
    label: 'Warning',
    icon: <StatusWarning color="status-warning" />,
  },
  OK: {
    label: 'Okay',
    icon: <StatusGood color="status-ok" />,
  },
  Unknown: {
    label: 'Unknown',
    icon: <StatusUnknown color="status-unknown" />,
  },
};

export const ServerHealth = () => {
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
      title="Server health"
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
};
