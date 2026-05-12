import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  DataTable,
  Data,
  DataSearch,
  DataSummary,
  Text,
  Toolbar,
  Select,
  FormField,
} from 'grommet';
import {
  ColorPreview,
  DimensionPreview,
  RadiusPreview,
  BorderPreview,
  WeightPreview,
  TextPreview,
  getTokens,
  useDesignTokens,
  structuredTokens,
  applyTokenNameTransform,
} from './designTokenUtils';
import { DesignTokenContext } from './DesignTokenContext';

// Use originalToken (stable key) for preview type checks so they work
// regardless of which name syntax is currently displayed.
const buildTokenColumns = (flavor, syntax) => [
  {
    property: 'id',
    header: 'Preview',
    render: datum => {
      const key = datum.originalToken || datum.token;
      if (datum.type === 'color') return <ColorPreview datum={datum} />;

      if (
        key.includes('size') ||
        key.includes('dimension') ||
        key.includes('spacing') ||
        key.includes('gap')
      )
        return <DimensionPreview datum={datum} />;
      if (
        key.includes('radius') ||
        key.includes('borderRadius') ||
        /border.*Radius/.test(key)
      )
        return <RadiusPreview datum={datum} />;
      if (key.includes('border')) return <BorderPreview datum={datum} />;
      if (key.includes('weight') || key.includes('fontWeight'))
        return <WeightPreview datum={datum} />;
      if (
        (key.includes('font') && key.includes('size')) ||
        key.includes('fontSize')
      )
        return <TextPreview datum={datum} />;
      return '--';
    },
    size: 'auto',
    pin: true,
  },
  {
    property: 'token',
    header: 'Token',
    render: datum => {
      const displayName = applyTokenNameTransform(
        datum.originalToken || datum.token,
        flavor,
        syntax,
      );
      return (
        <Box direction="row">
          <Box
            background="background-contrast"
            pad="3xsmall"
            round="xsmall"
            style={{ fontFamily: 'Menlo' }}
          >
            <Text size="xsmall">{displayName}</Text>
          </Box>
        </Box>
      );
    },
  },
  {
    property: 'description',
    header: 'Description',
    size: 'medium',
    render: datum => (
      <Text>{datum.description ? datum.description : '--'}</Text>
    ),
  },
  {
    property: 'value',
    header: 'Output value',
  },
];

export const DesignTokensTable = ({ active, maxHeight, toolbar }) => {
  const {
    data,
    setData,
    selectedMode,
    setSelectedMode,
    modes,
    flavor,
    syntax,
    setSyntax,
  } = useContext(DesignTokenContext);

  const {
    data: hookData,
    modes: hookModes,
    selectedMode: hookSelectedMode,
    setData: setHookData,
    setSelectedMode: setHookSelectedMode,
  } = useDesignTokens(active);

  const handleMode = setSelectedMode || setHookSelectedMode;
  const handleData = setData || setHookData;
  const mode = selectedMode || hookSelectedMode;
  const modeOptions = modes || hookModes;
  const currentData = data || hookData;
  const currentFlavor = flavor || 'hpe';
  const currentSyntax = syntax || 'tokens';
  const handleSyntax = setSyntax || (() => {});

  const tokenColumns = buildTokenColumns(currentFlavor, currentSyntax);

  return (
    <Data data={currentData} pad={{ vertical: 'medium' }}>
      {toolbar ? (
        <>
          <Toolbar align="end">
            <DataSearch />
            {currentFlavor === 'hpe' ? (
              <Box width="xsmall">
                <FormField
                  label="Syntax"
                  contentProps={{ margin: { bottom: 'none', top: '3xsmall' } }}
                  htmlFor={`syntax-select-${active}__input`}
                  name={`syntax-select-${active}`}
                >
                  <Select
                    name={`syntax-select-${active}`}
                    id={`syntax-select-${active}`}
                    options={['tokens', 'css']}
                    value={currentSyntax}
                    onChange={({ option }) => handleSyntax(option)}
                  />
                </FormField>
              </Box>
            ) : undefined}
            {modeOptions?.length > 1 ? (
              <Box width="xsmall">
                <FormField
                  label="Mode"
                  contentProps={{ margin: { bottom: 'none', top: '3xsmall' } }}
                  htmlFor={`mode-select-${active}__input`}
                  name={`mode-select-${active}`}
                >
                  <Select
                    name={`mode-select-${active}`}
                    id={`mode-select-${active}`}
                    options={modeOptions}
                    value={mode}
                    onChange={({ option }) => {
                      const keyPath = active.split('.');

                      let res = structuredTokens;
                      keyPath.forEach(key => {
                        res = res[key];
                      });
                      handleData(getTokens(res, option));
                      handleMode(option);
                    }}
                  />
                </FormField>
              </Box>
            ) : undefined}
          </Toolbar>
          <DataSummary />
        </>
      ) : undefined}
      <Box
        height={maxHeight !== false ? { max: 'xlarge' } : undefined}
        overflow="auto"
      >
        <DataTable
          aria-describedby="token-table-heading"
          verticalAlign="top"
          primaryKey="token"
          columns={tokenColumns}
        />
      </Box>
    </Data>
  );
};

DesignTokensTable.propTypes = {
  active: PropTypes.string,
  maxHeight: PropTypes.bool,
  toolbar: PropTypes.bool,
};
