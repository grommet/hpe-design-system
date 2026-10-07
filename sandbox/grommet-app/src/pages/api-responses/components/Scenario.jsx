// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Anchor, Box, Header, Heading, Paragraph, Text } from 'grommet';
import { LinkNext } from '@hpe-design/icons-grommet';
import { BackgroundContext } from '../../../contexts';

// A single mockup scenario: labelled with the situation it illustrates,
// a short summary of the recommended behavior, and a link to the full
// HPE Design System guidance.
export const Scenario = ({
  actions,
  children,
  guidance,
  heading,
  id,
  level = 2,
  reference,
  tag,
  ...rest
}) => {
  const { backgroundBack } = useContext(BackgroundContext);
  return (
    <Box
      id={id}
      gap="medium"
      background={backgroundBack ? 'background-front' : undefined}
      pad={backgroundBack ? 'medium' : undefined}
      round={backgroundBack ? 'small' : undefined}
      flex={false}
      {...rest}
    >
      <Box gap="xsmall">
        <Header align="start" wrap>
          <Box gap="3xsmall">
            {tag && (
              <Text size="small" color="text-weak" weight={500}>
                {tag}
              </Text>
            )}
            <Heading level={level} margin="none">
              {heading}
            </Heading>
          </Box>
          {actions}
        </Header>
        {guidance && (
          <Paragraph margin="none" size="large">
            {guidance}
          </Paragraph>
        )}
        {reference && (
          <Anchor
            alignSelf="start"
            label={reference.label}
            href={reference.href}
            target="_blank"
            rel="noopener noreferrer"
            icon={<LinkNext />}
            reverse
            size="small"
          />
        )}
      </Box>
      {children}
    </Box>
  );
};

Scenario.propTypes = {
  actions: PropTypes.node,
  children: PropTypes.node,
  guidance: PropTypes.node,
  heading: PropTypes.string.isRequired,
  id: PropTypes.string,
  level: PropTypes.number,
  reference: PropTypes.shape({
    label: PropTypes.string,
    href: PropTypes.string,
  }),
  tag: PropTypes.string,
};
