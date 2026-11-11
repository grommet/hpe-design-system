// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext } from 'react';
import type { ComponentType, PropsWithChildren } from 'react';
import { Box, Button, Footer, Image, Nav, Text } from 'grommet';
import type { TextProps, ThemeType } from 'grommet';
import { Help, Home } from '@hpe-design/icons-grommet';
import { Aruba } from 'grommet-icons';
import { ThemeContext } from 'styled-components';
import { TextEmphasis as UntypedTextEmphasis } from '../../../../components/typography/TextEmphasis';
import {
  GlobalHeader,
  GlobalHeaderIdentity,
  HeaderNav,
  MenuLayer,
  UserAvatar,
  useHeaderUser,
} from '../../../../patterns/navigation/GlobalHeader';

const TextEmphasis: ComponentType<PropsWithChildren<TextProps>> =
  UntypedTextEmphasis;

const AccountHeader = () => (
  <Box
    align="start"
    border={{ color: 'border-weak', side: 'bottom' }}
    pad={{ top: 'xsmall', bottom: 'medium' }}
    gap="medium"
    flex={false}
  >
    <Box gap="xsmall">
      <UserAvatar initials="A" />
      <Box gap="3xsmall">
        <TextEmphasis>AT&T Corporation</TextEmphasis>
        <Text size="small">ID: 0a7141c332ec4c4aae04aa4b8fe59deb</Text>
      </Box>
    </Box>
    <Button label="Switch Account" secondary />
  </Box>
);

const AccountNavigation = () => (
  <Nav a11yTitle="Sidebar Navigation">
    {['Home', 'My apps', 'App catalog', 'Manage'].map(label => (
      <Button key={label}>
        <Text color="text-strong">{label}</Text>
      </Button>
    ))}
  </Nav>
);

const AccountFooter = () => (
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

const HpeLogo = () => {
  // Grommet adds the active mode at runtime, outside ThemeType's declarations.
  const theme = useContext(ThemeContext) as
    | (ThemeType & { dark?: boolean })
    | undefined;
  return (
    <Box width="4xsmall" animation={{ type: 'fadeIn', duration: 500 }}>
      <Image
        alt="HPE logo"
        fit="contain"
        src={
          theme?.dark
            ? '/HPE_logo_full-clr_rev_rgb.svg'
            : '/HPE_logo_full-clr_pos_rgb.svg'
        }
      />
    </Box>
  );
};

export const OverviewHeader = () => {
  const { user, setUser } = useHeaderUser();
  return (
    <GlobalHeader
      identity={
        <GlobalHeaderIdentity
          logo={<HpeLogo />}
          title={
            user ? (
              'Service Name'
            ) : (
              <Text color="text-strong" weight="bold">
                Hewlett Packard Enterprise
              </Text>
            )
          }
          menu={
            user && (
              <MenuLayer
                openLabel="Open menu"
                closeLabel={`You are in a navigation layer. To close this layer,
                press Enter`}
                header={<AccountHeader />}
                navigation={<AccountNavigation />}
                footer={<AccountFooter />}
              />
            )
          }
        />
      }
      navigation={
        user && (
          <HeaderNav
            userMenuLabel="User menu"
            actions={
              <>
                <Button icon={<Help />} a11yTitle="Help" title="Help" />
                <Button icon={<Home />} a11yTitle="Home" title="Home" />
              </>
            }
            userActions={
              <>
                <Button label="My Profile" />
                <Button label="Sign Out" onClick={() => setUser()} />
              </>
            }
          />
        )
      }
    />
  );
};
