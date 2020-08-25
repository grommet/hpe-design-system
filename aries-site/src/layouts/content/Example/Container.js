import React from 'react';
import PropTypes from 'prop-types';
import { Box, defaultProps } from 'grommet';

// This creates the overall canvas/frame that the Example sits inside of
export const Container = ({
  designer,
  docs,
  figma,
  height: heightProp,
  horizontalLayout,
  plain,
  screenContainer,
  showResponsiveControls,
  template,
  ...rest
}) => {
  // Height for template screen needs to be between medium and large
  // to maintain aspect ratio, so this is small + medium
  const { small, medium } = defaultProps.theme.global.size;
  const aspectHeight = `${Number(medium) + Number(small)}px`;

  let height;
  if (template || screenContainer) height = aspectHeight;
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
      pad={
        template || screenContainer
          ? { horizontal: 'large', top: 'large' }
          : 'large'
      }
      round={
        !horizontalLayout &&
        (designer || docs || figma || screenContainer || template)
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
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  horizontalLayout: PropTypes.bool,
  plain: PropTypes.bool,
  screenContainer: PropTypes.bool,
  showResponsiveControls: PropTypes.bool,
  template: PropTypes.bool,
};
