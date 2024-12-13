/* eslint-disable react/prop-types */
import {
  Accordion,
  AccordionPanel,
  Anchor,
  Box,
  Heading,
  Paragraph,
  Tag,
  Text,
} from 'grommet';
import {
  StatusGoodSmall,
  StatusCriticalSmall,
  StatusWarningSmall,
  CircleInformation,
} from 'grommet-icons';

// COME BACK TO CLEAN UP CODE
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
      return <StatusCriticalSmall color="status-critical" />;
    case 'conditional':
      return <CircleInformation />;
    case 'passed with exceptions':
      return <StatusWarningSmall color="status-warning" />;
    case 'passed':
      return <StatusGoodSmall color="status-ok" />;
    default:
      return <StatusGoodSmall color="status-ok" />;
  }
};

const AccessibilityCardView = ({
  title,
  description,
  status,
  tagValue,
  linkHref,
  level,
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
        <Paragraph margin="none">
          <strong>{description}.</strong> {title}
        </Paragraph>
        <Box alignSelf="start" direction="row" align="center" gap="small">
          <Tag size="small" value={`WCAG ${tagValue}${' '}${level}`} />
          <Anchor
            target="_blank"
            size="small"
            href={linkHref}
            label={`${tagValue}${' '}${description} `}
          />
        </Box>
      </Box>
      <Box alignSelf="start" align="center" direction="row" gap="xsmall">
        {statusIcon}
        <Text>{status.charAt(0).toUpperCase() + status.slice(1)}</Text>
      </Box>
    </Box>
  );
};

export const AccessibilityTestView = ({ rules }) => {
  const groupRulesByPrinciple = (ruleList = []) => {
    const grouped = {};

    // Mapping of principle numbers to human-readable names
    const principleMapping = {
      1: 'Perceivable',
      2: 'Operable',
      3: 'Understandable',
      4: 'Robust',
    };

    if (Array.isArray(ruleList) && ruleList.length > 0) {
      ruleList.forEach(rule => {
        const principleNum = parseInt(rule.num.split('.')[0], 10);

        const principleName = principleMapping[principleNum];

        if (!grouped[principleName]) {
          grouped[principleName] = [];
        }

        grouped[principleName].push(rule);
      });
    }

    return grouped;
  };

  const groupedRules = groupRulesByPrinciple(rules);
  return (
    <Box gap="medium">
      <Heading margin={{ top: 'medium', bottom: 'none' }} level={3}>
        WCAG compliance
      </Heading>
      <Box gap="xsmall" direction="row">
        <Text size="large">Grouped by</Text>
        <Anchor
          label="Accessibility principles:"
          href="https://www.w3.org/TR/WCAG22/"
          size="large"
        />
      </Box>
      <Box width="large">
        {Object.keys(groupedRules).map(group => (
          <Accordion key={group} multiple>
            <AccordionPanel
              label={
                <Box
                  gap="small"
                  align="center"
                  alignSelf="center"
                  direction="row"
                >
                  <Heading margin={{ vertical: 'medium' }} level={4}>
                    {group}
                  </Heading>
                  {getWorstStatusIcon(groupedRules[group])}
                </Box>
              }
            >
              <Box pad={{ vertical: 'small' }} gap="small">
                {groupedRules[group].map(item => (
                  <AccessibilityCardView
                    key={item.num}
                    title={item.title}
                    description={item.description || item.handle}
                    status={item.status}
                    tagValue={item.num}
                    linkHref={`https://www.w3.org/TR/WCAG22/#${item.id}`}
                    linkTitle={item.id}
                    level={item.level}
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
