import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  Header,
  Select,
  Text,
  TextInput,
  TextArea,
} from 'grommet';
import { CircleAlert } from 'grommet-icons';

const superPower = ['Flying', 'Sky Runner', 'Invisibility'];
const weakness = ['Fire', 'PB & J', 'Kryptonite'];

const RequiredFormField = props => {
  const { required, label, ...rest } = props;
  return (
    <FormField
      label={required ? `${label}*` : label}
      required={required}
      {...rest}
    />
  );
};

RequiredFormField.propTypes = {
  required: PropTypes.bool,
  label: PropTypes.string,
};

const FormContainer = ({ ...rest }) => {
  return (
    <Box background="background-front" border round="small" overflow="hidden">
      <Box flex pad={{ horizontal: 'medium', vertical: 'medium' }} {...rest} />
    </Box>
  );
};

const Error = ({ textError, ...rest }) => {
  return (
    <Box {...rest} align="center" gap="xsmall" direction="row">
      <CircleAlert size="small" />
      <Text size="xsmall">{textError}</Text>
    </Box>
  );
};

Error.propTypes = {
  textError: PropTypes.string,
};

export const FormHeaderExample = () => {
  const [formValues, setFormValues] = React.useState({
    name: 'Enduro',
    superPower: 'Sky Runner',
    nemesis: true,
    email: 'enduro@skyrunner.io.com',
    weakness: 'PB & J',
  });

  const onFormChange = value => {
    setFormValues(value);
  };

  return (
    <FormContainer width="medium">
      <Box gap="medium">
        <Header
          direction="column"
          align="start"
          gap="xxsmall"
          pad={{ horizontal: 'xxsmall' }}
        >
          <Text size="xxlarge" weight="bold">
            Form Header
          </Text>
        </Header>
        <Box
          // Padding used to prevent focus from being cutoff
          pad={{ horizontal: 'xxsmall' }}
        >
          <Form
            messages={{
              required: (
                <Error
                  background="background-front"
                  textError="This is a required field."
                />
              ),
            }}
            value={formValues}
            onChange={onFormChange}
          >
            <RequiredFormField
              required
              error={
                <Error
                  background="background-front"
                  textError="Invalid credentials."
                />
              }
              htmlFor="name__input"
              name="name"
              label="Name"
            >
              <TextInput id="name" name="name" />
            </RequiredFormField>
            <RequiredFormField
              required
              htmlFor="superPower__input"
              name="superPower"
              label="Superpower"
            >
              <Select options={superPower} id="superPower" name="superPower" />
            </RequiredFormField>
            <RequiredFormField
              required
              htmlFor="weakness__input"
              name="weakness"
              label="Weakness"
            >
              <Select options={weakness} id="weakness" name="weakness" />
            </RequiredFormField>
            <RequiredFormField
              required
              htmlFor="email__input"
              name="email"
              label="Email"
            >
              <TextInput id="email" name="email" />
            </RequiredFormField>
            <RequiredFormField
              required
              help="Would you like to apply nemesis character"
              htmlFor="nemesis__input"
              name="nemesis"
              label="Nemesis"
            >
              <CheckBox name="nemesis" label="Bring it on" toggle reverse />
            </RequiredFormField>
            <FormField htmlFor="comments" name="comments" label="Comments">
              <TextArea id="comments" name="comments" placeholder="Comments" />
            </FormField>
            <Box
              direction="row"
              margin={{ top: 'medium', bottom: 'medium' }}
              gap="xsmall"
              round="4px"
              pad="small"
              background={{ light: '#FC61613D', dark: '#C54E4B5C' }}
            >
              <Error
                textError="The name of the superhero is already
               being used. Provide a unique name."
              />
            </Box>
            <Box align="start" margin={{ top: 'medium', bottom: 'small' }}>
              <Button label="Create" primary type="submit" />
            </Box>
          </Form>
        </Box>
      </Box>
    </FormContainer>
  );
};
