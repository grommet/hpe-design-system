import { useContext } from 'react';
import { Box, Text, Grid } from 'grommet';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import { Add } from '@hpe-design/icons-grommet';
import {
  structuredTokens,
  getTokens,
} from '../../../components/content/designTokenUtils';

// Fetch theme aware color tokens
const useColorTokens = () => {
  const theme = useContext(ThemeContext);
  const themeMode = theme?.dark ? 'dark' : 'light';
  const colorTokens = getTokens(structuredTokens.semantic.color, themeMode);
  return colorTokens;
};

const filterByPrefix = (tokens, prefix) =>
  tokens.filter(t => t.id.startsWith(prefix));

const pickTokens = (tokens, ids) => tokens.filter(t => ids.includes(t.id));

const getLabel = token => token.token.split('hpe.color.')[1] || token.token;

const ColorSwatch = ({ background, border, borderSize = 'xsmall', text }) => (
  <Box direction="row" gap="xsmall">
    <Box
      border={border ? { color: border, size: borderSize } : undefined}
      background={background}
      width="5xsmall"
      height="5xsmall"
      round="small"
    />
    <Box justify="center">
      <Text>{text}</Text>
    </Box>
  </Box>
);
ColorSwatch.propTypes = {
  background: PropTypes.string.isRequired,
  border: PropTypes.string,
  borderSize: PropTypes.string,
  text: PropTypes.string.isRequired,
};

const SwatchGroup = ({ children }) => (
  <Box
    background="background-front"
    pad="medium"
    gap="medium"
    width={{ max: 'xlarge', min: 'xsmall' }}
    round="medium"
  >
    <Grid columns="small" gap="medium">
      {children}
    </Grid>
  </Box>
);
SwatchGroup.propTypes = {
  children: PropTypes.node.isRequired,
};

const TokenSwatchList = ({
  color,
  border,
  tokens,
  borderSize,
  component = ColorSwatch,
  background = token => token.value,
}) => (
  <SwatchGroup>
    {tokens.map(token => {
      const label = getLabel(token);
      const Comp = component;
      return (
        <Comp
          key={token.id}
          background={background(token)}
          border={border?.(token)}
          borderSize={borderSize}
          color={color ? color(token) : token.value}
          text={label}
        />
      );
    })}
  </SwatchGroup>
);

TokenSwatchList.propTypes = {
  tokens: PropTypes.array.isRequired,
  background: PropTypes.func,
  border: PropTypes.func,
  borderSize: PropTypes.string,
  color: PropTypes.func,
  component: PropTypes.elementType,
};

export const BackgroundSwatch = () => {
  const backgroundTokens = filterByPrefix(
    useColorTokens(),
    'hpe.color.background.',
  );
  // Choosing to highlight most frequently used backgrounds and use
  // cross-link to all background colors reference table for full list.
  const sampleBackgroundTokens = pickTokens(backgroundTokens, [
    'hpe.color.background.default',
    'hpe.color.background.back',
    'hpe.color.background.front',
    'hpe.color.background.screenOverlay',
  ]);

  const border = token =>
    ['hpe.color.background.default', 'hpe.color.background.front'].includes(
      token.id,
    )
      ? 'border-weak'
      : undefined;

  return <TokenSwatchList border={border} tokens={sampleBackgroundTokens} />;
};

export const BorderSwatch = () => {
  const borderTokens = filterByPrefix(useColorTokens(), 'hpe.color.border.');
  // Choosing to highlight most frequently used border colors and use
  // cross-link to all border colors reference table for full list.
  const sampleBorderTokens = pickTokens(borderTokens, [
    'hpe.color.border.default',
    'hpe.color.border.weak',
    'hpe.color.border.strong',
  ]);

  return (
    <TokenSwatchList
      background={() => 'background-front'}
      border={t => t.value}
      borderSize="small"
      tokens={sampleBorderTokens}
    />
  );
};

export const DecorativeSwatch = () => (
  <TokenSwatchList
    tokens={filterByPrefix(useColorTokens(), 'hpe.color.decorative.')}
  />
);

export const ForegroundSwatch = () => (
  <TokenSwatchList
    tokens={filterByPrefix(useColorTokens(), 'hpe.color.foreground.')}
  />
);

