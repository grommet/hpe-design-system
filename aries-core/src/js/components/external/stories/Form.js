import React from 'react';
import {
  Anchor,
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  Grommet,
  Text,
  TextInput,
} from 'grommet';
import { Hpe } from 'grommet-icons';
import { aries } from '../../../../../../aries-site/src/themes/aries';

export default {
  title: 'Form',
};

export const Simple = () => {
  return (
    <Grommet theme={aries} full>
      <Box align="center" pad="large">
        <Form>
          <Box
            align="start"
            gap="medium"
            background="background-front"
            pad="large"
          >
            <Hpe color="brand" size="large" />
            <Text size="large">Sign in to HPE</Text>
            <FormField label="Email" htmlFor="username">
              <TextInput
                id="username"
                placeholder="Email address"
                type="email"
              />
            </FormField>
            <CheckBox label="Keep me signed in" />
            <Button type="submit" label="Next" primary />
            <Anchor label="Forgot your password?" size="small" />
          </Box>
        </Form>
      </Box>
    </Grommet>
  );
};
