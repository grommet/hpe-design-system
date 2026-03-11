/* eslint-disable react/prop-types */
import React, { useEffect, useContext, useState, useMemo } from 'react';
import {
  Page,
  Heading,
  PageContent,
  Button,
  Box,
  Collapsible,
  Layer,
  Notification,
  ResponsiveContext,
  Text,
  Anchor,
} from 'grommet';
import { Close, Folder, Menu } from '@hpe-design/icons-grommet';
import { ThemeContext } from 'styled-components';
import { SelectorGroup, Selector } from '@shared/aries-core';
import {
  structuredTokens,
  DesignTokenContext,
  DesignTokensTable,
  useDesignTokens,
} from '../../components';

const FLAVORS = [
  {
    value: 'hpe',
    title: 'HPE Design Tokens',
    subtitle: 'Available via hpe-design-tokens package',
  },
  {
    value: 'grommet',
    title: 'Tokens for Grommet Theme HPE',
    subtitle: 'Available via grommet-theme-hpe',
  },
  {
    value: 'figma',
    title: 'Tokens for Figma',
    subtitle: 'Available via Figma variables',
  },
];

const FLAVOR_MESSAGES = {
  hpe: {
    message:
      // eslint-disable-next-line max-len
      'These are the design tokens available via the hpe-design-tokens package. Use this view when you need the base values that all other deliveries are based from.',
  },
  grommet: {
    message: (
      <Text>
        These tokens represent how the base values are implemented in the
        grommet-theme-hpe package. Grommet already includes many foundational
        tokens out of the box, so this view provides only the tokens necessary
        to build layouts that follow the HPE theme. Visit{' '}
        <Anchor href="/design-tokens/using-design-tokens-in-code">
          Using tokens in Grommet
        </Anchor>{' '}
        for more information.
      </Text>
    ),
  },
  figma: {
    message: (
      <Text>
        These tokens represent how the base values are implemented in Figma
        variables. Figma libraries already include many foundational tokens out
        of the box, so this view provides only the tokens necessary to build
        layouts that follow the HPE theme. Visit{' '}
        <Anchor href="/design-tokens/using-design-tokens-in-figma">
          Using design tokens in Figma
        </Anchor>{' '}
        for more information.
      </Text>
    ),
  },
};

