import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Grommet,
  Page,
  Data,
  PageContent,
  Header,
  Grid,
  Button,
  Box,
  Text,
  DataSearch,
  DataFilters,
  DataContext,
  DataSummary,
  Toolbar,
} from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import tokens from 'design-tokens/tree';
import { Github, LinkNext, Moon, Sun } from 'grommet-icons';

const tokensArr = [];
Object.keys(tokens).forEach(mode => {
  Object.keys(tokens[mode]).forEach(token =>
    tokensArr.push({
      name: token,
      mode: mode,
      ...tokens[mode][token],
    }),
  );
});

const StyledBox = styled(Box)`
  &:focus:not(:focus-visible) {
    box-shadow: none;
  }
`;

const TokenValue = ({ value }) => {
  let content;
  if (typeof value === 'string' || typeof value === 'number') content = value;
  if (Array.isArray(value)) content = `[${value.join(', ')}]`;

  return <Text size="small">{content}</Text>;
};
const Tag = ({ name, badge, value, ...rest }) => (
  <StyledBox
    gap="xsmall"
    pad={{ horizontal: 'small', vertical: 'xsmall' }}
    border
    round="xsmall"
    flex={false}
    {...rest}
  >
    <Box direction="row" gap="small" align="center">
      <Text weight={500} color="text-strong">
        {name}
      </Text>
      <Box
        background="background-contrast"
        round="xsmall"
        pad={{ horizontal: 'xsmall' }}
      >
        <Text size="small" weight={500}>
          {badge}
        </Text>
      </Box>
    </Box>
    {value ? <TokenValue value={value} /> : undefined}
  </StyledBox>
);

const FilteredTokens = ({ selected, setSelected }) => {
  const { data } = useContext(DataContext);

  return (
    <Box
      align="start"
      gap="xsmall"
      overflow="auto"
      style={{ height: 'calc(100vh - 196px)' }}
    >
      {data.map(token => (
        <Tag
          key={`${token.name}-${token.mode}`}
          badge={token.mode}
          name={token.name}
          onClick={() =>
            selected.name === token.name && selected.mode === token.mode
              ? setSelected({})
              : setSelected({ name: token.name, mode: token.mode })
          }
          active={selected.name === token.name && selected.mode === token.mode}
        />
      ))}
    </Box>
  );
};

const buildTree = (selectedToken, showValue) => {
  const { mode, name } = selectedToken;
  const usedBy = tokens[mode][name].usedBy;
  return (
    <Box
      key={`${name}-${mode}`}
      direction="row"
      gap="small"
      align="start"
      flex={false}
    >
      <Tag
        name={name}
        badge={mode}
        value={showValue ? tokens[mode][name]['$value'] : undefined}
      />
      {usedBy?.length ? (
        <Box direction="row" gap="small" align="start" flex={false}>
          <Box pad={{ vertical: 'xsmall' }}>
            <LinkNext height="medium" />
          </Box>
          <Box gap="small">{usedBy?.map(t => buildTree(t))}</Box>
        </Box>
      ) : undefined}
    </Box>
  );
};

function App() {
  const [selected, setSelected] = useState({});
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || false,
  );
  useEffect(() => {
    if (darkMode) localStorage.setItem('darkMode', 'true');
    else localStorage.setItem('darkMode', 'false');
  }, [darkMode]);

  return (
    <Grommet
      background="background-back"
      theme={hpe}
      themeMode={darkMode ? 'dark' : 'light'}
      full="min"
    >
      <Header
        background="background-front"
        pad={{ vertical: 'small', horizontal: 'medium' }}
        border={{ side: 'bottom', color: 'border-weak' }}
      >
        <Text weight={500} color="text-strong">
          Design Token Visualizer
        </Text>
        <Box direction="row" gap="xsmall">
          <Button
            icon={<Github />}
            href="https://github.com/grommet/hpe-design-system/tree/design-tokens/design-tokens/tokens"
            target="_blank"
            rel="noopener noreferrer"
            tip="View tokens in Github"
          />
          <Button
            icon={darkMode ? <Moon /> : <Sun />}
            onClick={() => setDarkMode(!darkMode)}
            tip={`Swith to ${darkMode ? 'light' : 'dark'} mode`}
          />
        </Box>
      </Header>
      <Page kind="full">
        <Data
          data={tokensArr}
          properties={{
            mode: { label: 'Mode' },
            name: { filter: false },
            $type: { label: 'Type' },
          }}
        >
          <Grid columns={['medium', 'flex']}>
            <Box gap="small" pad="medium" background="background-front">
              <Box>
                <Toolbar>
                  <Box flex>
                    <DataSearch />
                  </Box>
                  <DataFilters drop />
                </Toolbar>
                <DataSummary />
              </Box>
              <FilteredTokens selected={selected} setSelected={setSelected} />
            </Box>
            <PageContent overflow="auto" flex={false} fill>
              <Box pad={{ vertical: 'medium' }}>
                {selected.name
                  ? buildTree(selected, true)
                  : 'Select a token to see dependencies.'}
              </Box>
            </PageContent>
          </Grid>
        </Data>
      </Page>
    </Grommet>
  );
}

export default App;
