import React, { useState, useContext } from 'react';
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

const StepOne = ({ active, setActive, formValues }) => {
  const [error, setError] = useState({
    email: '',
    radiobuttongroup: '',
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
          help="Click on the ‘eye’ icon for the description text field to hide."
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
          if (validation.isValid) setActive(active + 1);
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
  active: PropTypes.number.isRequired,
  formValues: PropTypes.shape({}).isRequired,
  setActive: PropTypes.func.isRequired,
};

const StepTwo = ({ active, setActive }) => (
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
      onClick={() => setActive(active + 1)}
    />
  </>
);

StepTwo.propTypes = {
  active: PropTypes.number.isRequired,
  setActive: PropTypes.func.isRequired,
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
    inputs: (active, setActive, formValues) => (
      <StepOne active={active} setActive={setActive} formValues={formValues} />
    ),
  },
  {
    description: 'Step 2 description.',
    inputs: (active, setActive) => (
      <StepTwo active={active} setActive={setActive} />
    ),
  },
  {
    description: 'Provide a summary of what was accomplished or configured. ',
    inputs: (active, setActive) => (
      <StepThree active={active} setActive={setActive} />
    ),
    title: 'Finish title',
  },
];

export const WizardValidationExample = () => {
  const [active, setActive] = useState(1);

  // store form values in state so they persist
  // when user goes back a step
  const [formValues, setFormValues] = useState(defaultFormValues);

  // controls state of cancel layer
  const [open, setOpen] = useState(false);
  const size = useContext(ResponsiveContext);

  return (
    <>
      <Box width={{ max: 'xxlarge' }} margin="auto" fill>
        <WizardHeader active={active} setActive={setActive} setOpen={setOpen} />
        <Box
          align="center"
          pad={size !== 'small' ? 'large' : 'medium'}
          flex={false}
        >
          <Box width="medium" gap="medium">
            <Box gap="medium" flex={false}>
              <Box>
                <Heading color="text-strong" margin="none">
                  {steps[active - 1].title || `Step ${active} Title`}
                </Heading>
                <Text
                  color="text-strong"
                  size="small"
                >{`Step ${active} of ${steps.length}`}</Text>
              </Box>
              <Text color="text-strong" size="large">
                {/* Index an array starts at 0 */}
                {steps[active - 1].description}
              </Text>
            </Box>
            <Form
              value={formValues}
              onChange={nextValue => setFormValues(nextValue)}
              onSubmit={({ value }) => console.log(value)}
            >
              {/* Index an array starts at 0 */}
              {steps[active - 1].inputs(active, setActive, formValues)}
            </Form>
          </Box>
        </Box>
      </Box>
      {open && <CancellationLayer onSetOpen={setOpen} />}
    </>
  );
};

const WizardHeader = ({ active, setActive, setOpen }) => {
  const size = useContext(ResponsiveContext);
  return (
    <Header
      border={{ side: 'bottom', color: 'border-weak' }}
      pad="small"
      fill="horizontal"
      justify="center"
    >
      <Box direction="row" flex>
        {active > 1 && (
          <Button
            label={size !== 'small' ? `Step ${active - 1}` : undefined}
            icon={<FormPreviousLink color="text-strong" />}
            onClick={() => setActive(active - 1)}
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
  active: PropTypes.number.isRequired,
  setActive: PropTypes.func.isRequired,
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
