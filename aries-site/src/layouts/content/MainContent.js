import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

export const MainContent = ({ children }) => {
  return (
    <Box pad={{ horizontal: 'large' }}>
      {children &&
        (children.length > 1
          ? children.map((child, index) => {
              return React.cloneElement(child, {
                lastSection: index === children.length - 1,
              });
            })
          : React.cloneElement(children, {
              lastSection: true,
            }))}
    </Box>
  );
};

MainContent.defaultProps = {
  /* eslint-disable-next-line react/default-props-match-prop-types */
  MainContent: true,
};

MainContent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};
