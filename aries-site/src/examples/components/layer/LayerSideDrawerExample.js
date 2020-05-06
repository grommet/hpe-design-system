import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Anchor,
  Button,
  Box,
  CheckBox,
  Form,
  FormField,
  Header,
  Heading,
  Layer,
  MaskedInput,
  ResponsiveContext,
  TextInput,
  Text,
} from 'grommet';
import { Close } from 'grommet-icons';

const emailMask = [
  {
    regexp: /^[\w\-_.]+$/,
    placeholder: 'jane.smith',
  },
  { fixed: '@' },
  {
    regexp: /^[\w]+$/,
    placeholder: 'hpe',
  },
  { fixed: '.' },
  {
    regexp: /^[\w]+$/,
    placeholder: 'com',
  },
];

const emailValidation = [
  {
    regexp: new RegExp('[^@ \\t\\r\\n]+@'),
    message: 'Missing an @?',
    status: 'info',
  },
  {
    regexp: new RegExp('[^@ \\t\\r\\n]+@[^@ \\t\\r\\n]+\\.[^@ \\t\\r\\n]+'),
    message: 'Missing an .?',
    status: 'info',
  },
  {
    regexp: new RegExp('[^@ \\t\\r\\n]+@[^@ \\t\\r\\n]+\\.[^@ \\t\\r\\n]+'),
    message: "Email address doesn't look quite right",
    status: 'error',
  },
];

const passwordRulesStrong = [
  {
    regexp: new RegExp('(?=.*?[A-Z])'),
    message: 'At least one uppercase English letter',
    status: 'error',
  },
  {
    regexp: new RegExp('(?=.*?[a-z])'),
    message: 'At least one lowercase English letter',
    status: 'error',
  },
  {
    regexp: new RegExp('(?=.*?[0-9])'),
    message: 'At least one number',
    status: 'error',
  },
  {
    regexp: new RegExp('(?=.*?[#?!@$ %^&*-])'),
    message: 'At least one special character or space',
    status: 'error',
  },
  {
    regexp: new RegExp('.{8,}'),
    message: 'At least eight characters',
    status: 'error',
  },
];

const LayerForm = ({ setOpen }) => {
  // eslint-disable-next-line no-unused-vars
  const onSubmit = ({ value, touched }) => {
    // Your submission logic here
    setOpen(false);
  };

  return (
    <Box gap="medium">
      <Box>
        <Header justify="end">
          <Button icon={<Close />} onClick={() => setOpen(false)} />
        </Header>
        <Header
          direction="column"
          align="start"
          gap="xxsmall"
          pad={{ horizontal: 'xxsmall' }}
        >
          <Heading level={3} margin="none">
            Sign Up
          </Heading>
          <Text>for a Hewlett Packard Enterprise account</Text>
        </Header>
      </Box>
      <Form
        validate="blur"
        onSubmit={({ value, touched }) => onSubmit({ value, touched })}
      >
        <FormField
          label="Email"
          htmlFor="email-sign-up"
          name="email"
          validate={emailValidation}
        >
          <MaskedInput
            id="email-sign-up"
            name="email"
            mask={emailMask}
            type="email"
          />
        </FormField>
        <FormField
          label="Full Name"
          htmlFor="fullName-sign-up"
          name="fullName"
          required
        >
          <TextInput
            id="fullName-sign-up"
            name="fullName"
            placeholder="Jane Smith"
          />
        </FormField>
        <FormField
          label="Password"
          htmlFor="password-sign-up"
          name="password"
          help="Include at least 8 characters, a lowercase letter, an
    uppercase letter, a number, and a special character"
          validate={passwordRulesStrong}
        >
          <TextInput
            id="password-sign-up"
            name="password"
            placeholder="•••••••••••••••"
            type="password"
          />
        </FormField>
        <FormField htmlFor="terms-and-privacy" name="termsAndPrivacy">
          <CheckBox
            id="terms-and-privacy"
            name="termsAndPrivacy"
            label={
              <Box>
                <Text>
                  I accept the HPE{' '}
                  <Anchor
                    label="Terms of Use"
                    href="#"
                    target="_blank"
                    rel="noreferrer noopener"
                  />{' '}
                  and
                </Text>
                <Anchor
                  label="Privacy Policy"
                  href="#"
                  target="_blank"
                  rel="noreferrer noopener"
                />
              </Box>
            }
          />
        </FormField>
        <Box align="start" margin={{ top: 'medium', bottom: 'small' }}>
          <Button label="Sign up" primary type="submit" />
        </Box>
      </Form>
    </Box>
  );
};

LayerForm.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

export const LayerSideDrawerExample = () => {
  const [open, setOpen] = useState(false);
  const size = useContext(ResponsiveContext);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);
  return (
    <>
      <Box align="start">
        <Button label="Show me the side drawer" onClick={onOpen} primary />
      </Box>
      {open && (
        <Layer
          position="right"
          full={size !== 'small' ? 'vertical' : true}
          modal
          onClickOutside={onClose}
          onEsc={onClose}
        >
          <Box
            fill="vertical"
            overflow="auto"
            width={size !== 'small' ? 'medium' : undefined}
            pad="medium"
          >
            <LayerForm setOpen={value => setOpen(value)} />
          </Box>
        </Layer>
      )}
    </>
  );
};
