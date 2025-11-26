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
      background = 'foreground-primary';
      label = 'Do';
    } else if (bestPracticeProp.type === 'dont') {
      background = 'foreground-critical';
      label = "Don't";
    } else if (bestPracticeProp.type === 'caution') {
      background = 'foreground-warning';
      label = 'Caution';
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
          {typeof bestPracticeProp.message === 'string' ? (
            <Paragraph size="small" margin="none">
              {bestPracticeProp.message}
            </Paragraph>
          ) : (
            bestPracticeProp.message
          )}
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
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  }),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
