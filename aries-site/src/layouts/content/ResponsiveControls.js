import React from 'react';
import { Box, Button } from 'grommet';
import PropTypes from 'prop-types';
import { Desktop } from 'grommet-icons';
import { IconMobile, IconLaptop } from '../../components';
import { screens } from '..';

export const ResponsiveControls = ({ onSetScreen, screen }) => {
  return (
    <Box direction="row" gap="xsmall">
      <Button
        label="Laptop"
        icon={<IconLaptop />}
        active={screen === screens.laptop}
        onClick={() => {
          onSetScreen(screens.laptop);
        }}
      />
      <Button
        label="Desktop"
        icon={<Desktop />}
        active={screen === screens.desktop}
        onClick={() => {
          onSetScreen(screens.desktop);
        }}
      />
      <Button
        label="Mobile"
        icon={<IconMobile />}
        active={screen === screens.mobile}
        onClick={() => {
          onSetScreen(screens.mobile);
        }}
      />
    </Box>
  );
};

ResponsiveControls.propTypes = {
  onSetScreen: PropTypes.func.isRequired,
  screen: PropTypes.string.isRequired,
};
