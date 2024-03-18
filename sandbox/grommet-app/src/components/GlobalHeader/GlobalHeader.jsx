import { useContext, useMemo } from 'react';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  CheckBox,
  Image,
  FormField,
  Select,
  Page,
  PageContent,
  Text,
} from 'grommet';
import { Moon, Sun } from 'grommet-icons';

export const GlobalHeader = ({
  darkMode,
  setDarkMode,
  setActiveTheme,
  activeTheme,
  backgroundBack,
  setBackgroundBack,
}) => {
  const theme = useContext(ThemeContext);

  const boxProps = useMemo(
    () =>
      window.location.pathname !== '/'
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
    [],
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
              options={['Acme Production']}
              value="Acme Production"
              valueLabel={label => (
                <Box {...theme.global.input} pad={theme.global.input.padding}>
                  <Text color="text-strong">{label}</Text>
                </Box>
              )}
              plain
            />
          </Box>
          <Box align="end" direction="row" gap="small">
            <FormField
              // label="Theme"
              contentProps={{
                margin: { bottom: 'none', top: 'none' },
                width: 'small',
              }}
            >
              <Select
                options={['Current theme', 'Warm theme']}
                value={activeTheme}
                onChange={({ value }) => setActiveTheme(value)}
              />
            </FormField>
            <FormField
              // label="Background style"
              contentProps={{ margin: { bottom: 'none', top: 'none' } }}
            >
              <CheckBox
                label="background-back"
                toggle
                onChange={event => setBackgroundBack(event.target.checked)}
                checked={backgroundBack}
              />
            </FormField>
            <Button
              icon={darkMode ? <Moon /> : <Sun />}
              onClick={() => setDarkMode(!darkMode)}
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
};
