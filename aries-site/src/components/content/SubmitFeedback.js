import React, { useContext, useState } from 'react';
import { Box, Button, Grid, Layer, ResponsiveContext, Text } from 'grommet';
import { ChatOption, MailOption, Close, Github } from 'grommet-icons';
import { SubsectionText } from '.';

const Subscribe = () => (
  <Box gap="small">
    <MailOption size="large" />
    <Text weight="bold" size="large">
      Stay up-to-date
    </Text>
    <SubsectionText>
      Get the latest feature enhancements and announcements directly to your
      inbox.
    </SubsectionText>
    <Box align="start">
      <Button
        label="Subscribe"
        // eslint-disable-next-line max-len
        href="mailto:mike.walrath@hpe.com?subject=Keep%20me%20updated%20on%20the%20HPE%20Design%20System&body=Hi%20there,%0d%0dI%20would%20like%20to%20be%20added%20to%20the%20HPE%20Design%20System%20mailing%20list,%20so%20that%20I'll%20receive%20updates%20and%20announcements%20about%20the%20Design%20System. Thank you!"
        primary
      />
    </Box>
  </Box>
);

const JoinConversation = () => (
  <Box gap="small">
    <ChatOption size="large" />
    <Text weight="bold" size="large">
      Join the conversation
    </Text>
    <SubsectionText>
      Specific questions? Want feedback or advice? Generally curious? Join the
      #general-hpe channel on Grommet Slack by signing up with an HPE email.
    </SubsectionText>
    <Box align="start">
      <Button
        label="Join us on Slack"
        href="http://slackin.grommet.io/"
        target="_blank"
        rel="noreferrer noopener"
        primary
      />
    </Box>
  </Box>
);

const Contribute = () => (
  <Box gap="small">
    <Github size="large" />
    <Text weight="bold" size="large">
      Contribute
    </Text>
    <SubsectionText>
      Have suggestions? Improvement ideas? Submit a bug, feature request, or
      better yet, make your impact for all by submitting your own contribution.
    </SubsectionText>
    <Box align="start">
      <Button
        label="Submit to Github"
        href="https://github.com/hpe-design/aries/issues"
        target="_blank"
        rel="noreferrer noopener"
        primary
      />
    </Box>
  </Box>
);

export const FeedbackOptions = () => {
  const size = useContext(ResponsiveContext);
  return (
    <Box flex={false} width="xlarge">
      <Grid
        columns={size !== 'small' ? { count: 'fit', size: 'small' } : 'auto'}
        gap="large"
      >
        <Subscribe />
        <JoinConversation />
        <Contribute />
      </Grid>
    </Box>
  );
};

export const SubmitFeedback = () => {
  const [open, setOpen] = useState();
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);

  return (
    <>
      <Box align="start">
        <Button label="Leave feedback" onClick={onOpen} primary />
      </Box>
      {open && (
        <Layer modal onClickOutside={onClose} onEsc={onClose} margin="medium">
          <Box flex>
            <Box
              flex={false}
              direction="row"
              align="center"
              justify="end"
              pad={{ top: 'medium', horizontal: 'medium' }}
            >
              <Button
                a11yTitle="Close Feedback Options"
                icon={<Close />}
                onClick={onClose}
              />
            </Box>
            <Box
              flex
              pad={{ horizontal: 'large', bottom: 'large' }}
              overflow="auto"
            >
              <FeedbackOptions />
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
};
