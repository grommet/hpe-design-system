import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardBody,
  Grid,
  Heading,
  Image,
  NameValueList,
  NameValuePair,
  Page,
  PageContent,
  PageHeader,
  ResponsiveContext,
} from 'grommet';
import { activities } from './data';
import { Card as DesignSystemCard } from '../../templates';

const columns = {
  xsmall: ['auto'],
  small: ['auto'],
  medium: ['auto'],
  large: ['medium', 'flex'],
  xlarge: ['medium', 'flex'],
};

const activitiesColumns = {
  xsmall: ['auto'],
  small: ['auto'],
  medium: ['auto'],
  large: ['auto', 'auto'],
  xlarge: ['auto', 'auto'],
};

export const CardContentBestPractice = ({ bestPractice = true }) => {
  const breakpoint = useContext(ResponsiveContext);

  return (
    <Page>
      <PageContent>
        <PageHeader
          title="Manage account"
          subtitle="Manage your HPE Common Cloud account"
        />
        <Grid align="start" columns={columns[breakpoint]} gap='xlarge'>
          <LeftPanel bestPractice={bestPractice} />
          <Grid columns={activitiesColumns[breakpoint]} gap="medium">
            {activities.map((activity, index) => (
              <DesignSystemCard
                key={index}
                icon={activity.icon}
                title={activity.title}
                description={activity.description}
                actions={
                  <Button
                    label={activity.action.label}
                    href={activity.action.href}
                    secondary
                  />
                }
                level={2}
              />
            ))}
          </Grid>
        </Grid>
      </PageContent>
    </Page>
  );
};

CardContentBestPractice.propTypes = {
  bestPractice: PropTypes.bool,
};

const LeftPanel = ({ bestPractice }) => {
  const content = (
    <Box gap="medium">
      <Box alignSelf="start" height='5xsmall'>
        <Image
          alignSelf="start"
          src="/acme.svg"
          alt="Acme Corporation logo"
          fit="contain"
        />
      </Box>
      <Heading level={2} margin="none">
        Acme Corporation
      </Heading>
      <NameValueList pairProps={{ direction: 'column' }}>
        <NameValuePair name="Account ID">
          0a7141c332ec4c4aae04aa4b8fe59deb
        </NameValuePair>
        <NameValuePair name="Account Type">
          Standard Enterprise Account
        </NameValuePair>
        <NameValuePair name="Account Status">Registered</NameValuePair>
      </NameValueList>
      <Button label="Manage account type" secondary />
    </Box>
  );

  if (bestPractice) return content;

  return (
    <Card>
      <CardBody>{content}</CardBody>
    </Card>
  );
};

LeftPanel.propTypes = {
  bestPractice: PropTypes.bool,
};
