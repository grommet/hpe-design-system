/* eslint-disable react/prop-types */
import { Box, Text } from 'grommet';
import { TextEmphasis } from 'aries-core';
import {
  StatusCriticalSmall,
  StatusGoodSmall,
  StatusWarningSmall,
  CircleInformation,
} from 'grommet-icons';

const Name = ({ label, icon }) => {
  return (
    <Box
      direction="row"
      align="center"
      gap="small"
      margin={{ bottom: 'xxsmall' }}
    >
      {icon}
      <Text size="small">{label}</Text>
    </Box>
  );
};

const Value = ({ value }) => {
  return (
    <TextEmphasis alignSelf="end" size="xxlarge">
      {value}
    </TextEmphasis>
  );
};

export const AccessibilityTable1 = ({ statuses = [] }) => {
  const calculateAccessibilityTestCounts = () => {
    let conditional = 0;
    let passed = 0;
    let passedWithExceptions = 0;
    let failed = 0;

    statuses.forEach(status => {
      if (status === 'passed') {
        passed += 1;
      } else if (status === 'passed with exceptions') {
        passedWithExceptions += 1;
      } else if (status === 'failed') {
        failed += 1;
      } else if (status === 'conditional') {
        conditional += 1;
      }
    });

    return { conditional, passed, passedWithExceptions, failed };
  };

  const { conditional, passed, passedWithExceptions, failed } =
    calculateAccessibilityTestCounts();

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

  return (
    <Box
      pad={{ vertical: 'small', horizontal: 'medium' }}
      background="background-front"
      round="small"
      direction="row"
      gap="large"
      width="fit-content"
    >
      {Object.keys(STATUS_MAP).map(key => {
        const status = STATUS_MAP[key];
        const count = { passed, passedWithExceptions, failed, conditional }[
          key
        ];
        return (
          <Box>
            <Name label={status.label} icon={status.icon} />
            <Value value={count} />
          </Box>
        );
      })}
    </Box>
  );
};
