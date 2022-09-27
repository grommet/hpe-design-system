import { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import { Box, Text } from 'grommet';

export const Annotation = ({ id, target, title, ...rest }) => {
  const theme = useContext(ThemeContext);

  const containerProps = {
    id,
    ...rest,
  };

  return (
    <Box {...(title ? containerProps : undefined)}>
      <Box
        {...(!title ? containerProps : undefined)}
        align="center"
        background="background-front"
        border={{ color: 'border-weak' }}
        height={theme.global.edgeSize.medium}
        justify="center"
        round
        width={theme.global.edgeSize.medium}
      >
        <Text size="small" weight="bold">
          {target}
        </Text>
      </Box>
      {title && (
        <Text size="small" weight="bold">
          {title}
        </Text>
      )}
    </Box>
  );
};

Annotation.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  target: PropTypes.string,
  title: PropTypes.string,
};
