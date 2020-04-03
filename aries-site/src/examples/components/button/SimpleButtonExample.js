import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Text } from 'grommet';

export const SimpleButtonExample = ({ active }) => {
  const [hover, setHover] = React.useState();

  return (
    <Button
      onMouseOver={() => setHover(true)}
      onFocus={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      onBlur={() => setHover(false)}
    >
      <Box
        pad={{ horizontal: 'small', vertical: 'xsmall' }}
        round="xxsmall"
        background={active || hover ? 'active-background' : undefined}
      >
        <Text weight="bold" margin="none">
          Simple Button
        </Text>
      </Box>
    </Button>
  );
};

SimpleButtonExample.propTypes = {
  active: PropTypes.bool,
};

SimpleButtonExample.defaultProps = {
  active: false,
};
