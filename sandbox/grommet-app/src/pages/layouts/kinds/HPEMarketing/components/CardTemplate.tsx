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

export const CardTemplate = ({
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
      background="none"
      border={{ color: 'border-weak' }}
      {...rest}
    >
      {media}
      <Box gap="medium" flex>
        <Box gap="medium" flex>
          <CardHeader pad="none" direction="column" gap="none" align="start">
            <Heading level={3} margin="none">
              {title}
            </Heading>
          </CardHeader>
          <CardBody pad="none" align="start">
            <Paragraph margin="none">{description}</Paragraph>
          </CardBody>
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
      </Box>
    </Card>
  );
};
