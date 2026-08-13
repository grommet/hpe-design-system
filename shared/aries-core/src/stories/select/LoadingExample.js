import React, { useEffect, useState } from 'react';
import { Box, Select, Spinner, Text } from 'grommet';
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
        options={loading ? [] : options}
        value={value}
        placeholder={
          loading ? (
            <Box direction="row" align="center" gap="xxsmall">
              <Spinner size="xsmall" />
              <Text color="text-weak">Loading...</Text>
            </Box>
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
