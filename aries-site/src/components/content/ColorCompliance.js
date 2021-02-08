import React from 'react';
import PropTypes from 'prop-types';
import { Box, Table, TableCell, TableBody, TableRow, Text } from 'grommet';
import { columns } from '../../data';

export const ColorCompliance = ({ color, data, ...rest }) => {
  return (
    <Box>
      <Box
        align="center"
        justify="center"
        background={color}
        round="xsmall"
        pad="small"
        {...rest}
      />

      <Table alignSelf="start">
        <TableBody>
          {data.map(datum => (
            <TableRow key={datum.id}>
              {columns.map(c => (
                <TableCell
                  key={c.property}
                  scope={c.dataScope}
                  align={c.align}
                  pad={{ top: 'small', right: 'small' }}
                >
                  <Text>{c.format ? c.format(datum) : datum[c.property]}</Text>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

ColorCompliance.propTypes = {
  color: PropTypes.shape({ color: PropTypes.string, dark: PropTypes.bool })
    .isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
    }),
  ).isRequired,
};
