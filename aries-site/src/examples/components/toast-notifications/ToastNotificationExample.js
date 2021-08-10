import React, { useState } from 'react';
import { Box, Button } from 'grommet';
import { Notification } from './ToastNotification';

export const ToastNotificationExample = () => {

    const [open, setOpen] = useState(false);

    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(undefined);

    return (
        <>
            <Box align="start">
                <Button 
                    label="Show me the Notification" 
                    onClick={onOpen} 
                    primary 
                />
            </Box>
            <Box align="center" gap="small">
                {open && <Notification 
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