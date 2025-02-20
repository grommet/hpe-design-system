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
} from './designTokenUtils';
import { DesignTokenContext } from './DesignTokenContext';

const tokenColumns = [
  {
    property: 'id',
    header: 'Preview',
    render: datum => {
      if (datum.type === 'color') return <ColorPreview datum={datum} />;

      if (
        datum.token.includes('size') ||
        datum.token.includes('dimension') ||
        datum.token.includes('spacing') ||
        datum.token.includes('gap')
      )
        return <DimensionPreview datum={datum} />;
      if (
        datum.token.includes('radius') ||
        datum.token.includes('borderRadius') ||
        /border.*Radius/.test(datum.token)
      )
        return <RadiusPreview datum={datum} />;
      if (datum.token.includes('border'))
        return <BorderPreview datum={datum} />;
      if (datum.token.includes('weight') || datum.token.includes('fontWeight'))
        return <WeightPreview datum={datum} />;
      if (
        (datum.token.includes('font') && datum.token.includes('size')) ||
        datum.token.includes('fontSize')
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
      </Box>
    ),
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
  const { data, setData, selectedMode, setSelectedMode, modes } =
    useContext(DesignTokenContext);

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

  return (
    <Data data={currentData} pad={{ vertical: 'medium' }}>
      {toolbar ? (
        <>
          <Toolbar align="end">
            <DataSearch />
            {modeOptions?.length > 1 ? (
              <Box width="small">
                <FormField
                  label="Mode"
                  contentProps={{ margin: { bottom: 'none', top: 'xsmall' } }}
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
        height={maxHeight !== false ? { max: 'large' } : undefined}
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
