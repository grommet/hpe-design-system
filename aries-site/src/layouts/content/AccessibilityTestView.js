/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Anchor, Box, Button, Heading, Tag, Text } from 'grommet';
import {
  Up,
  Down,
  StatusGoodSmall,
  StatusCriticalSmall,
  StatusWarningSmall,
} from 'grommet-icons';
import anchorData from '../../data/wcag/anchor.json';

const AccessibilityCardView = ({
  title,
  description,
  status,
  tagValue,
  linkHref,
  linkTitle,
}) => {
  let statusIcon;
  if (status === 'passed') {
    statusIcon = <StatusGoodSmall color="status-ok" />;
  } else if (status === 'passed with exceptions') {
    statusIcon = <StatusWarningSmall color="status-warning" />;
  } else if (status === 'failed') {
    statusIcon = <StatusCriticalSmall color="status-critical" />;
  }

  return (
    <Box
      pad={{ vertical: 'small', horizontal: 'medium' }}
      background="background-front"
      round="small"
      justify="between"
      direction="row"
      flex="grow"
      gap="small"
    >
      <Box flex gap="small">
        <Text>
          <strong>{title}.</strong> {description}
        </Text>
        <Box alignSelf="start" direction="row" align="center" gap="small">
          <Tag size="small" value={tagValue} />
          <Anchor size="xsmall" href={linkHref} label={linkTitle} />
        </Box>
      </Box>
      <Box alignSelf="start" align="center" direction="row" gap="xsmall">
        {statusIcon}
        <Text>{status}</Text>
      </Box>
    </Box>
  );
};

export const AccessibilityTestView = () => {
  const [expandedSections, setExpandedSections] = useState({
    perceivable: true,
    operable: true,
    understandable: true,
    robust: true,
  });

  const toggleSection = category => {
    setExpandedSections(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };
  return (
    <Box gap="medium">
      <Heading margin={{ top: 'medium', bottom: 'none' }} level={3}>
        Tests
      </Heading>
      <Box direction="row">
        <Text level={3}>Grouped by</Text>
        <Anchor
          label="Accessibility principles:"
          href="https://www.w3.org/TR/WCAG22/"
        />
      </Box>
      <Box gap="medium">
        {anchorData.map(category => (
          <Box gap="medium" key={category.category}>
            <Button
              onClick={() => toggleSection(category.category.toLowerCase())}
              icon={
                expandedSections[category.category.toLowerCase()] ? (
                  <Up />
                ) : (
                  <Down />
                )
              }
              label={category.category}
              reverse
              alignSelf="start"
            />
            <Box gap="medium">
              {expandedSections[category.category.toLowerCase()] &&
                category.items.map((item, index) => (
                  <AccessibilityCardView
                    key={index}
                    title={item.title}
                    description={item.description}
                    status={item.status}
                    tagValue={item.tagValue}
                    linkHref={item.linkHref}
                    linkTitle={item.linkTitle}
                  />
                ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
