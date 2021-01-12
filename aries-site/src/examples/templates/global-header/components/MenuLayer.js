import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Header,
  Footer,
  Layer,
  Nav,
  ResponsiveContext,
  Text,
} from 'grommet';
import { Aruba, FormClose, Menu } from 'grommet-icons';

export const MenuLayer = () => {
  const size = useContext(ResponsiveContext);
  const [showLayer, setShowLayer] = useState(false);

  const pad = {
    horizontal: 'medium',
    vertical: 'small',
  };
  return (
    <>
      <Button icon={<Menu />} onClick={() => setShowLayer(true)} />
      {showLayer && (
        <Layer
          full={size !== 'small' ? 'vertical' : true}
          modal={false}
          onClickOutside={() => setShowLayer(false)}
          onEsc={() => setShowLayer(false)}
          position={size !== 'small' ? 'left' : undefined}
        >
          <Box
            fill="vertical"
            width={size !== 'small' ? 'medium' : undefined}
            elevation="large"
          >
            <Header pad={pad}>
              <Button
                icon={<FormClose />}
                onClick={() => setShowLayer(false)}
              />
            </Header>
            <Box pad={pad} flex gap="medium" overflow="auto">
              <SidebarHeader />
              <SidebarNav />
              <Box flex />
              <SidebarFooter />
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
};

const SidebarHeader = () => (
  <Box
    align="start"
    border={{ color: 'border-weak', side: 'bottom' }}
    pad={{ top: 'small', bottom: 'medium' }}
    gap="medium"
    flex={false}
  >
    <Box gap="xsmall">
      <Avatar
        background="status-unknown"
        flex={false}
        margin={{ bottom: 'xsmall' }}
      >
        <Text size="large">A</Text>
      </Avatar>
      <Text color="text-strong" weight="bold">
        AT&T Corporation
      </Text>
      <Text size="small">ID: 0a7141c332ec4c4aae04aa4b8fe59deb</Text>
    </Box>
    <Button label="Switch Account" secondary />
  </Box>
);

const SidebarNav = () => (
  <Nav a11yTitle="Sidebar Navigation">
    <NavButton label="Home" />
    <NavButton label="My Apps" />
    <NavButton label="App Catalog" />
    <NavButton label="Manage" />
  </Nav>
);

const NavButton = ({ label }) => (
  <Button>
    <Text color="text-strong">{label}</Text>
  </Button>
);

NavButton.propTypes = {
  label: PropTypes.string,
};

const SidebarFooter = () => (
  <Footer pad={{ bottom: 'small' }}>
    <Box fill="horizontal" gap="medium">
      <Box border={{ side: 'bottom' }} pad={{ bottom: 'xsmall' }}>
        <Text size="xsmall">Last Visited</Text>
      </Box>
      <Button>
        <Box direction="row" gap="small">
          <Box background="orange!" pad="small" round="small">
            <Aruba color="background" />
          </Box>
          <Box>
            <Text weight="bold" color="text-strong" size="xsmall">
              Aruba Network Manager
            </Text>
            <Text size="xsmall">US West</Text>
          </Box>
        </Box>
      </Button>
    </Box>
  </Footer>
);
