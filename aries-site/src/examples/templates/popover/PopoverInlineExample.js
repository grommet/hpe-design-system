import React, { useState, useRef } from 'react';

import { Popover } from 'aries-core';
import { Anchor, Button, Box, Paragraph, Text, Heading } from 'grommet';
import { CircleInformation } from 'grommet-icons';

export const PopoverInlineExample = () => {
    const [showPopover, setShowPopover] = useState(false);
    const targetRef = useRef();

    const handleButtonClick = () => {
        setShowPopover(true);
    };

    const handleClosePopover = () => {
        setShowPopover(false);
    };

    return (
        <Box justify="between" direction="row">
            <Box>
                <Heading margin='none' level={2}>Inventory</Heading>
                <Box direction='row'>
                    <Text size="large">
                        View all available devices or add new devices.
                    </Text>
                    <Button
                        align="center"
                        justify="start"
                        icon={<CircleInformation size="small" />}
                        onClick={handleButtonClick}
                        ref={targetRef}
                        a11yTitle='informational help'
                    />
                </Box>
            </Box>
            <Box gap='medium' direction='row' alignSelf='end' justify='end'>
                <Button
                    secondary
                    label="Download Device List" />
                <Button
                    primary
                    label="Add Devices" />
            </Box>
            {showPopover && (
                <Popover
                    heading={
                        <Paragraph margin='none'>
                            Automatically Adding Servers
                        </Paragraph>}
                    footer={<Anchor label="Learn more" href="#" />}
                    target={targetRef.current}
                    onClickOutside={handleClosePopover}
                    onEsc={handleClosePopover}
                    onClose={handleClosePopover}
                >
                    <Paragraph size="small" margin="none">
                        A server is added to a group when you apply an HPE
                        GreenLake device tag that matches the tag of a server
                        group with Automate adding servers enabled or when a
                        server with a matching device tag is added
                        to a Compute Ops Management application instance.
                    </Paragraph>
                </Popover>
            )}
        </Box>
    );
};
