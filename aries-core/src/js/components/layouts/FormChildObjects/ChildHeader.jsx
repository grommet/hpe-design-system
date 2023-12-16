// ChildHeader.js
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Header, Heading, Text } from 'grommet';
import { Up, Down } from 'grommet-icons';

export const ChildHeader = ({
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
      background={background}
      border={borderStyle}
      height={{ min: 'xxsmall' }}
      onMouseEnter={() => setBackground('background-contrast')}
      onMouseLeave={() => setBackground(null)}
      pad="small"
      {...rest}
    >
      <Box>
        <Heading level={headingLevel} margin="none">
          {name || `New ${collectionName} (undefined)`}
        </Heading>
        {summary && <Text truncate>{summary}</Text>}
      </Box>
      {open ? (
        <Up a11yTitle="Hide detail" />
      ) : (
        <Down a11yTitle="Show detail and edit" />
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
