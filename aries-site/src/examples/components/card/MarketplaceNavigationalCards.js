import React, { useContext } from 'react';
import { Box, Heading, Image, Grid, ResponsiveContext, Tag } from 'grommet';
import { Card } from '../../templates';
import { products } from './data';

const columns = {
  xsmall: ['auto'],
  small: ['auto'],
  medium: ['auto'],
  large: ['auto', 'auto', 'auto'],
  xlarge: ['auto', 'auto', 'auto', 'auto'],
};

export const MarketplaceNavigationalCards = () => {
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
            icon={
              <Box height='5xsmall' align="start">
                <Image
                  src={product.icon}
                  alt={`${product.title} logo`}
                  fit="contain"
                />
              </Box>
            }
            title={product.title}
            subtitle={`By ${product.author}`}
            description={product.description}
            actions={
              <Box direction="row" gap='3xsmall' wrap>
                {product.tags?.map((tag, j) => (
                  <Tag value={tag} key={j} margin={{ bottom: '3xsmall' }} />
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
