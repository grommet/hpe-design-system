/* eslint-disable react/prop-types */
import { Box, NameValueList, NameValuePair, Text } from 'grommet';
import {
  StatusCritical,
  StatusGood,
  StatusWarning,
  Info,
} from '@hpe-design/icons-grommet';

const STATUS_MAP = {
  passed: {
    label: 'Passed',
    icon: <StatusGood alt="" color="status-ok" />,
  },
  failed: {
    label: 'Failed',
    icon: <StatusCritical alt="" color="status-critical" />,
  },
  conditional: {
    label: 'Conditional',
    icon: <Info alt="" />,
  },
  'AAA not achieved': {
    label: 'AAA not achieved',
    icon: <StatusWarning alt="" color="status-warning" />,
  },
};

const StatusLabel = ({ icon, label }) => (
  <Box justify="between" align="center" direction="row" gap="3xsmall">
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
      'AAA not achieved': 0,
    },
  );

export const WCAGRuleSummary = ({ statuses = [] }) => {
  const testCounts = calculateAccessibilityTestCounts(statuses);

  return (
    <Box
      pad={{ vertical: 'xsmall', horizontal: 'medium' }}
      alignSelf="start"
      background="background-front"
      round="medium"
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
