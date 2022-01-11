import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, ResponsiveContext, ThemeContext } from 'grommet';

export const PageContainer = ({ kind = 'wide', ...rest }) => {
  const size = useContext(ResponsiveContext);
  const { pageContainer } = useContext(ThemeContext);
  const { align, width } = pageContainer[kind];
  const containerPad = { vertical: pageContainer.pad[size].vertical };

  return (
    <Box
      alignSelf={align}
      pad={containerPad}
      width={width}
      margin="auto"
      {...rest}
    />
  );
};

PageContainer.propTypes = {
  kind: PropTypes.oneOf(['wide', 'narrow', 'full']),
  theme: PropTypes.object,
};
