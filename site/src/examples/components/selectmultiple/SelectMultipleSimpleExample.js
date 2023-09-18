import React, { useState } from 'react';
import { Form, FormField, SelectMultiple } from 'grommet';

const defaultOptions = [
  'Azure ISO27001:2013',
  'Azure MAS-TRM:v2019.03',
  'Azure NIST800-53:R4',
  'Azure NZISM:v3.2',
  'Azure Security Health Check',
  'Butterfly:v1.0',
];

export const SelectMultipleSimpleExample = () => {
  const [options, setOptions] = useState(defaultOptions);
  const [selected, setSelected] = useState(defaultOptions.slice(0, 3));
  return (
    <Form>
      {/* https://github.com/grommet/eslint-plugin-grommet/issues/46 */}
      {/* eslint-disable-next-line grommet/formfield-htmlfor-id */}
      <FormField
        htmlFor="multi-select-example__input"
        name="multi-select-example"
        label="Frameworks"
      >
        <SelectMultiple
          id="multi-select-example"
          name="multi-select-example"
          placeholder="Select multiple items"
          searchPlaceholder="Search Frameworks"
          options={options}
          value={selected}
          onChange={({ value: nextValue }) => setSelected(nextValue)}
          onSearch={text => {
            // The line below escapes regular expression special characters:
            // [ \ ^ $ . | ? * + ( )
            const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

            // Create the regular expression with modified value which
            // handles escaping special characters. Without escaping special
            // characters, errors will appear in the console
            const exp = new RegExp(escapedText, 'i');
            setOptions(defaultOptions.filter(o => exp.test(o)));
          }}
          onClose={() => setOptions(defaultOptions)}
        />
      </FormField>
    </Form>
  );
};
