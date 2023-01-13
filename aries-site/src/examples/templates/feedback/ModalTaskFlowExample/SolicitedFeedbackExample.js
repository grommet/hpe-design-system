import React, { useCallback, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Anchor, AnnounceContext, Box, Button } from 'grommet';
import { ModalDialog } from '../../ModalDialog';
import { PowerDeviceFeedback } from './PowerDeviceFeedback';
import { PowerOnBodyExample } from './PowerOnBodyExample';

// These credentials will be supplied when working with unified
// customer experience team and should likely be stored in environment varibles.
const API_URL = process.env.FEEDBACK_API_URL;
const API_TOKEN = process.env.FEEDBACK_API_TOKEN;

export const ModalTaskFlowExample = ({ containerRef }) => {
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
  const router = useRouter();
  const url = `${router.route}`;

  const onSubmit = useCallback(value => {
    const data = {
      // The properties in the value object will be specific to your
      // product and instance within the product.
      // These will be specified when working with the unified customer experience team (Doris Singer - doris.singer@hpe.com).
      values: {
        fullURL: url,
        deviceType: deviceType,
        QID1: value.value['power-rating-example'],
        QID2_TEXT: value.value['power-textArea-example'],
      },
    };

    const submitResponse = fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-API-TOKEN': API_TOKEN,
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        // Response handling here
        // update state/routing as approiate based on response.json
        setIsSuccessful(false);
        setShowFeedback(false);
        setShowModal(false);
        setShowConfirmation(false);
      })
      .catch(error => {
        // Error handling here
      });

    //  preventing api call for demo purposes
    //  submitResponse();
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
                onSubmit();
                // the following is for demo purposes
                // these would typically be handeled in your response handling.
                setShowConfirmation(true);
                setTimeout(() => {
                  setIsSuccessful(false);
                  setRating(undefined);
                  setShowFeedback(false);
                  setShowModal(false);
                  setShowConfirmation(false);
                }, 2000);
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
