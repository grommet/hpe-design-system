import { useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import {
  Anchor,
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
  ToggleGroup,
} from 'grommet';
import {
  Down,
  Search,
  User,
  Notification,
  Catalog,
  HelpOption,
  Menu,
  LinkNext,
} from 'grommet-icons';
import { themes } from '../../theme';
import { Link } from 'react-router-dom';

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

  return (
    <Page kind="full">
      <PageContent pad="none">
        <Box
          direction="row"
          justify="between"
          align="center"
          background="background-front"
          pad={{ horizontal: 'xsmall', vertical: 'small' }}
          elevation="small"
        >
          <Box direction="row" gap="medium" flex>
            <Box direction="row" gap="xsmall">
              <Button icon={<Menu />} />
              <Box border={{ side: 'left', color: 'border-weak' }} />
            </Box>
            <Link to="/">
              <Box height="32px" width="90px" align="start">
                <Image
                  src={`/hpe_greenlake_grn_${
                    activeTheme === 'refresh' ? 'rev' : 'pos'
                  }_rgb.svg`}
                  fit="contain"
                />
              </Box>
            </Link>
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
                  <FormField label="Mode" alignSelf="start">
                    <ToggleGroup
                      options={[
                        { label: 'Light', value: 'light' },
                        { label: 'Dark', value: 'dark' },
                      ]}
                      border={{ size: 'none' }}
                      value={darkMode ? ['dark'] : ['light']}
                      onToggle={({ value }) =>
                        setDarkMode(value === 'light' ? false : true)
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
                  <Anchor
                    as={Link}
                    to="/sticker-sheet"
                    label="View sticker sheet"
                    icon={<LinkNext />}
                    reverse
                  />
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
