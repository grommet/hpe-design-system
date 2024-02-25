import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Grid,
  Heading,
  PageContent,
  Paragraph,
  PageHeader,
  ResponsiveContext,
  ThemeContext,
  Card,
  CardBody,
  Text,
  Meter,
} from 'grommet';
import { AppsRounded, Configure, PlayFill, ShareRounded } from 'grommet-icons';
import { Meta } from '../components';
import { aries } from '../themes/aries';
import { Card as TemplateCard } from '../examples';

const title = 'Design Tokens Demo';

const BriefCard = ({ description, title: titleProp, icon, ...rest }) => (
  <Card onClick={() => {}} {...rest}>
    <CardBody direction="row" align="center" justify="between" gap="medium">
      <Box gap="xsmall">
        <Heading level={3} margin="none">
          {titleProp}
        </Heading>
        <Text margin="none" size="small" weight={500}>
          {description}
        </Text>
      </Box>
      <Box background={{ dark: true }}>{icon}</Box>
    </CardBody>
  </Card>
);

BriefCard.propTypes = {
  description: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

const MeterCard = () => (
  <TemplateCard title="Issues" level={3}>
    <Box gap="medium" pad={{ top: 'medium' }}>
      <Box round="large" overflow="hidden">
        <Meter
          type="bar"
          values={[
            { value: 30, color: 'status-critical' },
            { value: 28, color: 'status-warning' },
            { value: 42, color: 'blue' },
          ]}
        />
      </Box>
      <Box gap="xsmall">
        <Box direction="row" gap="xsmall" align="center">
          <Box pad="xsmall" round background="status-critical" />
          <Text>High severity</Text>
        </Box>
        <Box direction="row" gap="xsmall" align="center">
          <Box pad="xsmall" round background="status-warning" />
          <Text>Medium severity</Text>
        </Box>
        <Box direction="row" gap="xsmall" align="center">
          <Box pad="xsmall" round background="blue" />
          <Text>Low severity</Text>
        </Box>
      </Box>
    </Box>
  </TemplateCard>
);

const Demo = () => {
  // eslint-disable-next-line no-unused-vars
  const size = useContext(ResponsiveContext);

  return (
    <>
      <Meta title={title} />
      <ThemeContext.Extend value={aries}>
        <PageContent>
          <PageHeader title="Console home" />
          <Grid columns={['flex', 'medium']} gap="medium">
            <Box gap="medium">
              <Grid columns={['flex', 'flex']} gap="medium">
                <BriefCard
                  title="Block Storage"
                  description=" Last used yesterday, at 8:36pm"
                  icon={<ShareRounded size="xxlarge" color="green" />}
                />

                <BriefCard
                  title="Private Cloud Enterprise"
                  description="Last used on July 17, 2023, at 8:36pm"
                  icon={<ShareRounded size="xxlarge" color="green" />}
                />
              </Grid>
              <Card>
                <CardBody gap="medium">
                  <Box gap="xsmall">
                    <Heading level={3} margin="none">
                      Capacity
                    </Heading>
                    <Paragraph size="small" margin="none">
                      Volume
                    </Paragraph>
                  </Box>
                  <Text size="32px" weight={500}>
                    32%{' '}
                    <Text size="medium" weight={500}>
                      used <Text weight={400}>(240 of 750 TiB)</Text>
                    </Text>
                  </Text>
                </CardBody>
              </Card>
              <Grid columns={['flex', 'flex']} gap="medium">
                <MeterCard />
              </Grid>
            </Box>
            <Box gap="medium">
              <BriefCard
                title="Find Services"
                description="Discover and lunch services from out catalog."
                icon={<AppsRounded size="xxlarge" color="green" />}
              />
              <BriefCard
                title="Manage Workspace"
                description="Setup this workspace, users, access, and more."
                icon={<Configure size="xxlarge" color="green" />}
              />
              <Card background="background-contrast">
                <CardBody align="start" pad="large" gap="medium">
                  <Heading level={3} margin="none">
                    Learn about the new HPE GreenLake Console experience
                  </Heading>
                  <Button
                    kind="toolbar"
                    label="Watch now"
                    icon={<PlayFill color="green" />}
                    reverse
                  />
                </CardBody>
              </Card>
              <Box>Map goes here</Box>
            </Box>
          </Grid>
        </PageContent>
      </ThemeContext.Extend>
    </>
  );
};

export default Demo;
