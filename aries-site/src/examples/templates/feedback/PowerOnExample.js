import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  Anchor,
  Box,
  Button,
  Card,
  Layer,
  Form,
  Footer,
  FormField,
  Heading,
  Spinner,
  StarRating,
  ResponsiveContext,
  Text,
  TextArea,
} from 'grommet';
import { StatusGoodSmall } from 'grommet-icons';

const FeedbackLayout = ({ children, onClick, onClose }) => {
  const breakpoint = useContext(ResponsiveContext);
  return (
    // feedback layout
    <Layer>
      <Box
        fill="vertical"
        overflow="auto"
        width={!['xsmall', 'small'].includes(breakpoint) ? 'medium' : undefined}
        pad="medium"
        gap="medium"
      >
        <Heading level={4} size="small" margin="none">
          Feedback on powering devices
        </Heading>
        {children}
        <Footer direction="row" justify="end" gap="small">
          <Button onClick={onClose} label="Cancel" />
          <Button
            onClick={onClick}
            label="Submit Feedback"
            primary
            type="submit"
          />
        </Footer>
      </Box>
    </Layer>
  );
};

export const PowerOnExample = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [rating, setRating] = useState();
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (isSuccessful) {
        setShowFeedback(true);
      }
    }, 1000);
  }, [isSuccessful]);

  // simulating a call to a power on API call. Demo purposes
  const PowerOnLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccessful(true);
    }, 3000);
  };

  // fetch call to POST api should be in onSubmit
  // for demo purposes disabling actual API call
  // submitFeedback();
  const onSubmit = useCallback(value => {
    const data = {
      values: {
        // url for the route which the feedback survey is presented
        fullURL: url,
        // type of device. Possible values 'desktop', 'tablet', 'mobile'.
        deviceType: deviceType,
        // QIDs are unique to each feedback instance and will be provided when
        // coordinating with program manager, Doris Singer (doris.singer@hpe.com).
        QID1: value.value['power-rating-example'],
        QID2_TEXT: value.value['power-textArea-example'],
      },
    };
    // dev uses POST https://api.qualtrics.com/{survey-id}-create-a-new-response
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-API-TOKEN': API_TOKEN,
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .catch(error => {
        // Error handling here
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
          <Button label="Dismiss" />
          <Button
            label="Power on 1 Device"
            onClick={PowerOnLoading}
            primary
            type="submit"
          />
        </Box>
      )}
      {isSuccessful && showFeedback && (
        <FeedbackLayout
          onClick={() => {
            setIsSuccessful(false);
            setRating(undefined);
            setShowFeedback(false);
          }}
          onClose={() => {
            setShowFeedback(false);
          }}
        >
          <Box gap="medium">
            <Form
              method="post"
              validate="submit"
              kind="survey"
              onChange={(nextValue, { touched }) => {
                setRating(touched);
              }}
              onSubmit={value => {
                console.log('submit', value);
              }}
            >
              <FormField
                // remove border when using StarRating & ThumbRating
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
                </Box>
              )}
            </Form>
          </Box>
        </FeedbackLayout>
      )}
    </Card>
  );
};
