/* eslint-disable react/prop-types */
import { Box, Text } from 'grommet';
import { TextEmphasis } from 'aries-core';
import {
  StatusCriticalSmall,
  StatusGoodSmall,
  StatusWarningSmall,
  CircleInformation,
} from 'grommet-icons';

const STATUS_MAP = {
  passed: {
    label: 'Passed',
    icon: <StatusGoodSmall color="status-ok" />,
  },
  passedWithExceptions: {
    label: 'Passed with Exceptions',
    icon: <StatusWarningSmall color="status-warning" />,
  },
  failed: {
    label: 'Failed',
    icon: <StatusCriticalSmall color="status-critical" />,
  },
  conditional: {
    label: 'Conditional',
    icon: <CircleInformation />,
  },
};

const Name = ({ label, icon }) => (
  <Box
    direction="row"
    align="center"
    gap="xsmall"
    margin={{ bottom: 'xxsmall' }}
  >
    {icon}
    <Text size="small">{label}</Text>
  </Box>
);

const Value = ({ value }) => (
  <TextEmphasis alignSelf="end" size="xxlarge">
    {value}
  </TextEmphasis>
);

const calculateAccessibilityTestCounts = statuses => {
  const counts = {
    passed: 0,
    passedWithExceptions: 0,
    failed: 0,
    conditional: 0,
  };

  statuses.forEach(status => {
    if (Object.prototype.hasOwnProperty.call(counts, status)) {
      counts[status] += 1;
    }
  });

  return counts;
};

export const AccessibilityTable1 = ({ statuses = [] }) => {
  const testCounts = calculateAccessibilityTestCounts(statuses);

  return (
    <Box
      pad={{ vertical: 'small', horizontal: 'medium' }}
      round="small"
      direction="row"
      gap="large"
      width="fit-content"
    >
      {Object.keys(STATUS_MAP).map(key => {
        const status = STATUS_MAP[key];
        const count = testCounts[key];
        return (
          <Box key={key}>
            <Name label={status.label} icon={status.icon} />
            <Value value={count} />
          </Box>
        );
      })}
    </Box>
  );
};
