import { Grommet, Box, Text, Grid } from 'grommet';
import { hpe } from 'grommet-theme-hpe';

export const App = () => {
  return (
    <Grommet theme={hpe}>
      <Grid columns="1/3">
        <Box background="blue" border pad="medium" align="center">
          <Text size="large">Product 1</Text>
        </Box>
        <Box background="blue" border pad="medium" align="center">
          <Text size="large">Product 2</Text>
        </Box>
        <Box background="blue" border pad="medium" align="center">
          <Text size="large">Product 3</Text>
        </Box>
        <Box background="blue" border pad="medium" align="center">
          <Text size="large">Product 4</Text>
        </Box>
        <Box background="blue" border pad="medium" align="center">
          <Text size="large">Product 5</Text>
        </Box>
        <Box background="blue" border pad="medium" align="center">
          <Text size="large">Product 6</Text>
        </Box>
        <Box background="blue" border pad="medium" align="center">
          <Text size="large">Product 7</Text>
        </Box>
      </Grid>
    </Grommet>
  );
};
