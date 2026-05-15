import React from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Text,
} from 'grommet';
import { ButtonGroup } from '@shared/aries-core';

export const ButtonPrimaryCtaExample = () => (
  <Box align="center" fill justify="center" pad="medium">
    <Card width="large">
      <CardHeader pad="medium">
        <Box gap="xsmall">
          <Text size="large" weight="bold">
            GreenLake Monitoring
          </Text>
          <Text color="status-critical" size="small">
            Status: Inactive
          </Text>
        </Box>
      </CardHeader>
      <CardBody gap="medium" pad="medium">
        <Text>
          Enable health and performance monitoring
          for your GreenLake platform resources.
        </Text>
        <ButtonGroup>
          <Button
            label="Activate service"
            onClick={() => {}}
            primary
          />
          <Button
            label="View details"
            onClick={() => {}}
          />
          <Button
            label="Schedule"
            onClick={() => {}}
          />
        </ButtonGroup>
      </CardBody>
    </Card>
  </Box>
);
