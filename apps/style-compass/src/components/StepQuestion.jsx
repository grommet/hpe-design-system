import PropTypes from 'prop-types';
import { Box, Heading, Paragraph } from 'grommet';
import { SelectorGroup, Selector } from '@shared/aries-core';

/**
 * Renders the current question node: question text, optional hint, and a
 * vertical list of Selector options. Generic — works for any question node
 * shape from the decision tree JSON.
 */
export const StepQuestion = ({ currentNode, onSelect }) => (
  <Box>
    <Heading level={4} margin={{ top: 'medium', bottom: 'small' }}>
      {currentNode.question}
    </Heading>
    {currentNode.hint && (
      <Paragraph size="medium" margin={{ bottom: 'small' }}>
        {currentNode.hint}
      </Paragraph>
    )}
    <Box width="medium">
      <SelectorGroup a11yTitle={currentNode.question}>
        {currentNode.options.map((option) => (
          <Selector
            key={option.label}
            value={option.label}
            title={option.label}
            description={option.description}
            onClick={() => onSelect(option)}
          />
        ))}
      </SelectorGroup>
    </Box>
  </Box>
);

StepQuestion.propTypes = {
  currentNode: PropTypes.shape({
    question: PropTypes.string.isRequired,
    hint: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        description: PropTypes.string,
      }),
    ).isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};
