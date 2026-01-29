import { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import { Box, Text } from 'grommet';

// mimics Grommet's FormField label in terms of accessibility considerations
// by including as="label", htmlFor, and name
// applies NameValueList text styling
export const NameValueListFormLabel = ({ data, name }) => {
  const theme = useContext(ThemeContext);
  return (
    <Box margin={{ top: 'xsmall' }}>
      <Text
        as="label"
        {...theme.nameValuePair.name}
        htmlFor={name}
        // name={name}
      >
        {data.displayName}
        {data.required && (
          <Text aria-label="required" weight="normal">
            *
          </Text>
        )}
      </Text>
      {data.help && <Text size="xsmall">{data.help}</Text>}
    </Box>
  );
};

NameValueListFormLabel.propTypes = {
  name: PropTypes.string,
  data: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    help: PropTypes.string,
    required: PropTypes.bool,
  }),
};
