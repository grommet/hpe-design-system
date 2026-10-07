// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Text } from 'grommet';
import { Refresh } from '@hpe-design/icons-grommet';
import { Scenario } from './Scenario';
import { ServersTable } from './ServersTable';
import { useSimulatedRequest } from './useSimulatedRequest';
import { servers } from '../api';

const EMPTY = [];

const statusLabels = {
  loading: 'Waiting on response…',
  success: 'Response: 200 OK, 5 records',
  empty: 'Response: 200 OK, 0 records',
  error: 'Response: 503 Service unavailable',
};

const ResponseStatus = ({ status }) => (
  <Text size="small" color="text-weak" aria-live="polite">
    {statusLabels[status]}
  </Text>
);

ResponseStatus.propTypes = { status: PropTypes.string.isRequired };

const ReplayButton = ({ onClick, status }) => (
  <Button
    label="Replay request"
    icon={<Refresh />}
    onClick={onClick}
    disabled={status === 'loading'}
  />
);

ReplayButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};

const TableScenario = ({ data, outcome, ...rest }) => {
  const { status, run } = useSimulatedRequest({ data, outcome });
  return (
    <Scenario
      {...rest}
      actions={
        <Box direction="row" gap="small" align="center">
          <ResponseStatus status={status} />
          <ReplayButton onClick={run} status={status} />
        </Box>
      }
    >
      <ServersTable
        status={status}
        data={data}
        onRetry={run}
        onAdd={() => {}}
      />
    </Scenario>
  );
};

TableScenario.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  outcome: PropTypes.oneOf(['success', 'error']).isRequired,
};

export const TableScenarios = () => {
  const serversData = useMemo(() => servers, []);

  return (
    <>
      <TableScenario
        id="table-loading"
        tag="DataTable · 1 of 3"
        heading="Waiting on a response, then data is received"
        guidance={`While the request is in flight, show skeleton rows in 
          place of the table body rather than a Spinner. Keep the column 
          headers visible so the user sees the structure of what is 
          coming and nothing shifts when the data lands.`}
        reference={{
          label: 'Skeleton guidance',
          href: 'https://design-system.hpe.design/components/skeleton',
        }}
        data={serversData}
        outcome="success"
      />
      <TableScenario
        id="table-error"
        tag="DataTable · 2 of 3"
        heading="The API returns an error — the table can't fetch data"
        guidance={`Replace the table body with an error-management empty 
          state. Say what happened without technical jargon, keep the tone 
          empathetic, and give the user a way forward: a primary action to 
          retry and a link to get help. The alert icon in the warning color 
          is the standard visual cue for this type of empty state.`}
        reference={{
          label: 'Error management empty state guidance',
          href: 'https://design-system.hpe.design/templates/empty-state#error-management-empty-state',
        }}
        data={serversData}
        outcome="error"
      />
      <TableScenario
        id="table-empty"
        tag="DataTable · 3 of 3"
        heading="Successful response, but there is no data"
        guidance={`This is not an error, so don't style it like one. Use a 
          no-data empty state that explains why the table is empty and 
          offers the direct path to populate it, such as creating the 
          first record.`}
        reference={{
          label: 'No data empty state guidance',
          href: 'https://design-system.hpe.design/templates/empty-state#no-data-empty-state',
        }}
        data={EMPTY}
        outcome="success"
      />
    </>
  );
};
