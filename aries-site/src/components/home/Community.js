import React, { useContext } from 'react';

import {
  Box,
  Button,
  Grid,
  Heading,
  Paragraph,
  ResponsiveContext,
  Text,
} from 'grommet';
import { ChatOption, Github, Map, Slack } from 'grommet-icons';

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
      <Heading level={2} margin="none" size="xsmall">
        Slack
      </Heading>
      <Text>Specific questions? Want feedback or advice?</Text>
    </Box>
    <LinkButton
      icon={<ChatOption />}
      label="Join us on Slack"
      href="https://slack-invite.grommet.io/"
      primary
    />
  </Box>
);

const Roadmap = () => (
  <Box gap="medium">
    <Map size="large" color="text-strong" />
    <Box>
      <Heading level={2} margin="none" size="xsmall">
        Roadmap
      </Heading>
      <Text>Stay in the loop and checkout what's next!</Text>
    </Box>
    <LinkButton
      label="View Roadmap"
      href="https://roadmap.grommet.io/hpe-design-system-roadmap-mike-walrath-hpe-com"
      secondary
    />
  </Box>
);

const Backlog = () => (
  <Box gap="medium">
    <Github size="large" color="text-strong" />
    <Box>
      <Heading level={2} margin="none" size="xsmall">
        Backlog
      </Heading>
      <Text>Eager to know what's marinating in the back?</Text>
    </Box>
    <LinkButton
      label="View Backlog"
      href="https://github.com/orgs/grommet/projects/10"
      secondary
    />
  </Box>
);

export const Community = () => {
  const size = useContext(ResponsiveContext);
  return (
    <Box
      fill="horizontal"
      background="background-front"
      pad={size !== 'small' ? 'xlarge' : 'large'}
      gap="large"
    >
      <Box width="xlarge">
        <Heading margin="none">Community</Heading>
        <Paragraph size="xlarge" fill>
          The HPE Design System is an open-source framework for designers and
          developers. We welcome feedback, ideas and appreciate your
          suggestions.
        </Paragraph>
      </Box>
      <Grid columns="medium" rows={[['auto', 'full']]} gap="small" fill>
        <SlackOption />
        <Roadmap />
        <Backlog />
      </Grid>
    </Box>
  );
};
