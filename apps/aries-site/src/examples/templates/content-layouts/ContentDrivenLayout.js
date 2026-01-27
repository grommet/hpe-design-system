import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from 'grommet';

import { DestructiveConfirmation } from '../DestructiveConfirmation';

const path = '/products/data/47287498729/collections/KCHDvfcByKvvjymNheg';

export const ContentDrivenLayout = ({ containerRef }) => {
  // containerRef is for demonstration purposes on this site. Most
  // implementations should likely remove.
  const [showModal, setShowModal] = useState(true);

  return (
    <Box align="center" justify="center" fill>
      <Button
        primary
        label="Display layer"
        onClick={() => {
          setShowModal(true);
        }}
      />
      {showModal ? (
        <DestructiveConfirmation
          title="Delete data"
          message={`This will permanently delete all 
          data, including nested data, located at:`}
          path={path}
          setShowModal={setShowModal}
          onSubmit={() => {
            // Your submission logic here
          }}
          target={containerRef && containerRef.current}
        />
      ) : null}
    </Box>
  );
};

ContentDrivenLayout.propTypes = { containerRef: PropTypes.object };
