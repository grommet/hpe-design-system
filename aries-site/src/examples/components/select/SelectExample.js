/* eslint-disable max-len */
/* eslint-disable grommet/formfield-name */
import React, { useState } from 'react';
import { Box, Form, FormField, Select, ThemeContext, Text } from 'grommet';

const options = [
  'Item one',
  'Item two',
  'Item three',
  'Item four',
  'Item five',
  'Item six',
];

export const SelectExample = () => {
  const [selected, setSelected] = useState('Item two');
  const [currentOptions, setCurrentOptions] = useState(options);
  return (
    <Box direction="row" gap="large">
      <Box gap="small">
        <Text>Option 2</Text>
        <Form>
          {/* https://github.com/grommet/eslint-plugin-grommet/issues/46 */}
          {/* eslint-disable-next-line grommet/formfield-htmlfor-id */}
          <FormField
            htmlFor="select-example-1__input"
            // name="select-example"
            label="Select"
          >
            <Select
              id="select-example-1"
              // name="select-example"
              placeholder="Select item"
              options={options}
              value={selected}
              onChange={({ option }) => setSelected(option)}
              clear
            />
          </FormField>
        </Form>
        <Form>
          {/* https://github.com/grommet/eslint-plugin-grommet/issues/46 */}
          {/* eslint-disable-next-line grommet/formfield-htmlfor-id */}
          <FormField
            htmlFor="select-example__input"
            // name="select-example"
            label="Select with search"
          >
            <Select
              id="select-example"
              // name="select-example"
              placeholder="Select item"
              options={currentOptions}
              value={selected}
              onChange={({ option }) => setSelected(option)}
              clear
              onSearch={text => {
                // The line below escapes regular expression special characters:
                // [ \ ^ $ . | ? * + ( )
                const escapedText = text.replace(
                  /[-\\^$*+?.()|[\]{}]/g,
                  '\\$&',
                );

                // Create the regular expression with modified value which
                // handles escaping special characters. Without escaping special
                // characters, errors will appear in the console
                const exp = new RegExp(escapedText, 'i');
                setCurrentOptions(options.filter(o => exp.test(o)));
              }}
            />
          </FormField>
        </Form>
      </Box>
      <ThemeContext.Extend
        value={{
          select: {
            clear: {
              container: {
                border: {
                  side: 'bottom',
                  color: 'border',
                },
              },
            },
          },
        }}
      >
        <Box gap="small">
          <Text>Option 4</Text>
          <Form>
            {/* https://github.com/grommet/eslint-plugin-grommet/issues/46 */}
            {/* eslint-disable-next-line grommet/formfield-htmlfor-id */}
            <FormField
              htmlFor="select-example-1__input"
              // name="select-example"
              label="Select"
            >
              <Select
                id="select-example-1"
                // name="select-example"
                placeholder="Select item"
                options={options}
                value={selected}
                onChange={({ option }) => setSelected(option)}
                clear
              />
            </FormField>
          </Form>
          <Form>
            {/* https://github.com/grommet/eslint-plugin-grommet/issues/46 */}
            {/* eslint-disable-next-line grommet/formfield-htmlfor-id */}
            <FormField
              htmlFor="select-example__input"
              // name="select-example"
              label="Select with search"
            >
              <Select
                id="select-example"
                // name="select-example"
                placeholder="Select item"
                options={currentOptions}
                value={selected}
                onChange={({ option }) => setSelected(option)}
                clear
                onSearch={text => {
                  // The line below escapes regular expression special characters:
                  // [ \ ^ $ . | ? * + ( )
                  const escapedText = text.replace(
                    /[-\\^$*+?.()|[\]{}]/g,
                    '\\$&',
                  );
                  // Create the regular expression with modified value which
                  // handles escaping special characters. Without escaping special
                  // characters, errors will appear in the console
                  const exp = new RegExp(escapedText, 'i');
                  setCurrentOptions(options.filter(o => exp.test(o)));
                }}
              />
            </FormField>
          </Form>
        </Box>
      </ThemeContext.Extend>
    </Box>
  );
};
