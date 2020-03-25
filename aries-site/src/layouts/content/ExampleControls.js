import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Text } from 'grommet';
import { Expand, Grommet, Figma } from 'grommet-icons';

const ControlButton = ({ children, ...rest }) => (
  <Button plain {...rest}>
    {({ hover }) => (
      <Box
        direction="row"
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

export const ExampleControls = ({
  designer,
  figma,
  setShowLayer,
  template,
}) => (
  <Box
    background="background-front"
    border={{
      side: 'top',
      color: 'background-back',
      size: 'xsmall',
    }}
    direction="row"
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
    </Box>
    {template && (
      <ControlButton onClick={() => setShowLayer(true)}>
        <Expand />
        <Text weight="bold">See Fullscreen</Text>
      </ControlButton>
    )}
  </Box>
);

ExampleControls.propTypes = {
  designer: PropTypes.string,
  figma: PropTypes.string,
  template: PropTypes.bool,
  setShowLayer: PropTypes.func,
};
