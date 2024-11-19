/* eslint-disable react/prop-types */
import './App.css';
import React from 'react';
import * as Select from '@radix-ui/react-select';
import {
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  Text,
  RadioGroup,
} from '@radix-ui/themes';

import { Button } from './components/Button';
import { Mui } from './Mui';

const MyText = ({ size, children }) => {
  const sizeClasses = {
    xsmall: `text-xsmall`,
    small: `text-small`,
    medium: `text-medium`,
    large: `text-large`,
    xlarge: `text-xlarge`,
    xxlarge: `text-xxlarge`,
    '3xl': `text-3xl`,
    '4xl': `text-4xl`,
    '5xl': `text-5xl`,
  };

  return (
    <span className={`${sizeClasses[size]} text-text-default`}>{children}</span>
  );
};

const SelectItem = React.forwardRef(({ children, ...props }, forwardedRef) => {
  return (
    <Select.Item className="SelectItem" {...props} ref={forwardedRef}>
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  );
});

SelectItem.displayName = 'SelectItem';

const MyCheckbox = ({ label, ...rest }) => (
  <Box className="hpe-checkbox">
    <Text as="label">
      {/* to do, adjust Radix theme? */}
      <Flex style={{ gap: 'var(--hpe-checkbox-medium-gap-x)' }}>
        <Checkbox id="c1" {...rest} />
        {label}
      </Flex>
    </Text>
  </Box>
);
const FormField = ({ children, label, help, error, legend }) => (
  <Box className="hpe-formfield" gap="2">
    <Text as="label">
      {legend || label}
      <Text className="hpe-help">{help}</Text>
      <Box className="hpe-input-container">{children}</Box>
    </Text>
    {error ? <Text className="hpe-error">{error}</Text> : undefined}
  </Box>
);

