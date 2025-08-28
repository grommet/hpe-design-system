import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import {
  Box,
  NameValueList,
  NameValuePair,
  ResponsiveContext,
  Text,
} from 'grommet';
import {
  CancellationLayer,
  WizardContext,
  WizardHeader,
  StepContent,
  StepFooter,
} from '../../../templates/wizard/components';
import { getWidth } from '../../../templates/wizard/utils';

const data = {
  'Request name': 'Q1 Collection Request',
  'Request description': '',
  'Contact number': '',
  'Request type': 'Collection',
  'Initiated by': 'Jane Cooper',
  'Domain name': 'https://att.com',
};

const StepThree = () => (
  <Box gap='xsmall' pad={{ vertical: 'medium' }}>
    <NameValueList>
      {Object.entries(data).map(([name, value]) => (
        <NameValuePair key={name} name={name}>
          {value || <Text a11yTitle="No value">--</Text>}
        </NameValuePair>
      ))}
    </NameValueList>
  </Box>
);

const StepOne = () => <Box width="medium">This is step 1.</Box>;

const StepTwo = () => <Box width="medium">This is step 2.</Box>;

const steps = [
  {
    description: 'Step 1 description.',
    inputs: <StepOne />,
    title: 'Step 1 title',
  },
  {
    description: 'Step 2 description.',
    inputs: <StepTwo />,
    title: 'Step 2 title',
  },
  {
    description: 'Review your configuration details.',
    inputs: <StepThree />,
    title: 'Review & create',
  },
];

export const NameValueListWizard = ({ containerRef }) => {
  // containerRef is for demonstration purposes on this site. Most
  // implementations should likely remove.
  const size = useContext(ResponsiveContext);
  const theme = useContext(ThemeContext);
  const [activeIndex, setActiveIndex] = useState(2);
  // for readability, this is used to display numeric value of step on screen,
  // such as step 1 of 3. it will always be one more than the active array index
  const [activeStep, setActiveStep] = useState(activeIndex + 1);

  // store form values in state so they persist
  // when user goes back a step
  const [formValues, setFormValues] = useState({});

  // controls state of cancel layer
  const [open, setOpen] = useState(false);

  // tracks validation results for the current step
  const [valid, setValid] = useState(true);

  // ref allows us to access the wizard container and ensure scroll position
  // is at the top as user advances between steps. useEffect is triggered
  // when the active step changes.
  const wizardRef = useRef();

  useEffect(() => {
    setActiveStep(activeIndex + 1);
  }, [activeIndex]);

  const id = 'sticky-header-two-column';

  // scroll to top of step when step changes
  React.useEffect(() => {
    const container = wizardRef.current;
    const header = document.querySelector(`#${id}`);
    container.scrollTop = -header.getBoundingClientRect().bottom;
  }, [activeIndex, open]);

  const numberColumns = 1;
  const width = getWidth(numberColumns, theme, size);

  const contextValue = useMemo(
    () => ({
      activeIndex,
      setActiveIndex,
      activeStep,
      setActiveStep,
      valid,
      setValid,
      formValues,
      setFormValues,
      id,
      ref: wizardRef,
      steps,
      wizardTitle: 'Wizard Title',
      width,
    }),
    [activeIndex, activeStep, formValues, valid, width],
  );

  return (
    <WizardContext.Provider value={contextValue}>
      <Box background="background-floating" fill>
        <WizardHeader setOpen={setOpen} />
        <StepContent
          onSubmit={({ value }) => console.log('onSubmit:', value)}
        />
        <StepFooter />
      </Box>
      {open && (
        <CancellationLayer
          target={containerRef && containerRef.current}
          onSetOpen={setOpen}
        />
      )}
    </WizardContext.Provider>
  );
};

NameValueListWizard.propTypes = {
  containerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};
