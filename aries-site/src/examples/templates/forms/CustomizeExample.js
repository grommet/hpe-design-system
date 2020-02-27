import React from 'react';
import {
  Box,
  Button,
  Form,
  FormField,
  Header,
  Heading,
  Main,
  Select,
  Text,
  Anchor,
} from 'grommet';

import { FormContainer } from '.';

const memoryOptions = [
  '8GB (1x8GB) DDR4-2400 ECC memory',
  '32GB (2x16GB) DDR4-2400 ECC memory',
  '64GB (2x32GB) DDR4-2400 ECC memory',
];

const cpuOptions = [
  'AMD Opteron&trade; 1.6GHz (Turbo Boost 2.8GHz), 4 cores, 6 ' +
    'graphic cores, 1MB',
  'AMD Opteron&trade; 2.1GHz (Turbo Boost 3.4GHz), 4 cores, 8 ' +
    'graphic cores, 2MB',
];

export const CustomizeExample = () => {
  const [formValues, setFormValues] = React.useState({
    memory: '32GB (2x16GB) DDR4-2400 ECC memory',
    cpu:
      'AMD Opteron&trade; 2.1GHz (Turbo Boost 3.4GHz), 4 cores, 8 ' +
      'graphic cores, 2MB',
  });

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
          <Heading level={3} margin="none">
            Customize
          </Heading>
          <Text>your HPE Edgeline Server</Text>
        </Header>
        <Main
          // Padding used to prevent focus from being cutoff
          pad={{ horizontal: 'xxsmall' }}
        >
          <Form
            value={formValues}
            onChange={setFormValues}
            onSubmit={({ value, touched }) => onSubmit({ value, touched })}
          >
            <FormField
              name="memory"
              label={
                <Box>
                  <Text>Memory</Text>
                  <Anchor
                    href="#"
                    onClick={() => {}}
                    size="xsmall"
                    color="brand"
                  >
                    How much memory does my server need?
                  </Anchor>
                </Box>
              }
              component={Select}
              options={memoryOptions}
            />
            <FormField
              name="cpu"
              label={
                <Box>
                  <Text>CPU</Text>
                  <Anchor
                    href="#"
                    onClick={() => {}}
                    size="xsmall"
                    color="brand"
                  >
                    What is the right processor for my workload?
                  </Anchor>
                </Box>
              }
              component={Select}
              options={cpuOptions}
            />
            <Box align="start" margin={{ top: 'medium', bottom: 'small' }}>
              <Button label="Continue" primary type="submit" />
            </Box>
          </Form>
        </Main>
      </Box>
    </FormContainer>
  );
};
