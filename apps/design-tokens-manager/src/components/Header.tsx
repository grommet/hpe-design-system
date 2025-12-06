import { Link } from 'react-router-dom';
import { Header as GrommetHeader, Button, Box, Text } from 'grommet';
import { Element, Moon, Sun } from '@hpe-design/icons-grommet';

export const Header = ({
  setDarkMode,
  darkMode,
}: {
  setDarkMode: (nextMode: boolean) => boolean;
  darkMode: boolean;
}) => {
  return (
    <GrommetHeader pad={{ vertical: 'small', horizontal: 'medium' }}>
      <Button as={Link} {...{ to: '/' }}>
        <Box direction="row" gap="xsmall">
          <Element height="medium" color="brand" />
          <Text weight={500} color="text-strong">
            HPE Design Tokens Manager
          </Text>
        </Box>
      </Button>
      <Box direction="row" gap="xsmall">
        {/* <Button as={Link} to="/visualizer" label="Token Visualizer" /> */}
        {/* <Button as={Link} {...{ to: '/scaler' }} label="Scale generator" /> */}
        {/* <Button as={Link} to="/builder" label="Token builder" /> */}
        {/* <Button
          icon={<Github />}
          href="https://github.com/grommet/hpe-design-system/tree/design-tokens-alpha/design-tokens/tokens"
          target="_blank"
          rel="noopener noreferrer"
          tip="View tokens in Github"
        /> */}
        <Button
          icon={darkMode ? <Moon /> : <Sun />}
          onClick={() => setDarkMode(!darkMode)}
          tip={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
        />
      </Box>
    </GrommetHeader>
  );
};
