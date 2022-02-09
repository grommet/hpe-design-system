import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Anchor, Box, Button, Text } from 'grommet';
import { FormDown, FormUp } from 'grommet-icons';

export const UpdateItem = ({ title, description }) => {
  // HPE Design System guidance for string length prior to truncation.
  const MAX_STRING_LENGTH = 192;

  const [showAllDescription, setShowAllDescription] = useState(false);
  return (
    <Box>
      <Text weight="bold">{`${title} is available.`}</Text>
      <Box gap="xsmall">
        {description.length <= MAX_STRING_LENGTH ? (
          <Text>{description}</Text>
        ) : (
          <>
            {!showAllDescription ? (
              <Text>{`${description.substring(
                0,
                MAX_STRING_LENGTH,
              )} ...`}</Text>
            ) : (
              <Text>{description}</Text>
            )}
            <TruncateButton
              showAll={showAllDescription}
              setShowAll={setShowAllDescription}
            />
          </>
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
};
UpdateItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

const TruncateButton = ({ showAll, setShowAll }) => (
  <Button
    alignSelf="start"
    size="small"
    label={`Show ${!showAll ? 'all' : 'less'}`}
    onClick={() => setShowAll(!showAll)}
    icon={!showAll ? <FormDown /> : <FormUp />}
    reverse
  />
);

TruncateButton.propTypes = {
  showAll: PropTypes.bool,
  setShowAll: PropTypes.func,
};
