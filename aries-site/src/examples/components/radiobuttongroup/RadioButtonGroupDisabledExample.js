import React, { useState } from 'react';
import { CheckBox, Form, FormField, RadioButtonGroup } from 'grommet';

const powerRegulationOptions = [
  'Dynamic power savings mode',
  'Static low power mode',
  'Static high performance mode',
  'OS control mode',
];

export function RadioButtonGroupDisabledExample() {
  const [powerRegulation, setPowerRegulation] = useState();
  const [disabled, setDisabled] = useState(true);

  return (
    <Form>
      <FormField
        htmlFor="power-stzx"
        name="power-reg"
        label="Label"
        /* Note: The `disabled` property should be set on both 
        the FormField as well as the RadioButtonGroup component */
        disabled={disabled}
      >
        <RadioButtonGroup
          id="power-stzx"
          name="power-reg"
          options={powerRegulationOptions}
          value={powerRegulation}
          onChange={event => setPowerRegulation(event.target.value)}
          /* Note: The `disabled` property should be set on both 
          the FormField as well as the RadioButtonGroup component */
          disabled={disabled}
        />
      </FormField>
      <FormField
        htmlFor="disabledToggle"
        name="disabledToggle"
        help="Set the disabled state for the RadioButtonGroup input above."
      >
        <CheckBox
          toggle
          id="disabledToggle"
          name="disabledToggle"
          label={disabled ? 'Disabled' : 'Enabled'}
          checked={!disabled}
          onChange={() => setDisabled(!disabled)}
          direction="row"
        />
      </FormField>
    </Form>
  );
}
