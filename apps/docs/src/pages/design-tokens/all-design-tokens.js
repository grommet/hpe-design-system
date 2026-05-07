/* eslint-disable react/prop-types */
import React, { useEffect, useContext, useState, useMemo, useRef } from 'react';
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
  ToggleGroup,
} from 'grommet';
import { Close, Folder, Menu, StatusWarning } from '@hpe-design/icons-grommet';
import { useRouter } from 'next/router';
import { ThemeContext } from 'styled-components';
import {
  getDefaultActiveTokenPath,
  getTokens,
  structuredTokens,
  DesignTokenContext,
  DesignTokensTable,
  grommetThemeHpeHeadingLabelMap,
  getGrommetThemeHpeDisplayToken,
  useDesignTokens,
} from '../../components';

const NavSection = ({ active, collection, setActive, tokens: tokensObj }) => {
  const activeParts = active.split('.');
  const [open, setOpen] = useState(
    activeParts[activeParts.length - 1] in (tokensObj[collection] || {}),
  );

  return (
    <Box flex={false} gap="5xsmall">
      <Button
        icon={<Folder aria-hidden="true" />}
        a11yTitle={`${collection} token directory`}
        justify="start"
        align="start"
        label={collection}
        onClick={() => setOpen(prevOpen => !prevOpen)}
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

const Nav = ({ active, setActive, tokens: tokensObj, activePrefix }) => {
  const activePath =
    activePrefix && active.startsWith(`${activePrefix}.`)
      ? active.slice(activePrefix.length + 1)
      : active;

  const preferredCollectionOrder = ['primitives', 'semantic', 'component'];
  const sortedCollections = Object.keys(tokensObj).sort((a, b) => {
    const aIndex = preferredCollectionOrder.indexOf(a);
    const bIndex = preferredCollectionOrder.indexOf(b);
    const normalizedAIndex = aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex;
    const normalizedBIndex = bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex;

    if (normalizedAIndex !== normalizedBIndex)
      return normalizedAIndex - normalizedBIndex;

    return a.localeCompare(b);
  });

  return sortedCollections.map(collection => (
    <NavSection
      key={collection}
      tokens={tokensObj}
      collection={collection}
      active={activePath}
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

const docsTokens = Object.fromEntries(
  Object.entries(structuredTokens).filter(
    ([collection]) =>
      collection !== 'grommetThemeHpe' &&
      collection !== 'figma' &&
      collection !== 'css',
  ),
);

const tokenTypeOrder = ['docs', 'css', 'grommetThemeHpe', 'figma'];

const tokenTypeLabels = {
  docs: 'HPE Design Tokens',
  css: 'CSS vars',
  grommetThemeHpe: 'Grommet',
  figma: 'Figma',
};

const tokenTypeOptions = tokenTypeOrder.map(type => ({
  label: tokenTypeLabels[type],
  value: type,
}));

const managedCollectionsBySource = {
  grommetThemeHpe: ['component', 'primitives'],
  figma: ['component', 'primitives'],
};

const managedCategoriesBySource = {
  grommetThemeHpe: ['focusIndicator', 'fontStack'],
  figma: ['focusIndicator'],
};

const isManagedCollectionForSource = (source, collection) =>
  managedCollectionsBySource[source]?.includes(collection);

const isManagedCategoryForSource = (source, category) =>
  managedCategoriesBySource[source]?.includes(category);

const getEmptyStateMessage = type => {
  if (type === 'grommetThemeHpe') return 'N/A. Handled by grommet-theme-hpe.';
  if (type === 'figma') return 'N/A. Handled by Figma library.';
  return '--';
};

const getTokensBySource = source => {
  if (source === 'grommetThemeHpe' || source === 'docs') return docsTokens;
  if (source === 'figma') return structuredTokens.figma ?? {};
  if (source === 'css') return structuredTokens.css ?? {};
  return docsTokens;
};

const getActivePrefix = source => {
  if (source === 'figma') return 'figma';
  if (source === 'css') return 'css';
  return '';
};

const getDefaultActivePath = tokensObj => {
  if (tokensObj.semantic?.color) return 'semantic.color';

  const [firstCollection] = Object.keys(tokensObj);
  if (!firstCollection) return '';

  const [firstCategory] = Object.keys(tokensObj[firstCollection] || {});
  if (!firstCategory) return '';

  return `${firstCollection}.${firstCategory}`;
};

const isActiveInTokens = (value, tokensObj, tokenSource) => {
  if (!value) return false;

  const activePrefix = getActivePrefix(tokenSource);
  let path =
    activePrefix && value.startsWith(`${activePrefix}.`)
      ? value.slice(activePrefix.length + 1)
      : value;

  if (path.startsWith('figma.') || path.startsWith('css.')) {
    path = path.split('.').slice(1).join('.');
  }

  const [collection, category] = path.split('.');
  return Boolean(tokensObj[collection]?.[category]);
};

const getPathWithoutPrefix = (value, tokenSource) => {
  if (!value) return '';

  const activePrefix = getActivePrefix(tokenSource);
  if (activePrefix && value.startsWith(`${activePrefix}.`)) {
    return value.slice(activePrefix.length + 1);
  }

  if (value.startsWith('figma.') || value.startsWith('css.')) {
    return value.split('.').slice(1).join('.');
  }

  return value;
};

const tokenTypesStorageKey = 'designTokens.tokenTypes';

const getSingleQueryValue = value => (Array.isArray(value) ? value[0] : value);

const normalizeLegacyTokenType = type =>
  type === 'hpeTheme' ? 'grommetThemeHpe' : type;

const normalizeTokenTypes = value => {
  if (!Array.isArray(value)) return ['docs'];

  const normalizedValue = value.map(normalizeLegacyTokenType);
  const next = tokenTypeOrder.filter(type => normalizedValue.includes(type));
  return next.length > 0 ? next : ['docs'];
};

const normalizeQuerySyncState = ({ token, tokenTypes, mode }) => {
  const normalizedToken = token || '';
  const normalizedMode = mode || '';
  const normalizedTokenTypes = tokenTypes
    ? normalizeTokenTypes(tokenTypes.split(',')).join(',')
    : '';

  return {
    token: normalizedToken,
    tokenTypes: normalizedTokenTypes,
    mode: normalizedMode,
  };
};

const toQuerySyncKey = ({ token, tokenTypes, mode }) =>
  `${token}|${tokenTypes}|${mode}`;

const getInitialTokenTypes = () => {
  if (typeof window === 'undefined') return ['docs'];

  const savedTokenTypes = window.localStorage.getItem(tokenTypesStorageKey);
  if (!savedTokenTypes) return ['docs'];

  try {
    return normalizeTokenTypes(JSON.parse(savedTokenTypes));
  } catch {
    return ['docs'];
  }
};

const AllTokens = () => {
  const router = useRouter();
  const [openLayer, setOpenLayer] = useState(false);
  const [selectedTokenTypes, setSelectedTokenTypes] =
    useState(getInitialTokenTypes);
  const [isUrlSyncReady, setIsUrlSyncReady] = useState(false);
  const pendingQuerySyncRef = useRef('');
  const breakpoint = useContext(ResponsiveContext);
  const theme = useContext(ThemeContext);
  const defaultActiveTokenPath = useMemo(
    () => getDefaultActiveTokenPath(),
    [],
  );
  const {
    data,
    setData,
    active,
    setActive,
    selectedMode,
    setSelectedMode,
    modes,
  } = useDesignTokens(defaultActiveTokenPath);

  const primaryTokenType = useMemo(
    () => tokenTypeOrder.find(type => selectedTokenTypes.includes(type)),
    [selectedTokenTypes],
  );
  const { isReady, pathname, query, replace } = router;
  const { mode: queryMode, token: queryToken, tokenTypes: queryTokenTypes } =
    query;
  const isDesktop = ['large', 'xlarge'].includes(breakpoint);

  useEffect(() => {
    if (openLayer && isDesktop) setOpenLayer(false);
  }, [isDesktop, openLayer]);

  const tokensBySource = useMemo(
    () => getTokensBySource(primaryTokenType),
    [primaryTokenType],
  );

  useEffect(() => {
    if (pendingQuerySyncRef.current) return;

    const activePrefix = getActivePrefix(primaryTokenType);
    const unprefixedActive = getPathWithoutPrefix(active, primaryTokenType);

    if (isActiveInTokens(active, tokensBySource, primaryTokenType)) {
      const normalizedActive = activePrefix
        ? `${activePrefix}.${unprefixedActive}`
        : unprefixedActive;

      if (normalizedActive !== active) setActive(normalizedActive);
      return;
    }

    const nextPath = getDefaultActivePath(tokensBySource);
    const nextActive = activePrefix ? `${activePrefix}.${nextPath}` : nextPath;
    setActive(nextActive);
  }, [active, setActive, tokensBySource, primaryTokenType]);

  useEffect(() => {
    window.localStorage.setItem(
      tokenTypesStorageKey,
      JSON.stringify(selectedTokenTypes),
    );
  }, [selectedTokenTypes]);

  const contextValue = useMemo(
    () => ({
      data,
      setData,
      active,
      setActive,
      selectedMode,
      setSelectedMode,
      modes,
      tokenSource: primaryTokenType,
    }),
    [
      data,
      setData,
      active,
      setActive,
      selectedMode,
      setSelectedMode,
      modes,
      primaryTokenType,
    ],
  );

  const onActive = value => {
    const activePrefix = getActivePrefix(primaryTokenType);
    setActive(activePrefix ? `${activePrefix}.${value}` : value);
    if (openLayer) setOpenLayer(false);
  };

  const activePrefix = getActivePrefix(primaryTokenType);

  const navContent = (
    <Nav
      tokens={tokensBySource}
      active={active}
      setActive={onActive}
      activePrefix={activePrefix}
    />
  );

  const displayActive = getPathWithoutPrefix(active, primaryTokenType);

  const activeParts = displayActive ? displayActive.split('.') : [];
  const activeCollectionLabel = activeParts.length > 1 ? activeParts[0] : '';
  const activeHeadingLabel =
    activeParts.length > 1
      ? activeParts.slice(1).join(' / ')
      : activeParts[0] || 'Design tokens';
  const activeCollectionKey = activeParts[0] || '';
  const activeCategoryKey = activeParts[1] || '';
  const displayHeadingLabel = selectedTokenTypes.includes('grommetThemeHpe')
    ? grommetThemeHpeHeadingLabelMap[activeCategoryKey] || activeHeadingLabel
    : activeHeadingLabel;
  const isSingleTokenTypeSelected = selectedTokenTypes.length === 1;
  const showManagedEmptyState =
    isSingleTokenTypeSelected &&
    (isManagedCollectionForSource(primaryTokenType, activeCollectionKey) ||
      isManagedCategoryForSource(primaryTokenType, activeCategoryKey));
  const sourceEmptyStateText = primaryTokenType === 'figma'
    ? 'Handled by Figma library.'
    : 'Handled by grommet-theme-hpe.';

  const tableData = useMemo(() => {
    const [activeCollectionName, activeCategoryName] = displayActive.split('.');
    if (!activeCollectionName || !activeCategoryName) return [];

    const rowsByToken = new Map();

    selectedTokenTypes.forEach(type => {
      const sourceTokens = getTokensBySource(type);
      const tokenObj = sourceTokens[activeCollectionName]?.[activeCategoryName];
      if (!tokenObj) return;

      const [firstToken] = Object.values(tokenObj);
      const availableModes = Object.keys(firstToken?.modes || {});
      if (!availableModes.length) return;

      let mode = selectedMode;
      if (!availableModes.includes(mode)) {
        if (availableModes.includes('light')) mode = 'light';
        else if (availableModes.includes('large')) mode = 'large';
        else [mode] = availableModes;
      }

      let rowsForType = getTokens(tokenObj, mode);

      if (
        type === 'grommetThemeHpe' &&
        ['heading', 'text'].includes(activeCategoryKey)
      ) {
        rowsForType = rowsForType.filter(datum =>
          datum.token.endsWith('.fontSize'),
        );
      }

      rowsForType.forEach(datum => {
        const canonicalToken = Array.isArray(datum.path)
          ? datum.path.join('.')
          : datum.sourceToken || datum.token;
        let tokenValue = datum.token;
        if (type === 'grommetThemeHpe') {
          if (
            selectedTokenTypes.length > 1 &&
            isManagedCollectionForSource(type, activeCollectionKey)
          ) {
            tokenValue = getEmptyStateMessage(type);
          } else if (isManagedCategoryForSource(type, activeCategoryKey)) {
            tokenValue = getEmptyStateMessage(type);
          } else {
            tokenValue = getGrommetThemeHpeDisplayToken(
              datum.token,
              activeCategoryKey,
            );
          }
        } else if (
          type === 'figma' &&
          selectedTokenTypes.length > 1 &&
          (isManagedCollectionForSource(type, activeCollectionKey) ||
            isManagedCategoryForSource(type, activeCategoryKey))
        ) {
          tokenValue = getEmptyStateMessage(type);
        }

        if (!rowsByToken.has(canonicalToken)) {
          rowsByToken.set(canonicalToken, {
            id: canonicalToken,
            token: datum.token,
            sourceToken: datum.sourceToken,
            type: datum.type,
            description: datum.description,
            value: datum.value,
          });
        }

        const nextRow = rowsByToken.get(canonicalToken);
        nextRow[`token__${type}`] = tokenValue;

        if (type === primaryTokenType) {
          nextRow.token = datum.token;
          nextRow.sourceToken = datum.sourceToken;
          nextRow.type = datum.type;
          nextRow.description = datum.description;
          nextRow.value = datum.value;
        }
      });
    });

    return Array.from(rowsByToken.values())
      .map(row => {
        const nextRow = { ...row };
        selectedTokenTypes.forEach(type => {
          if (nextRow[`token__${type}`] === undefined)
            nextRow[`token__${type}`] = getEmptyStateMessage(type);
        });
        return nextRow;
      })
      .sort((a, b) => a.id.localeCompare(b.id));
  }, [
    activeCollectionKey,
    activeCategoryKey,
    displayActive,
    primaryTokenType,
    selectedMode,
    selectedTokenTypes,
  ]);

  const tokenTypeColumns = useMemo(
    () =>
      selectedTokenTypes.map(type => ({
        id: type,
        label: tokenTypeLabels[type],
      })),
    [selectedTokenTypes],
  );

  useEffect(() => {
    if (!isReady) return;

    const tokenTypesFromQuery = getSingleQueryValue(queryTokenTypes) || '';
    const modeFromQuery = getSingleQueryValue(queryMode) || '';
    const tokenFromQuery = getSingleQueryValue(queryToken) || '';
    const normalizedQueryState = normalizeQuerySyncState({
      token: tokenFromQuery,
      tokenTypes: tokenTypesFromQuery,
      mode: modeFromQuery,
    });

    // Ignore stale query values while a newer local selection is pending.
    if (pendingQuerySyncRef.current) {
      const queryStateKey = toQuerySyncKey(normalizedQueryState);
      if (queryStateKey === pendingQuerySyncRef.current) {
        pendingQuerySyncRef.current = '';
      } else {
        return;
      }
    }

    if (tokenTypesFromQuery) {
      const nextSelectedTokenTypes = normalizeTokenTypes(
        tokenTypesFromQuery.split(','),
      );
      setSelectedTokenTypes(prevSelectedTokenTypes => {
        const currentValue = prevSelectedTokenTypes.join(',');
        const nextValue = nextSelectedTokenTypes.join(',');
        return currentValue === nextValue
          ? prevSelectedTokenTypes
          : nextSelectedTokenTypes;
      });
    }

    if (modeFromQuery) {
      setSelectedMode(prevMode =>
        prevMode === modeFromQuery ? prevMode : modeFromQuery,
      );
    }

    if (!tokenFromQuery) {
      setIsUrlSyncReady(true);
      return;
    }

    const nextPath = tokenFromQuery.replaceAll('/', '.');
    const activePrefixFromUrl = getActivePrefix(primaryTokenType);
    const nextActive = activePrefixFromUrl
      ? `${activePrefixFromUrl}.${nextPath}`
      : nextPath;

    setActive(nextActive);
    setIsUrlSyncReady(true);
  }, [
    primaryTokenType,
    isReady,
    queryMode,
    queryToken,
    queryTokenTypes,
    setActive,
    setSelectedMode,
  ]);

  useEffect(() => {
    if (!isReady || !isUrlSyncReady) return;

    const tokenFromQuery = getSingleQueryValue(queryToken) || '';
    const tokenTypesFromQuery = getSingleQueryValue(queryTokenTypes) || '';
    const modeFromQuery = getSingleQueryValue(queryMode) || '';

    const unprefixedActive = getPathWithoutPrefix(active, primaryTokenType);
    if (!unprefixedActive) return;

    const nextQueryState = normalizeQuerySyncState({
      token: unprefixedActive.replaceAll('.', '/'),
      tokenTypes: selectedTokenTypes.join(','),
      mode: selectedMode,
    });
    const currentQueryState = normalizeQuerySyncState({
      token: tokenFromQuery,
      tokenTypes: tokenTypesFromQuery,
      mode: modeFromQuery,
    });

    if (toQuerySyncKey(currentQueryState) === toQuerySyncKey(nextQueryState)) {
      if (pendingQuerySyncRef.current) pendingQuerySyncRef.current = '';
      return;
    }

    pendingQuerySyncRef.current = toQuerySyncKey(nextQueryState);

    if (
      tokenFromQuery === nextQueryState.token &&
      tokenTypesFromQuery === nextQueryState.tokenTypes &&
      modeFromQuery === nextQueryState.mode
    )
      return;

    const nextQuery = {
      ...query,
      token: nextQueryState.token,
      tokenTypes: nextQueryState.tokenTypes,
    };
    if (nextQueryState.mode) nextQuery.mode = nextQueryState.mode;
    else delete nextQuery.mode;

    replace(
      {
        pathname,
        query: nextQuery,
      },
      undefined,
      { shallow: true, scroll: false },
    );
  }, [
    active,
    isUrlSyncReady,
    primaryTokenType,
    isReady,
    pathname,
    query,
    queryMode,
    queryToken,
    queryTokenTypes,
    replace,
    selectedMode,
    selectedTokenTypes,
  ]);

  return (
    <DesignTokenContext.Provider value={contextValue}>
      <Page>
        <Box direction="row" gap="xlarge">
          {isDesktop ? (
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
          <PageContent pad="none" alignSelf="start">
            <Box pad="medium" round="xlarge" background="background-front">
              <Box margin={{ bottom: 'medium' }}>
                <ToggleGroup
                  a11yTitle="Select token types to compare"
                  multiple
                  options={tokenTypeOptions}
                  value={selectedTokenTypes}
                  onToggle={({ value }) => {
                    const nextValue = Array.isArray(value) ? value : [value];
                    const normalizedValue = normalizeTokenTypes(nextValue);
                    const currentTokenParam = getPathWithoutPrefix(
                      active,
                      primaryTokenType,
                    ).replaceAll('.', '/');

                    pendingQuerySyncRef.current = toQuerySyncKey(
                      normalizeQuerySyncState({
                        token: currentTokenParam,
                        tokenTypes: normalizedValue.join(','),
                        mode: getSingleQueryValue(queryMode) || selectedMode,
                      }),
                    );

                    setSelectedTokenTypes(normalizedValue);
                  }}
                />
              </Box>
              <Box gap="xsmall" margin={{ bottom: 'xsmall' }}>
                <Box direction="row" align="center" gap="xsmall">
                  {!isDesktop ? (
                    <Button
                      icon={<Menu />}
                      a11yTitle="Open design tokens menu"
                      margin={{ top: '3xsmall' }}
                      onClick={() => setOpenLayer(true)}
                    />
                  ) : undefined}
                  <Box gap="2xsmall">
                    {activeCollectionLabel ? (
                      <Text>{activeCollectionLabel}</Text>
                    ) : undefined}
                    <Heading level={2} margin="none" id="token-table-heading">
                      {displayHeadingLabel}
                    </Heading>
                  </Box>
                </Box>
              </Box>
              {/* eslint-disable-next-line no-nested-ternary */}
              {!showManagedEmptyState && active.includes('base') ? (
                <Notification
                  status="warning"
                  message={`Base tokens should never be used directly. 
                Semantic or component tokens should be used instead. 
                These are here purely for documentation.`}
                  margin={{ top: 'xsmall' }}
                />
              ) : !showManagedEmptyState && active.includes('static') ? (
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
              <Box gap="small">
                <DesignTokensTable
                  active={active}
                  data={showManagedEmptyState ? [] : tableData}
                  toolbar
                  tokenTypeColumns={tokenTypeColumns}
                />
                {showManagedEmptyState ? (
                  <Box
                    alignSelf="center"
                    align="center"
                    gap="xxsmall"
                    margin={{ bottom: 'medium' }}
                  >
                    <StatusWarning aria-hidden="true" color="icon-warning" />
                    <Heading level={3} size="small" margin="none">
                      Not applicable
                    </Heading>
                    <Text>{sourceEmptyStateText}</Text>
                  </Box>
                ) : undefined}
              </Box>
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
