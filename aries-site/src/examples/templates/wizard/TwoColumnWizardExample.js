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
  ContactInfo,
  FormClose,
  FormNextLink,
  FormPreviousLink,
  Stakeholder,
  UserAdd,
} from 'grommet-icons';

const StepOne = () => (
  <Box margin={{ bottom: 'large' }}>
    <FormField
      label="Text Input"
      htmlFor="twocolumn-textinput"
      name="twocolumn-textinput"
    >
      <TextInput
        placeholder="Placeholder text"
        id="twocolumn-textinput"
        name="twocolumn-textinput"
      />
    </FormField>
    <FormField
      help="Click on the ‘eye’ icon for the description text field to hide."
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
  </Box>
);

const StepTwo = () => (
  <Box margin={{ bottom: 'large' }}>
    <FormField
      label="Select"
      htmlFor="twocolumn-select"
      name="twocolumn-select"
    >
      <Select
        placeholder="twocolumn-select item"
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

const StepThree = () => {
  return (
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
  );
};

const steps = [
  {
    description: 'Two column configuration for wizard. ',
    inputs: <StepOne />,
  },
  { description: 'Step 2 description.', inputs: <StepTwo /> },
  {
    description: 'Provide a summary of what was accomplished or configured. ',
    inputs: <StepThree />,
    title: 'Finish title',
  },
];

export const TwoColumnWizardExample = () => {
  const [active, setActive] = useState(1);

  // store form values in state so they persist
  // when user goes back a step
  const [formValues, setFormValues] = useState({});

  const [open, setOpen] = useState(false);
  const size = useContext(ResponsiveContext);

  return (
    <>
      <Box width={{ max: 'xxlarge' }} margin="auto" fill>
        <WizardHeader active={active} setActive={setActive} setOpen={setOpen} />
        <Box
          pad={size === 'small' ? 'medium' : 'small'}
          gap={size !== 'small' ? 'large' : 'medium'}
          flex={false}
        >
          <Box flex={false} gap="medium">
            <Box align={size !== 'small' ? 'center' : 'start'}>
              <Heading color="text-strong" margin="none">
                {steps[active - 1].title || `Step ${active} Title`}
              </Heading>
              <Text
                color="text-strong"
                size="small"
              >{`Step ${active} of ${steps.length}`}</Text>
            </Box>

            {size === 'small' && (
              <Text color="text-strong" size="large">
                {steps[active - 1].description}
              </Text>
            )}
          </Box>
          <Form
            value={formValues}
            onChange={setFormValues}
            onSubmit={({ value }) => console.log(value)}
          >
            <Box
              align="start"
              direction={size !== 'small' ? 'row' : 'column-reverse'}
              justify="center"
              gap={size !== 'small' ? 'xlarge' : 'small'}
            >
              <Box width={size !== 'small' ? 'medium' : '100%'} gap="medium">
                {/* Index an array starts at 0 */}
                {size !== 'small' && (
                  <Text color="text-strong" size="large">
                    {steps[active - 1].description}
                  </Text>
                )}
                {/* Index an array starts at 0 */}
                {steps[active - 1].inputs}
              </Box>
              <Box
                background="background-back"
                gap="medium"
                pad="medium"
                round="small"
                width={size !== 'small' ? 'medium' : '100%'}
              >
                <Text color="text-strong" size="large">
                  When guidance is required for the form or content of the
                  wizard, you might consider a two-column format.
                </Text>
                <Box direction="row" gap="small">
                  <Stakeholder color="text-strong" />
                  <Text color="text-strong">
                    Instruction for the first field.
                  </Text>
                </Box>
                <Box direction="row" gap="small">
                  <ContactInfo color="text-strong" />
                  <Text color="text-strong">
                    Instruction for the next field.
                  </Text>
                </Box>
                <Box direction="row" gap="small">
                  <UserAdd color="text-strong" />
                  <Text color="text-strong">
                    Some information that helps to complete the next field.
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box align="center" fill="horizontal">
              <Box width="medium">
                {active < steps.length && (
                  <Button
                    fill="horizontal"
                    label="Next"
                    icon={<FormNextLink />}
                    primary
                    reverse
                    onClick={() => {
                      setActive(active + 1);
                    }}
                  />
                )}
                {active === steps.length && (
                  <Button
                    fill="horizontal"
                    label="Finish Setup"
                    primary
                    type="submit"
                  />
                )}
              </Box>
            </Box>
          </Form>
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
