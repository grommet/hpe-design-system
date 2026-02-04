import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import { Box, Diagram, Grid, Form, ResponsiveContext, Stack } from 'grommet';
import {
  CancellationLayer,
  StepFooter,
  StepHeader,
  WizardContext,
  WizardHeader,
} from './components';
import { getWidth } from './utils';
import { Annotation } from '../../../layouts';
import { StepOne } from './WizardValidationExample';
import { connection } from '../../../utils';

const connections = [
  connection('1a', 'wizard-title', 'vertical'),
  connection('1b', 'previous-button'),
  connection('1c', 'cancel-button'),
  connection('2b', 'step-summary'),
  connection('2a', 'step-title'),
  connection('2c', 'step-description'),
  connection('3', 'step-inputs'),
  connection('4', 'step-footer'),
  connection('4a', 'next-step'),
];

export const WizardAnatomy = ({ containerRef }) => (
  <Stack interactiveChild="first">
    <Grid
      columns={['5xsmall', 'flex', '5xsmall']}
      rows={['36px', '60px', '48px', '24px', '60px', '60px', 'auto', '85px']}
      areas={[
        ['empty-1', 'annotation-1a', 'empty-2'],
        ['annotation-1b', 'wizard', 'annotation-1c'],
        ['empty-3', 'wizard', 'empty-4'],
        ['annotation-2b', 'wizard', 'empty-4'],
        ['annotation-2a', 'wizard', 'empty-4'],
        ['annotation-2c', 'wizard', 'empty-4'],
        ['annotation-3', 'wizard', 'empty-4'],
        ['annotation-4', 'wizard', 'annotation-4a'],
      ]}
      align="center"
      justify="center"
      gap={{ column: 'medium' }}
    >
      <WizardExample gridArea="wizard" containerRef={containerRef} />
      <Annotation
        alignSelf="center"
        id="1a"
        target="1a"
        gridArea="annotation-1a"
      />
      <Annotation id="1b" target="1b" gridArea="annotation-1b" />
      <Annotation id="1c" target="1c" gridArea="annotation-1c" />
      <Annotation id="2b" target="2b" gridArea="annotation-2b" />
      <Annotation id="2a" target="2a" gridArea="annotation-2a" />
      <Annotation id="2c" target="2c" gridArea="annotation-2c" />
      <Annotation
        id="3"
        target="3"
        gridArea="annotation-3"
        alignSelf="center"
      />
      <Annotation
        id="4"
        target="4"
        gridArea="annotation-4"
        alignSelf="center"
      />
      <Annotation
        id="4a"
        target="4a"
        gridArea="annotation-4a"
        alignSelf="center"
      />
    </Grid>
    <Diagram connections={connections} />
  </Stack>
);

WizardAnatomy.propTypes = {
  containerRef: PropTypes.node,
};

const defaultFormValues = {
  'firstname-validation': '',
  'lastname-validation': '',
  'text-input-validation': '',
  'radio-button-group-validation': '',
};

// placeholders so anatomy diagram shows second step
const steps = [
  {
    title: 'Step 1 title',
  },
  {
    description: `Step 2 description. Keep each step simple and limited to 
    inputs related to the step's topic.`,
    inputs: <StepOne />,
    title: 'Step 2 title',
  },
  {
    title: 'Step 3 title',
  },
];

const WizardExample = ({ containerRef, ...rest }) => {
  const breakpoint = useContext(ResponsiveContext);
  const theme = useContext(ThemeContext);

  const numberColumns = 2;
  const width = getWidth(numberColumns, theme, breakpoint);

  const [activeIndex, setActiveIndex] = useState(1);
  // for readability, this is used to display numeric value of step on screen,
  // such as step 1 of 3. it will always be one more than the active array index
  const [activeStep, setActiveStep] = useState(activeIndex + 1);

  // store form values in state so they persist
  // when user goes back a step
  const [formValues, setFormValues] = useState(defaultFormValues);

  // controls state of cancel layer
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setActiveStep(activeIndex + 1);
  }, [activeIndex]);

  const ref = useRef();

  const contextValue = useMemo(
    () => ({
      activeIndex,
      id: 'anatomy',
      defaultFormValues,
      setActiveIndex,
      activeStep,
      setActiveStep,
      valid: true,
      steps,
      formValues,
      setFormValues,
      wizardTitle: 'Wizard Title',
      width,
    }),
    [activeIndex, activeStep, formValues, width],
  );

  return (
    <WizardContext.Provider value={contextValue}>
      <Box
        ref={ref}
        background="background-front"
        height="min-content"
        fill="horizontal"
        {...rest}
      >
        <Box fill>
          <WizardHeader
            titleId="wizard-title"
            cancelId="cancel-button"
            previousId="previous-button"
            setOpen={setOpen}
          />
          <Box
            align="center"
            pad={
              !['xsmall', 'small'].includes(breakpoint)
                ? { vertical: 'xlarge' }
                : { vertical: 'medium' }
            }
            overflow="auto"
            flex={['xsmall', 'small'].includes(breakpoint) ? true : undefined}
            margin={
              !['xsmall', 'small'].includes(breakpoint)
                ? { horizontal: 'medium' }
                : undefined
            }
          >
            <Box
              width={width}
              gap="medium"
              pad={
                ['xsmall', 'small'].includes(breakpoint)
                  ? { horizontal: 'medium' }
                  : '5xsmall'
              }
            >
              <StepHeader
                summaryId="step-summary"
                titleId="step-title"
                descriptionId="step-description"
              />
              <Box margin={{ top: 'xsmall' }}>
                <Form
                  id="step-inputs"
                  messages={{
                    required: 'This is a required field.',
                  }}
                >
                  {steps[activeIndex].inputs}
                </Form>
              </Box>
            </Box>
          </Box>
          <StepFooter nextId="next-step" id="step-footer" />
        </Box>
      </Box>
      {open && <CancellationLayer target={ref?.current} onSetOpen={setOpen} />}
    </WizardContext.Provider>
  );
};

WizardExample.propTypes = {
  containerRef: PropTypes.node,
};
