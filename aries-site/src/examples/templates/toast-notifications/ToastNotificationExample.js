import React, { useState } from 'react';
import { Box, Button, Notification, Paragraph } from 'grommet';

export const ToastNotificationExample = () => {

    const [visible, setVisible] = useState();

    const onOpen = () => setVisible(true);
    const onClose = () => setVisible(undefined);

    return (
        <>
            <Box align="center" gap="medium">
                <Paragraph textAlign="center">
                    This notification will disappear after 8 seconds
                    if not dismissed via the close button.
                </Paragraph>
                <Button 
                    label="Show the Toast Notification" 
                    onClick={onOpen} 
                    primary 
                />
            </Box>
            <Box align="center" gap="small">
                {visible && <Notification 
                    toast
                    status="normal"
                    title="Toast success!"
                    message="The operation was successful"
                    onClose={onClose}
                />}
            </Box>
        </>
    );
};

