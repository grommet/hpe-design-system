import React from 'react';
import { Box, Button } from 'grommet';
import PropTypes from 'prop-types';
import { Desktop, PhoneVertical, PersonalComputer } from 'grommet-icons';
import { screens } from '..';

export const ResponsiveControls = ({ controls, onSetScreen, screen }) => {
  // If controls is a boolean, we want all screen options to show by default
  let desktop = true;
  let laptop = true;
  let mobile = true;

  // Only show controls that are specified by the Example
  if (Array.isArray(controls)) {
    if (!controls.includes(screens.desktop)) desktop = false;
    if (!controls.includes(screens.laptop)) laptop = false;
    if (!controls.includes(screens.mobile)) mobile = false;
  }

  return (
    <Box direction="row" gap="xsmall">
      {desktop && (
        <Button
          label="Desktop"
          icon={<Desktop />}
          active={screen === screens.desktop}
          onClick={() => {
            onSetScreen(screens.desktop);
          }}
        />
      )}
      {laptop && (
        <Button
          label="Laptop"
          icon={<PersonalComputer />}
          active={screen === screens.laptop}
          onClick={() => {
            onSetScreen(screens.laptop);
          }}
        />
      )}
      {mobile && (
        <Button
          label="Mobile"
          icon={<PhoneVertical />}
          active={screen === screens.mobile}
          onClick={() => {
            onSetScreen(screens.mobile);
          }}
        />
      )}
    </Box>
  );
};

ResponsiveControls.propTypes = {
  controls: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.bool,
  ]).isRequired,
  onSetScreen: PropTypes.func.isRequired,
  screen: PropTypes.string.isRequired,
};
