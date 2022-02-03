import { cloneElement, useContext, useState } from 'react';
import {
  Accordion,
  AccordionPanel,
  Box,
  Button,
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
  Collapsible,
  CheckBoxGroup,
} from 'grommet';
import { Cloudlinux, Filter, FormDown, FormNext, Search } from 'grommet-icons';
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
        <Heading margin="none">HPE Product Catalog</Heading>
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
        {!['xsmall', 'small'].includes(size) && <FilterPanel />}
        <Box>
          <Box direction="row" gap="small">
            <Box width="medium">
              <TextInput placeholder="Search all products" icon={<Search />} />
            </Box>
            {['xsmall', 'small'].includes(size) && (
              <Button kind="toolbar" icon={<Filter />} onClick={() => {}} />
            )}
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

const FilterPanel = () => {
  const [expand, setExpand] = useState(false);

  return (
    <>
      <Box align="start" gap="medium" margin={{ horizontal: '-18px' }}>
        <>
          <Button
            label="Categories"
            icon={expand ? <FormDown /> : <FormNext />}
            onClick={() => setExpand(!expand)}
          />
          <Collapsible open={expand}>
            <Box>
              <CheckBoxGroup
                options={[
                  'AI/ML & Analytics',
                  'Big Data',
                  'Data Protection',
                  'Database',
                  'Developer Tools',
                  'Monitoring',
                ]}
              />
            </Box>
          </Collapsible>
        </>
        <Button label="Publishers" icon={<FormNext />} onClick={() => {}} />
        <Button
          label="Delivery Methods"
          icon={<FormNext />}
          onClick={() => {}}
        />
        <Button label="Pricing Models" icon={<FormNext />} onClick={() => {}} />
      </Box>
    </>
  );
};

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
