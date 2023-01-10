import React, { useCallback, useContext, useState } from 'react';
import {
  Anchor,
  AnnounceContext,
  Box,
  Button,
  Form,
  FormField,
  Spinner,
  StarRating,
  Text,
  TextArea,
} from 'grommet';
import { ModalBody, ModalDialog, ModalFooter } from '../ModalDialog';
import { StatusGoodSmall } from 'grommet-icons';

export const PowerOnExample = ({ containerRef }) => {
  // containerRef is for demonstration purposes on this site. Most
  // implementations should likely remove.
  const [showModal, setShowModal] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [rating, setRating] = useState();
  const [showFeedback, setShowFeedback] = useState(false);
  // announce when the layer opens
  const announce = useContext(AnnounceContext);

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
    <Box align="center" justify="center" fill>
      <Button
        primary
        label="Power on device"
        onClick={() => {
          setShowModal(true);
        }}
      />
      {showModal ? (
        <ModalDialog
          title="Power On"
          onEsc={() => {
            announce(
              `Power on device} modal cancelled and closed.`,
              'assertive',
            );
            setShowModal(false);
          }}
          subtitle={<Anchor href="#" label="Learn more about server actions" />}
          target={containerRef && containerRef.current}
        >
          <ModalBody gap="medium">
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
          </ModalBody>
          <ModalFooter justify="end">
            {!isSuccessful && !isLoading ? (
              <Box justify="end" gap="medium" direction="row">
                <Button onClick={() => setShowModal(false)} label="Dismiss" />
                <Button
                  label="Power on 1 Device"
                  onClick={PowerOnLoading}
                  primary
                  type="submit"
                />
              </Box>
            ) : (
              <Box justify="end">
                <Button
                  label="Close"
                  disabled={isLoading ? true : false}
                  onClick={() => {
                    setShowFeedback(true);
                    setShowModal(false);
                  }}
                  primary
                />
              </Box>
            )}
          </ModalFooter>
        </ModalDialog>
      ) : null}
      {isSuccessful && showFeedback && (
        <ModalDialog
          title="Feedback on powering devices"
          onEsc={() => {
            announce(
              `Feedback on powering devices modal cancelled and closed.`,
              'assertive',
            );
            setShowModal(false);
          }}
          target={containerRef && containerRef.current}
        >
          <Form
            method="post"
            validate="submit"
            kind="survey"
            onChange={(nextValue, { touched }) => {
              setRating(touched);
            }}
            onSubmit={value => {
              console.log('submit', value);
              setIsSuccessful(false);
              setRating(undefined);
              setShowFeedback(false);
            }}
          >
            <Box gap="medium">
              <ModalBody>
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
              </ModalBody>
              <ModalFooter justify="end">
                <Box direction="row" gap="small">
                  <Button
                    label="Cancel"
                    onClick={() => {
                      announce(
                        `Feedback on powering devices modal cancelled and closed.`,
                        'assertive',
                      );
                      setShowFeedback(false);
                      setIsSuccessful(false);
                    }}
                  />
                  <Button label="Submit Feedback" primary type="submit" />
                </Box>
              </ModalFooter>
            </Box>
          </Form>
        </ModalDialog>
      )}
    </Box>
  );
};
