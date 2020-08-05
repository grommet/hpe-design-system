import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  CheckBoxGroup,
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

const StepOne = ({ activeIndex, setActiveIndex, formValues }) => {
  const [error, setError] = useState({
    email: '',
    radiobuttongroup: '',
    isValid: true,
  });

  return (
    <>
      <Box margin={{ bottom: 'large' }}>
        <FormField
          label="Email"
          htmlFor="text-input-validation"
          name="text-input-validation"
          error={error.email}
          onChange={() => setError(stepOneValidate(formValues))}
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
      </Box>
      {!error.isValid && (
        <Error>There is an error with one or more inputs.</Error>
      )}
      <Button
        fill="horizontal"
        label="Next"
        icon={<FormNextLink />}
        primary
        reverse
        onClick={() => {
          // check for errors
          const validation = stepOneValidate(formValues);
          // advance to next step if successful
          if (validation.isValid) setActiveIndex(activeIndex + 1);
          // otherwise, display error and wizard will not advance to next step
          else {
            setError(validation);
          }
        }}
      />
    </>
  );
};

StepOne.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  formValues: PropTypes.shape({}).isRequired,
  setActiveIndex: PropTypes.func.isRequired,
};

const StepTwo = ({ activeIndex, setActiveIndex }) => (
  <>
    <Box margin={{ bottom: 'large' }}>
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
    <Button
      fill="horizontal"
      label="Next"
      icon={<FormNextLink />}
      primary
      reverse
      onClick={() => setActiveIndex(activeIndex + 1)}
    />
  </>
);

StepTwo.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  setActiveIndex: PropTypes.func.isRequired,
};

const data = [
  'Summary value of step 1',
  'More summary value of step 1',
  'Summary value of step 2',
  'More summary values from step 2',
];

const StepThree = () => {
  return (
    <>
      <Box gap="small" margin={{ bottom: 'large' }}>
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
      <Button fill="horizontal" label="Finish Setup" primary type="submit" />
    </>
  );
};

const steps = [
  {
    description: `Step one description. Keep each step simple and in chunks 
    easy enough to fit on a single page.`,
    inputs: (activeIndex, setActiveIndex, formValues) => (
      <StepOne
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        formValues={formValues}
      />
    ),
  },
  {
    description: 'Step 2 description.',
    inputs: (activeIndex, setActiveIndex) => (
      <StepTwo activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
    ),
  },
  {
    description: 'Provide a summary of what was accomplished or configured. ',
    inputs: (activeIndex, setActiveIndex) => (
      <StepThree activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
    ),
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

  useEffect(() => {
    setActiveStep(activeIndex + 1);
  }, [activeIndex]);

  return (
    <>
      <Box width={{ max: 'xxlarge' }} margin="auto" fill>
        <WizardHeader
          activeIndex={activeIndex}
          activeStep={activeStep}
          setActiveIndex={setActiveIndex}
          setOpen={setOpen}
        />
        <Box
          align="center"
          pad={size !== 'small' ? 'large' : 'medium'}
          flex={false}
        >
          <Box width="medium" gap="medium">
            <Box gap="medium" flex={false}>
              <Box>
                <Heading color="text-strong" margin="none">
                  {steps[activeIndex].title || `Step ${activeStep} Title`}
                </Heading>
                <Text
                  color="text-strong"
                  size="small"
                >{`Step ${activeStep} of ${steps.length}`}</Text>
              </Box>
              <Text color="text-strong" size="large">
                {steps[activeIndex].description}
              </Text>
            </Box>
            <Form
              value={formValues}
              onChange={nextValue => setFormValues(nextValue)}
              onSubmit={({ value }) => console.log(value)}
            >
              {steps[activeIndex].inputs(
                activeIndex,
                setActiveIndex,
                formValues,
              )}
            </Form>
          </Box>
        </Box>
      </Box>
      {open && <CancellationLayer onSetOpen={setOpen} />}
    </>
  );
};

const WizardHeader = ({ activeIndex, activeStep, setActiveIndex, setOpen }) => {
  const size = useContext(ResponsiveContext);
  return (
    <Header
      border={{ side: 'bottom', color: 'border-weak' }}
      pad="small"
      fill="horizontal"
      justify="center"
    >
      <Box direction="row" flex>
        {activeStep > 1 && (
          <Button
            label={size !== 'small' ? `Step ${activeStep - 1}` : undefined}
            icon={<FormPreviousLink color="text-strong" />}
            onClick={() => setActiveIndex(activeIndex - 1)}
          />
        )}
      </Box>
      <Box>
        <Text color="text-strong" weight="bold">
          Action Title
        </Text>
      </Box>
      <Box direction="row" flex justify="end">
        <Button
          label={size !== 'small' ? 'Cancel' : undefined}
          icon={<FormClose color="text-strong" />}
          reverse
          onClick={() => setOpen(true)}
        />
      </Box>
    </Header>
  );
};

WizardHeader.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  activeStep: PropTypes.number.isRequired,
  setActiveIndex: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
};

const CancellationLayer = ({ onSetOpen }) => {
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
          <Text color="text-strong">Action Title</Text>
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
            label="No, continue setup"
            onClick={() => onSetOpen(false)}
            secondary
          />
          <Button
            label="Yes, cancel setup"
            onClick={() => onSetOpen(false)}
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
      background="validation-critical"
      margin={{ bottom: 'medium' }}
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
  children: PropTypes.object,
};
