import { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import { Box, Text } from 'grommet';

export function Annotation({ id, target, ...rest }) {
  const theme = useContext(ThemeContext);

  return (
    <Box
      id={id}
      align="center"
      background="background-front"
      border={{ color: 'border-weak' }}
      height={theme.global.edgeSize.medium}
      justify="center"
      round
      width={theme.global.edgeSize.medium}
      {...rest}
    >
      <Text size="small" weight="bold">
        {target}
      </Text>
    </Box>
  );
}

Annotation.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  target: PropTypes.string,
};
