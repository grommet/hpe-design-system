// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';
import { Box, Card, CardBody, Paragraph, Tag, Text } from 'grommet';
import { TextEmphasis } from '@shared/aries-core';

// Summary card for a service in a catalog or discovery grid.
export const ServiceCard = ({ category, description, tag, title, ...rest }) => (
  <Card {...rest}>
    <CardBody gap="xsmall">
      <Box direction="row" align="center" justify="between" gap="xsmall">
        <Box gap="5xsmall">
          <Text size="small">{category}</Text>
          <TextEmphasis>{title}</TextEmphasis>
        </Box>
        {tag && (
          <Tag
            value={tag}
            size="xsmall"
            background="background-accent-purple-weak"
            border={false}
          />
        )}
      </Box>
      <Paragraph margin="none">{description}</Paragraph>
    </CardBody>
  </Card>
);

ServiceCard.propTypes = {
  category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tag: PropTypes.string,
  title: PropTypes.string.isRequired,
};
