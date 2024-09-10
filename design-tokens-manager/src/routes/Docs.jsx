import { useEffect, useState } from 'react';
import {
  Toolbar,
  DataSearch,
  Page,
  Heading,
  PageContent,
  Button,
  Box,
  Data,
  Text,
  DataTable,
  DataSummary,
  Collapsible,
  FormField,
  Select,
} from 'grommet';
import { Folder } from 'grommet-icons';
import * as tokens from 'hpe-design-tokens/docs';

const structuredTokens = {
  primitive: {},
  semantic: {},
  component: {},
};

Object.keys(tokens).forEach(mode => {
  // base, component, light, dark, etc.
  Object.keys(tokens[mode]).forEach(token => {
    const currentToken = tokens[mode][token];

    const parts = token.split('.');
    const category = parts[1];
    let level;
    if (mode === 'base') level = 'primitive';
    else if (mode === 'components') level = 'component';
    else level = 'semantic';

    if (!(category in structuredTokens[level]))
      structuredTokens[level][category] = {};
    if (!(token in structuredTokens[level][category]))
      structuredTokens[level][category][token] = {};
    if (!('modes' in structuredTokens[level][category][token]))
      structuredTokens[level][category][token].modes = {};

    if (level === 'semantic' && mode !== 'global') {
      structuredTokens[level][category][token].modes[mode] = currentToken;
    } else
      structuredTokens[level][category][token].modes.default = currentToken;
  });
});

const NavSection = ({ active, collection, setActive, tokens }) => {
  const activeParts = active.split('.');
  const [open, setOpen] = useState(
    activeParts[activeParts.length - 1] in structuredTokens[collection]
      ? true
      : false,
  );

  return (
    <Box flex={false}>
      <Button
        icon={<Folder />}
        justify="start"
        align="start"
        label={collection}
        onClick={() => setOpen(!open)}
      />
      <Collapsible open={open}>
        <Box pad={{ left: 'medium' }} flex={false}>
          {Object.keys(tokens[collection]).map(category => (
            <Button
              key={category}
              align="start"
              label={category}
              active={active === `${collection}.${category}`}
              onClick={() => setActive(`${collection}.${category}`)}
            />
          ))}
        </Box>
      </Collapsible>
    </Box>
  );
};
const Nav = ({ active, setActive, tokens }) => {
  return Object.keys(tokens).map(collection => (
    <NavSection
      key={collection}
      tokens={tokens}
      collection={collection}
      active={active}
      setActive={setActive}
    />
  ));
};

const ColorPreview = ({ datum }) => (
  <Box
    pad="medium"
    round="xsmall"
    flex={false}
    background={datum.value}
    border={{ color: 'border-weak' }}
  />
);

const DimensionPreview = ({ datum }) =>
  parseInt(datum.value, 10) <= 200 ? (
    <Box
      round="xsmall"
      flex={false}
      background="brand"
      width={datum.value}
      height={datum.token.includes('icon') ? datum.value : '36px'}
    />
  ) : (
    '--'
  );

const RadiusPreview = ({ datum }) => (
  <Box pad="medium" round={datum.value} flex={false} background="brand" />
);

const BorderPreview = ({ datum }) => (
  <Box
    height="72px"
    width="144px"
    round="xsmall"
    border={{ size: datum.value }}
    flex={false}
  />
);

const WeightPreview = ({ datum }) => (
  <Text size="xlarge" weight={datum.value}>
    Aa
  </Text>
);

const TextPreview = ({ datum }) => <Text size={datum.value}>Hello world</Text>;

const getTokens = (tokens, mode) =>
  Object.keys(tokens).map(key => {
    return {
      id: key,
      token: key,
      type: tokens[key]?.modes[mode]?.$type,
      description: tokens[key]?.modes[mode]?.comment,
      value: tokens[key]?.modes[mode].value,
    };
  });

