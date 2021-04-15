import React, { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from 'styled-components';
import {
  Box,
  CheckBoxGroup,
  FormField,
  List,
  RadioButtonGroup,
  ResponsiveContext,
  Select,
  Text,
  TextArea,
  TextInput,
} from 'grommet';
import { Checkmark, ContactInfo, Stakeholder, UserAdd } from 'grommet-icons';
import {
  CancellationLayer,
  Error,
  WizardContext,
  WizardHeader,
  StepContent,
  StepFooter,
} from './components';
import { getWidth } from './utils';

const defaultFormValues = {
  'twocolumn-textinput': '',
  'twocolumn-radiobuttongroup': '',
  'twocolumn-select': '',
  'twocolumn-checkboxgroup': '',
  'twocolumn-text-area': '',
};

const StepOne = () => {
  const { validationResults } = useContext(WizardContext);
  const size = useContext(ResponsiveContext);
  return (
    <Box
      direction={size !== 'small' ? 'row' : 'column-reverse'}
      margin={{ bottom: 'medium' }}
      gap={size === 'small' ? 'small' : undefined}
      justify="between"
      wrap
    >
      <Box
        width={size !== 'small' ? 'medium' : '100%'}
        margin={{ bottom: 'medium' }}
        gap="medium"
        flex={false}
      >
        <Box gap="medium">
          <>
            <FormField
              label="Email"
              htmlFor="twocolumn-textinput"
              name="twocolumn-textinput"
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
                id="twocolumn-textinput"
                name="twocolumn-textinput"
                type="email"
              />
            </FormField>
            <FormField
              htmlFor="twocolumn-radiobuttongroup"
              label="RadioButtonGroup"
              name="twocolumn-radiobuttongroup"
            >
              <RadioButtonGroup
                id="twocolumn-radiobuttongroup"
                name="twocolumn-radiobuttongroup"
                options={['Radio button 1', 'Radio button 2']}
              />
            </FormField>
          </>
          {!validationResults.valid && (
            <Error>There is an error with one or more inputs.</Error>
          )}
        </Box>
      </Box>
      <Box flex width={{ max: 'xxsmall' }} />
      <Guidance />
    </Box>
  );
};

const StepTwo = () => (
  <Box width="medium">
    <FormField
      label="Select"
      htmlFor="twocolumn-select"
      name="twocolumn-select"
    >
      <Select
        placeholder="Select Item"
        id="twocolumn-select"
        name="twocolumn-select"
        options={['Option 1', 'Option 2']}
      />
    </FormField>
    <FormField
      htmlFor="twocolumn-checkboxgroup"
      label="Label"
      name="twocolumn-checkboxgroup"
    >
      <CheckBoxGroup
        id="twocolumn-checkboxgroup"
        name="twocolumn-checkboxgroup"
        options={['CheckBox 1', 'CheckBox 2']}
      />
    </FormField>
    <FormField
      help="Description of how to use this field"
      htmlFor="twocolumn-text-area"
      label="Label"
      name="twocolumn-text-area"
    >
      <TextArea
        id="twocolumn-text-area"
        name="twocolumn-text-area"
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

const steps = [
  {
    description: 'Two column configuration for wizard.',
    inputs: <StepOne />,
    title: 'Step 1 Title',
  },
  {
    description: 'Step 2 description.',
    inputs: <StepTwo />,
    title: 'Step 2 Title',
  },
  {
    description: 'Provide a summary of what was accomplished or configured. ',
    inputs: <StepThree />,
    title: 'Finish title',
  },
];

export const TwoColumnWizardExample = () => {
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
  const [validationResults, setValidationResults] = useState({ valid: true });

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

  const numberColumns = 2;
  const width = getWidth(numberColumns, theme, size);
  return (
    <WizardContext.Provider
      value={{
        activeIndex,
        setActiveIndex,
        activeStep,
        setActiveStep,
        defaultFormValues,
        validationResults,
        setValidationResults,
        formValues,
        setFormValues,
        id,
        ref: wizardRef,
        steps,
        wizardTitle: 'Wizard Title',
        width,
      }}
    >
      <Box fill>
        <WizardHeader setOpen={setOpen} />
        <StepContent 
          onSubmit={({ value }) => console.log('onSubmit:', value)}
        />
        <StepFooter />
      </Box>
      {open && <CancellationLayer onSetOpen={setOpen} />}
    </WizardContext.Provider>
  );
};

const Guidance = () => {
  const size = useContext(ResponsiveContext);
  return (
    <Box
      alignSelf="start"
      background="background-contrast"
      gap="medium"
      pad="medium"
      round="small"
      flex
      width={size !== 'small' ? { min: 'small', max: 'medium' } : '100%'}
    >
      <Text color="text-strong" size="large">
        When guidance is required for the form or content of the wizard, you
        might consider a two-column format.
      </Text>
      <Box direction="row" gap="small">
        <Stakeholder color="text-strong" />
        <Text color="text-strong">Instruction for the first field.</Text>
      </Box>
      <Box direction="row" gap="small">
        <ContactInfo color="text-strong" />
        <Text color="text-strong">Instruction for the next field.</Text>
      </Box>
      <Box direction="row" gap="small">
        <UserAdd color="text-strong" />
        <Text color="text-strong">
          Some information that helps to complete the next field.
        </Text>
      </Box>
    </Box>
  );
};
