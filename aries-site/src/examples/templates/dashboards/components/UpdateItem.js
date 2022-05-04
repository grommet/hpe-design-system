import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, Box, Paragraph, Text } from 'grommet';

export function UpdateItem({ title, description }) {
  // HPE Design System guidance for string length
  // when presenting content within a Card.
  // https://design-system.hpe.design/components/card#general
  const MAX_STRING_LENGTH = 100;

  return (
    <Box>
      <Text weight="bold">{`${title} is available.`}</Text>
      <Box gap="xsmall">
        {description.length <= MAX_STRING_LENGTH ? (
          <Paragraph size="small" margin="none">
            {description}
          </Paragraph>
        ) : (
          <Paragraph size="small" margin="none">{`${description.substring(
            0,
            MAX_STRING_LENGTH,
          )}...`}</Paragraph>
        )}
        <Anchor
          href="#"
          a11yTitle={`This anchor is for visual demonstration purposes. 
            The link will not navigate to a new page.`}
          label="View Details"
          size="small"
          onClick={() => {
            // eslint-disable-next-line no-alert
            alert(`
  Typically this would route to a view displaying the detail 
  behind the selected activities.
                `);
          }}
        />
      </Box>
    </Box>
  );
}
UpdateItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};
