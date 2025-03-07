import React from 'react';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Heading,
  Paragraph,
} from 'grommet';

// I will need to update this file and merge the changes from
// what I did in this PR with the HPE Products section

export const CardTemplate = ({
  border,
  actions,
  description,
  media,
  title,
  ...rest
}) => {
  return (
    <Card
      pad={{ top: 'medium', horizontal: 'medium' }}
      as="section"
      fill="vertical"
      // in design there is no background only border
      // then others no background or border
      background="none"
      border={border}
      gap="medium"
      {...rest}
    >
      <Box gap="large">
        {media}
        <Box gap="small">
          <CardHeader pad="none" direction="column" gap="none" align="start">
            {/* with size xlarge we match design size */}
            <Heading size="xlarge" level={3} margin="none">
              {title}
            </Heading>
          </CardHeader>
          <CardBody pad="none" align="start">
            {/* designs have 20px for paragraph text */}
            <Paragraph margin="none">{description}</Paragraph>
          </CardBody>
        </Box>
      </Box>
      <CardFooter
        pad={{ bottom: 'medium' }}
        align="stretch"
        direction="column"
        gap="small"
      >
        <Box flex={false} align="start">
          {actions}
        </Box>
      </CardFooter>
    </Card>
  );
};
