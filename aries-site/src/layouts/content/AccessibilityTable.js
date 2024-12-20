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
      passedWithExceptions: 0,
      failed: 0,
      conditional: 0,
    },
  );

export const AccessibilityTable = ({ statuses = [] }) => {
  const testCounts = calculateAccessibilityTestCounts(statuses);

  return (
    <Box pad={{ vertical: 'medium' }} gap="medium">
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
    </Box>
  );
};
