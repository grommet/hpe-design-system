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
} from 'grommet';
import { Close, Folder, Menu } from 'grommet-icons';
import { ThemeContext } from 'styled-components';
import {
  structuredTokens,
  DesignTokenContext,
  DesignTokensTable,
  useDesignTokens,
} from '../../components';

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
  } = useDesignTokens('semantic.color');

  useEffect(() => {
    if (openLayer && ['large', 'xlarge'].includes(breakpoint))
      setOpenLayer(false);
  }, [breakpoint, openLayer]);

  const navContent = (
    <Nav tokens={structuredTokens} active={active} setActive={setActive} />
  );

  const contextValue = useMemo(
    () => ({
      data,
      setData,
      active,
      setActive,
      selectedMode,
      setSelectedMode,
      modes,
    }),
    [data, setData, active, setActive, selectedMode, setSelectedMode, modes],
  );

  return (
    <DesignTokenContext.Provider value={contextValue}>
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
              <DesignTokensTable
                active={active}
                data={data}
                maxHeight={false}
                toolbar
              />
            </Box>
          </PageContent>
        </Box>
      </Page>
    </DesignTokenContext.Provider>
  );
};

export default AllTokens;
