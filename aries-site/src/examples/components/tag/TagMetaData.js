import React, { useContext } from 'react';
import { Box, Heading, Grid, ResponsiveContext, Tag } from 'grommet';
import { User } from 'grommet-icons';
import { Card } from '../../templates';

const products = [
  {
    tags: ['USA', 'Colorado', 'HR', 'Full-time'],
  },
  {
    tags: [
      { name: 'Country', value: 'USA' },
      { name: 'Location', value: 'Colorado' },
      { name: 'Department', value: 'HR' },
      { name: 'Type', value: 'Full-time' },
    ],
  },
];
const columns = {
  xsmall: ['auto'],
  small: ['auto'],
  medium: ['auto'],
  large: ['auto', 'auto'],
  xlarge: ['auto', 'auto'],
};

export const TagMetaData = () => {
  const breakpoint = useContext(ResponsiveContext);

  return (
    <Box gap="medium">
      <Heading level={2} margin="none">
        My Products
      </Heading>
      <Grid columns={columns[breakpoint]} gap="medium">
        {products.map((product, index) => (
          <Card
            key={index}
            icon={<User />}
            title="Program Advisor"
            subtitle="June 25, 2024"
            description={`Manages the end to end
              recruitment process including consulting with HR
              and business partners.`}
            actions={
              <Box direction="row" gap="3xsmall" wrap>
                {product.tags?.map((tag, j) => (
                  <Tag
                    name={tag.name ? tag.name : undefined}
                    value={tag.value ? tag.value : tag}
                    key={j}
                    margin={{ bottom: '3xsmall' }}
                  />
                ))}
              </Box>
            }
            alignActions="end"
            onClick={() => {}}
            level={3}
          />
        ))}
      </Grid>
    </Box>
  );
};
