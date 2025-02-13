/* eslint-disable react/prop-types */
import { Box, NameValueList, NameValuePair, Text } from 'grommet';
import {
  StatusCriticalSmall,
  StatusGoodSmall,
  StatusWarningSmall,
  CircleInformation,
} from 'grommet-icons';

const STATUS_MAP = {
  passed: {
    label: 'Passed',
    icon: <StatusGoodSmall alt="" color="status-ok" />,
  },
  failed: {
    label: 'Failed',
    icon: <StatusCriticalSmall alt="" color="status-critical" />,
  },
  conditional: {
    label: 'Conditional',
    icon: <CircleInformation alt="" />,
  },
  'AAA failed': {
    label: 'AAA Failed',
    icon: <StatusWarningSmall alt="" color="status-warning" />,
  },
};

const StatusLabel = ({ icon, label }) => (
  <Box align="center" direction="row" gap="xsmall">
    {icon}
    <Text>{label}</Text>
  </Box>
);

const calculateAccessibilityTestCounts = statuses =>
  statuses.reduce(
    (counts, status) => {
      if (Object.prototype.hasOwnProperty.call(counts, status)) {
        return { ...counts, [status]: counts[status] + 1 };
      }
      return counts;
    },
    {
      passed: 0,
      failed: 0,
      conditional: 0,
      'AAA failed': 0,
    },
  );

export const WCAGRuleSummary = ({ statuses = [] }) => {
  const testCounts = calculateAccessibilityTestCounts(statuses);

  return (
    <Box
      pad={{ vertical: 'small', horizontal: 'medium' }}
      alignSelf="start"
      background="background-front"
      round="small"
    >
      <NameValueList
        nameProps={{ width: 'max-content' }}
        valueProps={{ width: 'max-content' }}
      >
        {Object.entries(STATUS_MAP).map(([key, { label, icon }]) => (
          <NameValuePair key={key} name={label}>
            <StatusLabel icon={icon} label={testCounts[key]} />
          </NameValuePair>
        ))}
      </NameValueList>
    </Box>
  );
};
