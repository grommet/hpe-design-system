import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Paragraph, ResponsiveContext } from 'grommet';
import { TextEmphasis } from 'aries-core';
import { Container } from '.';

export const DoDontContainer = ({
  bestPractice: bestPracticeProp,
  height,
  ...rest
}) => {
  let bestPractice;
  let background;
  let label;
  const size = useContext(ResponsiveContext);
  if (bestPracticeProp) {
    if (bestPracticeProp.type === 'do') {
      background = 'green!';
      label = 'Do';
    } else if (bestPracticeProp.type === 'dont') {
      background = 'red';
      label = "Don't";
    }

    bestPractice = (
      <Box gap="3xsmall">
        <Box
          pad="3xsmall"
          background={background}
          fill="horizontal"
          margin={{ top: 'xsmall' }}
          round="xxsmall"
        />
        <Box>
          <TextEmphasis size="large">{label}</TextEmphasis>
          <Paragraph size="small" margin="none">
            {bestPracticeProp.message}
          </Paragraph>
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Container
        height={!['xsmall', 'small'].includes(size) ? height : undefined}
        {...rest}
      />
      {bestPractice}
    </>
  );
};

DoDontContainer.propTypes = {
  bestPractice: PropTypes.shape({
    type: PropTypes.oneOf(['do', 'dont']).isRequired,
    message: PropTypes.string,
  }),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
