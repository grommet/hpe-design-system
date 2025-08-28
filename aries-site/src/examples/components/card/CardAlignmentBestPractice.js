import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, CardBody, Heading, Paragraph } from 'grommet';

export const CardAlignmentBestPractice = ({ bestPractice = true }) => (
  <Card>
    <CardBody align={!bestPractice ? 'center' : 'start'} gap="medium">
      <Box align={!bestPractice ? 'center' : undefined} gap='xsmall'>
        <Heading level={3} margin="none">
          HPE GreenLake Trial
        </Heading>
        <Paragraph
          textAlign={!bestPractice ? 'center' : undefined}
          margin="none"
        >
          Want even more capabilities? Request a full trial for HPE GreenLake
          for Private Cloud, and we'll set up a trial designed to show you
          exactly how our turnkey private cloud solution can work for your
          business.
        </Paragraph>
      </Box>
      <Button kind="cta-primary" label="Request a trial" />
    </CardBody>
  </Card>
);

CardAlignmentBestPractice.propTypes = {
  bestPractice: PropTypes.bool,
};
