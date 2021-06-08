import PropTypes from 'prop-types';
import { Box, Image, ResponsiveContext } from 'grommet';
import { useContext } from 'react';

export const MockGlobalHeader = ({ children }) => {
  const size = useContext(ResponsiveContext);

  return size === 'small' ? (
    <Box fill>
      <Image src="/templateImages/globalheader-small.png" />
      { children }
      <Image src="/templateImages/globalheader-footer-small.png" />
    </Box>
  ) : (
    <Box fill>
      <Image src="/templateImages/globalheader.png" />
      { children }
      <Image src="/templateImages/globalheader-footer.png" />
    </Box>
  );
};

MockGlobalHeader.propTypes = {
  children: PropTypes.node,
};