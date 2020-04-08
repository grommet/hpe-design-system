import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Text } from 'grommet';
import { Document, Expand, Grommet, Figma } from 'grommet-icons';

const ControlButton = ({ children, ...rest }) => (
  <Button plain {...rest}>
    {({ hover }) => (
      <Box
        direction="row"
        align="center"
        gap="small"
        pad={{ vertical: 'xsmall', horizontal: 'small' }}
        round="small"
        background={hover ? 'active-background' : undefined}
      >
        {children}
      </Box>
    )}
  </Button>
);

ControlButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    .isRequired,
};

export const ExampleControls = ({ designer, docs, figma, setShowLayer }) => (
  <Box
    background="background-front"
    border={{
      side: 'top',
      color: 'background-back',
      size: 'xsmall',
    }}
    direction="row"
    align="start"
    justify="between"
    pad={{ horizontal: 'medium', vertical: 'small' }}
    round={{ corner: 'bottom', size: 'small' }}
  >
    <Box direction="row-responsive" gap="small">
      {designer && (
        <ControlButton href={designer} target="_blank">
          <Grommet color="plain" />
          <Text weight="bold">Open in Grommet</Text>
        </ControlButton>
      )}
      {figma && (
        <ControlButton href={figma} target="_blank">
          <Figma color="plain" />
          <Text weight="bold">Open in Figma</Text>
        </ControlButton>
      )}
      {docs && (
        <ControlButton href={docs} target="_blank">
          <Document />
          <Text weight="bold">Open docs</Text>
        </ControlButton>
      )}
    </Box>
    <ControlButton onClick={() => setShowLayer(true)}>
      <Expand />
      <Text weight="bold">See Fullscreen</Text>
    </ControlButton>
  </Box>
);

ExampleControls.propTypes = {
  designer: PropTypes.string,
  docs: PropTypes.string,
  figma: PropTypes.string,
  setShowLayer: PropTypes.func,
};
