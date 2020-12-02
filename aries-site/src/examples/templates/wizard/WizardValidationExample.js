import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  CheckBoxGroup,
  Footer,
  Form,
  FormField,
  Header,
  Heading,
  Layer,
  List,
  RadioButtonGroup,
  ResponsiveContext,
  Select,
  Text,
  TextArea,
  TextInput,
} from 'grommet';
import {
  Checkmark,
  CircleAlert,
  FormClose,
  FormNextLink,
  FormPreviousLink,
} from 'grommet-icons';

const WizardContext = React.createContext({});

const defaultFormValues = {
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
      email: '',
      radiobuttongroup: '',
      isValid: true,
    },
  },
];

const StepOne = () => {
  const { attemptedAdvance, formValues, error, setError } = useContext(
    WizardContext,
  );
  console.log(formValues);
  return (
    <>
      <Box margin={{ bottom: 'medium' }}>
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
      </Box>
    </>
  );
};

const StepTwo = () => (
  <Box margin={{ bottom: 'medium' }}>
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
    <Box gap="small" margin={{ bottom: 'medium' }}>
      <List data={data} pad={{ horizontal: 'none', vertical: 'small' }}>
        {(datum, index) => (
          <Box key={index} direction="row" gap="medium" align="center">
            <Checkmark color="text-strong" size="small" />
            <Text color="text-strong">{datum}</Text>
          </Box>
        )}
      </List>
      <Text color="text-strong">
        Include guidance to what will occur when “Finish Setup” is clicked.
      </Text>
    </Box>
  );
};

