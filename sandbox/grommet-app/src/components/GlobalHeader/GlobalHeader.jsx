import { useContext, useMemo, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Heading,
  CheckBox,
  Image,
  FormField,
  Select,
  Page,
  PageContent,
  Text,
  DropButton,
  TextInput,
} from 'grommet';
import {
  Down,
  Search,
  User,
  Notification,
  Catalog,
  HelpOption,
  Menu,
} from 'grommet-icons';
import { themes } from '../../theme';
import { ToggleGroup } from '../ToggleGroup/ToggleGroup';

// TO DO fix animation once motion tokens are added
const StyledDown = styled(Down)``;

export const GlobalHeader = ({
  darkMode,
  setDarkMode,
  setActiveTheme,
  activeTheme,
  backgroundBack,
  setBackgroundBack,
  workspace,
  setWorkspace,
}) => {
  const theme = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const boxProps = useMemo(
    () =>
      workspace === 'Acme Next'
        ? {
            elevation: 'small',
            round: {
              corner: 'bottom',
              size: 'medium',
            },
          }
        : {
            border: { color: 'border-weak', side: 'bottom' },
          },
    [workspace],
  );

  return (
    <Page
      // kind={window.location.pathname === '/' ? 'full' : 'wide'}
      kind="full"
    >
      <PageContent pad="none">
        <Box
          direction="row"
          justify="between"
          align="center"
          background={
            activeTheme === 'refresh'
              ? { color: 'background-primary-default', dark: true }
              : 'background-front'
          }
          pad={{ horizontal: 'xsmall', vertical: 'small' }}
          {...boxProps}
        >
          <Box direction="row" gap="medium" flex>
            <Box direction="row" gap="xsmall">
              <Button icon={<Menu />} />
              <Box border={{ side: 'left', color: 'border-weak' }} />
            </Box>
            <Box height="32px" width="90px" align="start">
              <Image
                src={`/hpe_greenlake_grn_${
                  activeTheme === 'refresh' ? 'rev' : 'pos'
                }_rgb.svg`}
                fit="contain"
              />
            </Box>
            <Box width="large">
              <TextInput
                icon={<Search />}
                placeholder="Type / to search assets, docs, serices, hardware, and more"
              />
            </Box>
          </Box>
          <Box direction="row" gap="small">
            <Box direction="row" gap="xsmall">
              <Button icon={<HelpOption />} />
              <Button icon={<Catalog />} />
              <Button icon={<Notification />} />
            </Box>
            <Select
              options={['Acme Production', 'Acme Next']}
              value={workspace}
              valueLabel={label => (
                <Box {...theme.global.input} pad={theme.global.input.padding}>
                  <Text color="text-strong">{label}</Text>
                </Box>
              )}
              onChange={({ value }) => setWorkspace(value)}
              icon={<StyledDown open={open} />}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
              dropProps={{ animate: 'select' }}
            />
            <DropButton
              icon={<User />}
              dropContent={
                <Box
                  background={{ dark: false, color: 'background-floating' }}
                  pad="medium"
                  gap="medium"
                  width="medium"
                >
                  <Heading level={2} margin="none">
                    Change theme
                  </Heading>
                  <CheckBox
                    label="background-back"
                    toggle
                    onChange={event => setBackgroundBack(event.target.checked)}
                    checked={backgroundBack}
                    pad="none"
                  />
                  <Box
                    border={{ side: 'bottom', color: 'border-weak' }}
                    width="100%"
                  />
                  <FormField label="Mode">
                    <ToggleGroup
                      options={[
                        { label: 'Light', value: 'light' },
                        { label: 'Dark', value: 'dark' },
                      ]}
                      border={{ size: 'none' }}
                      value={darkMode ? 'dark' : 'light'}
                      onChange={e =>
                        setDarkMode(e.target.value === 'light' ? false : true)
                      }
                    />
                  </FormField>
                  <FormField label="Theme">
                    <Select
                      options={Object.keys(themes).map(theme => theme)}
                      onChange={({ option }) => setActiveTheme(option)}
                      value={activeTheme}
                    />
                  </FormField>
                </Box>
              }
              dropAlign={{ top: 'bottom', right: 'right' }}
            />
          </Box>
        </Box>
      </PageContent>
    </Page>
  );
};

GlobalHeader.propTypes = {
  darkMode: PropTypes.bool,
  setDarkMode: PropTypes.func,
  setActiveTheme: PropTypes.func,
  activeTheme: PropTypes.string,
  backgroundBack: PropTypes.bool,
  setBackgroundBack: PropTypes.func,
  workspace: PropTypes.string,
  setWorkspace: PropTypes.func,
};
