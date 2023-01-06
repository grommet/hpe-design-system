import React from 'react';

import { Box, Form, FormField, Heading, StarRating } from 'grommet';

export const SimpleFeedbackExample = () => (
  <Box justify="center" pad="small">
    <Heading level={4} size="small" margin="none">
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
  </Box>
);
