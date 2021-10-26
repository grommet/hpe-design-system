import React from 'react';
import PropTypes from 'prop-types';
import { Box, Paragraph, Text } from 'grommet';
import { Container } from '.';

export const DoDontContainer = ({
  bestPractice: bestPracticeProp,
  ...rest
}) => {
  let bestPractice;
  let background;
  let label;
  if (bestPracticeProp) {
    if (bestPracticeProp.type === 'do') {
      background = 'green!';
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
      <Container {...rest} />
      {bestPractice}
    </>
  );
};

DoDontContainer.propTypes = {
  bestPractice: PropTypes.shape({
    type: PropTypes.oneOf(['do', 'dont']).isRequired,
    message: PropTypes.string,
  }),
};
