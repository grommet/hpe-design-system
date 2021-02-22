import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  Header,
  Heading,
  List,
  Nav,
  ResponsiveContext,
  Sidebar,
  Text,
  ThemeContext,
  Tip,
} from 'grommet';
import {
  Cli,
  Clock,
  Configure,
  Location,
  Hpe,
  Projects,
  Splits,
  StatusInfoSmall,
} from 'grommet-icons';

const pages = [
  {
    name: 'Focus',
    icon: <StatusInfoSmall />,
    content: 'panes',
  },
  {
    name: 'Services',
    icon: <Projects />,
    content: 'cards',
  },
  {
    name: 'Glances',
    icon: <Clock />,
    content: 'cards',
  },
  {
    name: 'Flows',
    icon: <Splits />,
    content: 'list',
  },
  {
    name: 'Locations',
    icon: <Location />,
    content: 'list',
  },
  {
    name: 'Console',
    icon: <Cli />,
    content: 'panes',
  },
  {
    name: 'Configure',
    icon: <Configure />,
    content: 'panes',
  },
];

export const MinimalSidebarExample = () => {
  const [activeItem, setActiveItem] = React.useState(1);
  const size = React.useContext(ResponsiveContext);
  const theme = React.useContext(ThemeContext);
  return (
    <AppContainer activeItem={activeItem}>
      <Sidebar
        /* Sidebar should switch from column to row orientation 
        when on smaller screens */
        direction={size !== 'small' ? 'column' : 'row'}
        /* Only display most critical navigation items in mobile 
        contexts */
        header={size !== 'small' && <SidebarHeader />}
        /* Min height is not needed in mobile contexts */
        height={size !== 'small' ? { min: '100%' } : undefined}
        align="center"
        background={{ color: !theme.dark ? 'background' : 'blue', dark: true }}
        pad={{
          top: size !== 'small' ? 'medium' : 'small',
          bottom: 'medium',
          horizontal: size !== 'small' ? 'medium' : 'small',
        }}
      >
        <MainNavigation activeItem={activeItem} setActiveItem={setActiveItem} />
      </Sidebar>
      <PageContent activeItem={activeItem} setActiveItem={setActiveItem} />
    </AppContainer>
  );
};

const AppContainer = ({ ...rest }) => {
  const size = React.useContext(ResponsiveContext);

  return (
    <Box
      direction={size === 'small' ? 'column-reverse' : 'row'}
      background="background-back"
      height={size === 'small' ? { max: 'large' } : undefined}
      width={size === 'small' ? 'medium' : '100%'}
      {...rest}
    />
  );
};

const MainNavigation = ({ activeItem, setActiveItem }) => {
  const size = React.useContext(ResponsiveContext);
  const maxItems = size !== 'small' ? undefined : 5;

  return (
    <Nav direction={size !== 'small' ? 'column' : 'row'}>
      {pages &&
        pages.slice(0, maxItems).map((item, index) => (
          <Tip
            dropProps={{
              align: size !== 'small' ? { left: 'right' } : { top: 'bottom' },
            }}
            content={
              <Text size="small" color="text-strong">
                {item.name}
              </Text>
            }
          >
            <Button
              key={item.name}
              a11yTitle={item.name}
              active={index === activeItem}
              icon={item.icon}
              name={item.name}
              onClick={() => setActiveItem(index)}
              round="xsmall"
            />
          </Tip>
        ))}
    </Nav>
  );
};

MainNavigation.propTypes = {
  activeItem: PropTypes.number,
  setActiveItem: PropTypes.func,
};

const PageContent = ({ activeItem }) => {
  const { content, name } = pages[activeItem];
  const items = new Array(9).fill(); // Mock data

  return (
    pages && (
      <Box flex overflow="auto">
        <Header
          fill="horizontal"
          height="xsmall"
          pad={{ horizontal: 'medium' }}
        >
          <AppIdentity name={name} />
        </Header>
        <Box pad={{ horizontal: 'medium', bottom: 'large' }} flex="grow">
          <Heading level={2} margin={{ vertical: 'small' }}>
            {name}
          </Heading>
          {content && content === 'cards' && <GridLayout items={items} />}
          {content && content === 'list' && <ListLayout items={items} />}
          {content && content === 'panes' && <PanesLayout items={items} />}
        </Box>
      </Box>
    )
  );
};

PageContent.propTypes = {
  activeItem: PropTypes.number,
};

const SidebarHeader = () => <Avatar background="background-front">DS</Avatar>;

const AppIdentity = ({ name }) => (
  <Button>
    <Box
      direction="row"
      align="start"
      gap="medium"
      // pad maintains accessible hit target
      // non-responsive maintains same dimensions for mobile
      pad={{ vertical: 'small' }}
      responsive={false}
    >
      <Hpe color="brand" />
      <Box direction="row" gap="xsmall" wrap>
        <Text color="text-strong" weight="bold">
          HPE
        </Text>
        <Text color="text-strong">{name}</Text>
      </Box>
    </Box>
  </Button>
);

AppIdentity.propTypes = {
  name: PropTypes.string,
};

const GridLayout = ({ items }) => {
  return (
    <Grid columns={{ count: 'fit', size: 'small' }} rows="small" gap="medium">
      {items.map((item, index) => (
        <Card key={index} background="background-front" />
      ))}
    </Grid>
  );
};

GridLayout.propTypes = {
  items: PropTypes.array,
};

const ListLayout = ({ items }) => (
  <List data={items} border={{ size: '0' }} pad={{ vertical: 'xsmall' }}>
    {(datum, index) => (
      <Box
        key={index}
        background="background-front"
        height="xxsmall"
        round="xsmall"
      />
    )}
  </List>
);
ListLayout.propTypes = {
  items: PropTypes.array,
};

const PanesLayout = ({ items }) => {
  return items.map((item, index) => (
    <Box
      key={index}
      background="background-front"
      height="medium"
      margin={{ vertical: 'small' }}
      round="xsmall"
    />
  ));
};

PanesLayout.propTypes = {
  items: PropTypes.array,
};
