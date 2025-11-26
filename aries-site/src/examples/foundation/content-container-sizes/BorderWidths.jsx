import React from 'react';
import { Box, FormField, Select } from 'grommet';
import { useDesignTokens } from '../../../components/content/designTokenUtils';

export const BorderWidths = () => {
  const [width, setWidth] = React.useState('default');
  const { data } = useDesignTokens('semantic.borderWidth');

  const containerTokens = data.map(
    token => token.token.split('hpe.borderWidth.')[1],
  );

  return (
    <Box direction="row" justify="between">
      <Box
        pad={{ vertical: 'xlarge', horizontal: 'xlarge' }}
        align="center"
        justify="center"
        flex
      >
        <Box
          height="xxsmall"
          width="xxsmall"
          border={{ color: 'decorative-blue', style: 'solid', size: width }}
        />
      </Box>
      <Box
        background="background-front"
        pad={{ vertical: 'large', horizontal: 'small' }}
        round={{ corner: 'right', size: 'medium' }}
        flex={false}
      >
        <FormField name="width" htmlFor="width-select" label="Width">
          <Select
            name="width"
            id="width-select"
            options={containerTokens}
            value={width}
            onChange={({ option }) => setWidth(option)}
          />
        </FormField>
      </Box>
    </Box>
  );
};
