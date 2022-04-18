import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  CheckBoxGroup,
  Collapsible,
  ResponsiveContext,
} from 'grommet';
import { FormDown, FormNext } from 'grommet-icons';

import { CATEGORIES } from './constants';

export const FilterPanel = ({ setFilters }) => {
  const breakpoint = useContext(ResponsiveContext);
  const [expand, setExpand] = useState(false);

  const filterOptions = (
    <Box
      align="start"
      background="background-front"
      gap="small"
      pad={{ right: 'small', vertical: 'small' }}
      round="xsmall"
    >
      <>
        <Button
          label="Categories"
          icon={expand ? <FormDown /> : <FormNext />}
          onClick={() => setExpand(!expand)}
        />
        <Collapsible open={expand}>
          <CheckBoxGroup
            options={CATEGORIES}
            onChange={({ value }) => {
              setFilters({ categories: value });
            }}
          />
        </Collapsible>
      </>
      <Button label="Publishers" icon={<FormNext />} onClick={() => {}} />
      <Button label="Delivery Methods" icon={<FormNext />} onClick={() => {}} />
      <Button label="Pricing Models" icon={<FormNext />} onClick={() => {}} />
    </Box>
  );

  return ['xsmall', 'small'].includes(breakpoint) ? null : filterOptions;
};

FilterPanel.propTypes = {
  setFilters: PropTypes.func,
};
