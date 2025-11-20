import React from 'react';
import { Box, FormField, Select } from 'grommet';
import { useDesignTokens } from '../../../components/content/designTokenUtils';

export const ContainerSizes = () => {
  const [height, setHeight] = React.useState('xsmall');
  const [width, setWidth] = React.useState('xsmall');
  const { data } = useDesignTokens('semantic.container');

  const containerTokens = data.map(
    token => token.token.split('hpe.container.')[1],
  );

  return (
    <Box direction="row" overflow="auto" flex={false}>
      <Box
        pad={{ vertical: 'xlarge', left: 'xlarge' }}
        align="center"
        justify="center"
        flex={false}
        width="medium"
        overflow="auto"
        background="decorative-cyan"
      >
        <Box
          height={height}
          width={width}
          border={{ color: 'decorative-blue', style: 'dashed', size: 'small' }}
          responsive={false}
          flex={false}
        />
      </Box>
      <Box
        background="background-front"
        pad={{ vertical: 'large', horizontal: 'small' }}
        round={{ corner: 'right', size: 'medium' }}
        flex={false}
      >
        <FormField name="height" htmlFor="height-select" label="Height">
          <Select
            name="height"
            id="height-select"
            options={containerTokens}
            value={height}
            onChange={({ option }) => setHeight(option)}
          />
        </FormField>
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
