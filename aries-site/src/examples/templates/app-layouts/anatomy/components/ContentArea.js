import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';

export const ContentArea = ({
  background = 'background-front',
  border,
  children,
  pad = 'small',
  round = 'xxsmall',
  title,
  ...rest
}) => (
  <Box
    background={background}
    border={border === true ? { color: 'border-weak' } : border}
    pad={pad}
    round={round}
    {...rest}
  >
    <Text color="text-strong" size="small" weight="bold">
      {title}
    </Text>
    {children}
  </Box>
);

ContentArea.propTypes = {
  background: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  border: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  children: PropTypes.node,
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
