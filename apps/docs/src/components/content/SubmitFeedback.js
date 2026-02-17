import React, { createContext, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Box, Button, Grid, Heading, Layer, ResponsiveContext } from 'grommet';
import { ChatConversation, Contact, Close } from '@hpe-design/icons-grommet';
// TODO replace with DS icon package when available
import { Github } from 'grommet-icons';
import { SubsectionText } from '.';

const HeadingContext = createContext({});

const Subscribe = () => {
  const { level } = useContext(HeadingContext);
  return (
    <Box gap="xsmall">
      <Contact size="large" />
      <Heading level={level} margin="none">
        Stay up-to-date
      </Heading>
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
};

const JoinConversation = () => {
  const { level } = useContext(HeadingContext);

  return (
    <Box gap="xsmall">
      <ChatConversation size="large" />
      <Heading level={level} margin="none">
        Join the conversation
      </Heading>
      <SubsectionText>
        Specific questions? Want feedback or advice? Generally curious? Join the
        #hpe-design-system channel on Grommet Slack by signing up with an HPE
        email.
      </SubsectionText>
      <Box align="start">
        <Button
          label="Join us on Slack"
          href="https://slack-invite.grommet.io/"
          target="_blank"
          rel="noreferrer noopener"
          primary
        />
      </Box>
    </Box>
  );
};

const Contribute = () => {
  const { level } = useContext(HeadingContext);

  return (
    <Box gap="xsmall">
      <Github size="large" />
      <Heading level={level} margin="none">
        Contribute
      </Heading>
      <SubsectionText>
        Have suggestions? Improvement ideas? Submit a bug, feature request, or
        better yet, make your impact for all by submitting your own
        contribution.
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
};

export const FeedbackOptions = ({ level }) => {
  const size = useContext(ResponsiveContext);
  const contextValue = useMemo(() => ({ level }), [level]);

  return (
    <HeadingContext.Provider value={contextValue}>
      <Box flex={false} width="xxlarge">
        <Grid
          columns={
            !['xsmall', 'small'].includes(size)
              ? { count: 'fit', size: 'xsmall' }
              : 'auto'
          }
          gap="xlarge"
        >
          <JoinConversation />
          <Contribute />
          <Subscribe />
        </Grid>
      </Box>
    </HeadingContext.Provider>
  );
};

FeedbackOptions.propTypes = {
  level: PropTypes.number,
};

export const SubmitFeedback = () => {
  const [open, setOpen] = useState();
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);
  const router = useRouter();

  // needed for nested routes that leverage index.mdx
  let { pathname } = router;
  if (pathname === '/components/layer' || pathname === '/components/card')
    pathname = `${router.pathname}/index`;

  return (
    <>
      <Box direction="row" gap="xsmall">
        <Button label="Leave feedback" onClick={onOpen} primary />
        <Button
          alignSelf="start"
          href={`https://github.com/grommet/hpe-design-system/tree/master/apps/docs/src/pages${pathname}.mdx`}
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
              pad={{ horizontal: 'xlarge', bottom: 'xlarge' }}
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
