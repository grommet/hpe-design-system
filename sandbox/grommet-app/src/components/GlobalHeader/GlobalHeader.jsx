import { useContext, useMemo, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import {
  Box,
  Heading,
  CheckBox,
  Image,
  FormField,
  Select,
  Page,
  PageContent,
  Text,
  DropButton,
} from 'grommet';
import { Down, User } from 'grommet-icons';
import { base } from 'design-tokens';
import { ToggleGroup } from '../ToggleGroup/ToggleGroup';

const StyledDown = styled(Down)`
  transition: all ${base.motion.duration.short[3]}
    ${base.motion.easing.simple.decelerate};
  transform: ${props => (props.open ? 'rotate(180deg)' : 'rotate(0deg)')};
  transform-origin: center;
`;

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
    <Page kind={window.location.pathname === '/' ? 'full' : 'wide'}>
      <PageContent pad="none">
        <Box
          direction="row"
          justify="between"
          align="center"
          background="background-front"
          pad={{ horizontal: 'medium', vertical: 'small' }}
          {...boxProps}
        >
          <Box direction="row" gap="medium">
            <Box height="32px" width="90px" align="start">
              <Image
                src={`/hpe_greenlake_grn_${darkMode ? 'rev' : 'pos'}_rgb.svg`}
                fit="contain"
              />
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
              plain
            />
          </Box>
          <DropButton
            icon={<User />}
            dropContent={
              <Box pad="medium" gap="medium" width="medium">
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
                  <ToggleGroup
                    options={[
                      { label: 'Current', value: 'current' },
                      { label: 'Warm', value: 'warm' },
                    ]}
                    border={{ size: 'none' }}
                    value={activeTheme === 'Warm theme' ? 'warm' : 'current'}
                    onChange={e =>
                      setActiveTheme(
                        e.target.value === 'warm'
                          ? 'Warm theme'
                          : 'Current theme',
                      )
                    }
                  />
                </FormField>
              </Box>
            }
            dropAlign={{ top: 'bottom', right: 'right' }}
          />
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
