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
import Radio from '@mui/material/Radio';
import MUIRadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormGroup from '@mui/material/FormGroup';
import MuiCheckBox from '@mui/material/Checkbox';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { Button } from './components/Button';

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

const theme = createTheme({
  typography: {
    fontFamily: 'var(--hpe-font-stack-primary)',
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: 'var(--hpe-radio-button-control-enabled-border-color)',
          width: 'var(--hpe-radio-button-medium-control-width)',
          height: 'var(--hpe-radio-button-medium-control-height)',
          '&.Mui-disabled': {
            color: 'var(--hpe-radio-button-control-disabled-border-color)',
          },
          '&.Mui-checked': {
            color:
              'var(--hpe-radio-button-control-selected-enabled-icon-color)',
          },
          '&.Mui-checked.Mui-disabled': {
            color:
              'var(--hpe-radio-button-control-selected-disabled-icon-color)',
          },
        },
      },
    },
    MuiRadioGroup: {
      styleOverrides: {
        root: {
          gap: 'var(--hpe-spacing-xsmall)',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          // states
          color: 'var(--hpe-checkbox-control-enabled-border-color)',
          '&.Mui-checked': {
            color: 'var(--hpe-checkbox-control-selected-enabled-background)',
          },
          // dimensions
          padding: '0',
          borderRadius: 'var(--hpe-checkbox-medium-control-border-radius)',
          width: 'var(--hpe-checkbox-medium-control-width)',
          height: 'var(--hpe-checkbox-medium-control-height)',
        },
      },
    },
    MuiFormGroup: {
      styleOverrides: {
        root: {
          borderStyle: 'solid',
          // states
          background:
            'var(--hpe-form-field-input-group-container-enabled-background)',
          borderColor:
            'var(--hpe-form-field-input-group-container-enabled-border-color)',
          '&.Mui-error': {
            background:
              'var(--hpe-form-field-input-container-status-critical-background)',
            borderColor:
              'var(--hpe-form-field-input-container-status-critical-border-color)',
          },
          // dimensions
          borderWidth:
            'var(--hpe-form-field-medium-input-group-container-border-width)',
          borderRadius:
            'var(--hpe-form-field-medium-input-group-container-border-radius)',
          paddingBlock:
            'var(--hpe-form-field-medium-input-group-container-padding-y)',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          // states
          color: 'var(--hpe-form-field-label-text-enabled-text-color)',
          '&.Mui-error': {
            color:
              'var(--hpe-form-field-label-text-status-critical-text-color)',
          },
          '&.Mui-disabled': {
            color: 'var(--hpe-form-field-label-text-disabled-text-color)',
          },
          // dimensions
          fontSize: 'var(--hpe-form-field-medium-label-text-font-size)',
          lineHeight: 'var(--hpe-form-field-medium-label-text-line-height)',
          fontWeight: 'var(--hpe-form-field-medium-label-text-font-weight)',
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          // states
          background:
            'var(--hpe-form-field-input-group-item-enabled-background)',
          '&:hover:not(.Mui-disabled)': {
            background:
              'var(--hpe-form-field-input-group-item-hover-background)',
          },
          // dimension
          gap: 'var(--hpe-radio-button-medium-gap-x)',
          margin: '0',
          paddingBlock:
            'var(--hpe-form-field-medium-input-group-item-padding-y)',
          paddingInline:
            'var(--hpe-form-field-medium-input-group-item-padding-x)',
        },
        // TO DO there is a singular place for this, rather than separate for Radio, Check
        label: {
          color: 'var(--hpe-radio-button-label-enabled-text-color)',
          '&.Mui-disabled': {
            color: 'var(--hpe-radio-button-label-disabled-text-color)',
          },
          fontFamily: 'var(--hpe-font-stack-primary)', // TO DO make this global?
          fontSize: 'var(--hpe-radio-button-medium-label-font-size)',
          lineHeight: 'var(--hpe-radio-button-medium-label-line-height)',
          fontWeight: 'var(--hpe-radio-button-medium-label-font-weight)',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          // state
          color: 'var(--hpe-form-field-help-text-enabled-color)',
          '&.Mui-error': {
            color: 'var(--hpe-form-field-error-text-enabled-color)',
          },
          // dimensions
          marginInline: '0',
          marginTop: 'var(--hpe-spacing-xsmall)', // TO DO no token
          fontSize: 'var(--hpe-form-field-medium-help-text-font-size)',
          lineHeight: 'var(--hpe-form-field-medium-help-text-line-height)',
          fontWeight: 'var(--hpe-form-field-medium-help-text-font-weight)',
        },
      },
    },
  },
});

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
        <ThemeProvider theme={theme}>
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
                <td>Standalone CheckboxGroup</td>
                <td>
                  <FormGroup>
                    <FormControlLabel
                      control={<MuiCheckBox defaultChecked />}
                      label="Label"
                    />
                    <FormControlLabel
                      required
                      control={<MuiCheckBox />}
                      label="Required"
                    />
                    <FormControlLabel control={<MuiCheckBox />} label="Other" />
                  </FormGroup>
                </td>
                <td>
                  <FormGroup>
                    <FormControlLabel
                      control={<MuiCheckBox defaultChecked />}
                      label="Label"
                    />
                    <FormControlLabel
                      required
                      control={<MuiCheckBox />}
                      label="Required"
                    />
                    <FormControlLabel
                      disabled
                      control={<MuiCheckBox />}
                      label="Disabled"
                    />
                  </FormGroup>
                </td>
                <td>--</td>
              </tr>
              <tr>
                <td>CheckBoxGroup in FormField</td>
                <td>
                  <FormControl>
                    <FormLabel>CheckboxGroup label</FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={<MuiCheckBox defaultChecked />}
                        label="Label"
                      />
                      <FormControlLabel
                        required
                        control={<MuiCheckBox />}
                        label="Required"
                      />
                      <FormControlLabel
                        control={<MuiCheckBox />}
                        label="Other"
                      />
                    </FormGroup>
                  </FormControl>
                </td>
                <td>
                  <FormControl disabled>
                    <FormLabel>CheckboxGroup label</FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={<MuiCheckBox defaultChecked />}
                        label="Label"
                      />
                      <FormControlLabel
                        required
                        control={<MuiCheckBox />}
                        label="Required"
                      />
                      <FormControlLabel
                        disabled
                        control={<MuiCheckBox />}
                        label="Disabled"
                      />
                    </FormGroup>
                  </FormControl>
                </td>
                <td>
                  <FormControl error>
                    <FormLabel>CheckboxGroup label</FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={<MuiCheckBox defaultChecked />}
                        label="Label"
                      />
                      <FormControlLabel
                        required
                        control={<MuiCheckBox />}
                        label="Required"
                      />
                      <FormControlLabel
                        disabled
                        control={<MuiCheckBox />}
                        label="Disabled"
                      />
                    </FormGroup>
                    <FormHelperText>There is an error.</FormHelperText>
                  </FormControl>
                </td>
              </tr>
              <tr>
                <td>Standalone RadioGroup</td>
                <td>
                  <MUIRadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="California"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="California"
                      control={<Radio />}
                      label="California"
                    />
                    <FormControlLabel
                      value="Colorado"
                      control={<Radio />}
                      label="Colorado"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </MUIRadioGroup>
                </td>
                <td>
                  <MUIRadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="California"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="California"
                      control={<Radio />}
                      label="California"
                    />
                    <FormControlLabel
                      value="Colorado"
                      control={<Radio />}
                      label="Colorado"
                      disabled
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </MUIRadioGroup>
                </td>
                <td>--</td>
              </tr>
              <tr>
                <td>MUIRadioGroup in FormField</td>
                <td>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      State
                    </FormLabel>
                    <MUIRadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="California"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="California"
                        control={<Radio />}
                        label="California"
                      />
                      <FormControlLabel
                        value="Colorado"
                        control={<Radio />}
                        label="Colorado"
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio />}
                        label="Other"
                      />
                    </MUIRadioGroup>
                  </FormControl>
                </td>
                <td>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">
                      State
                    </FormLabel>
                    <MUIRadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="California"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="California"
                        control={<Radio />}
                        label="California"
                      />
                      <FormControlLabel
                        value="Colorado"
                        control={<Radio />}
                        label="Colorado"
                        disabled
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio />}
                        label="Other"
                      />
                    </MUIRadioGroup>
                  </FormControl>
                </td>
                <td>
                  <FormControl error={true}>
                    <FormLabel id="demo-radio-buttons-group-label">
                      State
                    </FormLabel>
                    <MUIRadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="California"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="California"
                        control={<Radio />}
                        label="California"
                      />
                      <FormControlLabel
                        value="Colorado"
                        control={<Radio />}
                        label="Colorado"
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio />}
                        label="Other"
                      />
                    </MUIRadioGroup>
                    <FormHelperText>This is a required field.</FormHelperText>
                  </FormControl>
                </td>
              </tr>
            </tbody>
          </table>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default App;
