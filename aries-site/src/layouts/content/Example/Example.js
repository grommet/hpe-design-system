import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  defaultProps,
  Keyboard,
  Layer,
  ResponsiveContext,
} from 'grommet';
import { Contract } from 'grommet-icons';
import {
  BrowserWrapper,
  ExampleControls,
  ExampleResources,
  ResponsiveControls,
  ResponsiveContainer,
} from '.';

export const screens = {
  desktop: 'desktop',
  mobile: 'mobile',
  laptop: 'laptop',
};

export const Example = ({
  children,
  code,
  designer,
  details,
  docs,
  figma,
  height,
  relevantComponents,
  screenContainer,
  template,
  // show screen size controls by default with screenContainer or template
  showResponsiveControls = !!screenContainer || !!template,
  width,
  ...rest
}) => {
  const [screen, setScreen] = React.useState(screens.laptop);
  const [showLayer, setShowLayer] = React.useState(false);

  // Height for template screen needs to be between medium and large
  // to maintain aspect ratio, so this is small + medium
  const { small, medium } = defaultProps.theme.global.size;
  const aspectHeight = `${parseInt(medium, 10) + parseInt(small, 10)}px`;

  let ExampleWrapper;
  // show page layouts inside of mock browser screen to demonstrate
  // how content fills or is restricted at various widths
  if (screenContainer) ExampleWrapper = BrowserWrapper;
  // Wrap content in container that can mock "small" width to demonstrate
  // responsive layout
  else if (showResponsiveControls) ExampleWrapper = ResponsiveContainer;
  else ExampleWrapper = Box;

  return (
    <>
      <Box margin={{ vertical: 'small' }} gap="large">
        <>
          {/* For use with templates or page layouts to toggle between laptop,
           ** desktop, and mobile views */}
          {showResponsiveControls && (
            <ResponsiveControls
              controls={showResponsiveControls}
              onSetScreen={setScreen}
              screen={screen}
            />
          )}
          <Box
            align={!template && !screenContainer ? 'center' : undefined}
            background="background-front"
            direction="row"
            height={template || screenContainer ? aspectHeight : height}
            justify="center"
            margin={showResponsiveControls ? { top: 'xsmall' } : undefined}
            pad={
              template || screenContainer
                ? { horizontal: 'large', top: 'large' }
                : 'large'
            }
            round={
              designer || docs || figma || screenContainer || template
                ? { corner: 'top', size: 'small' }
                : 'small'
            }
            {...rest}
          >
            <ExampleWrapper screen={screen} width={width}>
              <ResponsiveContext.Provider
                value={screen === screens.mobile && 'small'}
              >
                {children}
              </ResponsiveContext.Provider>
            </ExampleWrapper>
          </Box>
          {(designer || docs || figma || screenContainer || template) && (
            <ExampleControls
              designer={designer}
              docs={docs}
              figma={figma}
              setShowLayer={value => setShowLayer(value)}
            />
          )}
        </>
        <ExampleResources
          code={code}
          details={details}
          relevantComponents={relevantComponents}
        />
      </Box>
      {showLayer && (
        <Keyboard
          onEsc={() => {
            setShowLayer(false);
            setScreen(screens.laptop);
          }}
        >
          <Layer full animation="fadeIn">
            <Box fill background="background-front">
              <Box
                direction="row"
                justify={
                  template || screenContainer || showResponsiveControls
                    ? 'between'
                    : 'end'
                }
                pad="xxsmall"
                background="#111"
              >
                {(template || screenContainer || showResponsiveControls) && (
                  <ResponsiveControls onSetScreen={setScreen} screen={screen} />
                )}
                <Button
                  title="Leave full screen"
                  icon={<Contract />}
                  onClick={() => {
                    setShowLayer(false);
                    setScreen(screens.laptop);
                  }}
                  hoverIndicator
                />
              </Box>
              <Box
                direction="row"
                justify="center"
                align={!template && !screenContainer ? 'center' : undefined}
                flex
                {...rest}
              >
                {screenContainer || showResponsiveControls ? (
                  <Box width={screen === screens.mobile ? 'medium' : '100%'}>
                    <ResponsiveContext.Provider
                      value={screen === screens.mobile && 'small'}
                    >
                      {children}
                    </ResponsiveContext.Provider>
                  </Box>
                ) : (
                  <ResponsiveContext.Provider
                    value={screen === screens.mobile && 'small'}
                  >
                    {children}
                  </ResponsiveContext.Provider>
                )}
              </Box>
            </Box>
          </Layer>
        </Keyboard>
      )}
    </>
  );
};

Example.propTypes = {
  children: PropTypes.element,
  code: PropTypes.string,
  components: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      href: PropTypes.string,
    }),
  ),
  details: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  ),
  designer: PropTypes.string,
  docs: PropTypes.string,
  figma: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  relevantComponents: PropTypes.arrayOf(PropTypes.string),
  screenContainer: PropTypes.bool,
  showResponsiveControls: PropTypes.bool,
  template: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

Example.defaultProps = {
  height: { min: 'medium' },
};
