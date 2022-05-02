import { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Meter, Text } from 'grommet';
import { Calendar } from 'grommet-icons';
import { ChartCard, Measure, MeterGroup } from '../../components';
import { defaultWindow, DEMO_DATE, REPORT_WINDOW_MAP } from './utils';

const mockData = require('../../../../../data/mockData/compliance.json');

export function RulesAudit({ period }) {
  const { audits, checks } = mockData;
  const [reportWindow, setReportWindow] = useState(defaultWindow);
  const [completedAudits, setCompletedAudits] = useState(null);
  const [nextAudit, setNextAudit] = useState(null);
  const [rules, setRules] = useState([]);
  const [frameworks, setFrameworks] = useState([]);
  const [auditResults, setAuditResults] = useState([]);

  // Set reporting window
  useEffect(() => {
    setReportWindow(prevWindow => ({
      ...prevWindow,
      begin: new Date(
        new Date(DEMO_DATE).setDate(
          prevWindow.end.getDate() - REPORT_WINDOW_MAP[period],
        ),
      ),
    }));
  }, [period]);

  // Isolate completed vs. upcoming audits/
  useEffect(() => {
    const completed = audits
      .filter(audit => audit.completedDate)
      .sort((a, b) => new Date(b.completedDate) - new Date(a.completedDate))
      .filter(
        audit =>
          new Date(audit.completedDate) < reportWindow.end &&
          new Date(audit.completedDate) > reportWindow.begin,
      );
    const next = audits
      .sort((a, b) => new Date(a.scheduledDate) - new Date(b.scheduledDate))
      .find(audit => new Date(audit.scheduledDate) > reportWindow.end);
    setCompletedAudits(completed);
    setNextAudit(next);
  }, [audits, reportWindow.begin, reportWindow.end]);

  // Get results from completed audits.
  useEffect(() => {
    if (completedAudits) {
      const nextRules = checks.filter(check =>
        completedAudits.map(audit => audit.id).includes(check.auditId),
      );
      const nextFrameworks = [];
      checks.forEach(check => {
        if (!nextFrameworks.includes(check.frameworkId)) {
          nextFrameworks.push(check.frameworkId);
        }
      });
      setRules(nextRules);
      setFrameworks(nextFrameworks);
    }
  }, [checks, completedAudits]);

  // Assemble chart data
  useEffect(() => {
    const nextAuditResults = [
      { result: 'pass', count: 0, percent: 0, color: 'status-ok' },
      { result: 'fail', count: 0, percent: 0, color: 'status-critical' },
      { result: 'error', count: 0, percent: 0, color: 'status-warning' },
    ];
    const ruleMap = new Map();
    nextAuditResults.forEach(result => {
      const index = nextAuditResults.findIndex(
        el => el.result === result.result,
      );
      ruleMap.set(result.result, index);
    });
    rules.forEach(rule => {
      const index = ruleMap.get(rule.result);
      nextAuditResults[index] = {
        ...nextAuditResults[index],
        count: nextAuditResults[index].count + 1,
        percent: ((nextAuditResults[index].count + 1) / rules.length) * 100,
      };
    });
    setAuditResults(nextAuditResults);
  }, [rules]);

  const grid = {
    columns: ['auto', 'auto', 'auto'],
    rows: ['auto', 'auto'],
    areas: [
      ['rules', 'frameworks', 'audits'],
      ['chart', 'chart', 'chart'],
    ],
  };

  const nextScheduledAudit = nextAudit && (
    <Box direction="row" gap="xsmall">
      {/* Placing the icon within a Text component ensures the icon is 
      aligned with the accompanying Text's line height, even when lengthy 
      text may wrap. */}
      <Text>
        <Calendar size="small" color="text-strong" />
      </Text>
      <Text size="small" weight="bold">
        Next audit will be performed in{' '}
        {Math.round(
          (new Date(nextAudit.scheduledDate) - new Date()) /
            (1000 * 60 * 60 * 24), // milliseconds to days
        )}{' '}
        days.
      </Text>
    </Box>
  );

  return (
    <ChartCard title="Compliance" subtitle={period} footer={nextScheduledAudit}>
      <Grid
        columns={grid.columns}
        rows={grid.rows}
        areas={grid.areas}
        gap="medium"
      >
        <Measure
          gridArea="rules"
          name={{ label: { label: 'Rules', size: 'medium' } }}
          value={rules?.length}
        />
        <Measure
          gridArea="frameworks"
          name={{ label: { label: 'Frameworks', size: 'medium' } }}
          value={frameworks?.length}
        />
        <Measure
          gridArea="audits"
          name={{ label: { label: 'Audits', size: 'medium' } }}
          value={completedAudits?.length}
        />
        <AuditResultsChart gridArea="chart" data={auditResults} />
      </Grid>
    </ChartCard>
  );
}

RulesAudit.propTypes = {
  period: PropTypes.oneOf(['Last 30 Days', 'Last Year', 'Lifetime']),
};

function AuditResultsChart({ data, ...rest }) {
  return <MeterGroup {...rest}>
    {data.map(datum => (
      <Fragment key={datum.result}>
        <Text>{`${datum.result[0].toUpperCase()}${datum.result.slice(
          1,
        )}`}</Text>
        <Meter
          alignSelf="center"
          type="bar"
          values={[
            {
              value: datum.percent,
              color: datum.color,
              label: `${datum.result[0].toUpperCase()}${datum.result.slice(1)}`,
            },
          ]}
          thickness="small"
        />
        <Box align="end">
          <Text weight="bold">{datum.count}</Text>
        </Box>
      </Fragment>
    ))}
    {/* Content is being placed in a 3-column grid. Empty Box ensures the meter 
    labels flow into the 2nd column */}
    <Box />
    <Box direction="row" justify="between">
      <Text>0%</Text>
      <Text>100%</Text>
    </Box>
  </MeterGroup>;
}

AuditResultsChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      result: PropTypes.string,
      percent: PropTypes.number,
      count: PropTypes.number,
      color: PropTypes.string,
    }),
  ),
};
