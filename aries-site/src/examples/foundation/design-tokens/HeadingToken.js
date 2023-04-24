import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import { Heading } from 'grommet';

export const HeadingToken = ({ breakpoint }) => {
  const theme = useContext(ThemeContext);

  let level = 1;
  if (breakpoint === 'tablet') level = 2;
  else if (breakpoint === 'mobile') level = 3;

  return (
    <Heading margin="none" size={theme.heading.level[level].medium.size}>
      Aa
    </Heading>
  );
};

HeadingToken.propTypes = {
  breakpoint: PropTypes.oneOf(['mobile', 'tablet']),
};
