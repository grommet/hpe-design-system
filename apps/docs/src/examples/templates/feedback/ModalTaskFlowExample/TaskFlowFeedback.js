import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Box, Button, Form, FormField, StarRating, TextArea } from 'grommet';
import { ButtonGroup, TextEmphasis } from '@shared/aries-core';

// These credentials will be supplied when working with HPE GreenLake
// Experience Management COE team and should likely be stored in
// environment variables.
const API_URL = process.env.FEEDBACK_API_URL;
const API_TOKEN = process.env.FEEDBACK_API_TOKEN;

export const TaskFlowFeedback = ({ onClose }) => {
  const router = useRouter();
  const url = `${router.route}`;
  // The properties within the surveyValues object will be specific to your
  // product and instance within the product. These will be specified
  // when working with the HPE GreenLake Experience Management COE team.
  const surveyValues = {
    fullURL: url,
    QID1: undefined,
    QID2_TEXT: '',
  };
  const [formValue, setFormValue] = useState(surveyValues);
  const [thankyou, setThankyou] = useState(false);

  const onSubmit = useCallback(({ value }) => {
    const data = {
      values: value,
    };

    // eslint-disable-next-line no-unused-vars
    const submitResponse = () =>
      fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-API-TOKEN': API_TOKEN,
        },
        body: JSON.stringify(data),
      })
        // eslint-disable-next-line no-unused-vars
        .then(response => {
          // Response handling here
          // update state/routing as approiate based on response.json
        })
        // eslint-disable-next-line no-unused-vars
        .catch(error => {
          // Error handling here
        });

    //  preventing api call for demo purposes
    //  submitResponse();
  }, []);

  return (
    <Form
      kind="survey" // kind="survey" provides specific HPE styling for survey questions(https://v2.grommet.io/form?theme=hpe#kind).
      value={formValue}
      onChange={nextValue => setFormValue(nextValue)}
      onSubmit={onSubmit}
    >
      <Box gap="medium">
        <>
          <FormField
            htmlFor="power-rating"
            name="QID1"
            label="How easy was it for you to power off your selected devices?"
            // remove border when using StarRating & ThumbRating
            contentProps={{
              border: false,
            }}
          >
            <StarRating id="power-rating" name="QID1" />
          </FormField>
          {formValue.QID1 && (
            <Box animation={['slideDown', 'fadeIn']}>
              <FormField
                htmlFor="power-text-area-example"
                name="QID2_TEXT"
                label="How satisfied were you with this process?"
              >
                <TextArea
                  id="power-text-area-example"
                  name="QID2_TEXT"
                  placeholder="i.e. ideas, inspirations, or concerns"
                />
              </FormField>
            </Box>
          )}
        </>
        {thankyou ? (
          <TextEmphasis>Thank you for your response!</TextEmphasis>
        ) : (
          <ButtonGroup>
            <Button
              label="Submit feedback"
              primary
              type="submit"
              onClick={() => {
                setThankyou(true);
                setTimeout(() => {
                  onClose();
                }, 2500);
              }}
            />
            <Button label="No thanks" onClick={onClose} />
          </ButtonGroup>
        )}
      </Box>
    </Form>
  );
};

TaskFlowFeedback.propTypes = {
  onClose: PropTypes.func,
};
