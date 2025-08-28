import { Box, Button } from 'grommet';
import PropTypes from 'prop-types';
import {
  Desktop,
  Expand,
  PhoneVertical,
  PersonalComputer,
} from 'grommet-icons';

import { screens } from '..';

export const ResponsiveControls = ({
  controls: controlsProp,
  onSetScreen,
  screen,
  fullscreen: displayingFullscreen,
  setFullscreen,
}) => {
  // default controls to display
  const controls = {
    desktop: true,
    laptop: true,
    mobile: true,
    fullScreen: false,
  };

  Object.entries(controls).forEach(([key]) => {
    if (controlsProp === false) controls[key] = false;
    else if (Array.isArray(controlsProp))
      controls[key] = controlsProp.includes(key);
  });

  const { desktop, laptop, mobile, fullScreen } = controls;

  return (
    <Box direction="row" gap='3xsmall' wrap>
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
      {fullScreen && !displayingFullscreen && (
        <Button
          label="Interact in Fullscreen"
          icon={<Expand />}
          onClick={() => setFullscreen(true)}
        />
      )}
      {!fullScreen && !displayingFullscreen && (
        <Button
          a11yTitle="Interact in fullscreen"
          tip="See Fullscreen"
          icon={<Expand />}
          onClick={() => setFullscreen(true)}
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
  fullscreen: PropTypes.bool,
  setFullscreen: PropTypes.func,
};
