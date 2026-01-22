// App.js
import { Grommet, Box, Text, Grid } from 'grommet';
import { hpe } from 'grommet-theme-hpe';

const ProductsPage = () => {
  return (
    <>
      {/* Using Text instead of Heading to avoid multiple h1s on
          the tutorial page. In the CodeSandbox example, 
          users will use <Heading level={1}>Products</Heading> */}
      <Text
        weight={500}
        size="xxlarge"
        margin={{ bottom: 'small', top: 'none' }}
      >
        Products
      </Text>
      <Grid columns={{ count: 3, size: 'auto' }}>
        {/* TODO: Using opacity weak is a temporary solution until 
        we have a wider range of colors in the theme. */}
        <Box
          background={{ color: 'decorative-blue', opacity: 'weak' }}
          border
          pad="medium"
          align="center"
        >
          <Text size="large">Product 1</Text>
        </Box>
        <Box
          background={{ color: 'decorative-blue', opacity: 'weak' }}
          border
          pad="medium"
          align="center"
        >
          <Text size="large">Product 2</Text>
        </Box>
        <Box
          background={{ color: 'decorative-blue', opacity: 'weak' }}
          border
          pad="medium"
          align="center"
        >
          <Text size="large">Product 3</Text>
        </Box>
        <Box
          background={{ color: 'decorative-blue', opacity: 'weak' }}
          border
          pad="medium"
          align="center"
        >
          <Text size="large">Product 4</Text>
        </Box>
        <Box
          background={{ color: 'decorative-blue', opacity: 'weak' }}
          border
          pad="medium"
          align="center"
        >
          <Text size="large">Product 5</Text>
        </Box>
        <Box
          background={{ color: 'decorative-blue', opacity: 'weak' }}
          border
          pad="medium"
          align="center"
        >
          <Text size="large">Product 6</Text>
        </Box>
      </Grid>
    </>
  );
};

export const App = () => {
  return (
    <Grommet theme={hpe}>
      <Box
        pad="small"
        round="small"
        background={{ color: 'background-back' }}
        border={{ color: 'border-weak' }}
      >
        <ProductsPage />
      </Box>
    </Grommet>
  );
};
