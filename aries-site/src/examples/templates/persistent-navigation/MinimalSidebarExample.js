import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Drop,
  Grid,
  Header,
  Heading,
  List,
  Nav,
  ResponsiveContext,
  Sidebar,
  Text,
} from 'grommet';
import {
  Chat,
  Cli,
  Clock,
  Configure,
  Location,
  Hpe,
  Projects,
  Splits,
  StatusInfoSmall,
  StatusUnknown,
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

export const MinimalSidebarExample = ({ mobile }) => {
  const [activeItem, setActiveItem] = React.useState(1);

  return (
    <ResponsiveContext.Provider value={mobile && 'small'}>
      <ResponsiveContext.Consumer>
        {size => (
          <AppContainer activeItem={activeItem}>
            <Sidebar
              gridArea="sidebar"
              /* Sidebar should switch from column to row orientation 
              when on smaller screens */
              direction={size !== 'small' ? 'column' : 'row'}
              /* Only display most critical navigation items in mobile 
              contexts */
              header={size !== 'small' && <SidebarHeader />}
              footer={size !== 'small' && <SidebarFooter />}
              background="blue!"
              pad={{
                top: size !== 'small' ? 'medium' : 'small',
                bottom: 'medium',
                horizontal: size !== 'small' ? 'medium' : 'small',
              }}
            >
              <MainNavigation
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              />
            </Sidebar>
            <PageContent
              gridArea="pageContent"
              activeItem={activeItem}
              setActiveItem={setActiveItem}
            />
          </AppContainer>
        )}
      </ResponsiveContext.Consumer>
    </ResponsiveContext.Provider>
  );
};

MinimalSidebarExample.propTypes = {
  mobile: PropTypes.bool,
};

const AppContainer = ({ ...rest }) => {
  const size = React.useContext(ResponsiveContext);

  const areas =
    size !== 'small'
      ? [
          { name: 'sidebar', start: [0, 0], end: [0, 0] },
          { name: 'pageContent', start: [1, 0], end: [1, 0] },
        ]
      : [
          { name: 'sidebar', start: [0, 1], end: [0, 1] },
          { name: 'pageContent', start: [0, 0], end: [0, 0] },
        ];

  const columns = size !== 'small' ? ['auto', 'flex'] : ['auto'];
  const rows = size !== 'small' ? ['auto'] : ['flex', 'auto'];

  return (
    <Box
      background="background-back"
      height={size === 'small' ? { max: 'large' } : undefined}
      width={size === 'small' ? 'medium' : '100%'}
    >
      <Grid columns={columns} rows={rows} areas={areas} fill {...rest} />
    </Box>
  );
};

const MainNavigation = ({ activeItem, setActiveItem }) => {
  const size = React.useContext(ResponsiveContext);
  const maxItems = size !== 'small' ? undefined : 5;

  return (
    <Nav direction={size !== 'small' ? 'column' : 'row'} gap="xsmall">
      {pages &&
        pages
          .slice(0, maxItems)
          .map((item, index) => (
            <NavButton
              key={item.name}
              a11yTitle={item.name}
              active={index === activeItem}
              icon={item.icon}
              name={item.name}
              onClick={() => setActiveItem(index)}
              round="xsmall"
            />
          ))}
    </Nav>
  );
};

MainNavigation.propTypes = {
  activeItem: PropTypes.number,
  setActiveItem: PropTypes.func,
};

const NavButton = ({ active, icon, name, ...rest }) => {
  const [hover, setHover] = React.useState();
  const ref = React.useRef();

  return (
    <Box fill="horizontal">
      <Button
        ref={ref}
        onMouseOver={() => setHover(true)}
        onFocus={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        onBlur={() => setHover(false)}
        {...rest}
      >
        <Box
          pad={{ horizontal: 'small', vertical: 'small' }}
          round="xxsmall"
          background={active || hover ? 'active-background' : undefined}
          align="center"
        >
          {icon}
        </Box>
      </Button>
      {/* Show tooltip on hover and focus states as a supplemental
      reminder to icon's meaning */
      ref.current && hover && (
        <Drop align={{ left: 'right' }} target={ref.current} plain>
          <Box
            animation={{ type: ['fadeIn', 'slideRight'] }}
            elevation="small"
            margin={{ left: 'xsmall', vertical: 'xxsmall' }}
            pad={{ horizontal: 'xsmall', vertical: 'xxsmall' }}
            background="blue"
            round="xsmall"
          >
            <Text size="small" color="text-strong">
              {name}
            </Text>
          </Box>
        </Drop>
      )}
    </Box>
  );
};

NavButton.propTypes = {
  active: PropTypes.bool,
  icon: PropTypes.element,
  name: PropTypes.string,
};

const PageContent = ({ activeItem }) => {
  const { content, name } = pages[activeItem];
  const items = new Array(9).fill(); // Mock data

  return (
    pages && (
      <Box fill overflow="auto">
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

const SidebarFooter = () => {
  const size = React.useContext(ResponsiveContext);

  return (
    <Nav direction={size !== 'small' ? 'column' : 'row'} gap="xsmall">
      <NavButton a11yTitle="Chat" hoverIndicator icon={<Chat />} name="Chat" />
      <NavButton
        a11yTitle="Support"
        hoverIndicator
        icon={<StatusUnknown />}
        name="Support"
      />
    </Nav>
  );
};

const AppIdentity = ({ name }) => (
  <Button>
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

const GridLayout = ({ items }) => {
  return (
    <Grid columns={{ count: 'fit', size: 'small' }} rows="small" gap="medium">
      {items.map((item, index) => (
        <Box key={index} background="background-front" fill round="small" />
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