export const DataVisSwatch = () => {
  const dataVisTokens = filterByPrefix(useColorTokens(), 'hpe.color.dataVis.');

  // Sort tokens to ensure correct order
  const sortedTokens = [...dataVisTokens].sort((a, b) => {
    const num = id => parseInt(id.match(/\d+/)?.[0] ?? '0', 10);
    return num(a.id) - num(b.id);
  });

  // Split into two columns so that they are able
  // to be read top-to-bottom in each column.
  const midpoint = Math.ceil(sortedTokens.length / 2);
  const left = sortedTokens.slice(0, midpoint);
  const right = sortedTokens.slice(midpoint);

  return (
    <SwatchGroup>
      <Box direction="column" gap="medium">
        {left.map(t => (
          <ColorSwatch key={t.id} background={t.value} text={getLabel(t)} />
        ))}
      </Box>
      <Box direction="column" gap="medium">
        {right.map(t => (
          <ColorSwatch key={t.id} background={t.value} text={getLabel(t)} />
        ))}
      </Box>
    </SwatchGroup>
  );
};

const TextColorSwatch = ({ color, text }) => {
  return (
    <Box direction="row" gap="small" align="center">
      <Text size="xlarge" weight="bold" color={color}>
        Aa
      </Text>
      <Text>{text}</Text>
    </Box>
  );
};
TextColorSwatch.propTypes = {
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export const TextSwatch = () => {
  const textTokens = filterByPrefix(useColorTokens(), 'hpe.color.text.');
  // Choosing to highlight most frequently used text color and use
  // cross-link to all text colors reference table for full list.
  const sampleTextTokens = pickTokens(textTokens, [
    'hpe.color.text.default',
    'hpe.color.text.strong',
    'hpe.color.text.weak',
    'hpe.color.text.heading',
  ]);

  return (
    <TokenSwatchList
      color={token => token.value}
      component={TextColorSwatch}
      tokens={sampleTextTokens}
    />
  );
};

const IconColorSwatch = ({ color, text }) => (
  <Box direction="row" gap="small" align="center">
    <Add color={color} size="medium" />
    <Text>{text}</Text>
  </Box>
);
IconColorSwatch.propTypes = {
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export const IconSwatch = () => {
  const iconTokens = filterByPrefix(useColorTokens(), 'hpe.color.icon.');
  // Choosing to highlight most frequently used icon colors 
  // implementors are likely to use and not speak to tokens embedded 
  // elsewhere in the system. Use cross-link to all background colors 
  // reference table for full list.
  const sampleIconTokens = pickTokens(iconTokens, [
    'hpe.color.icon.default',
    'hpe.color.icon.strong',
    'hpe.color.icon.weak',
  ]);

  return (
    <TokenSwatchList
      color={token => token.value}
      component={IconColorSwatch}
      tokens={sampleIconTokens}
    />
  );
};

const StatusColorSwatch = ({
  iconColor,
  backgroundColor,
  iconText,
  backgroundText,
}) => (
  <Box direction="row" gap="small" align="center">
    <Box
      background={backgroundColor}
      align="center"
      justify="center"
      round="small"
      pad="5xsmall"
      width="5xsmall"
      height="5xsmall"
    >
      <Box background={iconColor} round="full" width="24px" height="24px" />
    </Box>
    <Box>
      <Text>{iconText}</Text>
      <Text>{backgroundText}</Text>
    </Box>
  </Box>
);
StatusColorSwatch.propTypes = {
  iconColor: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  iconText: PropTypes.string.isRequired,
  backgroundText: PropTypes.string.isRequired,
};

export const StatusSwatch = () => {
  const colorTokens = useColorTokens();

  // Status colors are assembled across a variety of tokens which do not
  // allow for easy programmatic selection from their namespace.
  // A possible solution is to introduce a token $subtype in the future.
  const statusTypes = ['ok', 'warning', 'critical', 'info', 'unknown'];

  const swatchList = statusTypes
    .map(status => {
      const iconToken = colorTokens.find(
        token => token.id === `hpe.color.icon.${status}`,
      );
      const backgroundToken = colorTokens.find(
        token => token.id === `hpe.color.background.${status}`,
      );
      if (!iconToken || !backgroundToken) return null;

      return (
        <StatusColorSwatch
          key={status}
          iconColor={`icon-${status}`}
          backgroundColor={`background-${status}`}
          iconText={`icon.${status}`}
          backgroundText={`background.${status}`}
        />
      );
    })
    .filter(Boolean);

  return <SwatchGroup>{swatchList}</SwatchGroup>;
};
