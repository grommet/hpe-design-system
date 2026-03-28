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
  StatusGood,
  StatusCritical,
  StatusWarning,
  Info,
  NewWindow,
} from '@hpe-design/icons-grommet';
import { TextEmphasis } from '@shared/aries-core';

const getStatusIcon = status => {
  switch (status) {
    case 'failed':
      return <StatusCritical alt="" color="status-critical" />;
    case 'conditional':
      return <Info alt="" />;
    case 'AAA not achieved':
      return <StatusWarning alt="" color="status-warning" />;
    default:
      return <StatusGood alt="" color="status-ok" />;
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
      pad={{ vertical: 'xsmall', horizontal: 'medium' }}
      background="background-front"
      round="medium"
      justify="between"
      direction="row"
      gap="xsmall"
    >
      <Box flex gap="xsmall">
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
        <Box alignSelf="start" direction="row" align="center" gap="xsmall">
          <Tag size="small" value={`WCAG ${version} ${level}`} />
          <Anchor
            target="_blank"
            size="small"
            href={link}
            label={`${ruleNumber} ${ruleName}`}
          />
        </Box>
      </Box>
      <Box alignSelf="start" align="center" direction="row" gap="3xsmall">
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
      <Box gap="5xsmall" direction="row">
        <Text>Grouped by</Text>
        <Anchor
          label="accessibility principles"
          href="https://www.w3.org/WAI/WCAG22/Understanding/intro#understanding-the-four-principles-of-accessibility"
          target="_blank"
          icon={<NewWindow />}
          reverse
          rel="noopener noreferrer"
        />
      </Box>
      <Box width="xlarge">
        {Object.keys(groupedRules).map(group => (
          <Accordion key={group} multiple>
            <AccordionPanel
              label={
                <Box gap="xsmall" align="center" direction="row">
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
                  <Heading
                    size="small"
                    margin={{ vertical: 'xsmall' }}
                    level={4}
                  >
                    {group}
                  </Heading>
                </Box>
              }
            >
              <Box pad={{ vertical: 'xsmall' }} gap="xsmall">
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
