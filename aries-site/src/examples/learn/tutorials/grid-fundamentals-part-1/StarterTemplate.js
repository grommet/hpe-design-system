import { Text, Grommet } from 'grommet';
import { hpe } from 'grommet-theme-hpe';

const ProductsPage = () => {
  return <Text>hello world</Text>;
};

export const App = () => {
  return (
    <Grommet theme={hpe}>
      <ProductsPage />
    </Grommet>
  );
};
