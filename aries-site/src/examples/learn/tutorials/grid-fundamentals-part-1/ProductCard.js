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
import { Favorite } from '@hpe-design/icons-grommet';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const ProductCard = ({ level, product, ...rest }) => {
  return (
    <Card as="section" level={level} {...rest}>
      <CardHeader pad={{ horizontal: 'medium', top: 'medium' }}>
        <Box />
        <Button icon={<Favorite />} a11yTitle="Add to favorites" />
      </CardHeader>
      <CardBody justify="between" gap="small">
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
      </CardBody>
      <CardFooter
        pad={{ horizontal: 'medium', bottom: 'medium' }}
        justify="between"
        align="center"
      >
        <Text weight={500} color="text-strong" size="large">
          {currencyFormatter.format(product.price)}
        </Text>
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
