/* eslint-disable react/prop-types */
import {
  Accordion,
  AccordionPanel,
  Anchor,
  Box,
  Heading,
  Tag,
  Text,
} from 'grommet';
import {
  StatusGoodSmall,
  StatusCriticalSmall,
  StatusWarningSmall,
  CircleInformation,
} from 'grommet-icons';
import anchorData from '../../data/wcag/anchor.json';

const getWorstStatusIcon = items => {
  const statusPriority = {
    failed: 0,
    conditional: 1,
    'passed with exceptions': 2,
    passed: 3,
  };

  // Find the item with the worst status
  const worstStatus = items.reduce(
    (worst, item) => {
      if (statusPriority[item.status] < statusPriority[worst.status]) {
        return item;
      }
      return worst;
    },
    { status: 'passed' },
  );

  switch (worstStatus.status) {
    case 'failed':
      return <StatusCriticalSmall size="large" color="status-critical" />;
    case 'conditional':
      return <CircleInformation size="large" />;
    case 'passed with exceptions':
      return <StatusWarningSmall size="large" color="status-warning" />;
    case 'passed':
      return <StatusGoodSmall size="large" color="status-ok" />;
    default:
      return <StatusGoodSmall size="large" color="status-ok" />;
  }
};

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
  } else if (status === 'conditional') {
    statusIcon = <CircleInformation />;
  }

  return (
    <Box
      pad={{ vertical: 'small', horizontal: 'medium' }}
      background="background-front"
      round="small"
      justify="between"
      direction="row"
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
  return (
    <Box gap="medium">
      <Heading margin={{ top: 'medium', bottom: 'none' }} level={3}>
        Tests
      </Heading>
      <Box gap="xsmall" direction="row">
        <Text size="large">Grouped by</Text>
        <Anchor
          label="Accessibility principles:"
          href="https://www.w3.org/TR/WCAG22/"
          size="large"
        />
      </Box>
      <Box>
        {anchorData.map(category => (
          <Accordion multiple>
            <AccordionPanel
              label={
                <Box
                  gap="small"
                  align="center"
                  alignSelf="center"
                  direction="row"
                >
                  <Heading level={3}>{category.category}</Heading>
                  {getWorstStatusIcon(category.items)}
                </Box>
              }
            >
              <Box gap="medium">
                {[category.category.toLowerCase()] &&
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
            </AccordionPanel>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};
