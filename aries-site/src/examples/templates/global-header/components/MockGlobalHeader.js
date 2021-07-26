import PropTypes from 'prop-types';
import { Box, Image, ResponsiveContext } from 'grommet';
import { useContext } from 'react';

export const MockGlobalHeader = ({ children }) => {
  const size = useContext(ResponsiveContext);

  return size === 'small' ? (
    <Box fill>
      <Image
        alt="HPE Global Header for mobile"
        src="/templateImages/globalheader-small.png"
      />
      {children}
      <Image
        alt="HPE Global Footer for mobile"
        src="/templateImages/globalheader-footer-small.png"
      />
    </Box>
  ) : (
    <Box fill>
      <Image
        alt="HPE Global Header for desktop"
        src="/templateImages/globalheader.png"
      />
      {children}
      <Image
        alt="HPE Global Header for desktop"
        src="/templateImages/globalheader-footer.png"
      />
    </Box>
  );
};

MockGlobalHeader.propTypes = {
  children: PropTypes.node,
};
