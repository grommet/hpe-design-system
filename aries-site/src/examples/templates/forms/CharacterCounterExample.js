import React from 'react';
import { Form, FormField, TextArea } from 'grommet';

export const CharacterCounterExample = () => {
  const maxLength = 40;
  const threshold = 0.5;

  return (
    <Form validate="change">
      <FormField
        contentProps={{ width: 'medium' }}
        label="Issue description"
        validate={value =>
          value.length / maxLength > threshold
            ? {
                status: maxLength - value.length >= 0 ? 'info' : 'error',
                message:
                  maxLength - value.length >= 0
                    ? `${maxLength - value.length} characters left`
                    : `${value.length - maxLength} character${
                        value.length - maxLength > 1 ? 's' : ''
                      } over limit`,
              }
            : undefined
        }
        name="issue-description"
        htmlFor="issue-description"
      >
        <TextArea
          aria-label="Text area with 40 character limit"
          id="issue-description"
          name="issue-description"
        />
      </FormField>
    </Form>
  );
};
