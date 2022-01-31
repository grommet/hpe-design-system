import React from 'react';
import PropTypes from 'prop-types';
import { Box, defaultProps } from 'grommet';

// This creates the overall canvas/frame that the Example sits inside of
export const Container = ({
  designer, // link to grommet designer example
  docs, // link to grommet doc for component
  figma, // link to figma design
  guidance, // link to Design System guidance
  height: heightProp,
  horizontalLayout,
  pad,
  plain, // remove Container from around example
  screenContainer, // show example in mock browser
  showResponsiveControls,
  template, // showing as template causes appropriate aspect ratio
  ...rest
}) => {
  // Height for template screen needs to be between medium and large
  // to maintain aspect ratio, so this is small + medium
  const { small, medium } = defaultProps.theme.global.size;
  const aspectHeight = `${parseInt(medium, 10) + parseInt(small, 10)}px`;

  let height;
  if (heightProp) height = heightProp;
  else if (template || screenContainer) height = heightProp || aspectHeight;
  else if (!plain) height = { min: 'medium' };
  else height = undefined;

  return (
    <Box
      align={!template && !screenContainer ? 'center' : undefined}
      background="background-front"
      direction="row"
      height={height}
      justify="center"
      margin={showResponsiveControls ? { top: 'xsmall' } : undefined}
      pad={pad || (template ? { horizontal: 'large', top: 'large' } : 'large')}
      round={
        !horizontalLayout &&
        (designer || docs || figma || guidance || screenContainer || template)
          ? { corner: 'top', size: 'small' }
          : 'small'
      }
      {...rest}
    />
  );
};

Container.propTypes = {
  designer: PropTypes.string,
  docs: PropTypes.string,
  figma: PropTypes.string,
  guidance: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  horizontalLayout: PropTypes.bool,
  pad: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  plain: PropTypes.bool,
  screenContainer: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      scale: PropTypes.number,
    }),
  ]),
  showResponsiveControls: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.bool,
  ]),
  template: PropTypes.bool,
};
