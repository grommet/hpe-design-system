import PropTypes from 'prop-types';
import { Box, Paragraph } from 'grommet';
import { useIsMobileOrTablet } from '@shared/hooks';

export const Decision = ({ children, id, ...rest }) => {
  const isMobileOrTablet = useIsMobileOrTablet();
  const textSize = isMobileOrTablet ? 'small' : 'medium';

  return (
    <Box {...rest}>
      <Box
        id={id}
        // TODO: Using opacity weak is a temporary solution until
        // we have a wider range of colors in the theme.
        background={{ color: 'decorative-purple', opacity: 'weak' }}
        flex={false}
        pad="medium"
        round="xxlarge"
      >
        <Paragraph margin="none" color="text-strong" size={textSize}>
          {children}
        </Paragraph>
      </Box>
      <Box fill />
    </Box>
  );
};

Decision.propTypes = {
  children: PropTypes.string,
  id: PropTypes.string,
};
