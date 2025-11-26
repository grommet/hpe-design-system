import React from 'react';
import { Box, FormField, Select } from 'grommet';
import { useDesignTokens } from '../../../components/content/designTokenUtils';

export const RadiusSizes = () => {
  const [radius, setRadius] = React.useState('medium');
  const { data } = useDesignTokens('semantic.radius');

  const radiusTokens = data.map(
    (token) => token.token.split('hpe.radius.')[1],
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
          background="decorative-blue"
          round={radius}
        />
      </Box>
      <Box
        background="background-front"
        pad="medium"
        round={{ corner: 'right', size: 'medium' }}
        flex={false}
      >
        <FormField name="radius" htmlFor="radius-select" label="Radius">
          <Select
            name="radius"
            id="radius-select"
            options={radiusTokens}
            value={radius}
            onChange={({ option }) => setRadius(option)}
          />
        </FormField>
      </Box>
    </Box>
  );
};