const steps = [
  {
    description: `Step one description. Keep each step simple and in chunks 
    easy enough to fit on a single page.`,
    inputs: <StepOne />,
  },
  {
    description: 'Step 2 description.',
    inputs: <StepTwo />,
  },
  {
    description: 'Provide a summary of what was accomplished or configured. ',
    inputs: <StepThree />,
    title: 'Finish title',
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
  const size = useContext(ResponsiveContext);

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

  // scroll to top of step when step changes
  React.useEffect(() => {
    const container = wizardRef.current;
    const header = document.querySelector('#sticky-header-single-column');
    container.scrollTop = -header.getBoundingClientRect().bottom;
  }, [activeIndex, open]);

  return (
    <WizardContext.Provider
      value={{
        activeIndex,
        setActiveIndex,
        activeStep,
        setActiveStep,
        attemptedAdvance,
        setAttemptedAdvance,
        error,
        setError,
        formValues,
        setFormValues,
      }}
    >
      <Box width={{ max: 'xxlarge' }} margin="auto" fill>
        <WizardHeader setOpen={setOpen} />
        <Box
          align="center"
          pad={size !== 'small' ? 'large' : 'medium'}
          overflow="auto"
          ref={wizardRef}
          flex={size === 'small' ? true : undefined}
        >
          <Box width="medium" gap="medium">
            <StepHeader />
            <Form
              // needed to associate form submit button with form
              // since submit button lives outside form tag
              id="validation-form"
              value={formValues}
              onChange={nextValue => setFormValues(nextValue)}
              onSubmit={({ value }) => console.log(value)}
            >
              {steps[activeIndex].inputs}
            </Form>
          </Box>
        </Box>
        <StepFooter />
      </Box>
      {open && <CancellationLayer onSetOpen={setOpen} />}
    </WizardContext.Provider>
  );
};

const WizardHeader = ({ setOpen }) => {
  const size = useContext(ResponsiveContext);
  const { activeIndex, activeStep, setActiveIndex } = useContext(WizardContext);
  return (
    <Header
      border={{ side: 'bottom', color: 'border-weak' }}
      pad="small"
      fill="horizontal"
      justify="center"
      responsive={false}
    >
      <Box direction="row" flex>
        {activeStep > 1 && (
          <Button
            label={size !== 'small' ? `Step ${activeStep - 1}` : undefined}
            icon={<FormPreviousLink />}
            onClick={() => setActiveIndex(activeIndex - 1)}
          />
        )}
      </Box>
      <Box>
        <Text color="text-strong" weight="bold">
          Wizard Title
        </Text>
      </Box>
      <Box direction="row" flex justify="end">
        <Button
          label={size !== 'small' ? 'Cancel' : undefined}
          icon={<FormClose />}
          reverse
          onClick={() => setOpen(true)}
        />
      </Box>
    </Header>
  );
};

WizardHeader.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

const StepHeader = () => {
  const { activeIndex, activeStep } = useContext(WizardContext);
  return (
    <Box id="sticky-header-single-column" gap="medium" flex={false}>
      <Box>
        <Text color="text-strong">
          Step {activeStep} of {steps.length}
        </Text>
        <Heading color="text-strong" margin="none">
          {steps[activeIndex].title || `Step ${activeStep} Title`}
        </Heading>
      </Box>
      <Text color="text-strong" size="large">
        {steps[activeIndex].description}
      </Text>
    </Box>
  );
};

const StepFooter = () => {
  const size = useContext(ResponsiveContext);
  const {
    activeIndex,
    setActiveIndex,
    formValues,
    setError,
    setAttemptedAdvance,
  } = useContext(WizardContext);

  const buttonProps = {
    fill: size === 'small' ? 'horizontal' : undefined,
    icon: <FormNextLink />,
    primary: true,
    reverse: true,
  };

  return (
    <Footer
      border={{ side: 'top', color: 'border' }}
      justify="end"
      margin={size !== 'small' ? { horizontal: 'medium' } : undefined}
      pad={
        size !== 'small'
          ? { vertical: 'medium' }
          : { vertical: 'small', horizontal: 'medium' }
      }
      width="medium"
      alignSelf="center"
      responsive={false}
    >
      {activeIndex < steps.length - 1 && (
        <Button
          {...buttonProps}
          label="Next"
          onClick={() => {
            // mark that the user is trying to advance, so that onChange
            // validation will run on any errors in the future
            setAttemptedAdvance(true);

            let nextIndex = activeIndex + 1;
            nextIndex = nextIndex <= steps.length - 1 ? nextIndex : activeIndex;

            if (validation[activeIndex]) {
              // check for errors
              const validationRes =
                validation[activeIndex].validator &&
                validation[activeIndex].validator(formValues);
              // advance to next step if successful
              if (validationRes && validationRes.isValid)
                setActiveIndex(nextIndex);
              // otherwise, display error and wizard will not advance to
              // next step
              else {
                setError(validationRes);
              }
            } else {
              setActiveIndex(nextIndex);
            }
          }}
        />
      )}
      {activeIndex === steps.length - 1 && (
        <Button
          {...buttonProps}
          label="Finish Wizard"
          form="validation-form-two-column"
          type="submit"
        />
      )}
    </Footer>
  );
};

const CancellationLayer = ({ onSetOpen }) => {
  const { setFormValues } = useContext(WizardContext);
  return (
    <Layer
      position="center"
      onClickOutside={() => onSetOpen(false)}
      onEsc={() => onSetOpen(false)}
    >
      <Box pad="large" gap="small" width="large">
        <Box>
          <Heading color="text-strong" margin="none">
            Cancel
          </Heading>
          <Text color="text-strong">Wizard Title</Text>
        </Box>
        <Text color="text-strong">
          Cancelling setup will lose all of your progress. Are you sure you want
          to exit the setup?
        </Text>
        <Box
          as="footer"
          gap="small"
          direction="row"
          align="center"
          justify="end"
          pad={{ top: 'medium', bottom: 'small' }}
        >
          <Button
            label="No, continue wizarding"
            onClick={() => onSetOpen(false)}
            secondary
          />
          <Button
            label="Yes, cancel wizarding"
            onClick={() => {
              onSetOpen(false);
              setFormValues(defaultFormValues);
            }}
            primary
          />
        </Box>
      </Box>
    </Layer>
  );
};

CancellationLayer.propTypes = {
  onSetOpen: PropTypes.func.isRequired,
};

const Error = ({ children, ...rest }) => {
  return (
    <Box
      animation="fadeIn"
      background="validation-critical"
      margin={{ top: 'small' }}
      pad="small"
      round="4px"
    >
      <Box direction="row" gap="xsmall" {...rest}>
        <Box flex={false} margin={{ top: 'hair' }} pad={{ top: 'xxsmall' }}>
          <CircleAlert size="small" />
        </Box>
        <Text size="xsmall">{children}</Text>
      </Box>
    </Box>
  );
};

Error.propTypes = {
  children: PropTypes.string,
};
