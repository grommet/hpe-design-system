import { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import { Box, Text } from 'grommet';

export const Annotation = ({ id, kind, target, ...rest }) => {
  const theme = useContext(ThemeContext);

  return (
    <Box
      id={id}
      align="center"
      background={
        kind === 'style'
          ? { color: 'decorative-purple', opacity: 'weak' }
          : 'background-front'
      }
      border={{ color: 'border-weak' }}
      height={theme.global.edgeSize.medium}
      justify="center"
      round
      width={kind === 'style' ? 'fit-content' : theme.global.edgeSize.medium}
      pad={kind === 'style' ? { horizontal: 'xsmall' } : undefined}
      {...rest}
    >
      <Text size="small" weight="bold">
        {target}
      </Text>
    </Box>
  );
};

Annotation.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  kind: PropTypes.oneOf(['style']),
  target: PropTypes.string,
};
