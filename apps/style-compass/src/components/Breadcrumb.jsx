import PropTypes from 'prop-types';
import { Box, Tag, Text } from 'grommet';

/**
 * Renders the trail of choices the user has made as clickable Tag pills.
 * Each crumb except the last is clickable — clicking it jumps back to
 * the question node at that point in history and trims forward history.
 * The last crumb is non-clickable and represents the current position.
 */
export const Breadcrumb = ({ history, onCrumbClick }) => {
  if (history.length === 0) return null;

  return (
    <Box
      direction="row"
      align="center"
      wrap
      gap="xsmall"
      margin={{ bottom: 'medium' }}
    >
      {history.map((entry, index) => {
        const isLast = index === history.length - 1;
        return (
          <Box key={index} direction="row" align="center" gap="xsmall">
            {index > 0 && (
              <Text color="text-weak" aria-hidden="true">
                ›
              </Text>
            )}
            <Tag
              value={entry.choiceLabel}
              onClick={isLast ? undefined : () => onCrumbClick(index)}
              a11yTitle={
                isLast
                  ? entry.choiceLabel
                  : `Go back to ${entry.choiceLabel}`
              }
            />
          </Box>
        );
      })}
    </Box>
  );
};

Breadcrumb.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.object.isRequired,
      choiceLabel: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onCrumbClick: PropTypes.func.isRequired,
};
