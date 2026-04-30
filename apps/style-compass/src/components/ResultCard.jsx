import PropTypes from 'prop-types';
import { DataTable, Box, Text, Heading, Paragraph, Button } from 'grommet';
import { CopyButton } from '../../../design-tokens-manager/src/components/CopyButton';
import {
  ColorPreview,
  DimensionPreview,
  RadiusPreview,
  BorderPreview,
  WeightPreview,
  TextPreview,
} from '../../../docs/src/components/content/designTokenUtils';
import { resolveResultTokens, resolveToken } from '../lib/treeUtils';

/**
 * Determine which preview component to render based on token type and name.
 * Generic. Relies on the datum's resolved type and token name pattern.
 */
const getPreview = (datum) => {
  if (datum.type === 'color') return <ColorPreview datum={datum} />;
  if (
    datum.token.includes('size') ||
    datum.token.includes('spacing') ||
    datum.token.includes('gap')
  )
    return <DimensionPreview datum={datum} />;
  if (
    /border.*[Rr]adius/.test(datum.token) ||
    datum.token.includes('radius')
  )
    return <RadiusPreview datum={datum} />;
  if (datum.token.includes('border')) return <BorderPreview datum={datum} />;
  if (datum.token.includes('weight') || datum.token.includes('fontWeight'))
    return <WeightPreview datum={datum} />;
  if (datum.token.includes('fontSize')) return <TextPreview datum={datum} />;
  // Fallback: colour swatch using the resolved value
  return (
    <Box
      height="36px"
      width="36px"
      flex={false}
      round="xsmall"
      background={datum.value}
      border={{ color: 'border-weak', size: 'xsmall' }}
    />
  );
};

const resultColumns = [
  {
    property: 'id',
    header: '',
    render: (datum) => getPreview(datum),
    size: 'xsmall',
    pin: true,
  },
  {
    property: 'token',
    header: '',
    render: (datum) => (
      <Text size="small" style={{ fontFamily: 'Menlo, monospace' }}>
        {datum.token}
      </Text>
    ),
  },
  {
    property: 'description',
    header: '',
    render: (datum) => <Text>{datum.description || '--'}</Text>,
    size: 'medium',
  },
  {
    property: 'copy',
    header: '',
    render: (datum) => (
      <CopyButton content={datum.token} tip="Copy token name" />
    ),
    size: 'xxsmall',
  },
];

/**
 * Renders the result of a completed decision tree path. Handles three cases
 * structurally (not by node ID):
 *   1. Tokens present → DataTable with swatch, name, description, copy
 *   2. No tokens but description present → guidance text only
 *   3. seeAlso present → navigation buttons to related tree nodes
 */
export const ResultCard = ({ result, onNavigate }) => {
  const resolvedTokens = result.tokens.length > 0
    ? resolveResultTokens(result)
    : [];
  const resolvedPairings = result.pairings?.length > 0
    ? result.pairings.map(resolveToken)
    : [];
  const resolvedRelated = result.related?.length > 0
    ? result.related.map(resolveToken)
    : [];

  return (
    <Box animation={{ type: 'fadeIn', duration: 300 }}>
      {resolvedTokens.length > 0 ? (
        <>
          <Heading level={3} margin={{ top: 'medium', bottom: 'small' }}>
            Recommended style
          </Heading>
          {result.description && (
            <Paragraph size="medium" margin={{ bottom: 'small' }}>
              {result.description}
            </Paragraph>
          )}
          <DataTable
            primaryKey="token"
            columns={resultColumns}
            data={resolvedTokens}
          />
        </>
      ) : (
        <>
          <Heading level={3} margin={{ top: 'medium', bottom: 'small' }}>
            Guidance
          </Heading>
          <Paragraph size="medium">{result.description}</Paragraph>
        </>
      )}
      {resolvedPairings.length > 0 && (
        <>
          <Heading level={4} margin={{ top: 'medium', bottom: 'xsmall' }}>
            Pairs with
          </Heading>
          <Paragraph size="small" margin={{ bottom: 'small' }} color="text-weak">
            Always use these alongside the values above for accessible contrast.
          </Paragraph>
          <DataTable
            primaryKey="token"
            columns={resultColumns}
            data={resolvedPairings}
          />
        </>
      )}
      {resolvedRelated.length > 0 && (
        <>
          <Heading level={4} margin={{ top: 'medium', bottom: 'xsmall' }}>
            Related
          </Heading>
          <DataTable
            primaryKey="token"
            columns={resultColumns}
            data={resolvedRelated}
          />
        </>
      )}
      {result.seeAlso && result.seeAlso.length > 0 && (
        <Box margin={{ top: 'medium' }} gap="small">
          <Text weight="bold">Related:</Text>
          <Box direction="row" gap="small">
            {result.seeAlso.map((ref) => (
              <Button key={ref} label={ref} onClick={() => onNavigate(ref)} />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

ResultCard.propTypes = {
  result: PropTypes.shape({
    tokens: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
    pairings: PropTypes.arrayOf(PropTypes.string),
    related: PropTypes.arrayOf(PropTypes.string),
    seeAlso: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onNavigate: PropTypes.func.isRequired,
};
