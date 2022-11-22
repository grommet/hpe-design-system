import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Heading, Layer, Paragraph } from 'grommet';
import { FormClose } from 'grommet-icons';

export const CenterInformational = ({ containerRef }) => {
  // containerRef is for demonstration purposes on this site. Most
  // implementations should likely remove.
  const [showModal, setShowModal] = useState(true);

  return (
    <Box align="center" justify="center" fill>
      <Button
        primary
        label="Show informational confirmation"
        onClick={() => setShowModal(true)}
      />
      {showModal && (
        <Layer
          target={containerRef?.current}
          onClickOutside={() => setShowModal(false)}
          onEsc={() => setShowModal(false)}
          modal={false}
        >
          <Box pad="medium">
            <Box direction="row" align="start" gap="small">
              <Box>
                <Heading level={2} size="small" margin="none">
                  Firmware update initiated
                </Heading>
                <Paragraph margin="none">
                  Your firmware update has been initiated and is expected to
                  complete in 8 minutes. You will receive a notification upon
                  completion.
                </Paragraph>
              </Box>
              <Button
                icon={<FormClose />}
                onClick={() => setShowModal(false)}
              />
            </Box>
          </Box>
        </Layer>
      )}
    </Box>
  );
};

CenterInformational.propTypes = {
  containerRef: PropTypes.object,
};
