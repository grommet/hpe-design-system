import React, { useCallback, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Keyboard, Layer, ResponsiveContext } from 'grommet';
import { Contract } from 'grommet-icons';
import {
  BrowserWrapper,
  Container,
  ExampleControls,
  ExampleResources,
  HorizontalExample,
  ResponsiveControls,
  ResponsiveContainer,
} from '.';

export const screens = {
  desktop: 'desktop',
  mobile: 'mobile',
  laptop: 'laptop',
};

export const Example = ({
  background,
  children,
  code, // github code link used to display code inline
  designer, // link to grommet designer example
  details,
  docs, // link to grommet doc for component
  figma, // link to figma design
  github, // link to github directory
  height,
  horizontalLayout,
  plain, // remove Container from around example
  relevantComponents,
  screenContainer, // show example in mock browser
  template, // showing as template causes appropriate aspect ratio
  // show screen size controls by default with screenContainer or template
  showResponsiveControls = !!screenContainer || !!template,
  width,
  ...rest
}) => {
  const [screen, setScreen] = React.useState(screens.laptop);
  const [showLayer, setShowLayer] = React.useState(false);
  const size = useContext(ResponsiveContext);
  const inlineRef = useRef();
  const layerRef = useRef();

  // ensure that when page loads or layer opens/closes that the ref value
  // is not null
  const [, updateState] = React.useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  React.useEffect(() => {
    forceUpdate();
  }, [showLayer, forceUpdate]);

  // If plain, we remove the Container that creates a padded
  // box with rounded corners around Example content
  const ExampleContainer = plain ? Box : Container;

  // These props control the styling of the example within the overall example
  // container
  const containerProps = {
    designer,
    docs,
    figma,
    height,
    horizontalLayout,
    plain,
    screenContainer,
    showResponsiveControls,
    template,
  };

  // Affects how the Example can behave/display within the outer container
  // for example, wrapping on a mock browser, etc.s
  let ExampleWrapper;
  // show page layouts inside of mock browser screen to demonstrate
  // how content fills or is restricted at various widths
  if (screenContainer) ExampleWrapper = BrowserWrapper;
  // Wrap content in container that can mock "small" width to demonstrate
  // responsive layout
  else if (showResponsiveControls) ExampleWrapper = ResponsiveContainer;
  else ExampleWrapper = Box;

  let viewPort;
  if (screen === screens.mobile) viewPort = 'small';
  else if (!screenContainer && !showResponsiveControls) viewPort = size;
  else viewPort = undefined;

  // when Layer is open, we remove the inline Example to avoid
  // repeat id tags that may impede interactivity of inputs
  const content = !showLayer && (
    <ExampleContainer {...containerProps}>
      <ExampleWrapper
        background={
          ExampleWrapper === ResponsiveContainer && background
            ? background
            : undefined
        }
        screen={screen}
        width={width}
        ref={inlineRef}
      >
        <ResponsiveContext.Provider value={viewPort}>
          {React.cloneElement(children, {
            containerRef: inlineRef,
          })}
        </ResponsiveContext.Provider>
      </ExampleWrapper>
    </ExampleContainer>
  );

  const controls = (designer ||
    docs ||
    figma ||
    screenContainer ||
    template) && (
    <ExampleControls
      designer={designer}
      docs={docs}
      figma={figma}
      horizontalLayout={horizontalLayout}
      setShowLayer={value => setShowLayer(value)}
    />
  );

  const resources = (
    <ExampleResources
      code={code}
      github={github}
      details={details}
      margin={showResponsiveControls ? { top: 'xsmall' } : undefined}
      horizontalLayout={horizontalLayout}
      relevantComponents={relevantComponents}
    />
  );

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
          {!horizontalLayout ? (
            <>
              {content}
              {controls}
              {resources}
            </>
          ) : (
            <HorizontalExample
              content={content}
              controls={controls}
              height={height}
              plain={plain}
              resources={resources}
              showResponsiveControls={showResponsiveControls}
              width={width}
            />
          )}
        </>
      </Box>
      {showLayer && (
        <Keyboard
          onEsc={() => {
            setShowLayer(false);
            setScreen(screens.laptop);
          }}
        >
          <Layer full animation="fadeIn">
            <Box fill background="background">
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
                  <ResponsiveControls
                    controls={showResponsiveControls}
                    onSetScreen={setScreen}
                    screen={screen}
                  />
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
                background={
                  ExampleWrapper === ResponsiveContainer && background
                    ? background
                    : undefined
                }
                direction="row"
                justify="center"
                align={!template && !screenContainer ? 'center' : undefined}
                flex
                overflow="auto"
                {...rest}
              >
                {screenContainer || showResponsiveControls ? (
                  <Box
                    // for purpose of inline scroll behavior on templates
                    // this id is needed to reference the scroll parent
                    id="layer-wrapper"
                    width={screen === screens.mobile ? 'medium' : '100%'}
                    ref={layerRef}
                  >
                    <ResponsiveContext.Provider value={viewPort}>
                      {React.cloneElement(children, {
                        containerRef: layerRef,
                      })}
                    </ResponsiveContext.Provider>
                  </Box>
                ) : (
                  <ResponsiveContext.Provider value={viewPort}>
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
  background: PropTypes.string,
  children: PropTypes.element,
  code: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
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
  github: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  horizontalLayout: PropTypes.bool,
  plain: PropTypes.bool,
  relevantComponents: PropTypes.arrayOf(PropTypes.string),
  screenContainer: PropTypes.bool,
  showResponsiveControls: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.bool,
  ]),
  template: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
