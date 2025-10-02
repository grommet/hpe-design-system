import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Heading, Layer, Paragraph } from 'grommet';
import { Close } from 'grommet-icons';

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
            <Box direction="row" align="start" gap="xsmall">
              <Box gap="medium">
                <Heading level={2} margin="none">
                  Firmware update initiated
                </Heading>
                <Paragraph margin="none">
                  Your firmware update has been initiated and is expected to
                  complete in 8 minutes. You will receive a notification upon
                  completion.
                </Paragraph>
              </Box>
              <Button
                icon={<Close />}
                onClick={() => setShowModal(false)}
                a11yTitle={`You are in a layer containing a confirmation that
                the firmare update has been initiated. To close this layer,
                press Enter.`}
                autoFocus
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