function App() {
  return (
    // TO DO right now the namespace of "background" and "text" is repeated
    // is that okay?
    <div className="flex flex-col items-start bg-background-back px-large pt-medium pb-large  min-h-screen	w-full gap-medium">
      <div className="flex w-full justify-between items-start py-medium">
        <h1 className="text-text-strong">Test page</h1>
        <div className="flex flex-row gap-small">
          <Button label="Default button" />
          <Button label="Secondary button" kind="secondary" />
          <Button
            label="Toggle theme mode"
            kind="primary"
            onClick={() => {
              if (
                !document.documentElement.getAttribute('data-mode') ||
                document.documentElement.getAttribute('data-mode') === ''
              ) {
                document.documentElement.setAttribute('data-mode', 'dark');
              } else {
                document.documentElement.setAttribute('data-mode', '');
              }
            }}
          />
        </div>
      </div>
      <div className="flex flex-col bg-background-front p-medium rounded-small w-full gap-small">
        <h2 className="text-text-strong">Tailwind classes on native HTML</h2>
        <p className="text-text-default">
          Banjo pour-over kinfolk mukbang taiyaki semiotics. Craft beer neutral
          milk hotel tonx chicharrones small batch taxidermy hexagon church-key
          hot chicken salvia solarpunk cred godard. Franzen shoreditch
          kickstarter crucifix. Polaroid pop-up sus, street art narwhal franzen
          bruh air plant authentic lyft.
        </p>
        {[
          'xsmall',
          'small',
          'medium',
          'large',
          'xxlarge',
          '3xl',
          '4xl',
          '5xl',
        ].map(size => (
          <MyText key={size} size={size}>
            {size}
          </MyText>
        ))}
      </div>
      <div className="flex flex-col items-start bg-background-front p-medium rounded-small w-full gap-small">
        <h2 className="text-text-strong">RadixUI with CSS variables</h2>
        <table>
          <thead>
            <tr>
              <th>Scenario</th>
              <th>Enabled</th>
              <th>Disabled</th>
              <th>Error</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Standalone Checkbox</td>
              <td>
                <MyCheckbox label="Accept terms and conditions" />
              </td>
              <td>
                <MyCheckbox label="Accept terms and conditions" disabled />
              </td>
              <td>--</td>
            </tr>
            <tr>
              <td>Checkbox in FormField</td>
              <td>
                <FormField label="Terms and conditions">
                  <MyCheckbox label="Accept terms and conditions" />
                </FormField>
              </td>
              <td>
                <FormField label="Terms and conditions" disabled>
                  <MyCheckbox label="Accept terms and conditions" disabled />
                </FormField>
              </td>
              <td>
                <FormField
                  label="Terms and conditions"
                  error="This field is required."
                >
                  <MyCheckbox label="Accept terms and conditions" />
                </FormField>
              </td>
            </tr>
            <tr>
              <td>Standalone CheckboxGroup</td>
              <td>
                <CheckboxGroup.Root defaultValue={['1']} name="example">
                  <CheckboxGroup.Item value="1">California</CheckboxGroup.Item>
                  <CheckboxGroup.Item value="2">Colorado</CheckboxGroup.Item>
                  <CheckboxGroup.Item value="3">Georgia</CheckboxGroup.Item>
                </CheckboxGroup.Root>
              </td>
              <td>
                <CheckboxGroup.Root defaultValue={['1', '2']} name="example">
                  <CheckboxGroup.Item value="1">California</CheckboxGroup.Item>
                  <CheckboxGroup.Item value="2" disabled>
                    Colorado
                  </CheckboxGroup.Item>
                  <CheckboxGroup.Item value="3">Georgia</CheckboxGroup.Item>
                </CheckboxGroup.Root>
              </td>
              <td>--</td>
            </tr>
            <tr>
              <td>CheckboxGroup in FormField</td>
              <td>
                <FormField legend="State" help="Select which state you live in">
                  <CheckboxGroup.Root defaultValue={['1']} name="example">
                    <CheckboxGroup.Item value="1">
                      California
                    </CheckboxGroup.Item>
                    <CheckboxGroup.Item value="2">Colorado</CheckboxGroup.Item>
                    <CheckboxGroup.Item value="3">Georgia</CheckboxGroup.Item>
                  </CheckboxGroup.Root>
                </FormField>
              </td>
              <td>
                <FormField
                  legend="State"
                  help="Select which state you live in"
                  disabled
                >
                  <CheckboxGroup.Root defaultValue={['1']} name="example">
                    <CheckboxGroup.Item value="1">
                      California
                    </CheckboxGroup.Item>
                    <CheckboxGroup.Item value="2" disabled>
                      Colorado
                    </CheckboxGroup.Item>
                    <CheckboxGroup.Item value="3">Georgia</CheckboxGroup.Item>
                  </CheckboxGroup.Root>
                </FormField>
              </td>
              <td>
                <FormField
                  legend="State"
                  help="Select which state you live in"
                  error="There was an error."
                >
                  <CheckboxGroup.Root defaultValue={['1']} name="example">
                    <CheckboxGroup.Item value="1">
                      California
                    </CheckboxGroup.Item>
                    <CheckboxGroup.Item value="2">Colorado</CheckboxGroup.Item>
                    <CheckboxGroup.Item value="3">Georgia</CheckboxGroup.Item>
                  </CheckboxGroup.Root>
                </FormField>
              </td>
            </tr>
            <tr>
              <td>Standalone RadioGroup</td>
              <td>
                <RadioGroup.Root defaultValue="1" name="example">
                  <RadioGroup.Item value="1">Default</RadioGroup.Item>
                  <RadioGroup.Item value="2">Comfortable</RadioGroup.Item>
                  <RadioGroup.Item value="3">Compact</RadioGroup.Item>
                </RadioGroup.Root>
              </td>
              <td>
                <RadioGroup.Root defaultValue="1" name="example">
                  <RadioGroup.Item value="1">Default</RadioGroup.Item>
                  <RadioGroup.Item value="2">Comfortable</RadioGroup.Item>
                  <RadioGroup.Item value="3">Compact</RadioGroup.Item>
                </RadioGroup.Root>
              </td>
              <td>--</td>
            </tr>
            <tr>
              <td>RadioGroup in FormField</td>
              <td>
                <FormField legend="State" help="Select which state you live in">
                  <RadioGroup.Root defaultValue="1" name="example">
                    <RadioGroup.Item value="1">Default</RadioGroup.Item>
                    <RadioGroup.Item value="2">Comfortable</RadioGroup.Item>
                    <RadioGroup.Item value="3">Compact</RadioGroup.Item>
                  </RadioGroup.Root>
                </FormField>
              </td>
              <td>
                <FormField
                  legend="State"
                  help="Select which state you live in"
                  disabled
                >
                  <RadioGroup.Root defaultValue="1" name="example">
                    <RadioGroup.Item value="1">Default</RadioGroup.Item>
                    <RadioGroup.Item value="2">Comfortable</RadioGroup.Item>
                    <RadioGroup.Item value="3">Compact</RadioGroup.Item>
                  </RadioGroup.Root>
                </FormField>
              </td>
              <td>
                <FormField
                  legend="State"
                  help="Select which state you live in"
                  error="There was an error."
                >
                  <RadioGroup.Root defaultValue="1" name="example">
                    <RadioGroup.Item value="1">Default</RadioGroup.Item>
                    <RadioGroup.Item value="2">Comfortable</RadioGroup.Item>
                    <RadioGroup.Item value="3">Compact</RadioGroup.Item>
                  </RadioGroup.Root>
                </FormField>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-col items-start bg-background-front p-medium rounded-small w-full gap-small">
        <h2 className="text-text-strong">Material with CSS variables</h2>
        <Mui />
      </div>
    </div>
  );
}

export default App;
