import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Pagination as GrommetPagination, DataContext } from 'grommet';
import { PaginationSummary } from './PaginationSummary';
import { PaginationStep } from './PaginationStep';

export const Pagination = ({ ...rest }) => {
  const { view, total } = useContext(DataContext);
  const [step, setStep] = useState(view?.step || 10);
  return (
    <Box direction="row" justify="center">
      <Box
        border="top"
        direction="row"
        wrap
        align="center"
        justify="between"
        pad={{ vertical: 'xsmall' }}
        style={{ columnGap: '12px', rowGap: '6px' }}
        // in order to align with DataTable
        flex="grow"
        width="0"
        {...rest}
      >
        <PaginationSummary page={view?.page} step={step} numberItems={total} />
        <PaginationStep step={step} onChange={({ value }) => setStep(value)} />
        <Box direction="row" justify="center">
          <GrommetPagination numberItems={total} step={step} />
        </Box>
      </Box>
    </Box>
  );
};

Pagination.propTypes = {
  page: PropTypes.number,
  step: PropTypes.number,
  numberItems: PropTypes.number,
  onStepChange: PropTypes.func,
  onPageChange: PropTypes.func,
};
