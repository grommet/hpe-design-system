import PropTypes from 'prop-types';
import { Box, Image, ResponsiveContext } from 'grommet';
import { useContext } from 'react';

const globalHeaderAlt = `HPE Global Header which features HPE logo on the far 
left, navigational elements in the center, and a menu dropdown on the far 
right.`;

const globalFooterAlt = `HPE Global Footer which features HPE copyright on the 
far left and navigational elements such as Privacy and Terms of Use on the far 
right.`;

export function MockGlobalHeader({ children }) {
  const size = useContext(ResponsiveContext);

  return ['xsmall', 'small'].includes(size) ? (
    <Box fill>
      <Image
        alt={globalHeaderAlt}
        src="/templateImages/globalheader-small.png"
      />
      {children}
      <Image
        alt={globalFooterAlt}
        src="/templateImages/globalheader-footer-small.png"
      />
    </Box>
  ) : (
    <Box fill>
      <Image alt={globalHeaderAlt} src="/templateImages/globalheader.png" />
      {children}
      <Image
        alt={globalFooterAlt}
        src="/templateImages/globalheader-footer.png"
      />
    </Box>
  );
}

MockGlobalHeader.propTypes = {
  children: PropTypes.node,
};
