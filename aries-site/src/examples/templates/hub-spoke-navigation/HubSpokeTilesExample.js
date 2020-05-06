import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Grid,
  Header,
  Heading,
  List,
  Text,
  ResponsiveContext,
} from 'grommet';
import {
  Cluster,
  Group,
  Hpe,
  List as ListIcon,
  Location,
  LocationPin,
  Optimize,
  Overview,
  Server,
  Servers,
  ShieldSecurity,
  UnorderedList,
} from 'grommet-icons';

// Mock application page data
const pages = [
  {
    name: 'Home',
    layout: 'tiles',
    children: ['Devices', 'Performance', 'Users', 'Remote Access', 'Security'],
  },
  {
    name: 'Performance',
    icon: <Optimize />,
    layout: 'tiles',
    parent: 'Home',
    children: ['Sessions', 'Logs', 'Diagnostics'],
  },
  {
    name: 'Devices',
    icon: <Servers />,
    layout: 'tiles',
    parent: 'Home',
    children: ['Server Cluster', 'Beacon Cluster'],
  },
  {
    name: 'Users',
    icon: <Group />,
    layout: 'list',
    parent: 'Home',
    children: new Array(17).fill(''),
  },
  {
    name: 'Sessions',
    icon: <ListIcon />,
    layout: 'list',
    parent: 'Performance',
    children: new Array(17).fill(''),
  },
  {
    name: 'Logs',
    icon: <UnorderedList />,
    layout: 'list',
    parent: 'Performance',
    children: new Array(17).fill(''),
  },
  {
    name: 'Remote Access',
    icon: <Location />,
    layout: 'panes',
    parent: 'Home',
  },
  {
    name: 'Security',
    icon: <ShieldSecurity />,
    layout: 'panes',
    parent: 'Home',
  },
  {
    name: 'Diagnostics',
    icon: <Overview />,
    layout: 'tiles',
    parent: 'Performance',
  },
  {
    name: 'Server Cluster',
    icon: <Cluster />,
    layout: 'tiles',
    parent: 'Devices',
    children: ['Server A', 'Server B'],
  },
  {
    name: 'Beacon Cluster',
    icon: <Cluster />,
    layout: 'tiles',
    parent: 'Devices',
    children: ['Beacon A', 'Beacon B', 'Beacon C', 'Beacon D'],
  },
  {
    name: 'Server A',
    icon: <Server />,
    layout: 'panes',
    parent: 'Server Cluster',
  },
  {
    name: 'Server B',
    icon: <Server />,
    layout: 'panes',
    parent: 'Server Cluster',
  },
  {
    name: 'Beacon A',
    icon: <LocationPin />,
    layout: 'panes',
    parent: 'Beacon Cluster',
  },
  {
    name: 'Beacon B',
    icon: <LocationPin />,
    layout: 'panes',
    parent: 'Beacon Cluster',
  },
  {
    name: 'Beacon C',
    icon: <LocationPin />,
    layout: 'panes',
    parent: 'Beacon Cluster',
  },
  {
    name: 'Beacon D',
    icon: <LocationPin />,
    layout: 'panes',
    parent: 'Beacon Cluster',
  },
];

const getPageDetails = pageName => pages.find(page => page.name === pageName);

export const HubSpokeTilesExample = ({ mobile }) => {
  const [currentPage, setCurrentPage] = React.useState(getPageDetails('Home'));
  const [subPages, setSubPages] = React.useState();

  React.useEffect(() => {
    const pageDetails =
      currentPage.children &&
      currentPage.children.map(child =>
        pages.find(page => page.name === child),
      );
    setSubPages(pageDetails);
  }, [currentPage]);

  const { children, layout, name } = currentPage;

  return (
    <ResponsiveContext.Provider value={mobile && 'small'}>
      <ResponsiveContext.Consumer>
        {size => (
          <AppContainer size={size}>
            <AppHeader
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              size={size}
            />
            <Box
              pad={{
                horizontal: size !== 'small' ? 'large' : 'medium',
                vertical: 'small',
              }}
            >
              <Heading level={2} margin={{ top: 'none', bottom: 'medium' }}>
                {name}
              </Heading>
              {layout === 'tiles' && (
                <GridLayout
                  items={subPages}
                  onClick={page => setCurrentPage(getPageDetails(page))}
                />
              )}
              {layout === 'list' && <ListLayout items={children} />}
              {layout === 'panes' && <PanesLayout items={children} />}
            </Box>
          </AppContainer>
        )}
      </ResponsiveContext.Consumer>
    </ResponsiveContext.Provider>
  );
};

HubSpokeTilesExample.propTypes = {
  mobile: PropTypes.bool,
};

const AppContainer = ({ size, ...rest }) => (
  <Box
    background="background-back"
    fill="vertical"
    height={size === 'small' ? { max: 'large' } : undefined}
    width={size === 'small' ? 'medium' : '100%'}
    overflow="auto"
    {...rest}
  />
);

AppContainer.propTypes = {
  size: PropTypes.string,
};

const AppHeader = ({ currentPage, setCurrentPage, size }) => (
  <Header
    fill="horizontal"
    height="xsmall"
    pad={{ horizontal: size !== 'small' ? 'large' : 'medium' }}
  >
    <AppIdentity
      name={`Service ${
        typeof currentPage.parent !== 'undefined'
          ? `| ${currentPage.parent}`
          : ''
      }`}
      onClick={() =>
        setCurrentPage(
          getPageDetails(
            typeof currentPage.parent !== 'undefined'
              ? currentPage.parent
              : 'Home',
          ),
        )
      }
    />
  </Header>
);

AppHeader.propTypes = {
  currentPage: PropTypes.object,
  setCurrentPage: PropTypes.func,
  size: PropTypes.string,
};

const AppIdentity = ({ name, ...rest }) => (
  <Button {...rest}>
    <Box direction="row" align="center" gap="small">
      <Hpe color="brand" />
      <Box direction="row" gap="xsmall">
        <Text weight="bold">HPE</Text>
        <Text>{name}</Text>
      </Box>
    </Box>
  </Button>
);

AppIdentity.propTypes = {
  name: PropTypes.string,
};

const GridLayout = ({ items, onClick }) => (
  <Grid columns={{ count: 'fit', size: 'small' }} rows="small" gap="medium">
    {items &&
      items.map((item, index) => (
        <Box
          key={index}
          background="background-front"
          fill
          onClick={() => onClick(item.name)}
          pad="medium"
          round="small"
        >
          {item && (
            <Header justify="start" gap="small">
              {item.icon}
              <Text>{item.name}</Text>
            </Header>
          )}
        </Box>
      ))}
  </Grid>
);

GridLayout.propTypes = {
  items: PropTypes.array,
  onClick: PropTypes.func,
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
  const sections = items || [''];
  return sections.map((section, index) => (
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
