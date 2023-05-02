import React from 'react';

import { Form, FormField, Heading, StarRating } from 'grommet';

export const SimpleFeedbackExample = () => (
  <>
    <Heading level={2} margin="none">
      We'd love your feedback
    </Heading>
    <Form kind="survey">
      <FormField
        contentProps={{
          border: false,
        }}
        label="How would you rate your purchasing experience today?"
        htmlFor="star-rating"
        name="rating"
      >
        <StarRating id="star-rating" name="rating" />
      </FormField>
    </Form>
  </>
);
