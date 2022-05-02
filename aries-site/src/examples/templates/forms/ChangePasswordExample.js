import React, { useContext } from 'react';
import {
  Box,
  Button,
  Form,
  FormField,
  Header,
  Heading,
  ResponsiveContext,
  TextInput,
} from 'grommet';

const passwordRulesWeak = [
  {
    regexp: new RegExp('.{4,}'),
    message: 'At least four characters',
    status: 'error',
  },
  {
    regexp: new RegExp('(?=.*?[#?!@$ %^&*-])'),
    message: 'At least one special character or space',
    status: 'error',
  },
];

export function ChangePasswordExample() {
  const [formValues, setFormValues] = React.useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const size = useContext(ResponsiveContext);
  // eslint-disable-next-line no-unused-vars
  const onSubmit = ({ value, touched }) => {
    // Your submission logic here
  };

  const confirmPassword = () => {
    const doesMatch = formValues.newPassword === formValues.confirmPassword;
    return doesMatch
      ? undefined
      : { message: 'Passwords do not match', status: 'error' };
  };

  return (
    <Box gap="medium" width="medium">
      <Header
        direction="column"
        align="start"
        gap="xxsmall"
        pad={{ horizontal: 'xxsmall' }}
      >
        {/* Use semantically correct heading level and adjust size as 
        needed. In this instance, this example is presented within an 
        HTML section element and this is the first heading within the 
        section, therefor h2 is the semantically correct heading. For 
        additional detail, see https://design-system.hpe.design/foundation/typography#semantic-usage-of-heading-levels). */}
        <Heading level={2} margin="none">
          Change Password
        </Heading>
      </Header>
      <Box
        // Padding used to prevent focus from being cutoff
        pad={{ horizontal: 'xxsmall' }}
      >
        <Form
          validate="blur"
          value={formValues}
          onChange={setFormValues}
          onSubmit={({ value, touched }) => onSubmit({ value, touched })}
          method="post"
        >
          <FormField
            htmlFor="currentPassword"
            name="currentPassword"
            label="Current Password"
            required={{ indicator: false }}
          >
            <TextInput
              id="currentPassword"
              name="currentPassword"
              placeholder="Current password"
              type="password"
            />
          </FormField>
          <FormField
            htmlFor="newPassword"
            name="newPassword"
            label="New Password"
            validate={passwordRulesWeak}
            required={{ indicator: false }}
          >
            <TextInput
              id="newPassword"
              name="newPassword"
              placeholder="Enter new password"
              type="password"
            />
          </FormField>
          <FormField
            htmlFor="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            required={{ indicator: false }}
            validate={confirmPassword}
          >
            <TextInput
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm new password"
              type="password"
            />
          </FormField>
          <Box
            align={!['xsmall', 'small'].includes(size) ? 'start' : undefined}
            margin={{ top: 'medium', bottom: 'small' }}
          >
            <Button label="Update Password" primary type="submit" />
          </Box>
        </Form>
      </Box>
    </Box>
  );
}
