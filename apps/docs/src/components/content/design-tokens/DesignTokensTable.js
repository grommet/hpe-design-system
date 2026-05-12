import React, { useContext, useMemo } from 'react';
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
  getTokenGroupByActivePath,
  getTokens,
  useDesignTokens,
} from './designTokenUtils';
import { DesignTokenContext } from './DesignTokenContext';

const previewColumn = {
  property: 'id',
  header: 'Preview',
  render: datum => {
    const tokenForPreview = datum.sourceToken || datum.token;

    if (datum.type === 'color') return <ColorPreview datum={datum} />;

    if (
      tokenForPreview.includes('size') ||
      tokenForPreview.includes('dimension') ||
      tokenForPreview.includes('spacing') ||
      tokenForPreview.includes('gap')
    )
      return <DimensionPreview datum={datum} />;
    if (
      tokenForPreview.includes('radius') ||
      tokenForPreview.includes('borderRadius') ||
      /border.*Radius/.test(tokenForPreview)
    )
      return <RadiusPreview datum={datum} />;
    if (tokenForPreview.includes('border'))
      return <BorderPreview datum={datum} />;
    if (
      tokenForPreview.includes('weight') ||
      tokenForPreview.includes('fontWeight')
    )
      return <WeightPreview datum={datum} />;
    if (
      (tokenForPreview.includes('font') && tokenForPreview.includes('size')) ||
      tokenForPreview.includes('fontSize')
    )
      return <TextPreview datum={datum} />;
    return '--';
  },
  size: 'auto',
  pin: true,
};

const getTokenColumn = (property, header) => ({
  property,
  header,
  render: datum => {
    // Default token column should prefer source token name when present.
    const displayValue =
      property === 'token' ? datum.sourceToken || datum.token : datum[property];

    return (
      <Box
        background="background-contrast"
        pad="3xsmall"
        round="xsmall"
        style={{ fontFamily: 'Consolas, Menlo, monospace' }}
      >
        <Text size="xsmall" style={{ whiteSpace: 'nowrap' }}>
          {displayValue || '--'}
        </Text>
      </Box>
    );
  },
});

const descriptionColumn = {
  property: 'description',
  header: 'Description',
  size: 'large',
  render: datum => <Text>{datum.description || '--'}</Text>,
};

const formatTokenValue = value => {
  if (value === undefined || value === null) return '--';
  if (typeof value === 'object') return JSON.stringify(value);
  return value;
};

const valueColumn = {
  property: 'value',
  header: 'Output value',
  render: datum => (
    <Text style={{ whiteSpace: 'nowrap' }}>
      {formatTokenValue(datum.value)}
    </Text>
  ),
};

export const DesignTokensTable = ({
  active,
  data: dataProp,
  toolbar,
  tokenTypeColumns,
}) => {
  const {
    data: contextData,
    setData,
    selectedMode,
    setSelectedMode,
    modes,
  } = useContext(DesignTokenContext);

  const {
    data: hookData,
    modes: hookModes,
    selectedMode: hookSelectedMode,
    setData: setHookData,
    setSelectedMode: setHookSelectedMode,
  } = useDesignTokens(active);

  const hasContextState =
    typeof setData === 'function' &&
    typeof setSelectedMode === 'function' &&
    Array.isArray(modes);

  const handleMode = hasContextState ? setSelectedMode : setHookSelectedMode;
  const handleData = hasContextState ? setData : setHookData;
  const mode = hasContextState ? selectedMode : hookSelectedMode;
  const modeOptions = hasContextState ? modes : hookModes;
  const currentData = dataProp ?? (hasContextState ? contextData : hookData);

  const columns = useMemo(() => {
    const dynamicTokenColumns =
      tokenTypeColumns && tokenTypeColumns.length > 0
        ? tokenTypeColumns.map(({ id, label }) =>
            getTokenColumn(`token__${id}`, label),
          )
        : [getTokenColumn('token', 'Token')];

    return [
      previewColumn,
      ...dynamicTokenColumns,
      descriptionColumn,
      valueColumn,
    ];
  }, [tokenTypeColumns]);

  const dataProperties = useMemo(() => {
    const nextProperties = {
      id: { search: false },
      description: { search: true },
      value: { search: true },
    };

    if (tokenTypeColumns && tokenTypeColumns.length > 0) {
      tokenTypeColumns.forEach(({ id }) => {
        nextProperties[`token__${id}`] = { search: true };
      });
    } else {
      nextProperties.sourceToken = { search: true };
      nextProperties.token = { search: true };
    }

    return nextProperties;
  }, [tokenTypeColumns]);

  return (
    <Data
      data={currentData}
      pad={{ vertical: 'medium' }}
      properties={dataProperties}
    >
      {toolbar ? (
        <>
          <Toolbar align="end">
            <DataSearch />
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
                      const tokenGroup = getTokenGroupByActivePath(active);
                      if (!tokenGroup) return;

                      handleData(getTokens(tokenGroup, option));
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
      <Box width="max-content" height={{ max: 'xlarge' }} overflow="auto">
        <DataTable
          aria-describedby="token-table-heading"
          verticalAlign="top"
          primaryKey="id"
          columns={columns}
        />
      </Box>
    </Data>
  );
};

DesignTokensTable.propTypes = {
  active: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  toolbar: PropTypes.bool,
  tokenTypeColumns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
};