const NavSection = ({ active, collection, setActive, tokens: tokensObj }) => {
  const activeParts = active.split('.');
  const [open, setOpen] = useState(
    activeParts[activeParts.length - 1] in structuredTokens[collection],
  );

  return (
    <Box flex={false} gap="5xsmall">
      <Button
        icon={<Folder aria-hidden="true" />}
        a11yTitle={`${collection} token directory`}
        justify="start"
        align="start"
        label={collection}
        onClick={() => {
          if (open) setOpen('');
          else setOpen(collection);
        }}
      />
      <Collapsible open={open}>
        <Box pad={{ left: 'medium' }} flex={false} gap="hair">
          {Object.keys(tokensObj[collection])
            .sort()
            .map(category => (
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

const NavPane = ({ children, ...rest }) => {
  return (
    <Box
      background="background-contrast"
      pad={{ left: 'xsmall', right: 'xlarge', vertical: 'medium' }}
      round="xlarge"
      {...rest}
    >
      {children}
    </Box>
  );
};

const NavLayer = ({ children, onClose }) => {
  return (
    <Layer onEsc={onClose} full>
      <Box pad="medium" gap="xsmall" overflow="auto">
        <Button
          icon={<Close />}
          a11yTitle="Close design token navigation."
          alignSelf="end"
          onClick={onClose}
        />
        {children}
      </Box>
    </Layer>
  );
};

const AllTokens = () => {
  const [openLayer, setOpenLayer] = useState(false);
  const breakpoint = useContext(ResponsiveContext);
  const theme = useContext(ThemeContext);
  const {
    data,
    setData,
    active,
    setActive,
    selectedMode,
    setSelectedMode,
    modes,
    flavor,
    setFlavor,
    syntax,
    setSyntax,
  } = useDesignTokens('semantic.color');

  useEffect(() => {
    if (openLayer && ['large', 'xlarge'].includes(breakpoint))
      setOpenLayer(false);
  }, [breakpoint, openLayer]);

  const contextValue = useMemo(
    () => ({
      data,
      setData,
      active,
      setActive,
      selectedMode,
      setSelectedMode,
      modes,
      flavor,
      setFlavor,
      syntax,
      setSyntax,
    }),
    [
      data,
      setData,
      active,
      setActive,
      selectedMode,
      setSelectedMode,
      modes,
      flavor,
      setFlavor,
      syntax,
      setSyntax,
    ],
  );

  const onActive = value => {
    setActive(value);
    if (openLayer) setOpenLayer(false);
  };

  const navContent = (
    <Nav tokens={structuredTokens} active={active} setActive={onActive} />
  );

  const activeCollection = active
    .split('.')
    .map(
      (part, index) =>
        `${part} ${index < active.split('.').length - 1 ? '/ ' : ''}`,
    );

  return (
    <DesignTokenContext.Provider value={contextValue}>
      <Page>
        <PageContent pad="none" alignSelf="start">
          {/* Flavor selector */}
          <Box pad={{ bottom: 'medium' }}>
            <SelectorGroup
              a11yTitle="Select token flavor"
              value={flavor}
              onSelect={({ value: nextFlavor }) => setFlavor(nextFlavor)}
              layout="fit"
            >
              {FLAVORS.map(f => (
                <Selector
                  key={f.value}
                  value={f.value}
                  indicator={false}
                  pad="small"
                >
                  <Box>
                    <Text weight="bold" size="small">
                      {f.title}
                    </Text>
                    <Text size="xsmall" color="text-weak">
                      {f.subtitle}
                    </Text>
                  </Box>
                </Selector>
              ))}
            </SelectorGroup>
          </Box>
          {/* Flavor info message */}
          <Notification
            status="info"
            message={FLAVOR_MESSAGES[flavor]?.message}
            margin={{ bottom: 'medium' }}
          />
          <Box direction="row" gap="xlarge">
            {['large', 'xlarge'].includes(breakpoint) ? (
              <Box
                flex="grow"
                style={{
                  position: 'sticky',
                  top: theme.global.edgeSize.medium,
                }}
                height="100vh"
              >
                <NavPane overflow="auto">{navContent}</NavPane>
              </Box>
            ) : undefined}
            <Box flex="grow">
              <Box pad="medium" round="xlarge" background="background-front">
                <Box direction="row" align="center" gap="xsmall">
                  {!['large', 'xlarge'].includes(breakpoint) ? (
                    <Button
                      icon={<Menu />}
                      a11yTitle="Open design tokens menu"
                      margin={{ top: '3xsmall' }}
                      onClick={() => setOpenLayer(true)}
                    />
                  ) : undefined}
                  <Heading level={2} margin="none" id="token-table-heading">
                    {activeCollection}
                  </Heading>
                </Box>
                {/* eslint-disable-next-line no-nested-ternary */}
                {active.includes('base') ? (
                  <Notification
                    status="warning"
                    message={`Base tokens should never be used directly. 
                Semantic or component tokens should be used instead. 
                These are here purely for documentation.`}
                    margin={{ top: 'xsmall' }}
                  />
                ) : active.includes('static') ? (
                  <Notification
                    status="info"
                    message={`Static tokens should never be used to compose 
                    layouts; use semantic tokens instead. Static tokens may
                    be used for custom "elements" when element tokens 
                    don't suffice.`}
                    margin={{ top: 'xsmall' }}
                    actions={[
                      {
                        label: 'Learn about element tokens',
                        href: '/design-tokens/element',
                      },
                    ]}
                  />
                ) : undefined}
                <DesignTokensTable
                  active={active}
                  data={data}
                  maxHeight={false}
                  toolbar
                />
              </Box>
            </Box>
          </Box>
        </PageContent>
        {openLayer && (
          <NavLayer onClose={() => setOpenLayer(false)}>{navContent}</NavLayer>
        )}
      </Page>
    </DesignTokenContext.Provider>
  );
};

export default AllTokens;
