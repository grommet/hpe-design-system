import React, { useState } from 'react';
import { Box, Button, Text } from 'grommet';
import { Notification } from './ToastNotification';

export const ToastNotificationExample = () => {

    const [visible, setVisible] = useState();

    const onOpen = () => {
        setVisible(true);
        setTimeout(() => {
        setVisible(undefined);
        }, 8000);
    };

    const onClose = () => setVisible(undefined);

    return (
        <>
            <Box align="center" gap="medium">
                <Text textAlign="center">
                    For example purposes, this Toast Notification
                    will disappear after 8 seconds. This is the 
                    recommended lifetime for a toast, as it allows
                    screen readers to relay the content in a 
                    notification. 
                </Text>
                <Button 
                    label="Show me the Notification" 
                    onClick={onOpen} 
                    primary 
                />
            </Box>
            <Box align="center" gap="small">
                {visible && <Notification 
                    toast
                    status="good"
                    title="Toast success!"
                    message="The operation was successful"
                    onClose={onClose}
                />}
            </Box>
        </>
    );
};

