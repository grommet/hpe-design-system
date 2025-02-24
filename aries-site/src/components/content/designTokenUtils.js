/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import * as tokens from 'hpe-design-tokens/docs';
import { Box, Text } from 'grommet';

const structuredTokens = {
  primitive: {},
  semantic: {},
  component: {},
};

Object.keys(tokens).forEach(mode => {
  // base, component, light, dark, etc.
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

const getCurrentTokens = active => {
  const keyPath = active.split('.');

  let res = structuredTokens;
  keyPath.forEach(key => {
    res = res[key];
  });

  const nextModes = Object.keys(Object.values(res)[0].modes).map(mode => mode);
  let nextMode;
  if (nextModes.includes('light')) nextMode = 'light';
  else if (nextModes.includes('large')) nextMode = 'large';
  else [nextMode] = nextModes;

  const nextData = getTokens(res, nextMode);
  return [nextData, nextModes, nextMode];
};

const useDesignTokens = defaultState => {
  const [active, setActive] = useState(defaultState);
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
