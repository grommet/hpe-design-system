import React, { useState } from 'react';
import { Box, Button, CheckBox, Form, FormField } from 'grommet';

export const CheckBoxOptingIntoAgreementExample = () => {
  const [accepted, setAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <Box pad="medium" align="center">
        <Button
          label="Start over"
          onClick={() => {
            setSubmitted(false);
            setAccepted(false);
          }}
        />
      </Box>
    );
  }

  return (
    <Box pad="medium" width="medium" gap="medium">
      <Form onSubmit={() => setSubmitted(true)}>
        <FormField
          name="terms"
          htmlFor="terms"
        >
          <CheckBox
            id="terms"
            name="terms"
            label="I agree to the terms and conditions"
            checked={accepted}
            onChange={e => setAccepted(e.target.checked)}
          />
        </FormField>
        <Box pad={{ top: 'small' }}>
          <Button
            label="Create account"
            primary
            type="submit"
            disabled={!accepted}
          />
        </Box>
      </Form>
    </Box>
  );
};
