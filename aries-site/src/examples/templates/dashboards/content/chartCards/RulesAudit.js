import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, DataChart, Grid, Meter, Text } from 'grommet';
import { Calendar } from 'grommet-icons';
import { ChartCard, Measure } from '../../components';
import { defaultWindow, REPORT_WINDOW_MAP } from './utils';

const mockData = require('../../../../../data/mockData/compliance.json');

export const RulesAudit = ({ period }) => {
  const { audits, checks } = mockData;
  const [reportWindow, setReportWindow] = useState(defaultWindow);
  const [completedAudits, setCompletedAudits] = useState(null);
  const [nextAudit, setNextAudit] = useState(null);
  const [rules, setRules] = useState([]);
  const [frameworks, setFrameworks] = useState([]);
  const [auditResults, setAuditResults] = useState([{}]);

  // Set reporting window
  useEffect(() => {
    setReportWindow(prevWindow => ({
      ...prevWindow,
      begin: new Date(
        new Date().setDate(
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
    // const nextAuditResults = [];

    setAuditResults([
      { result: 'Pass', count: 35, percent: 70 },
      { result: 'Fail', count: 10, percent: 20 },
      { result: 'Error', count: 5, percent: 10 },
    ]);
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
      <Box
        // pad aligns icon and text first row
        pad={{ top: 'xsmall' }}
      >
        <Calendar size="small" color="text-strong" />
      </Box>
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
        {/* <AuditResultsChart gridArea="chart" data={auditResults} /> */}
        <Box gridArea="chart" gap="medium">
          <Box direction="row" gap="small">
            <Text>{auditResults[0].result}</Text>
            <Meter type="bar" value={auditResults[0].percent} />
            <Text weight="bold">{auditResults[0].count}</Text>
          </Box>
          <Box direction="row" gap="small">
            <Text>{auditResults[1].result}</Text>
            <Meter type="bar" value={auditResults[1].percent} />
            <Text weight="bold">{auditResults[1].count}</Text>
          </Box>
          <Box direction="row" gap="small">
            <Text>{auditResults[2].result}</Text>
            <Meter type="bar" value={auditResults[2].percent} />
            <Text weight="bold">{auditResults[2].count}</Text>
          </Box>
        </Box>
      </Grid>
    </ChartCard>
  );
};

RulesAudit.propTypes = {
  period: PropTypes.oneOf(['Last 30 Days', 'Last Year', 'Lifetime']),
};

const AuditResultsChart = ({ data, ...rest }) => (
  <DataChart
    data={data}
    series={[
      {
        property: 'result',
        label: 'Result',
        render: value => <Text>{value}</Text>,
      },
      {
        property: 'percent',
        label: '% of Rules',
        render: value => <Text>{value}</Text>,
      },
      {
        property: 'count',
        label: '# of Rules',
        render: value => <Text>{value}</Text>,
      },
    ]}
    axis={{
      x: {
        property: 'result',
        granularity: 'fine',
      },
      y: {
        property: 'percent',
        granularity: 'medium',
      },
    }}
    chart={{ property: 'percent', thickness: 'large' }}
    guide={{
      y: {
        granularity: 'fine',
      },
    }}
    size={{ width: 'fill' }}
    {...rest}
  />
);
