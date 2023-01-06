import React, { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Footer,
  Form,
  FormField,
  Text,
  TextArea,
  StarRating,
} from 'grommet';

export const SubscriptionOrderExample = () => {
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [showFeedbackExample, setShowFeedbackExample] = useState(true);

  const showFeedback = () => {
    setIsSuccessful(true);
    setTimeout(() => {
      setShowFeedbackExample(false);
    }, 3000);
  };

  const onSubmit = useCallback(value => {
    const data = {
      // values that are needed for survey purposes to be sent back to api
      values: {
        fullURL: `url`,
        deviceType: 'desktop',
        QID1: (value.value['subscription-rating-example']),
        QID2_TEXT: value.value['subscription-textArea-example'],
      },
    };
    // dev uses POST https://api.qualtrics.com/f1cad92018d2b-create-a-new-response
    // call to send in the data collected.
    // Contact Doris Singer for Survey ID, API Token, Response ID to use for testing
    fetch(`https://api.qualtrics.com/f1cad92018d2b-create-a-new-response`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-API-TOKEN': 'Contact Doris Singer for API Token',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);
  return (
    <Box gap="large" justify="center" pad="small">
      <Heading alignSelf="center" level={1} size="small" margin="none">
        Your Order Has Been Submitted
      </Heading>
      <Text>
        Once the order is accepted, the subscription key will be delivered via
        email. Your Reference ID is c8160d4f-51b9-4425-afd9-68d4eb53dc3c. This
        information is also available in your Order Details which can be
        accessed through the Order History.
      </Text>
      <Box
        justify="end"
        gap="medium"
        margin={{ top: 'medium', bottom: 'small' }}
        direction="row"
      >
        <Button label="Close" />
        <Button label="View Order History" secondary />
      </Box>
      {showFeedbackExample && (
        <Box width="large" gap="medium" justify="center" pad="small">
          <Heading level={4} size="small" margin="none">
            Help us improve your experience
          </Heading>
          <Form
            method="post"
            validate="submit"
            kind="survey"
            onSubmit={value => {
              console.log('submit', value.value);
              showFeedback();
            }}
          >
            <Box gap="medium">
              <FormField
                contentProps={{
                  border: false,
                }}
                label="How satisfied are you with the subscription purchase procerss?"
                htmlFor="subscription-rating"
                name="subscription-rating-example"
              >
                <StarRating
                  id="subscription-rating"
                  name="subscription-rating-example"
                />
              </FormField>
              <Box gap="medium">
                <FormField
                  name="subscription-textArea-example"
                  htmlFor="subscription-text-area-example"
                  label="Why did you select this rating?"
                >
                  <TextArea
                    name="subscription-textArea-example"
                    id="subscription-text-area-example"
                  />
                </FormField>
                {!isSuccessful ? (
                  <Footer
                    margin={{ top: 'medium', bottom: 'small' }}
                    direction="row"
                    justify="end"
                    gap="small"
                  >
                    <Button label="Cancel" />
                    <Button label="Submit Feedback" primary type="submit" />
                  </Footer>
                ) : (
                  <Footer
                    margin={{ top: 'medium', bottom: 'small' }}
                    justify='end'
                  >
                    <Text weight="bold" size="large">
                      Thank you for your response!
                    </Text>
                  </Footer>
                )}
              </Box>
            </Box>
          </Form>
        </Box>
      )}
    </Box>
  );
};
