import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Page,
  Data,
  PageContent,
  Grid,
  Box,
  Text,
  DataSearch,
  DataFilters,
  DataContext,
  DataSummary,
  Toolbar,
} from 'grommet';
import * as tokens from 'hpe-design-tokens/docs';
import { EmptyState } from '../components/EmptyState';
import { CircleInformation, LinkNext } from 'grommet-icons';
import { buildTokenTree } from '../build-token-tree';

const tree = buildTokenTree(tokens);

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
    hoverIndicator
    flex={false}
    {...rest}
  >
    <Box direction="row" gap="small" align="center" flex={false}>
      <Text weight={500} color="text-strong">
        {name}
      </Text>
      <Box
        background="background-contrast"
        round="xsmall"
        pad={{ horizontal: 'xsmall' }}
        flex={false}
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
  const usedBy = tree[mode][name].usedBy;

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
        value={showValue ? tree[mode][name]['$value'] : undefined}
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

const Visualizer = () => {
  const [selected, setSelected] = useState({});
  const [tokensArr, setTokensArr] = useState([]);

  useEffect(() => {
    const nextTokensArr = [];
    Object.keys(tree).forEach(mode => {
      Object.keys(tree[mode]).forEach(token =>
        nextTokensArr.push({
          name: token,
          mode: mode,
          ...tree[mode][token],
        }),
      );
      setTokensArr(nextTokensArr);
    });
  }, []);

  return (
    <Page kind="full" background="background-back">
      <Data
        data={tokensArr}
        properties={{
          mode: { label: 'Mode' },
          name: { filter: false },
          $type: { label: 'Type' },
        }}
      >
        <Grid columns={['medium', 'flex']}>
          <Box gap="small" pad="medium">
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
          <PageContent
            overflow="auto"
            flex={false}
            round={{ corner: 'left', size: 'xsmall' }}
            background="background-front"
            fill
          >
            <Box
              pad={{ vertical: 'medium' }}
              {...(!selected.name
                ? { align: 'center', justify: 'center', pad: 'xlarge' }
                : {})}
            >
              {selected.name ? (
                buildTree(selected, true)
              ) : (
                <EmptyState
                  icon={<CircleInformation color="icon-info" size="xxlarge" />}
                  title="No design token selected"
                  description="Select a design token from the list to see its dependencies."
                />
              )}
            </Box>
          </PageContent>
        </Grid>
      </Data>
    </Page>
  );
};

export { Visualizer };
