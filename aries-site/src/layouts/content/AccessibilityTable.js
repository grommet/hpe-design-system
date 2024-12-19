/* eslint-disable react/prop-types */
import { Box, NameValueList, NameValuePair, Text } from 'grommet';
import {
  StatusCriticalSmall,
  StatusGoodSmall,
  StatusWarningSmall,
  CircleInformation,
} from 'grommet-icons';

const StatusLabel = ({ icon: Icon, color, label }) => (
  <Box align="center" direction="row" gap="xsmall">
    <Icon color={color} />
    <Text> {label}</Text>
  </Box>
);

export const AccessibilityTable = ({ statuses = [] }) => {
  // Calculate counts of each status
  // revisit to clean up the code here
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

  return (
    // room to clean up the code here can come back to this
    // once we have the final design
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
          <NameValuePair name="Passed">
            <StatusLabel
              icon={StatusGoodSmall}
              color="status-ok"
              label={passed}
            />
          </NameValuePair>
          <NameValuePair name="Passed with Exceptions">
            <StatusLabel
              icon={StatusWarningSmall}
              color="status-warning"
              label={passedWithExceptions}
            />
          </NameValuePair>
          <NameValuePair name="Conditional">
            <StatusLabel icon={CircleInformation} label={conditional} />
          </NameValuePair>
          <NameValuePair name="Failed">
            <StatusLabel
              icon={StatusCriticalSmall}
              color="status-critical"
              label={failed}
            />
          </NameValuePair>
        </NameValueList>
      </Box>
    </Box>
  );
};
