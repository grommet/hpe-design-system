import { useState } from 'react';
import {
  Box,
  Button,
  CheckBox,
  CheckBoxGroup,
  Form,
  FormField,
  Heading,
  Notification,
  RadioButtonGroup,
  Select,
  Text,
  TextArea,
  TextInput,
} from 'grommet';

const INITIAL_VALUES = {
  projectName: '',
  description: '',
  category: '',
  notifications: [],
  billingCycle: 'Monthly',
  emailReports: false,
};

export const ExampleForm = () => {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    // Reset after 4 seconds so user can submit again for repeated testing
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleReset = () => {
    setValues(INITIAL_VALUES);
    setSubmitted(false);
  };

  return (
    <Box gap="medium">
      <Box>
        <Heading level={2} margin={{ bottom: 'xsmall' }}>
          Example Form
        </Heading>
        <Text color="text-weak">
          A realistic form to test hover states in context. Hover over inputs to
          compare border behaviour across theme options.
        </Text>
      </Box>

      {submitted && (
        <Notification
          status="normal"
          title="Form submitted"
          message="This is a non-submitting demo form. All hover states are functioning correctly."
          onClose={() => setSubmitted(false)}
        />
      )}

      <Box
        background="background-front"
        round="small"
        pad="medium"
        border={{ color: 'border-weak', side: 'all' }}
        width={{ max: 'large' }}
      >
        <Form
          value={values}
          onChange={nextValues => setValues(nextValues)}
          onSubmit={handleSubmit}
          validate="submit"
        >
          <Box gap="small">
            {/* Row 1: Name + Category */}
            <Box direction="row" gap="medium" wrap>
              <Box flex={{ min: true }}>
                <FormField
                  label="Project name"
                  name="projectName"
                  htmlFor="projectName__input"
                  required={{ indicator: true }}
                >
                  <TextInput
                    id="projectName__input"
                    name="projectName"
                    placeholder="e.g. GreenLake Portal Redesign"
                  />
                </FormField>
              </Box>
              <Box flex={{ min: true }}>
                <FormField
                  label="Category"
                  name="category"
                  htmlFor="category__input"
                >
                  <Select
                    id="category__input"
                    name="category"
                    options={[
                      'Design',
                      'Engineering',
                      'Research',
                      'Product',
                      'Operations',
                    ]}
                    placeholder="Select a category..."
                    clear
                  />
                </FormField>
              </Box>
            </Box>

            {/* Row 2: Description */}
            <FormField
              label="Description"
              name="description"
              htmlFor="description__input"
              help="Briefly describe the purpose of this project."
            >
              <TextArea
                id="description__input"
                name="description"
                placeholder="What is this project about?"
                resize="vertical"
              />
            </FormField>

            {/* Row 3: Notifications + Billing */}
            <Box direction="row" gap="medium" wrap>
              <Box flex={{ min: true }}>
                <FormField
                  label="Notification channels"
                  name="notifications"
                  help="Choose how you want to receive updates."
                >
                  <CheckBoxGroup
                    name="notifications"
                    options={[
                      { label: 'Email', value: 'email' },
                      { label: 'SMS', value: 'sms' },
                      { label: 'Push notifications', value: 'push' },
                      { label: 'Slack', value: 'slack' },
                    ]}
                    value={values.notifications}
                    onChange={({ value }) =>
                      setValues(prev => ({ ...prev, notifications: value }))
                    }
                  />
                </FormField>
              </Box>
              <Box flex={{ min: true }}>
                <FormField
                  label="Billing cycle"
                  name="billingCycle"
                  help="How often should this project be billed?"
                >
                  <RadioButtonGroup
                    name="billingCycle"
                    options={[
                      { label: 'Monthly', value: 'Monthly' },
                      { label: 'Quarterly', value: 'Quarterly' },
                      { label: 'Annually (save 15%)', value: 'Annually' },
                    ]}
                    value={values.billingCycle}
                    onChange={e =>
                      setValues(prev => ({
                        ...prev,
                        billingCycle: e.target.value,
                      }))
                    }
                  />
                </FormField>
              </Box>
            </Box>

            {/* Row 4: Email reports toggle — standalone (no FormField wrapper)
                so the hover effect only applies to the toggle control, not a container */}
            <CheckBox
              name="emailReports"
              label="Send weekly email reports"
              toggle
              checked={values.emailReports}
              onChange={e =>
                setValues(prev => ({
                  ...prev,
                  emailReports: e.target.checked,
                }))
              }
            />

            {/* Actions */}
            <Box
              direction="row"
              gap="small"
              margin={{ top: 'small' }}
              justify="end"
            >
              <Button label="Cancel" onClick={handleReset} />
              <Button label="Create project" primary type="submit" />
            </Box>
          </Box>
        </Form>
      </Box>
    </Box>
  );
};
