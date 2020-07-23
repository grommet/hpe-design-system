import React from 'react';
import {
  Anchor,
  Box,
  Button,
  Form,
  FormField,
  Header,
  RadioButtonGroup,
  Text,
} from 'grommet';

const FormContainer = ({ ...rest }) => {
  return (
    <Box background="background-front" border round="small" overflow="hidden">
      <Box flex pad={{ horizontal: 'medium', vertical: 'medium' }} {...rest} />
    </Box>
  );
};

export const CustomizeExample = () => {
  const [formValues, setFormValues] = React.useState({});

  // eslint-disable-next-line no-unused-vars
  const onSubmit = ({ value, touched }) => {
    // Your submission logic here
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
            Customize
          </Text>
          <Text>your HPE Edgeline Server </Text>
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
          >
            <FormField
              label={
                <Text size="large" weight="bold">
                  Memory
                </Text>
              }
              help={
                <Anchor href="#" size="xsmall">
                  How much memory does my server need?
                </Anchor>
              }
              htmlFor="memory"
              name="memory"
            >
              <RadioButtonGroup
                name="memory"
                options={[
                  '8GB (1x8GB) DDR4-2400 ECC memory',
                  '32GB (2x16GB) DDR4-2400 ECC memory',
                  '64GB (2x32GB) DDR4-2400 ECC memory',
                ]}
              />
            </FormField>
            <FormField
              label={
                <Text size="large" weight="bold">
                  CPU
                </Text>
              }
              help={
                <Anchor href="#" size="xsmall">
                  What is the right processor for my workload?
                </Anchor>
              }
              htmlFor="cpu"
              name="cpu"
            >
              <RadioButtonGroup
                name="cpu"
                options={[
                  'AMD Opteron™ 1.6GHz (Turbo Boost 2.8GHz), 4 cores, 6 ' +
                    'graphic cores, 1MB',
                  'AMD Opteron™ 2.1GHz (Turbo Boost 3.4GHz), 4 cores, 8 ' +
                    'graphic cores, 2MB',
                ]}
              />
            </FormField>
            <Box align="start" margin={{ top: 'medium', bottom: 'small' }}>
              <Button label="Continue" primary type="submit" />
            </Box>
          </Form>
        </Box>
      </Box>
    </FormContainer>
  );
};
