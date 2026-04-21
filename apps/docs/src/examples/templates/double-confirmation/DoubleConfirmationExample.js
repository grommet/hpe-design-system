import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from 'grommet';
import { ModalDialog, ModalFooter } from '@shared/aries-core';

export const DoubleConfirmationExample = ({ containerRef }) => {
    // containerRef is for demonstration purposes on this site. Most
    // implementations should likely remove.
    const [showModal, setShowModal] = useState(true);

    const onOpen = () => setShowModal(true);
    const onClose = () => setShowModal(false);

    return (
        <Box align="center" justify="center" fill>
            <Button
                primary
                label="Show me double confirmation"
                onClick={onOpen}
            />
            {showModal && (
                <ModalDialog
                    title='Discard "Add application"?'
                    subtitle="Your changes will not be applied."
                    onEsc={onClose}
                    target={containerRef?.current}
                    // 'width: undefined' is for demonstration purposes on 
                    // this site. Most implementations should likely remove
                    boxProps={{ width: undefined }}
                >
                    <ModalFooter>
                        <Button label="Cancel" onClick={onClose} />
                        <Button label="Discard" primary onClick={onClose} />
                    </ModalFooter>
                </ModalDialog>
            )}
        </Box>
    );
};

DoubleConfirmationExample.propTypes = {
    containerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};