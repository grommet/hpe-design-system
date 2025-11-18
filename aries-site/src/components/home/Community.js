import React, { useContext } from 'react';
import {
  Box,
  Button,
  Grid,
  Heading,
  PageContent,
  Paragraph,
  ResponsiveContext,
  Text,
} from 'grommet';
import { ChatConversation, Info } from '@hpe-design/icons-grommet';
// TODO replace with DS icon package when available
import { Slack } from 'grommet-icons';

const LinkButton = props => (
  <Button
    target="_blank"
    rel="noreferrer noopener"
    alignSelf="start"
    {...props}
  />
);

const SlackOption = () => (
  <Box gap="medium">
    <Slack size="large" color="text-strong" />
    <Box>
      <Heading level={3} margin="none" size="small">
        Slack
      </Heading>
      <Text>Specific questions? Want feedback or advice?</Text>
    </Box>
    <LinkButton
      icon={<ChatConversation />}
      label="Join us on Slack"
      href="https://slack-invite.grommet.io/"
      primary
    />
  </Box>
);

const Feedback = () => (
  <Box gap="medium">
    <Info size="large" color="text-strong" />
    <Box>
      <Heading level={3} margin="none" size="small">
        Feedback
      </Heading>
      <Text>Let us know your feedback!</Text>
    </Box>
    <LinkButton label="Provide feedback" href="/feedback" secondary />
  </Box>
);

export const Community = ({ ...rest }) => {
  const size = useContext(ResponsiveContext);
  return (
    <PageContent background={{ fill: 'horizontal', color: 'background-back' }}>
      <Box
        fill="horizontal"
        pad={{
          vertical: !['xsmall', 'small'].includes(size) ? '3xlarge' : 'xlarge',
        }}
        gap="xlarge"
        {...rest}
      >
        <Box width="xxlarge">
          <Heading margin="none" level={2} size="xsmall">
            Community
          </Heading>
          <Paragraph size="xxlarge" fill>
            The HPE Design System is an open-source framework for designers and
            developers. We welcome feedback, ideas and appreciate your
            suggestions.
          </Paragraph>
        </Box>
        <Grid
          columns="medium"
          rows={[['auto', 'full']]}
          gap={{ row: 'xlarge', column: 'xsmall' }}
          fill
        >
          <SlackOption />
          {/* <Roadmap />
          <Backlog /> */}
          <Feedback />
        </Grid>
      </Box>
    </PageContent>
  );
};
