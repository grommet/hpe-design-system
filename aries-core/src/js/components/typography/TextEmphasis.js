import PropTypes from 'prop-types';
import { Text } from 'grommet';

export const TextEmphasis = ({ children, ...rest }) => {
  return (
    <Text weight={500} {...rest}>
      {children}
    </Text>
  );
};

TextEmphasis.propTypes = {
  children: PropTypes.node.isRequired,
};
