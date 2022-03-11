import PropTypes from 'prop-types';
import { Box, Text, ThemeContext } from 'grommet';
import { aries } from '../../../../../themes/aries';

export const ContentArea = ({
  background = 'background-front',
  border,
  children,
  pad = 'small',
  round = 'xxsmall',
  title,
  ...rest
}) => (
  // If the ThemeContext is scaled, as it can be in the mock browser, we do
  // not want the scaled theme to be applied to ContentArea. This resets
  // to scale = 1.
  <ThemeContext.Extend value={aries}>
    <Box
      background={background}
      border={
        border === true ? { color: 'border-strong', style: 'dashed' } : border
      }
      flex={false}
      pad={pad}
      round={round}
      {...rest}
    >
      <Text color="text-strong" size="small" weight="bold">
        {title}
      </Text>

      {children}
    </Box>
  </ThemeContext.Extend>
);

ContentArea.propTypes = {
  background: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  border: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  children: PropTypes.node,
  icon: PropTypes.bool,
  pad: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      horizontal: PropTypes.string,
      vertical: PropTypes.string,
      top: PropTypes.string,
      right: PropTypes.string,
      bottom: PropTypes.string,
      left: PropTypes.string,
    }),
  ]),
  round: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};
