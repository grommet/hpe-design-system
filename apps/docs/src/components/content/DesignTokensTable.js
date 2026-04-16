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
  getTokens,
  useDesignTokens,
  structuredTokens,
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
      (tokenForPreview.includes('font') &&
        tokenForPreview.includes('size')) ||
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
  render: datum => (
    <Box direction="row">
      <Box
        background="background-contrast"
        pad="3xsmall"
        round="xsmall"
        style={{ fontFamily: 'Menlo' }}
      >
        <Text size="xsmall" style={{ whiteSpace: 'nowrap' }}>
          {datum[property] || '--'}
        </Text>
      </Box>
    </Box>
  ),
});

const descriptionColumn = {
  property: 'description',
  header: 'Description',
  size: 'large',
  render: datum => <Text>{datum.description ? datum.description : '--'}</Text>,
};

const valueColumn = {
  property: 'value',
  header: 'Output value',
  render: datum => <Text style={{ whiteSpace: 'nowrap' }}>{datum.value}</Text>,
};

export const DesignTokensTable = ({
  active,
  data: dataProp,
  maxHeight,
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

  const handleMode = setSelectedMode || setHookSelectedMode;
  const handleData = setData || setHookData;
  const mode = selectedMode || hookSelectedMode;
  const modeOptions = modes || hookModes;
  const currentData = dataProp || contextData || hookData;

  const columns = useMemo(() => {
    const dynamicTokenColumns =
      tokenTypeColumns && tokenTypeColumns.length > 0
        ? tokenTypeColumns.map(({ id, label }) =>
            getTokenColumn(`token__${id}`, label),
          )
        : [getTokenColumn('displayToken', 'Token')];

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
      nextProperties.displayToken = { search: true };
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
          primaryKey="id"
          columns={columns}
          style={{ minWidth: 'max-content' }}
        />
      </Box>
    </Data>
  );
};

DesignTokensTable.propTypes = {
  active: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  maxHeight: PropTypes.bool,
  toolbar: PropTypes.bool,
  tokenTypeColumns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
};
