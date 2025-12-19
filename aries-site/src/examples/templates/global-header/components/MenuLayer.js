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
import { Close, Menu } from '@hpe-design/icons-grommet';
// TODO replace with DS icon package when available
import { Aruba } from 'grommet-icons';
import { TextEmphasis } from 'aries-core';

export const MenuLayer = () => {
  const size = useContext(ResponsiveContext);
  const [showLayer, setShowLayer] = useState(false);

  const pad = {
    horizontal: 'medium',
    vertical: 'xsmall',
  };
  return (
    <>
      <Button
        a11yTitle="Open menu"
        icon={<Menu />}
        onClick={() => setShowLayer(true)}
      />
      {showLayer && (
        <Layer
          full={!['xsmall', 'small'].includes(size) ? 'vertical' : true}
          modal={false}
          onClickOutside={() => setShowLayer(false)}
          onEsc={() => setShowLayer(false)}
          position={!['xsmall', 'small'].includes(size) ? 'left' : undefined}
        >
          <Box
            fill="vertical"
            width={!['xsmall', 'small'].includes(size) ? 'medium' : undefined}
            elevation="large"
          >
            <Header pad={pad}>
              <Button
                a11yTitle={`You are in a navigation layer. To close this layer, 
                press Enter`}
                icon={<Close />}
                onClick={() => setShowLayer(false)}
                autoFocus
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
    pad={{ top: 'xsmall', bottom: 'medium' }}
    gap="medium"
    flex={false}
  >
    <Box gap="3xsmall">
      <Avatar
        // TODO: Revisit when we have more
        // token colors available.
        background="decorative-green"
        flex={false}
        margin={{ bottom: '3xsmall' }}
      >
        <Text size="large" color="text-strong">
          A
        </Text>
      </Avatar>
      <TextEmphasis>AT&T Corporation</TextEmphasis>
      <Text size="small">ID: 0a7141c332ec4c4aae04aa4b8fe59deb</Text>
    </Box>
    <Button label="Switch Account" secondary />
  </Box>
);

const SidebarNav = () => (
  <Nav a11yTitle="Sidebar Navigation">
    <NavButton label="Home" />
    <NavButton label="My apps" />
    <NavButton label="App catalog" />
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
  <Footer pad={{ bottom: 'xsmall' }}>
    <Box fill="horizontal" gap="medium">
      <Box border={{ side: 'bottom' }} pad={{ bottom: '3xsmall' }}>
        <Text size="xsmall">Last Visited</Text>
      </Box>
      <Button>
        <Box direction="row" gap="xsmall">
          <Box pad="xsmall" round="medium">
            <Aruba />
          </Box>
          <Box>
            <TextEmphasis size="xsmall">Aruba Network Manager</TextEmphasis>
            <Text size="xsmall">US West</Text>
          </Box>
        </Box>
      </Button>
    </Box>
  </Footer>
);
