import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Header, Heading, Text } from 'grommet';
import { Up, Down } from '@hpe-design/icons-grommet';

export const ChildHeader = ({
  // annotationIds are for documentation demo purposes only.
  // Remove from product implementation.
  annotationIds,
  collectionName,
  index,
  headingLevel,
  name,
  open,
  summary,
  ...rest
}) => {
  const [background, setBackground] = useState(null);
  const borderStyle = { side: 'top', color: 'border-weak' };

  return (
    <Header
      id={annotationIds?.container}
      background={background}
      border={borderStyle}
      height={{ min: '5xsmall' }}
      onMouseEnter={() => setBackground('background-contrast')}
      onMouseLeave={() => setBackground(null)}
      pad="xsmall"
      {...rest}
    >
      <Box>
        <Heading id={annotationIds?.label} level={headingLevel} margin="none">
          {name || `New ${collectionName} (undefined)`}
        </Heading>
        {summary && (
          <Text id={annotationIds?.valuesSummary} truncate>
            {summary}
          </Text>
        )}
      </Box>
      {open ? (
        <Up id={annotationIds?.icon} a11yTitle="Hide detail" />
      ) : (
        <Down id={annotationIds?.icon} a11yTitle="Show detail and edit" />
      )}
    </Header>
  );
};

ChildHeader.propTypes = {
  annotationIds: PropTypes.shape({
    container: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.string,
    valuesSummary: PropTypes.string,
  }),
  collectionName: PropTypes.string,
  index: PropTypes.number,
  headingLevel: PropTypes.number,
  name: PropTypes.string,
  open: PropTypes.bool,
  summary: PropTypes.string,
};
