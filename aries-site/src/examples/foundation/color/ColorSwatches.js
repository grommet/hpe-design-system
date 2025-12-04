import { Box, Text, Grid } from 'grommet';
import PropTypes from 'prop-types';
import { useDesignTokens } from '../../../components/content/designTokenUtils';

// Fetch color tokens once at module level
const useColorTokens = () => {
  const { data: colorTokens } = useDesignTokens('semantic.color');
  return colorTokens;
};

const pickTokens = (tokens, tokenNameList) => {
  const tokenSubset = tokens.filter(token => tokenNameList.includes(token.id));
  return tokenSubset;
};

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

export const BackgroundSwatch = () => {
  const colorTokens = useColorTokens();

  const backgroundTokens = colorTokens.filter(token =>
    token.id.startsWith('hpe.color.background.'),
  );

  const sampleBackgroundTokens = pickTokens(backgroundTokens, [
    'hpe.color.background.default',
    'hpe.color.background.back',
    'hpe.color.background.front',
    'hpe.color.background.screenOverlay',
  ]);

  const swatchList = sampleBackgroundTokens.map(token => (
    <ColorSwatch
      key={token.id}
      background={token.value}
      border={
        ['hpe.color.background.default', 'hpe.color.background.front'].includes(
          token.id,
        )
          ? 'border-weak'
          : undefined
      }
      text={token.token.split('hpe.color.')[1] || token.token}
    />
  ));

  return <SwatchGroup>{swatchList}</SwatchGroup>;
};

export const BorderSwatch = () => {
  const colorTokens = useColorTokens();

  const borderTokens = colorTokens.filter(token =>
    token.id.startsWith('hpe.color.border.'),
  );

  const sampleBorderTokens = pickTokens(borderTokens, [
    'hpe.color.border.default',
    'hpe.color.border.weak',
    'hpe.color.border.strong',
  ]);

  const swatchList = sampleBorderTokens.map(token => (
    <ColorSwatch
      key={token.id}
      background="background-front"
      border={token.value}
      borderSize="small"
      text={token.token.split('hpe.color.')[1] || token.token}
    />
  ));

  return <SwatchGroup>{swatchList}</SwatchGroup>;
};

export const DecorativeSwatch = () => {
  const colorTokens = useColorTokens();

  const decorativeTokens = colorTokens.filter(token =>
    token.id.startsWith('hpe.color.decorative.'),
  );

  const swatchList = decorativeTokens.map(token => (
    <ColorSwatch
      key={token.id}
      background={token.value}
      text={token.token.split('hpe.color.')[1] || token.token}
    />
  ));

  return <SwatchGroup>{swatchList}</SwatchGroup>;
};

export const DataVisSwatch = () => {
  const colorTokens = useColorTokens();

  const dataVisTokens = colorTokens.filter(token =>
    token.id.startsWith('hpe.color.dataVis.'),
  );

  const swatchList = dataVisTokens.map(token => (
    <ColorSwatch
      key={token.id}
      background={token.value}
      text={token.token.split('hpe.color.')[1] || token.token}
    />
  ));

  return <SwatchGroup>{swatchList}</SwatchGroup>;
};

export const ForegroundSwatch = () => {
  const colorTokens = useColorTokens();

  const foregroundTokens = colorTokens.filter(token =>
    token.id.startsWith('hpe.color.foreground.'),
  );
  const swatchList = foregroundTokens.map(token => (
    <ColorSwatch
      key={token.id}
      background={token.value}
      text={token.token.split('hpe.color.')[1] || token.token}
    />
  ));

  return <SwatchGroup>{swatchList}</SwatchGroup>;
};
