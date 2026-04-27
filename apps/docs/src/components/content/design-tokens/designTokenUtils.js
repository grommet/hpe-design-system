/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Box, Text } from 'grommet';
import { addCssTokens } from './cssTokenUtils';
import { addDocsTokens } from './docsTokenUtils';
import { addFigmaTokens } from './figmaTokenUtils';

const structuredTokens = {};

addDocsTokens(structuredTokens);

addCssTokens(structuredTokens);

addFigmaTokens(structuredTokens);

const ColorPreview = ({ background, datum, ...rest }) => (
  <Box
    pad="medium"
    round="xsmall"
    flex={false}
    background={background || datum.value}
    border={{ color: 'border-weak' }}
    {...rest}
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
      sourceToken: tokenObj[key]?.modes[mode]?.$name,
      path: tokenObj[key]?.modes[mode]?.path,
      type: tokenObj[key]?.modes[mode]?.$type,
      description: tokenObj[key]?.modes[mode]?.$description,
      value: tokenObj[key]?.modes[mode].$value,
    };
  });

const getCurrentTokens = active => {
  if (!active) return [[], [], ''];

  const keyPath = active.split('.');

  let res = structuredTokens;
  keyPath.forEach(key => {
    if (res) res = res[key];
  });

  if (!res || Object.keys(res).length === 0) return [[], [], ''];

  const [firstToken] = Object.values(res);
  if (!firstToken?.modes) return [[], [], ''];

  const nextModes = Object.keys(firstToken.modes).map(mode => mode);
  let nextMode;
  if (nextModes.includes('light')) nextMode = 'light';
  else if (nextModes.includes('large')) nextMode = 'large';
  else [nextMode] = nextModes;

  const nextData = getTokens(res, nextMode);
  return [nextData, nextModes, nextMode];
};

const getDefaultActiveTokenPath = () => {
  if (structuredTokens.semantic?.color) return 'semantic.color';

  const [firstCollection] = Object.keys(structuredTokens);
  if (!firstCollection) return '';

  const [firstCategory] = Object.keys(structuredTokens[firstCollection] || {});
  if (!firstCategory) return '';

  return `${firstCollection}.${firstCategory}`;
};

const useDesignTokens = defaultState => {
  const [active, setActive] = useState(
    defaultState || getDefaultActiveTokenPath(),
  );
  const [data, setData] = useState([]);
  const [modes, setModes] = useState([]);
  const [selectedMode, setSelectedMode] = useState('');

  useEffect(() => {
    const [nextData, nextModes, nextMode] = getCurrentTokens(active);

    setData(nextData);
    setModes(nextModes);
    setSelectedMode(nextMode);
  }, [active]);

  return {
    active,
    setActive,
    data,
    setData,
    modes,
    selectedMode,
    setSelectedMode,
  };
};

export {
  getCurrentTokens,
  getDefaultActiveTokenPath,
  structuredTokens,
  ColorPreview,
  DimensionPreview,
  RadiusPreview,
  BorderPreview,
  WeightPreview,
  TextPreview,
  getTokens,
  useDesignTokens,
};
