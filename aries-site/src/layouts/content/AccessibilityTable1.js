/* eslint-disable react/prop-types */
import { Box, Text } from 'grommet';
import { TextEmphasis } from 'aries-core';
import {
  StatusCriticalSmall,
  StatusGoodSmall,
  StatusWarningSmall,
  CircleInformation,
} from 'grommet-icons';
import anchorData from '../../data/wcag/anchor.json';

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
  return <TextEmphasis size="xxlarge">{value}</TextEmphasis>;
};

export const AccessibilityTable1 = () => {
  const allData = anchorData; // Add more components here

  const calculateAccessibilityTestCounts = () => {
    let conditional = 0;
    let passed = 0;
    let passedWithExceptions = 0;
    let failed = 0;

    allData.forEach(category => {
      category.items.forEach(item => {
        if (item.status === 'passed') {
          passed += 1;
        } else if (item.status === 'passed with exceptions') {
          passedWithExceptions += 1;
        } else if (item.status === 'failed') {
          failed += 1;
        } else if (item.status === 'conditional') {
          conditional += 1;
        }
      });
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
      margin={{ vertical: 'medium' }}
      width="672px"
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
