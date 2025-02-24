import React from 'react';
import styled from 'styled-components';
// eslint-disable-next-line import/no-unresolved
import { global, components } from 'hpe-design-tokens/grommet';
import { Box, Button, FormField, TextInput } from 'grommet';

const HoverButton = styled(Button)`
  background: ${props =>
    props.theme.global.colors[components.hpe.button.primary.hover.background][
      props.theme.dark ? 'dark' : 'light'
    ]};
`;

const FocusButton = styled(Button)`
  outline-color: ${props =>
    props.theme.global.colors[global.hpe.focusIndicator.outline.color][
      props.theme.dark ? 'dark' : 'light'
    ]};
  outline-width: ${global.hpe.focusIndicator.outline.width};
  outline-style: ${global.hpe.focusIndicator.outline.style};
  outline-offset: ${global.hpe.focusIndicator.outlineOffset};
`;

// eslint-disable-next-line react/prop-types
export const ButtonStates = ({ size, tabIndex }) => (
  <Box direction="row" gap="small">
    <Button label="Rest" tabIndex={tabIndex} size={size} primary />
    <HoverButton label="Hover" tabIndex={tabIndex} size={size} primary />
    <FocusButton label="Focus" tabIndex={tabIndex} size={size} primary />
  </Box>
);

export const ComponentStates = () => {
  return (
    <Box gap="medium">
      <ButtonStates />
      <Box direction="row" gap="small">
        <FormField label="Label" htmlFor="name" name="name">
          <TextInput id="name" name="name" />
        </FormField>
        <FormField
          label="Label"
          htmlFor="name-2"
          name="name-2"
          error="There is an error"
        >
          <TextInput id="name-2" name="name-2" />
        </FormField>
      </Box>
    </Box>
  );
};
