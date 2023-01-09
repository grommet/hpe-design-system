import React, { useCallback, useState } from 'react';
import {
  Anchor,
  Box,
  Button,
  Card,
  Form,
  FormField,
  Heading,
  Spinner,
  StarRating,
  Text,
  TextArea,
} from 'grommet';
import { StatusGoodSmall } from 'grommet-icons';

export const PowerOnExample = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [rating, setRating] = useState(undefined);

  const PowerOnLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccessful(true);
    }, 3000);
  };

  // fetch call to POST api should be in onSubmit
  const onSubmit = useCallback(value => {
    const data = {
      values: {
        fullURL: `url`,
        deviceType: 'desktop',
        QID1: value.value['power-rating-example'],
        QID2_TEXT: value.value['power-textArea-example'],
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
    <Card width="large" gap="medium" justify="center" pad="medium">
      <Box>
        <Heading level={1} size="small" margin="none">
          Power On
        </Heading>
        <Anchor href="#" label="Learn more about server actions" />
      </Box>
      {!isSuccessful ? (
        <Text size="large">You are powering on 1 device</Text>
      ) : (
        <Box align="center" gap="xsmall" direction="row">
          <StatusGoodSmall color="green" />
          <Text size="large">Power On initiated for 1 device.</Text>
        </Box>
      )}
      {!isLoading && !isSuccessful && (
        <Text size="large">FTCUSAMountain_ML350Gen10_testcluster</Text>
      )}
      {isLoading && (
        <Spinner
          alignSelf="center"
          size="medium"
          message={{
            start: 'Loading more data.',
            end: 'Data has been loaded.',
          }}
        />
      )}
      {!isSuccessful && (
        <Box
          justify="end"
          gap="medium"
          margin={{ top: 'medium', bottom: 'small' }}
          direction="row"
        >
          <Button label="Cancel" />
          <Button
            label="Power on 1 Device"
            onClick={PowerOnLoading}
            primary
            type="submit"
          />
        </Box>
      )}
      {isSuccessful && (
        <Box width="large" gap="medium" justify="center" pad="small">
          <Heading level={4} size="small" margin="none">
            Feedback on powering devices
          </Heading>
          <Form
            method="post"
            validate="submit"
            kind="survey"
            onChange={(nextValue, { touched }) => {
              setRating(touched);
            }}
            onSubmit={value => {
              console.log('submit', value.value);
            }}
          >
            <Box gap="medium">
              <FormField
                contentProps={{
                  border: false,
                }}
                label="How easy was it for you to power off your selected devices?"
                htmlFor="power-rating"
                name="power-rating-example"
              >
                <StarRating id="power-rating" name="power-rating-example" />
              </FormField>
              {rating && (
                <Box gap="medium">
                  <FormField
                    name="power-textArea-example"
                    htmlFor="power-text-area-example"
                    label="How satisfied were you with this process?"
                  >
                    <TextArea
                      name="power-textArea-example"
                      id="power-text-area-example"
                      placeholder="i.e. ideas, inspirations, or concerns"
                    />
                  </FormField>
                  <Box align="end" justify="end">
                    <Button
                      onClick={() => {
                        setIsSuccessful(false);
                        setRating(undefined);
                      }}
                      label="Submit Feedback"
                      primary
                      type="submit"
                    />
                  </Box>
                </Box>
              )}
            </Box>
          </Form>
        </Box>
      )}
    </Card>
  );
};