const Docs = () => {
  const [active, setActive] = useState('primitive.base');
  const [data, setData] = useState([]);
  const [modes, setModes] = useState([]);
  const [selectedMode, setSelectedMode] = useState('');

  useEffect(() => {
    const keyPath = active.split('.');

    let res = structuredTokens;
    keyPath.forEach(key => {
      res = res[key];
    });

    const modes = Object.keys(Object.values(res)[0].modes).map(mode => mode);
    let nextMode;
    if (modes.includes('light')) nextMode = 'light';
    else if (modes.includes('large')) nextMode = 'large';
    else nextMode = modes[0];

    const nextData = getTokens(res, nextMode);

    setData(nextData);
    setModes(modes);
    setSelectedMode(nextMode);
  }, [active]);

  return (
    <Page kind="full">
      <Box direction="row">
        <Box
          width="medium"
          pad="medium"
          background="background-front"
          flex={false}
          style={{ position: 'sticky', top: 0, bottom: 0 }}
          height="100vh"
          overflow="auto"
        >
          <Nav
            tokens={structuredTokens}
            active={active}
            setActive={setActive}
          />
        </Box>
        <PageContent>
          <Box
            pad="medium"
            round="medium"
            background="background-front"
            margin={{ vertical: 'medium' }}
          >
            <Heading margin="none">
              {active
                .split('.')
                .map(
                  (part, index) =>
                    `${part} ${
                      index < active.split('.').length - 1 ? '/ ' : ''
                    }`,
                )}
            </Heading>
            <Data data={data} pad={{ vertical: 'medium' }}>
              <Toolbar align="end">
                <DataSearch />
                {modes.length > 1 ? (
                  <FormField
                    label="Mode"
                    contentProps={{ margin: { bottom: 'none', top: 'xsmall' } }}
                  >
                    <Select
                      options={modes}
                      value={selectedMode}
                      onChange={({ option }) => {
                        const keyPath = active.split('.');

                        let res = structuredTokens;
                        keyPath.forEach(key => {
                          res = res[key];
                        });
                        setData(getTokens(res, option));
                        setSelectedMode(option);
                      }}
                    />
                  </FormField>
                ) : undefined}
              </Toolbar>
              <DataSummary />
              <Box overflow={{ horizontal: 'auto' }}>
                <DataTable
                  verticalAlign="top"
                  primaryKey="token"
                  columns={[
                    {
                      property: 'id',
                      header: 'Preview',
                      render: datum => {
                        if (datum.type === 'color')
                          return <ColorPreview datum={datum} />;

                        if (
                          datum.token.includes('size') ||
                          datum.token.includes('dimension') ||
                          datum.token.includes('spacing') ||
                          datum.token.includes('gap')
                        )
                          return <DimensionPreview datum={datum} />;
                        if (
                          datum.token.includes('radius') ||
                          datum.token.includes('borderRadius')
                        )
                          return <RadiusPreview datum={datum} />;
                        if (datum.token.includes('border'))
                          return <BorderPreview datum={datum} />;
                        if (
                          datum.token.includes('weight') ||
                          datum.token.includes('fontWeight')
                        )
                          return <WeightPreview datum={datum} />;
                        if (
                          (datum.token.includes('font') &&
                            datum.token.includes('size')) ||
                          datum.token.includes('fontSize')
                        )
                          return <TextPreview datum={datum} />;
                        else return '--';
                      },
                      size: 'auto',
                    },
                    {
                      property: 'token',
                      header: 'Token',
                      render: datum => (
                        <Box direction="row">
                          <Box
                            background="background-contrast"
                            pad="xsmall"
                            round="xsmall"
                            style={{ fontFamily: 'Menlo' }}
                          >
                            <Text size="xsmall">{datum.token}</Text>
                          </Box>
                          {/* <Button icon={<Copy />} size="small" /> */}
                        </Box>
                      ),
                      //   size: 'small',
                    },
                    {
                      property: 'description',
                      header: 'Description',
                      size: 'medium',
                      render: datum => (
                        <Text>
                          {datum.description ? datum.description : '--'}
                        </Text>
                      ),
                    },
                    {
                      property: 'value',
                      header: 'Output value',
                    },
                  ]}
                />
              </Box>
            </Data>
          </Box>
        </PageContent>
      </Box>
    </Page>
  );
};

export { Docs };
