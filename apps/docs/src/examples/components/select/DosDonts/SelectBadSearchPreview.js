import React, { useState } from 'react';
import { Form, FormField, Select } from 'grommet';

const locations = [
  'Africa',
  'Asia/Pacific',
  'Australia',
  'Canada',
  'Caribbean',
  'Central America',
  'Central Asia',
  'East Asia',
  'EMEA',
  'Greater China',
  'India',
  'Japan',
  'Latin America',
  'Middle East',
  'North America',
  'Northern Europe',
  'Polar Regions',
  'South Asia',
  'Southeast Asia',
  'Southern Europe',
  'Sub-Saharan Africa',
  'Western Europe',
];

export const SelectBadSearchPreview = () => {
  const [selected, setSelected] = useState('');

  return (
    <Form>
      {/* https://github.com/grommet/eslint-plugin-grommet/issues/46 */}
      {/* eslint-disable-next-line grommet/formfield-htmlfor-id */}
      <FormField
        htmlFor="bad-search-select__input"
        name="bad-search-select"
        label="Location"
      >
        <Select
          id="bad-search-select"
          name="bad-search-select"
          placeholder="Select location"
          options={locations}
          value={selected}
          onChange={({ option }) => setSelected(option)}
        />
      </FormField>
    </Form>
  );
};
