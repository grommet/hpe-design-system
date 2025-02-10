/* eslint-disable react/prop-types */
import { useEffect, useContext, useState } from 'react';
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
  Layer,
  Select,
  Notification,
  ResponsiveContext,
} from 'grommet';
import { Close, Folder, Menu } from 'grommet-icons';
import { ThemeContext } from 'styled-components';
// eslint-disable-next-line import/no-unresolved
import * as tokens from 'hpe-design-tokens/docs';

const structuredTokens = {
  primitive: {},
  semantic: {},
  component: {},
};

Object.keys(tokens).forEach(mode => {
  // primitives, component, light, dark, etc.
  Object.keys(tokens[mode]).forEach(token => {
    const currentToken = tokens[mode][token];

    const parts = token.split('.');
    const category = parts[1];
    let level;
    if (mode === 'primitives') level = 'primitive';
    else if (mode === 'components') level = 'component';
    else level = 'semantic';

    if (!(category in structuredTokens[level]))
      structuredTokens[level][category] = {};
    if (!(token in structuredTokens[level][category]))
      structuredTokens[level][category][token] = {};
    if (!('modes' in structuredTokens[level][category][token]))
      structuredTokens[level][category][token].modes = {};

    if (level === 'semantic' && mode !== 'global' && mode !== 'dimension') {
      structuredTokens[level][category][token].modes[mode] = currentToken;
    } else
      structuredTokens[level][category][token].modes.default = currentToken;
  });
});

const NavSection = ({ active, collection, setActive, tokens: tokensObj }) => {
  const activeParts = active.split('.');
  const [open, setOpen] = useState(
    activeParts[activeParts.length - 1] in structuredTokens[collection],
  );

  return (
    <Box flex={false}>
      <Button
        icon={<Folder aria-hidden="true" />}
        a11yTitle={`${collection} token directory`}
        justify="start"
        align="start"
        label={collection}
        onClick={() => setOpen(!open)}
      />
      <Collapsible open={open}>
        <Box pad={{ left: 'medium' }} flex={false}>
          {Object.keys(tokensObj[collection]).map(category => (
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
const Nav = ({ active, setActive, tokens: tokensObj }) => {
  return Object.keys(tokensObj).map(collection => (
    <NavSection
      key={collection}
      tokens={tokensObj}
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

const getTokens = (tokenObj, mode) =>
  Object.keys(tokenObj).map(key => {
    return {
      id: key,
      token: key,
      type: tokenObj[key]?.modes[mode]?.$type,
      description: tokenObj[key]?.modes[mode]?.$description,
      value: tokenObj[key]?.modes[mode].$value,
    };
  });

const AllTokens = () => {
  const [active, setActive] = useState('semantic.color');
  const [data, setData] = useState([]);
  const [modes, setModes] = useState([]);
  const [selectedMode, setSelectedMode] = useState('');
  const [openLayer, setOpenLayer] = useState(false);
  const breakpoint = useContext(ResponsiveContext);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    const keyPath = active.split('.');

    let res = structuredTokens;
    keyPath.forEach(key => {
      res = res[key];
    });

    const nextModes = Object.keys(Object.values(res)[0].modes).map(
      mode => mode,
    );
    let nextMode;
    if (nextModes.includes('light')) nextMode = 'light';
    else if (nextModes.includes('large')) nextMode = 'large';
    else [nextMode] = nextModes;

    const nextData = getTokens(res, nextMode);

    setData(nextData);
    setModes(nextModes);
    setSelectedMode(nextMode);
  }, [active]);

  useEffect(() => {
    if (openLayer && ['large', 'xlarge'].includes(breakpoint))
      setOpenLayer(false);
  }, [breakpoint, openLayer]);

  const navContent = (
    <Nav tokens={structuredTokens} active={active} setActive={setActive} />
  );

  return (
    <Page kind="full">
      <Box direction="row" gap="large">
        {['large', 'xlarge'].includes(breakpoint) ? (
          <Box
            width="medium"
            pad="medium"
            border={{ color: 'border-weak' }}
            round="medium"
            flex={false}
            style={{
              position: 'sticky',
              top: theme.global.edgeSize.medium,
              bottom: 0,
            }}
            height="100vh"
            overflow="auto"
          >
            {navContent}
          </Box>
        ) : undefined}
        <PageContent pad="none">
          <Box pad="medium" round="medium" background="background-front">
            <Box direction="row" align="center" gap="small">
              {!['large', 'xlarge'].includes(breakpoint) ? (
                <Button
                  icon={<Menu />}
                  a11yTitle="Open design tokens menu"
                  margin={{ top: 'xsmall' }}
                  onClick={() => setOpenLayer(true)}
                />
              ) : undefined}
              <Heading level={2} margin="none" id="token-table-heading">
                {active
                  .split('.')
                  .map(
                    (part, index) =>
                      `${part} ${
                        index < active.split('.').length - 1 ? '/ ' : ''
                      }`,
                  )}
              </Heading>
              {openLayer ? (
                <Layer onEsc={() => setOpenLayer(false)} full>
                  <Box pad="medium" gap="small" overflow="auto">
                    <Button
                      icon={<Close />}
                      a11yTitle="Close design token navigation."
                      alignSelf="end"
                      onClick={() => setOpenLayer(false)}
                    />
                    {navContent}
                  </Box>
                </Layer>
              ) : undefined}
            </Box>
            {active.includes('primitive') ? (
              <Notification
                status="warning"
                message={`Primitive tokens should never be used directly. 
                Semantic or component tokens should be used instead. 
                These are here purely for documentation.`}
                margin={{ top: 'small' }}
              />
            ) : undefined}
            <Data data={data} pad={{ vertical: 'medium' }}>
              <Toolbar align="end">
                <DataSearch />
                {modes.length > 1 ? (
                  // eslint-disable-next-line grommet/formfield-htmlfor-id
                  <FormField
                    label="Mode"
                    contentProps={{ margin: { bottom: 'none', top: 'xsmall' } }}
                    htmlFor="mode-select__input"
                    name="mode-select"
                  >
                    <Select
                      name="mode-select"
                      id="mode-select"
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
                  aria-describedby="token-table-heading"
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
                        return '--';
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

export default AllTokens;
