import React from 'react';
import PropTypes from 'prop-types';
import { Box, Diagram, Stack } from 'grommet';

const Node = ({ id, ...rest }) => (
  <Box
    id={id}
    basis="xxsmall"
    margin="xsmall"
    pad="medium"
    round="medium"
    background="background-front"
    {...rest}
  />
);

Node.propTypes = {
  id: PropTypes.number,
};

const connection = (fromTarget, toTarget, { color, ...rest } = {}) => ({
  fromTarget,
  toTarget,
  anchor: 'vertical',
  color,
  thickness: 'xsmall',
  round: true,
  type: 'rectilinear',
  ...rest,
});

export const DiagramExample = () => {
  const connections = [
    connection('1', '5'),
    connection('1', '2', { anchor: 'horizontal' }),
    connection('3', '5', { anchor: 'horizontal', color: 'brand' }),
  ];

  return (
    <Stack>
      <Box>
        <Box direction="row">
          {[1, 2, 3].map(id => (
            <Node key={id} id={id} />
          ))}
        </Box>
        <Box direction="row">
          {[4, 5].map(id => (
            <Node key={id} id={id} />
          ))}
        </Box>
      </Box>
      <Diagram connections={connections} />
    </Stack>
  );
};
