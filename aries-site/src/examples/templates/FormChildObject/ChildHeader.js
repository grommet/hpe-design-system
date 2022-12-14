import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Header, Heading, Text } from 'grommet';
import { FormUp, FormDown } from 'grommet-icons';

export const ChildHeader = ({
  annotationIds, // For documentation demo purposes only. Remove from product implementation.
  collectionName,
  index,
  level,
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
      height={{ min: 'xxsmall' }}
      onMouseEnter={() => setBackground('background-contrast')}
      onMouseLeave={() => setBackground(null)}
      pad={{
        horizontal: 'small',
        vertical: 'small',
      }}
      {...rest}
    >
      <Box>
        <Heading
          id={annotationIds?.label}
          level={level}
          size="small"
          margin="none"
          color="text"
          weight={500}
        >
          {name || `${collectionName} ${index}`}
        </Heading>
        {summary && (
          <Text id={annotationIds?.valuesSummary} truncate>
            {summary}
          </Text>
        )}
      </Box>
      {open ? (
        <FormUp id={annotationIds?.icon} a11yTitle="Hide detail" />
      ) : (
        <FormDown id={annotationIds?.icon} a11yTitle="Show detail and edit" />
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
  level: PropTypes.number,
  name: PropTypes.string,
  open: PropTypes.bool,
  summary: PropTypes.string,
};
