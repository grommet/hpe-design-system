import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Grid, Layer, ResponsiveContext, Text } from 'grommet';
import { ChatOption, Contact, MailOption, Close, Github } from 'grommet-icons';
import { SubsectionText } from '.';

const Subscribe = () => (
  <Box gap="small">
    <Contact size="large" />
    <Text weight="bold" size="large">
      Stay up-to-date
    </Text>
    <SubsectionText>
      Get the latest updates on the HPE Design System by suscribing to our
      process mailbox.
    </SubsectionText>
    <Box align="start">
      <Button
        label="Subscribe"
        href="https://announce.now.hpe.com/home/NewsLetter/OpenSubscription/254?u=1"
        target="_blank"
        rel="noreferrer noopener"
        primary
      />
    </Box>
  </Box>
);

const Email = () => (
  <Box gap="small">
    <MailOption size="large" />
    <Text weight="bold" size="large">
      Here to help
    </Text>
    <SubsectionText>
      Your comments are important to us. Reach out, and we can discuss your
      needs.
    </SubsectionText>
    <Box align="start">
      <Button
        label="Contact us"
        // eslint-disable-next-line max-len
        href="mailto:hpedesignsystem@hpe.com?subject=Keep%20me%20updated%20on%20the%20HPE%20Design%20System&body=Hi%20there,%0d%0dI%20would%20like%20to%20be%20added%20to%20the%20HPE%20Design%20System%20mailing%20list,%20so%20that%20I'll%20receive%20updates%20and%20announcements%20about%20the%20Design%20System. Thank you!"
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
      #hpe-design-system channel on Grommet Slack by signing up with an HPE
      email.
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
        <JoinConversation />
        <Contribute />
        <Subscribe />
        <Email />
      </Grid>
    </Box>
  );
};

export const SubmitFeedback = () => {
  const [open, setOpen] = useState();
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);
  const router = useRouter();

  return (
    <>
      <Box direction="row" gap="small">
        <Button label="Leave feedback" onClick={onOpen} primary />
        <Button
          alignSelf="start"
          href={`https://github.com/hpe-design/design-system/tree/master/aries-site/src/pages${router.pathname}.mdx`}
          label="Edit this page"
          rel="noopener"
          target="_blank"
        />
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
