import React, { useState } from 'react';
import { Form, FormField, Select } from 'grommet';

const allLocations = [
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

const getEscapedText = text =>
  text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

const formatSearchExpression = text =>
  new RegExp(getEscapedText(text), 'i');

export const SelectGoodSearchPreview = () => {
  const [locations, setLocations] = useState(allLocations);
  const [selected, setSelected] = useState('');

  const onSearch = text => {
    const exp = formatSearchExpression(text);
    setLocations(allLocations.filter(l => exp.test(l)));
  };

  return (
    <Form>
      {/* https://github.com/grommet/eslint-plugin-grommet/issues/46 */}
      {/* eslint-disable-next-line grommet/formfield-htmlfor-id */}
      <FormField
        htmlFor="good-search-select__input"
        name="good-search-select"
        label="Location"
      >
        <Select
          id="good-search-select"
          name="good-search-select"
          placeholder="Select location"
          searchPlaceholder="Search locations"
          options={locations}
          value={selected}
          onChange={({ option }) => setSelected(option)}
          onClose={() => setLocations(allLocations)}
          onSearch={text => onSearch(text)}
        />
      </FormField>
    </Form>
  );
};
