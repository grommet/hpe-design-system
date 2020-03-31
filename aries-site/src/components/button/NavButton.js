import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Text } from 'grommet';

export const NavButton = forwardRef(({ active, item, ...rest }, ref) => {
  const [hover, setHover] = useState(false);
  return (
      <Button
        onMouseOver={() => setHover(true)}
        onFocus={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        onBlur={() => setHover(false)}
        ref={ref}
        {...rest}
      >
        <Box
          pad={{ horizontal: 'small', vertical: 'xsmall' }}
          round="xxsmall"
          background={active || hover ? 'active-background' : undefined}
        >
          <Text weight="bold" margin="none">
            {item}
          </Text>
        </Box>
      </Button>
  );
});

NavButton.propTypes = {
  active: PropTypes.bool,
  item: PropTypes.string,
};

