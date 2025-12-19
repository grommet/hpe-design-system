import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, Paragraph, Text } from 'grommet';
import { WizardContext } from '.';

export const StepHeader = ({ summaryId, titleId, descriptionId }) => {
  const { activeIndex, activeStep, id, steps } = useContext(WizardContext);
  return (
    <Box id={id} gap="3xsmall" flex={false}>
      <Text id={summaryId}>
        Step {activeStep} of {steps.length}
      </Text>
      <Heading margin="none" id={titleId}>
        {steps[activeIndex].title || `Step ${activeStep} title`}
      </Heading>
      {typeof steps[activeIndex].description === 'string' ? (
        <Paragraph size="large" margin="none" id={descriptionId}>
          {steps[activeIndex].description}
        </Paragraph>
      ) : (
        steps[activeIndex].description
      )}
    </Box>
  );
};

StepHeader.propTypes = {
  summaryId: PropTypes.string,
  titleId: PropTypes.string,
  descriptionId: PropTypes.string,
};
