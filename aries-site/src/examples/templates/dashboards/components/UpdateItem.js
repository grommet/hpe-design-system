import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, Box, Paragraph } from 'grommet';
import { TextEmphasis } from 'aries-core';

export const UpdateItem = ({ title, description }) => {
  // HPE Design System guidance for string length
  // when presenting content within a Card.
  // https://design-system.hpe.design/components/card#general
  const MAX_STRING_LENGTH = 100;

  return (
    <Box>
      <TextEmphasis>{`${title} is available.`}</TextEmphasis>
      <Box gap='3xsmall'>
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
          label="View details"
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
};
UpdateItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};
