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
  ShareRounded,
} from 'grommet-icons';
import { TextEmphasis } from 'aries-core';

const getStatusIcon = status => {
  switch (status) {
    case 'failed':
      return <StatusCriticalSmall alt="" color="status-critical" />;
    case 'conditional':
      return <CircleInformation alt="" />;
    case 'AAA not achieved':
      return <StatusWarningSmall alt="" color="status-warning" />;
    default:
      return <StatusGoodSmall alt="" color="status-ok" />;
  }
};

const statusRank = {
  passed: 0,
  'AAA not achieved': 1,
  conditional: 2,
  failed: 3,
};

const WCAGAccessibilityCardView = ({
  level,
  link,
  ruleDescription,
  ruleName,
  ruleNumber,
  status,
  version,
}) => {
  const descriptionEndsWithColon = ruleDescription.endsWith(':');
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
          <TextEmphasis>{ruleName}. </TextEmphasis>
          {!descriptionEndsWithColon ? (
            ruleDescription
          ) : (
            <Text>
              {ruleDescription}{' '}
              <Anchor
                label="Read more"
                aria-label={`Read more about ${ruleName}`}
                target="_blank"
                size="small"
                href={link}
              />
            </Text>
          )}
        </Paragraph>
        <Box alignSelf="start" direction="row" align="center" gap="small">
          <Tag size="small" value={`WCAG ${version} ${level}`} />
          <Anchor
            target="_blank"
            size="small"
            href={link}
            label={`${ruleNumber} ${ruleName}`}
          />
        </Box>
      </Box>
      <Box alignSelf="start" align="center" direction="row" gap="xsmall">
        {getStatusIcon(status)}
        <Text>{status.charAt(0).toUpperCase() + status.slice(1)}</Text>
      </Box>
    </Box>
  );
};

export const WCAGRuleDetail = ({ rules, version }) => {
  // Group rules by accessibility principle
  const groupRulesByAccessibilityPrinciple = (ruleList = []) => {
    const principleMapping = {
      1: 'Perceivable',
      2: 'Operable',
      3: 'Understandable',
      4: 'Robust',
    };

    const defaultGrouping = {};

    Object.values(principleMapping).forEach(principle => {
      defaultGrouping[principle] = [];
    });

    return ruleList.reduce((grouped, rule) => {
      const principleName = rule.num
        ? principleMapping[parseInt(rule.num.split('.')[0], 10)]
        : undefined;
      return {
        ...grouped,
        [principleName]: [...(grouped[principleName] || []), rule],
      };
    }, defaultGrouping);
  };

  const groupedRules = groupRulesByAccessibilityPrinciple(rules);

  return (
    <Box pad={{ vertical: 'medium' }} gap="medium">
      <Box gap="xxsmall" direction="row">
        <Text>Grouped by</Text>
        <Anchor
          label="accessibility principles"
          href="https://www.w3.org/WAI/WCAG22/Understanding/intro#understanding-the-four-principles-of-accessibility"
          target="_blank"
          icon={<ShareRounded />}
          reverse
          rel="noopener noreferrer"
        />
      </Box>
      <Box width="large">
        {Object.keys(groupedRules).map(group => (
          <Accordion key={group} multiple>
            <AccordionPanel
              label={
                <Box gap="small" align="center" direction="row">
                  {getStatusIcon(
                    groupedRules[group].reduce(
                      (worst, item) => {
                        return statusRank[item.status] >
                          statusRank[worst.status]
                          ? item
                          : worst;
                      },
                      { status: 'passed' },
                    ).status,
                  )}
                  <Heading margin={{ vertical: 'small' }} level={4}>
                    {group}
                  </Heading>
                </Box>
              }
            >
              <Box pad={{ vertical: 'small' }} gap="small">
                {groupedRules[group].length === 0 && (
                  <Paragraph>
                    At this time, there are no WCAG '{group}' rules applicable
                    to this component.
                  </Paragraph>
                )}
                {/* Sort the rules by their status */}
                {groupedRules[group]
                  .sort((a, b) => statusRank[b.status] - statusRank[a.status])
                  .map(item => (
                    <WCAGAccessibilityCardView
                      key={item.num}
                      status={item.status}
                      level={item.level}
                      link={`https://www.w3.org/TR/WCAG22/#${item.id}`}
                      ruleNumber={item.num}
                      version={version}
                      ruleName={item.handle}
                      ruleDescription={item.title}
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
