/* eslint-disable react/prop-types */
import { Box, NameValueList, NameValuePair, Text } from 'grommet';
import {
  StatusCriticalSmall,
  StatusGoodSmall,
  StatusWarningSmall,
  CircleInformation,
} from 'grommet-icons';
import anchorData from '../../data/wcag/anchor.json';

const StatusLabel = ({ icon: Icon, color, label }) => (
  <Box align="center" direction="row" gap="xsmall">
    <Icon color={color} />
    <Text> {label}</Text>
  </Box>
);

export const AccessibilityTable = () => {
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

  return (
    <Box margin={{ top: 'medium' }} gap="medium">
      <Box
        pad={{ vertical: 'small', horizontal: 'medium' }}
        alignSelf="start"
        background="background-front"
        round="small"
      >
        <NameValueList>
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
