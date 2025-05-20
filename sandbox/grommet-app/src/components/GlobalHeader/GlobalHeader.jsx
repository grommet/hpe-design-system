import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
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
  DropButton,
  TextInput,
  ToggleGroup,
  ResponsiveContext,
} from 'grommet';
import {
  Search,
  User,
  Notification,
  Catalog,
  HelpOption,
  Menu,
  LinkNext,
} from 'grommet-icons';
import { Link } from 'react-router-dom';
import { themes } from '../../themes/theme';

export const GlobalHeader = ({
  darkMode,
  setDarkMode,
  setActiveTheme,
  activeTheme,
  backgroundBack,
  setBackgroundBack,
  ...rest
}) => {
  const theme = useContext(ThemeContext);
  const breakpoint = useContext(ResponsiveContext);
  return (
    <Page kind="full" {...rest}>
      <PageContent pad="none">
        <Box
          direction="row"
          justify="between"
          align="center"
          background={
            activeTheme === 'v1'
              ? 'background-primary-xstrong'
              : 'background-front'
          }
          elevation={activeTheme !== 'v0' ? 'none' : 'small'}
          pad={{ horizontal: 'xsmall', vertical: 'small' }}
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
                    activeTheme !== 'v1' && !theme.dark ? 'pos' : 'rev'
                  }_rgb.svg`}
                  fit="contain"
                  alt="HPE GreenLake badge"
                />
              </Box>
            </Link>
            {!['xsmall', 'small'].includes(breakpoint) ? (
              <Box width={breakpoint === 'medium' ? 'medium' : 'large'}>
                <TextInput
                  icon={<Search id="global-header-search" />}
                  placeholder="Type / to search assets, services, and more"
                  aria-labelledby="global-header-search"
                />
              </Box>
            ) : undefined}
          </Box>
          <Box direction="row" gap="xsmall">
            <Button icon={<HelpOption />} />
            <Button icon={<Catalog />} />
            <Button icon={<Notification />} />
            <DropButton
              icon={<User />}
              dropContent={
                <Box
                  background={{
                    color: 'background-floating',
                    dark: theme.dark ? true : false,
                  }}
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
                  <FormField
                    label="Mode"
                    alignSelf="start"
                    htmlFor="theme-mode-toggle"
                    name="theme-mode-toggle"
                  >
                    <ToggleGroup
                      id="theme-mode-toggle"
                      name="theme-mode-toggle"
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
                  <FormField
                    label="Theme version"
                    help="Version numbers represent hpe-design-tokens versions. v1 is the updated theme as of February 2025. v0 is the previous theme."
                    htmlFor="theme-select__input"
                    name="theme-select"
                  >
                    <Select
                      id="theme-select"
                      name="theme-select"
                      options={Object.keys(themes).map(theme => theme)}
                      onChange={({ option }) => setActiveTheme(option)}
                      value={activeTheme}
                    />
                  </FormField>
                  <Anchor
                    alignSelf="start"
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
