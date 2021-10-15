import React from 'react';
import PropTypes from 'prop-types';
import { Box, defaultProps, Paragraph, Text } from 'grommet';

// This creates the overall canvas/frame that the Example sits inside of
export const Container = ({
  bestPractice: bestPracticeProp,
  designer, // link to grommet designer example
  docs, // link to grommet doc for component
  figma, // link to figma design
  guidance, // link to Design System guidance
  height: heightProp,
  horizontalLayout,
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
  else if (template || screenContainer) height = aspectHeight;
  else if (!plain) height = { min: 'medium' };
  else height = undefined;

  let bestPractice;
  let background;
  let label;
  if (bestPracticeProp) {
    if (bestPracticeProp.type === 'do') {
      background = 'brand';
      label = 'Do';
    } else if (bestPracticeProp.type === 'dont') {
      background = 'red';
      label = "Don't";
    }

    bestPractice = (
      <Box gap="xsmall">
        <Box
          pad="xsmall"
          background={background}
          fill="horizontal"
          margin={{ top: 'small' }}
          round="xxsmall"
        />
        <Box>
          <Text color="text-strong" weight="bold" size="large">
            {label}
          </Text>
          <Paragraph size="small" margin="none">
            {bestPracticeProp.message}
          </Paragraph>
        </Box>
      </Box>
    );
  }

  return (
    <>
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
          (designer || docs || figma || guidance || screenContainer || template)
            ? { corner: 'top', size: 'small' }
            : 'small'
        }
        {...rest}
      />
      {bestPractice}
    </>
  );
};

Container.propTypes = {
  bestPractice: PropTypes.shape({
    type: PropTypes.oneOf(['do', 'dont']).isRequired,
    message: PropTypes.string,
  }),
  designer: PropTypes.string,
  docs: PropTypes.string,
  figma: PropTypes.string,
  guidance: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  horizontalLayout: PropTypes.bool,
  plain: PropTypes.bool,
  screenContainer: PropTypes.bool,
  showResponsiveControls: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.bool,
  ]),
  template: PropTypes.bool,
};
