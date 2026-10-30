// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useState } from 'react';
import {
  Box,
  Button,
  Form,
  FormField,
  Heading,
  Layer,
  Notification,
  StarRating,
  Text,
  TextArea,
} from 'grommet';
import { Close } from '@hpe-design/icons-grommet';
import { useShell } from '../contexts/ShellContext';

// Feedback is a "User" item: global, personal, independent of where you are.
export const FeedbackLayer = () => {
  const { feedbackOpen, dispatch } = useShell();
  const [value, setValue] = useState({ rating: 0, comment: '' });
  if (!feedbackOpen) return null;

  const close = () => dispatch({ type: 'CLOSE_FEEDBACK' });
  const submit = () => {
    close();
    setValue({ rating: 0, comment: '' });
    dispatch({
      type: 'SHOW_TOAST',
      title: 'Thanks for your feedback',
      message: 'Your comments help shape the HPE GreenLake experience.',
    });
  };

  return (
    <Layer position="center" onClickOutside={close} onEsc={close} modal>
      <Box pad="medium" gap="medium" width="medium">
        <Box direction="row" justify="between" align="start">
          <Box>
            <Heading level={2} size="small" margin="none">
              Share feedback
            </Heading>
            <Text size="small">
              Tell us about your HPE GreenLake experience.
            </Text>
          </Box>
          <Button
            icon={<Close aria-hidden="true" />}
            a11yTitle="Close feedback"
            onClick={close}
          />
        </Box>
        <Form value={value} onChange={setValue} onSubmit={submit}>
          <FormField
            name="rating"
            label="How satisfied are you?"
            htmlFor="feedback-rating"
          >
            <StarRating name="rating" id="feedback-rating" />
          </FormField>
          <FormField name="comment" label="Comments" htmlFor="feedback-comment">
            <TextArea
              id="feedback-comment"
              name="comment"
              placeholder="What is working well? What could be better?"
            />
          </FormField>
          <Box
            direction="row"
            gap="small"
            justify="end"
            margin={{ top: 'small' }}
          >
            <Button label="Cancel" onClick={close} />
            <Button label="Send feedback" primary type="submit" />
          </Box>
        </Form>
      </Box>
    </Layer>
  );
};

export const ShellToast = () => {
  const { toast, dispatch } = useShell();
  if (!toast) return null;
  return (
    <Notification
      toast={{ autoClose: true, position: 'bottom-right' }}
      status="normal"
      title={toast.title}
      message={toast.message}
      time={4000}
      onClose={() => dispatch({ type: 'CLEAR_TOAST' })}
    />
  );
};
