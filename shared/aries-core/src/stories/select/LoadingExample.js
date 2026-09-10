// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';
import { Box, Select } from 'grommet';
import { SelectLoadingPlaceholder } from '../../js/components/core/Select';
import { fetchOptions } from './shared';

const LoadingExample = () => {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOptions().then(data => {
      setOptions(data.map(({ label }) => label));
      setLoading(false);
    });
  }, []);

  return (
    <Box fill align="center" justify="start" pad="large">
      <Select
        id="select-loading"
        name="select-loading"
        aria-label={loading ? 'Loading services' : 'Select name'}
        options={loading ? [] : options}
        value={value}
        placeholder={
          loading ? (
            <SelectLoadingPlaceholder text="Loading services..." />
          ) : (
            'Select name'
          )
        }
        disabled={loading}
        emptySearchMessage="No services found"
        onChange={({ option }) => setValue(option)}
      />
    </Box>
  );
};

export { LoadingExample };
