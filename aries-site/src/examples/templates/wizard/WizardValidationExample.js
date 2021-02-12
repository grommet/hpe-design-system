import React, { useContext, useEffect, useRef, useState } from 'react';
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

export const defaultFormValues = {
  'text-input-validation': '',
  'radio-button-group-validation': '',
  select: '',
  checkboxgroup: '',
  'text-area': '',
};

const stepOneValidate = values => {
  const emailRegex = RegExp(
    '[^@ \\t\\r\\n]+@[^@ \\t\\r\\n]+\\.[^@ \\t\\r\\n]+',
  );
  const emailValid = emailRegex.test(values['text-input-validation']);

  return {
    email: emailValid ? '' : 'Invalid email address.',
    isValid: !!emailValid,
  };
};

const validation = [
  {
    validator: values => stepOneValidate(values),
    error: {
      firstname: '',
      lastname: '',
      email: '',
      radiobuttongroup: '',
      isValid: true,
    },
  },
];

const stepOneInputs = [
  (attemptedAdvance, error, formValues, setError) => (
    <Box>
      <FormField
        label="First Name"
        htmlFor="firstname-validation"
        name="firstname-validation"
        error={error.firstname}
        onChange={() =>
          attemptedAdvance && setError(stepOneValidate(formValues))
        }
      >
        <TextInput
          placeholder="Jane"
          id="firstname-validation"
          name="firstname-validation"
        />
      </FormField>
      <FormField
        label="Last Name"
        htmlFor="lastname-validation"
        name="lastname-validation"
        error={error.lastname}
        onChange={() =>
          attemptedAdvance && setError(stepOneValidate(formValues))
        }
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
        error={error.email}
        onChange={() =>
          attemptedAdvance && setError(stepOneValidate(formValues))
        }
      >
        <TextInput
          placeholder="jane.smith@hpe.com"
          id="text-input-validation"
          name="text-input-validation"
          type="email"
        />
      </FormField>
    </Box>
  ),
  (attemptedAdvance, error) => (
    <>
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
      {!error.isValid && (
        <Error>There is an error with one or more inputs.</Error>
      )}
    </>
  ),
];

const StepOne = () => {
  const { attemptedAdvance, formValues, error, setError } = useContext(
    WizardContext,
  );
  const size = useContext(ResponsiveContext);
  console.log(error.isValid);
  return (
    <>
      <Box margin={{ bottom: 'medium' }}>
        <Grid
          columns={size !== 'small' ? { count: 2, size: 'auto' } : '100%'}
          rows={[['auto', 'full']]}
          gap={size !== 'small' ? 'large' : undefined}
          fill
        >
          {stepOneInputs.map(input =>
            input(attemptedAdvance, error, formValues, setError),
          )}
        </Grid>
      </Box>
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

const StepThree = () => {
  return (
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
};

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
  const [activeIndex, setActiveIndex] = useState(0);
  // for readability, this is used to display numeric value of step on screen,
  // such as step 1 of 3. it will always be one more than the active array index
  const [activeStep, setActiveStep] = useState(activeIndex + 1);

  // store form values in state so they persist
  // when user goes back a step
  const [formValues, setFormValues] = useState(defaultFormValues);

  // controls state of cancel layer
  const [open, setOpen] = useState(false);

  // controls error message for active step
  const [error, setError] = useState(
    validation[activeIndex] ? validation[activeIndex].error : undefined,
  );

  // tracks if user has attempted to advance to next step
  const [attemptedAdvance, setAttemptedAdvance] = useState(false);

  // ref allows us to access the wizard container and ensure scroll position
  // is at the top as user advances between steps. useEffect is triggered
  // when the active step changes.
  const wizardRef = useRef();

  useEffect(() => {
    setActiveStep(activeIndex + 1);
    setAttemptedAdvance(false);
  }, [activeIndex]);

  const id = 'simple-wizard';
  // scroll to top of step when step changes
  React.useEffect(() => {
    const container = wizardRef.current;
    const header = document.querySelector(`#${id}`);
    container.scrollTop = -header.getBoundingClientRect().bottom;
  }, [activeIndex, open]);

  return (
    <WizardContext.Provider
      value={{
        activeIndex,
        id,
        defaultFormValues,
        setActiveIndex,
        activeStep,
        setActiveStep,
        attemptedAdvance,
        setAttemptedAdvance,
        error,
        ref: wizardRef,
        setError,
        steps,
        formValues,
        setFormValues,
        validation,
        wizardTitle: 'Wizard Title',
      }}
    >
      <Box fill>
        <WizardHeader setOpen={setOpen} />
        <StepContent />
        <StepFooter />
      </Box>
      {open && <CancellationLayer onSetOpen={setOpen} />}
    </WizardContext.Provider>
  );
};
