/* eslint-disable react/prop-types */
import {
  Box,
  Heading,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableBody,
} from 'grommet';
import {
  StatusCriticalSmall,
  StatusGoodSmall,
  StatusWarningSmall,
} from 'grommet-icons';
import anchorData from '../../data/wcag/anchor.json';

const StatusLabel = ({ icon: Icon, color, label }) => (
  <Box align="center" gap="xsmall" direction="row">
    <Icon color={color} />
    {label}
  </Box>
);

export const AccessibilityTable = () => {
  const allData = anchorData; // Add more components here
  const calculateAccessibilityTestCounts = () => {
    let total = 0;
    let passed = 0;
    let passedWithExceptions = 0;
    let failed = 0;

    allData.forEach(category => {
      category.items.forEach(item => {
        total += 1;
        if (item.status === 'passed') {
          passed += 1;
        } else if (item.status === 'passed with exceptions') {
          passedWithExceptions += 1;
        } else if (item.status === 'failed') {
          failed += 1;
        }
      });
    });

    return { total, passed, passedWithExceptions, failed };
  };

  const { total, passed, passedWithExceptions, failed } =
    calculateAccessibilityTestCounts();

  return (
    <Box gap="medium">
      <Heading margin={{ top: 'medium', bottom: 'none' }} level={3}>
        Overview
      </Heading>
      <Box
        pad={{ vertical: 'small', horizontal: 'medium' }}
        alignSelf="start"
        background="background-front"
        round="small"
      >
        <Table alignSelf="start">
          <TableHeader>
            <TableRow>
              <TableCell scope="col" border="bottom">
                Total Tests
              </TableCell>
              {[
                { icon: StatusGoodSmall, color: 'status-ok', label: 'Passed' },
                {
                  icon: StatusWarningSmall,
                  color: 'status-warning',
                  label: 'Passed with Exceptions',
                },
                {
                  icon: StatusCriticalSmall,
                  color: 'status-critical',
                  label: 'Failed',
                },
              ].map(({ icon, color, label }, index) => (
                <TableCell key={index} scope="col" border="bottom">
                  <StatusLabel icon={icon} color={color} label={label} />
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              {[total, passed, passedWithExceptions, failed].map(
                (value, index) => (
                  <TableCell key={index} align="center">
                    {value}
                  </TableCell>
                ),
              )}
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};
