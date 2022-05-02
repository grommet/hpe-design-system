import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, List, Text, ThemeContext } from 'grommet';

export function Legend({ values, ...rest }) {
  const theme = useContext(ThemeContext);
  const size = theme.global.edgeSize.small;

  return (
    <List
      data={values}
      defaultItemProps={{ pad: { vertical: 'xxsmall' } }}
      {...rest}
    >
      {datum => (
        <Box direction="row" gap="small" justify="between">
          <Box direction="row" align="center" gap="xsmall">
            <Box background={datum.color} height={size} width={size} round />
            <Text>{datum.label}</Text>
          </Box>
          <Text>{datum.displayValue}</Text>
        </Box>
      )}
    </List>
  );
}

Legend.propTypes = {
  values: PropTypes.arrayOf(PropTypes.object),
};
