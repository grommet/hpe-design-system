import React, { useState, useRef, useContext } from 'react';
import { Popover } from 'aries-core';
import {
  Anchor,
  Grid,
  Card,
  CardBody,
  Button,
  Box,
  Paragraph,
  Text,
  Heading,
  ResponsiveContext,
} from 'grommet';
import { CircleInformation } from 'grommet-icons';

const device = [
  {
    title: 'Require assignments',
    devices: '17',
  },
  {
    title: 'Require subscriptions',
    devices: '6',
  },
  {
    title: 'Assigned & subscribed',
    devices: '74',
  },
];

const columns = {
  xsmall: ['auto'],
  small: ['auto', 'auto', 'auto'],
  medium: ['auto', 'auto', 'auto'],
  large: ['auto', 'auto', 'auto'],
  xlarge: ['auto', 'auto', 'auto', 'auto'],
};

// eslint-disable-next-line react/prop-types
const CardDevices = ({ title, devices }) => (
  <Card>
    <CardBody>
      <Text>{title}</Text>
      <Text>{devices}</Text>
    </CardBody>
  </Card>
);

export const PopoverInlineExample = () => {
  const breakpoint = useContext(ResponsiveContext);
  const [showPopover, setShowPopover] = useState(false);
  const targetRef = useRef();

  const handleButtonClick = () => {
    setShowPopover(prev => !prev);
  };

  const handleClosePopover = () => {
    setShowPopover(false);
  };

  return (
    <Box gap="medium">
      <Box
        justify="between"
        direction={!['xsmall', 'small'].includes(breakpoint) ? 'row' : 'column'}
      >
        <Box>
          <Heading margin="none" level={2}>
            Inventory
          </Heading>
          <Box direction="row">
            <Text size="large">
              View all available devices or add new devices.
            </Text>
            <Button
              align="center"
              justify="start"
              icon={<CircleInformation aria-hidden size="small" />}
              onClick={handleButtonClick}
              ref={targetRef}
              a11yTitle="Informational help"
              aria-expanded={showPopover}
              aria-haspopup="true"
              aria-controls="popover-info"
            />
          </Box>
        </Box>
        {showPopover && (
          <Popover
            footer={
              <Anchor
                alignSelf="start"
                size="small"
                label="Learn more"
                href="#"
              />
            }
            target={targetRef.current}
            onClickOutside={handleClosePopover}
            onEsc={handleClosePopover}
            onClose={handleClosePopover}
            align={{ bottom: 'top', left: 'left' }}
            id="popover-info"
          >
            <Paragraph size="small" margin="none">
              A server is added to a group when you apply an HPE GreenLake
              device tag that matches the tag of a server group with Automate
              adding servers enabled or when a server with a matching device tag
              is added to a Compute Ops Management application instance.
            </Paragraph>
          </Popover>
        )}
      </Box>
      <Grid columns={columns[breakpoint]} gap="medium">
        {device.map((item, index) => (
          <CardDevices key={index} title={item.title} devices={item.devices} />
        ))}
      </Grid>
    </Box>
  );
};
