import React, { useCallback, useContext, useState } from 'react';
import { Anchor, AnnounceContext, Box, Button } from 'grommet';
import { ModalDialog } from '../ModalDialog';
import { PowerDeviceFeedback } from './PowerDeviceFeedback';
import { PowerOnBodyExample } from './PowerOnBodyExample';

export const SolicitedFeedbackExample = ({ containerRef }) => {
  // containerRef is for demonstration purposes on this site. Most
  // implementations should likely remove.
  const [showModal, setShowModal] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [rating, setRating] = useState();
  const [showFeedback, setShowFeedback] = useState(false);
  // announce when the layer opens
  const announce = useContext(AnnounceContext);

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
          title={isSuccessful ? `We'd love your feedback` : 'Power On'}
          onEsc={() => {
            announce(
              `Power on device modal cancelled and closed.`,
              'assertive',
            );
            setShowModal(false);
          }}
          subtitle={
            !showFeedback && (
              <Anchor href="#" label="Learn more about server actions" />
            )
          }
          target={containerRef && containerRef.current}
        >
          {isSuccessful && showFeedback ? (
            <PowerDeviceFeedback
              showConfirmation={showConfirmation}
              onChange={(nextValue, { touched }) => {
                setRating(touched);
              }}
              onSubmit={value => {
                setShowConfirmation(true);
                setTimeout(() => {
                  setIsSuccessful(false);
                  setRating(undefined);
                  setShowFeedback(false);
                  setShowModal(false);
                  setShowConfirmation(false);
                }, 2000);
                console.log('submit', value);
              }}
              rating={rating}
              onClose={() => {
                announce(
                  `Feedback on powering devices modal cancelled and closed.`,
                  'assertive',
                );
                setShowModal(false);
                setShowFeedback(false);
                setIsSuccessful(false);
              }}
            />
          ) : (
            <PowerOnBodyExample
              onClose={() => {
                setShowFeedback(true);
              }}
              onDismiss={() => {
                setShowModal(false);
              }}
              powerOnLoading={() => {
                // simulating a call to a power on API call. Demo purposes
                setIsLoading(true);
                setTimeout(() => {
                  setIsLoading(false);
                  setIsSuccessful(true);
                }, 3000);
              }}
              isSuccessful={isSuccessful}
              isLoading={isLoading}
            />
          )}
        </ModalDialog>
      ) : null}
    </Box>
  );
};
