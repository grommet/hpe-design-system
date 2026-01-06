import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import {
  FeedbackButton,
  Feedback as FeedbackModal,
  Question,
} from '../../components';

export const UserFeedback = () => {
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  const router = useRouter();

  // Want to show Thank you message so close the modal after 2 seconds
  const closeFeedbackModal = () => {
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  const onSubmit = useCallback(
    value => {
      const data = {
        values: {
          QID1: value.value['like-rating'] === 'like' ? 1 : 2,
          QID2_TEXT: value.value['text-area'],
          Q_URL: `https://design-system.hpe.design${router.route}`,
        },
      };
      if (process.env.NODE_ENV === 'production') {
        // using next js env variables for url & api token
        // https://nextjs.org/docs/basic-features/environment-variables
        fetch(`${process.env.NEXT_PUBLIC_FEEDBACK_API_POST}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-API-TOKEN': process.env.NEXT_PUBLIC_FEEDBACK_APP_API_TOKEN,
          },
          body: JSON.stringify(data),
        })
          .then(response => response.json())
          .then(() => {
            closeFeedbackModal();
          })
          .catch(error => {
            console.error('Error:', error);
          });
      } else {
        console.log(
          'Feedback submission skipped in non-production environment. \n',
          'POST would be sent with the following body: \n',
          JSON.stringify(data),
        );
        closeFeedbackModal();
      }
    },
    [router.route],
  );

  return (
    <>
      <FeedbackButton
        margin={{ vertical: 'medium', horizontal: 'medium' }}
        elevation="large"
        onClick={onOpen}
        label="Feedback"
        primary
        a11yTitle="This button launches a modal to give feedback."
      />
      <FeedbackModal
        show={open}
        messages={{
          submit: 'Submit feedback',
          cancel: 'No thanks',
          successful: 'Thank you!',
        }}
        modal
        onClose={onClose}
        title="We'd love your feedback"
        onSubmit={onSubmit}
      >
        <Question
          label="Was this page helpful?"
          kind="thumbs"
          name="like-rating"
        />
        <Question
          name="text-area"
          kind="textArea"
          label="Any additional comments?"
          formProps={{
            help: `Here's your chance to tell us your thoughts 
            about this page.`,
          }}
        />
      </FeedbackModal>
    </>
  );
};
