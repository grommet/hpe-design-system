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
      <CardHeader>
        <Box />
        <Favorite />
      </CardHeader>
      <CardBody gap="small">
        <Box height="small">
          <Image src={product.image} alt={product.name} fit="cover" />
        </Box>
        <Heading level={level} margin="none">
          {product.name}
        </Heading>
        <Paragraph margin="none">{product.description}</Paragraph>
        <Text weight="bolder">{currencyFormatter.format(product.price)}</Text>
      </CardBody>
      <CardFooter>
        <Button label="Add to Cart" secondary />
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
