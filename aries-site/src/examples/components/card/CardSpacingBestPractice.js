import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Card,
  CardBody,
  Heading,
  Paragraph,
  Tag,
  Text,
} from 'grommet';
import { navigationalData } from './data';

export const CardSpacingBestPractice = ({ bestPractice = true }) => (
  <Grid gap={!bestPractice ? 'small' : 'medium'} columns="medium">
    {navigationalData.map((datum, index) => (
      <Card key={index} onClick={() => {}}>
        <CardBody align="start" gap="medium">
          <Box>
            <Heading level={2} size="small" margin="none">
              {datum.title}
            </Heading>
            <Text size="small">{datum.subtitle}</Text>
            <Paragraph>{datum.description}</Paragraph>
          </Box>
          <Tag value={datum.tag} />
        </CardBody>
      </Card>
    ))}
  </Grid>
);

CardSpacingBestPractice.propTypes = {
  bestPractice: PropTypes.bool,
};
