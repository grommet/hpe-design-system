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

const NavLayer = ({ children, onClose }) => {
  return (
    <Layer onEsc={onClose} full>
      <Box pad="medium" gap="small" overflow="auto">
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
    }),
    [data, setData, active, setActive, selectedMode, setSelectedMode, modes],
  );

  const navContent = (
    <Nav tokens={structuredTokens} active={active} setActive={setActive} />
  );

  const menuStyle = {
    flex: false,
    style: {
      position: 'sticky',
      top: theme.global.edgeSize.medium,
    },
    height: '130vh',
    background: 'background-contrast',
    pad: { horizontal: 'small', vertical: 'medium' },
    round: 'medium',
    width: 'small',
  };

  const activeCollection = active
    .split('.')
    .map(
      (part, index) =>
        `${part} ${index < active.split('.').length - 1 ? '/ ' : ''}`,
    );

  return (
    <DesignTokenContext.Provider value={contextValue}>
      <Page kind="full">
        <Box direction="row" gap="large">
          {['large', 'xlarge'].includes(breakpoint) ? (
            <Box {...menuStyle}>{navContent}</Box>
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
                  {activeCollection}
                </Heading>
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
          {openLayer && (
            <NavLayer onClose={() => setOpenLayer(false)}>
              {navContent}
            </NavLayer>
          )}
        </Box>
      </Page>
    </DesignTokenContext.Provider>
  );
};

export default AllTokens;
