import { cloneElement, useContext } from 'react';
import {
  Accordion,
  AccordionPanel,
  Box,
  Card,
  CardBody,
  CardFooter,
  Grid,
  Header,
  Heading,
  Main,
  Text,
  TextInput,
  Tag,
  Paragraph,
  ResponsiveContext,
} from 'grommet';
import { Cloudlinux } from 'grommet-icons';
import {
  AppContainer,
  PageContainer,
  PageContainerContext,
} from '../../examples/templates/page-layouts/components';

const products = new Array(42).fill({
  name: 'Product Name',
  publisher: 'Publisher Name',
  logo: <Cloudlinux />,
  description: `This is content that will be provided by the seller. This is 
    content that will be provided by the seller.`,
  tags: ['Category A', 'Category B'],
});

const Marketplace = () => (
  <AppContainer>
    <PageContainer>
      <PageHeader />
      <PageContent />
    </PageContainer>
  </AppContainer>
);

const PageHeader = () => {
  const { ...pageContainer } = useContext(PageContainerContext);

  return (
    <Header background="blue" pad={{ vertical: 'large' }}>
      <Box {...pageContainer}>
        <Heading margin="none">HPE GreenLake Marketplace</Heading>
        <Text>
          Explore solutions to optimize, develop, monitor, and deploy your
          containerized applicaitons.
        </Text>
      </Box>
    </Header>
  );
};

const parentGrid = {
  columns: {
    xsmall: 'auto',
    small: 'auto',
    medium: [['small', '1/3'], 'flex'],
    large: [['small', 'auto'], 'flex'],
    xlarge: [['small', 'auto'], 'flex'],
  },
  gap: {
    xsmall: 'medium',
    small: 'medium',
    medium: 'medium',
    large: 'large',
    xlarge: 'large',
  },
};

const productGrid = {
  columns: {
    xsmall: 'auto',
    small: ['auto', 'auto'],
    medium: { count: 'fit', size: ['1/2', 'auto'] },
    large: { count: 'fit', size: ['1/2', 'auto'] },
    xlarge: { count: 'fit', size: ['1/3', 'auto'] },
  },
  gap: {
    xsmall: 'medium',
    small: 'small',
    medium: 'small',
    large: 'medium',
    xlarge: 'medium',
  },
};

const PageContent = () => {
  const size = useContext(ResponsiveContext);
  const { ...pageContainer } = useContext(PageContainerContext);

  return (
    <Main {...pageContainer}>
      <Grid columns={parentGrid.columns[size]} gap={parentGrid.gap[size]}>
        <FilterPanel />
        <Box>
          <Box width={{ max: 'medium' }}>
            <TextInput placeholder="Search all products" />
          </Box>
          <Heading level={2} size="small">
            All Products - @{size} breakpoint
          </Heading>
          <Grid columns={productGrid.columns[size]} gap={productGrid.gap[size]}>
            {products?.map(product => (
              <ProductCard {...product} />
            ))}
          </Grid>
        </Box>
      </Grid>
    </Main>
  );
};

const FilterPanel = () => (
  <Accordion>
    <AccordionPanel label="Categories">fddf</AccordionPanel>
    <AccordionPanel label="Publishers">fddf</AccordionPanel>
    <AccordionPanel label="Delivery Methods">fddf</AccordionPanel>
    <AccordionPanel label="Pricing Models">fddf</AccordionPanel>
  </Accordion>
);

const ProductCard = ({ ...product }) => {
  const { name, publisher, logo, description, tags } = { ...product };
  const size = useContext(ResponsiveContext);

  return (
    <Card onClick={() => {}}>
      <CardBody
        gap={['large', 'xlarge'].includes(size) ? 'medium' : 'small'}
        pad={size === 'medium' ? 'small' : 'medium'}
      >
        <Identifier title={name} subtitle={publisher} icon={logo} />
        <Paragraph margin="none">{description}</Paragraph>
      </CardBody>
      <CardFooter justify="start" gap="xsmall">
        {tags?.map(tag => (
          <Tag value={tag} size="small" />
        ))}
      </CardFooter>
    </Card>
  );
};

const Identifier = ({ title, subtitle, icon: iconProp }) => {
  const icon = cloneElement(iconProp, { size: 'large', color: 'purple' });
  return (
    <Box gap="medium">
      <Box>{icon}</Box>
      <Box>
        <Text color="text-strong" size="large" weight="bold">
          {title}
        </Text>
        <Text>By {subtitle}</Text>
      </Box>
    </Box>
  );
};

export default Marketplace;
