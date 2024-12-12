/* eslint-disable react/prop-types */
import {
  Box,
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
  CircleInformation,
} from 'grommet-icons';
import anchorData from '../../data/wcag/anchor.json';

const StatusLabel = ({ icon: Icon, color, label }) => (
  <Box align="center" gap="xsmall" direction="row">
    <Icon color={color} />
    {label}
  </Box>
);

export const AccessibilityTable = () => {
  const allData = anchorData;
  const calculateAccessibilityTestCounts = () => {
    let passed = 0;
    let passedWithExceptions = 0;
    let conditional = 0;
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

    return { passed, passedWithExceptions, conditional, failed };
  };

  const { passed, passedWithExceptions, conditional, failed } =
    calculateAccessibilityTestCounts();

  return (
    <Box gap="medium">
      <Box
        pad={{ vertical: 'small', horizontal: 'medium' }}
        alignSelf="start"
        background="background-front"
        round="small"
      >
        <Table alignSelf="start">
          <TableHeader>
            <TableRow>
              {[
                { icon: StatusGoodSmall, color: 'status-ok', label: 'Passed' },
                {
                  icon: StatusWarningSmall,
                  color: 'status-warning',
                  label: 'Passed with Exceptions',
                },
                {
                  icon: CircleInformation,
                  label: 'Conditional',
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
              {[passed, passedWithExceptions, conditional, failed].map(
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
