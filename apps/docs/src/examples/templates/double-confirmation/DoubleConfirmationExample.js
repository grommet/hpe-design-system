import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Layer } from 'grommet';
import { LayerHeader } from '@shared/aries-core';


export const DoubleConfirmationExample = ({ containerRef }) => {
    // containerRef is for demonstration purposes on this site. Most
    // implementations should likely remove.
    const [showModal, setShowModal] = useState(true);
    return (
        <Box align="center" justify="center" fill>
            <Button
                primary
                label="Show medouble confirmation"
                onClick={() => setShowModal(true)}
            />
            {showModal && (
                <Layer
                    target={containerRef?.current}
                    onClickOutside={() => setShowModal(false)}
                    onEsc={() => setShowModal(false)}
                    modal={false}
                >
                    <Box pad="medium" gap="medium">
                        <LayerHeader
                            title='Discard "Add Application"?'
                            subtitle="Your changes will not be applied."
                        />
                        <Box direction="row" gap="xsmall" justify="end">
                            <Button
                                label="Cancel"
                                onClick={() => setShowModal(false)}
                            />
                            <Button
                                label="Discard"
                                primary
                                onClick={() => setShowModal(false)}
                            />
                        </Box>
                    </Box>
                </Layer>
            )}
        </Box >
    );
};

DoubleConfirmationExample.propTypes = {
    containerRef: PropTypes.object,
};
