import React from 'react';
import {
  Box,
  Card,
  CardBody,
  Grid,
  Heading,
  Paragraph,
  Tag,
  Text,
} from 'grommet';
import { navigationalData } from './data';

export const NavigationalCard = () => (
  <Grid gap="medium" columns="medium">
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
