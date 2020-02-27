import React from 'react';
import {
  Box,
  Button,
  Form,
  FormField,
  Grid,
  Layer,
  MaskedInput,
  ResponsiveContext,
  Text,
} from 'grommet';
import { ChatOption, MailOption, Close, Github } from 'grommet-icons';
import { ContentSection, Subsection } from '../../layouts/content';
import { SubsectionText } from '.';

export const Subscribe = () => (
  <Box gap="medium">
    <MailOption size="large" />
    <Text weight="bold" size="large">
      Stay up-to-date
    </Text>
    <SubsectionText>
      Get the latest feature enhancements and announcements directly to your
      inbox.
    </SubsectionText>
    <Form>
      <Box gap="small">
        <FormField margin="none">
          <MaskedInput
            name="email"
            mask={[
              { regexp: /^[\w\-_.]+$/, placeholder: 'jdoe' },
              { fixed: '@' },
              { regexp: /^[\w]+$/, placeholder: 'hpe' },
              { fixed: '.' },
              { regexp: /^[\w]+$/, placeholder: 'com' },
            ]}
          />
        </FormField>
        <Box align="start">
          <Button type="submit" label="Subscribe" primary />
        </Box>
      </Box>
    </Form>
  </Box>
);

export const JoinConversation = () => (
  <Box gap="medium">
    <ChatOption size="large" />
    <Text weight="bold" size="large">
      Join the conversation
    </Text>
    <SubsectionText>
      Specific questions? Want feedback or advice? Generally curious? Join Slack
      with and HPE email address to be automatically added to #general-hpe.
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

export const Contribute = () => (
  <Box gap="medium">
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

export const SubmitFeedback = () => {
  const size = React.useContext(ResponsiveContext);
  const [open, setOpen] = React.useState();
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);

  return (
    <>
      <ContentSection lastSection>
        <Subsection name="Still have questions?" level={2}>
          <SubsectionText>
            Something missing or looking for more information? Get in touch to
            help make the HPE Design System better.
          </SubsectionText>
          <Box align="start">
            <Button label="Leave feedback" onClick={onOpen} primary />
          </Box>
        </Subsection>
      </ContentSection>
      {open && (
        <Layer position="center" modal onClickOutside={onClose} onEsc={onClose}>
          <Box flex>
            <Box
              flex={false}
              direction="row"
              align="center"
              justify="end"
              pad={{ top: 'medium', horizontal: 'medium' }}
            >
              <Button icon={<Close />} onClick={onClose} />
            </Box>
            <Box
              flex
              pad={{ horizontal: 'large', bottom: 'large' }}
              overflow="auto"
            >
              <Box flex={false}>
                <Grid
                  fill="horizontal"
                  columns={
                    size !== 'small' ? { count: 'fit', size: 'small' } : 'auto'
                  }
                  gap="large"
                >
                  <Subscribe />
                  <JoinConversation />
                  <Contribute />
                </Grid>
              </Box>
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
};
