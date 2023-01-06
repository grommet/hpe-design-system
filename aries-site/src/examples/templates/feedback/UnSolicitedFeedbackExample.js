import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import {
  Box,
  Button,
  Form,
  Layer,
  FormField,
  Footer,
  Text,
  Header,
  Heading,
  ThumbsRating,
  ResponsiveContext,
} from 'grommet';
import { Announce } from 'grommet-icons';

// create a floating button for story example
const PositionedFeedbackButton = styled(Button)`
  border-radius: 6px;
  z-index: 10;
`;

export const UnSolicitedFeedbackExample = () => {
  const size = useContext(ResponsiveContext);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);

  const closeFeedbackModal = () => {
    setTimeout(() => {
      setOpen(false);
      setIsSuccessful(false);
    }, 2000);
  };

  return (
    <>
      <PositionedFeedbackButton
        onClick={onOpen}
        margin={{ vertical: 'medium', horizontal: 'medium' }}
        elevation="large"
        a11yTitle="This button launches a modal to give feedback."
        primary
        alignSelf="start"
        icon={<Announce />}
      />
      {open && (
        <Layer onClickOutside={onClose} onEsc={onClose}>
          <Box
            fill="vertical"
            overflow="auto"
            width={!['xsmall', 'small'].includes(size) ? 'medium' : undefined}
            pad="medium"
            gap="medium"
          >
            <Header
              direction="column"
              align="start"
              gap="xxsmall"
              pad={{ horizontal: 'xxsmall' }}
            >
              <Heading level={4} size="small" margin="none">
                Let us know how your expirence was!
              </Heading>
            </Header>
            <Form
              method="post"
              validate="submit"
              kind="survey"
              onSubmit={value => {
                console.log('submit', value);
                setIsSuccessful(true);
                closeFeedbackModal();
              }}
            >
              <FormField
                htmlFor="thumbs-rating"
                name="rating"
                label="Was this content helpful?"
                contentProps={{
                  border: false,
                }}
              >
                <ThumbsRating id="thumbs-rating" name="rating" />
              </FormField>
              {!isSuccessful ? (
                <Footer
                  margin={{ top: 'medium', bottom: 'small' }}
                  direction="row"
                  justify="end"
                  gap="small"
                >
                  <Button onClick={onClose} label="Cancel" />
                  <Button label="Submit Feedback" primary type="submit" />
                </Footer>
              ) : (
                <Footer margin={{ top: 'medium', bottom: 'small' }} align="end">
                  <Text weight="bold" size="large">
                    Thank you for your response!
                  </Text>
                </Footer>
              )}
            </Form>
          </Box>
        </Layer>
      )}
    </>
  );
};
