import React, { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from 'styled-components';
import {
  Box,
  CheckBoxGroup,
  FormField,
  Grid,
  List,
  RadioButtonGroup,
  ResponsiveContext,
  Select,
  Text,
  TextArea,
  TextInput,
} from 'grommet';
import { Checkmark } from 'grommet-icons';
import {
  CancellationLayer,
  Error,
  StepFooter,
  StepContent,
  WizardContext,
  WizardHeader,
} from './components';
import { getWidth } from './utils';

export const defaultFormValues = {
  'firstname-validation': '',
  'lastname-validation': '',
  'text-input-validation': '',
  'radio-button-group-validation': '',
  select: '',
  checkboxgroup: '',
  'text-area': '',
};

const stepOneInputs = [
  setValid => (
    <>
      <FormField
        label="First Name"
        htmlFor="firstname-validation"
        name="firstname-validation"
        required
      >
        <TextInput
          placeholder="Jane"
          id="firstname-validation"
          name="firstname-validation"
          onChange={() => setValid(true)}
        />
      </FormField>
      <FormField
        label="Last Name"
        htmlFor="lastname-validation"
        name="lastname-validation"
      >
        <TextInput
          placeholder="Smith"
          id="lastname-validation"
          name="lastname-validation"
        />
      </FormField>
      <FormField
        label="Email"
        htmlFor="text-input-validation"
        name="text-input-validation"
        validate={{
          regexp: new RegExp(
            '(^$)|([^@ \\t\\r\\n]+@[^@ \\t\\r\\n]+\\.[^@ \\t\\r\\n]+)',
          ),
          message: 'Invalid email address',
          status: 'error',
        }}
      >
        <TextInput
          placeholder="jane.smith@hpe.com"
          id="text-input-validation"
          name="text-input-validation"
          onChange={() => setValid(true)}
        />
      </FormField>
    </>
  ),
  () => (
    <FormField
      htmlFor="radio-button-group-validation"
      label="RadioButtonGroup"
      name="radio-button-group-validation"
    >
      <RadioButtonGroup
        id="radio-button-group-validation"
        name="radio-button-group-validation"
        options={['Radio button 1', 'Radio button 2']}
      />
    </FormField>
  ),
];

const StepOne = () => {
  const { valid, setValid } = useContext(WizardContext);
  const size = useContext(ResponsiveContext);

  return (
    <>
      <Grid
        columns={size !== 'small' ? { count: 'fit', size: 'medium' } : '100%'}
        gap={size !== 'small' ? 'large' : undefined}
        margin={{ bottom: 'medium' }}
      >
        {stepOneInputs.map((input, index) => (
          <Box width={{ max: 'medium' }} key={index}>
            {input(setValid)}
          </Box>
        ))}
      </Grid>
      {!valid && <Error>There is an error with one or more inputs.</Error>}
    </>
  );
};

const StepTwo = () => (
  <Box margin={{ bottom: 'medium' }} width="medium">
    <FormField label="Select" htmlFor="select" name="select">
      <Select
        placeholder="Select item"
        id="select"
        name="select"
        options={['Option 1', 'Option 2']}
      />
    </FormField>
    <FormField htmlFor="checkboxgroup" label="Label" name="checkboxgroup">
      <CheckBoxGroup
        id="checkboxgroup"
        name="checkboxgroup"
        options={['CheckBox 1', 'CheckBox 2']}
      />
    </FormField>
    <FormField
      help="Description of how to use this field"
      htmlFor="text-area"
      label="Label"
      name="text-area"
    >
      <TextArea
        id="text-area"
        name="text-area"
        options={['CheckBox 1', 'CheckBox 2']}
        placeholder="Placeholder text"
        resize="vertical"
      />
    </FormField>
  </Box>
);

const data = [
  'Summary value of step 1',
  'More summary value of step 1',
  'Summary value of step 2',
  'More summary values from step 2',
];

const StepThree = () => (
  <Box gap="small">
    <List data={data} pad={{ horizontal: 'none', vertical: 'small' }}>
      {(datum, index) => (
        <Box key={index} direction="row" gap="small" align="center">
          <Checkmark color="text-strong" size="small" />
          <Text color="text-strong" weight={500}>
            {datum}
          </Text>
        </Box>
      )}
    </List>
    <Text color="text-strong">
      Include guidance to what will occur when “Finish Wizard" is clicked.
    </Text>
  </Box>
);

export const steps = [
  {
    description: `Step one description. Keep each step simple and in chunks 
    easy enough to fit on a single page.`,
    inputs: <StepOne />,
    title: 'Step 1 Title',
  },
  {
    description: `Step 2 description. Even though this step is single-column, 
    the width of the footer should be consistent across all steps.`,
    inputs: <StepTwo />,
    title: 'Step 2 Title',
  },
  {
    description: 'Review your configuration details.',
    inputs: <StepThree />,
    title: 'Review & Create',
  },
];

export const WizardValidationExample = () => {
  const ref = React.useRef();
  const size = useContext(ResponsiveContext);
  const theme = useContext(ThemeContext);
  const [activeIndex, setActiveIndex] = useState(0);
  // for readability, this is used to display numeric value of step on screen,
  // such as step 1 of 3. it will always be one more than the active array index
  const [activeStep, setActiveStep] = useState(activeIndex + 1);

  // store form values in state so they persist
  // when user goes back a step
  const [formValues, setFormValues] = useState(defaultFormValues);

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

  const id = 'simple-wizard';
  // scroll to top of step when step changes
  React.useEffect(() => {
    const container = wizardRef.current;
    const header = document.querySelector(`#${id}`);
    container.scrollTop = -header.getBoundingClientRect().bottom;
  }, [activeIndex, open]);

  const numberColumns = 2;
  const width = getWidth(numberColumns, theme, size);
  return (
    <WizardContext.Provider
      value={{
        activeIndex,
        id,
        defaultFormValues,
        setActiveIndex,
        activeStep,
        setActiveStep,
        valid,
        ref: wizardRef,
        setValid,
        steps,
        formValues,
        setFormValues,
        wizardTitle: 'Wizard Title',
        width,
      }}
    >
      <Box ref={ref} fill>
        <WizardHeader setOpen={setOpen} />
        <StepContent
          onSubmit={({ value }) => console.log('onSubmit:', value)}
        />
        <StepFooter />
      </Box>
      {open && <CancellationLayer boxRef={ref} onSetOpen={setOpen} />}
    </WizardContext.Provider>
  );
};
