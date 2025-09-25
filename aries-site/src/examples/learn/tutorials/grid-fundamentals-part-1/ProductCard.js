import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Image,
  Paragraph,
  Text,
} from 'grommet';
import { Favorite } from 'grommet-icons';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const ProductCard = ({ level, product, ...rest }) => {
  return (
    <Card as="section" level={level} {...rest}>
      <CardHeader pad={{ horizontal: 'medium', top: 'medium' }}>
        <Box />
        <Favorite />
      </CardHeader>
      <CardBody justify="between" gap="medium">
        <Box gap="medium">
          <Box height="xsmall">
            <Image src={product.image} alt={product.name} fit="cover" />
          </Box>
          <Box gap="xsmall">
            <Heading level={level} margin="none">
              {product.name}
            </Heading>
            <Paragraph margin="none">{product.description}</Paragraph>
          </Box>
        </Box>
        <Text weight={500} color="text-strong">
          {currencyFormatter.format(product.price)}
        </Text>
      </CardBody>
      <CardFooter pad={{ horizontal: 'medium', bottom: 'medium' }}>
        <Button label="Add to cart" secondary />
      </CardFooter>
    </Card>
  );
};

ProductCard.propTypes = {
  level: PropTypes.number,
  product: PropTypes.shape({
    description: PropTypes.string,
    id: PropTypes.number,
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.string,
  }),
};
