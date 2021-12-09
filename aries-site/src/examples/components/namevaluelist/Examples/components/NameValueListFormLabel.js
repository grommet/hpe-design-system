import { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import { Box, Text } from 'grommet';

// mimics Grommet's FormField label in terms of accessibility considerations
// applies NameValueList text styling
export const NameValueListFormLabel = ({ name, data }) => {
  const theme = useContext(ThemeContext);
  return (
    <Box gap={theme.formField.label.margin.vertical}>
      <Text as="label" {...theme.nameValuePair.name} htmlFor={name} name={name}>
        {name}
        {data.required ? <Text aria-label="required">*</Text> : undefined}
      </Text>
      {data.help && <Text size="xsmall">{data.help}</Text>}
    </Box>
  );
};

NameValueListFormLabel.propTypes = {
  name: PropTypes.string,
  data: PropTypes.shape({
    help: PropTypes.string,
    required: PropTypes.bool,
  }),
};
