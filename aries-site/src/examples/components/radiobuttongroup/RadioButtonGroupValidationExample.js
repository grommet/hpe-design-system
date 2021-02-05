import React, { useState } from 'react';
import { Form, FormField, RadioButtonGroup } from 'grommet';

const powerRegulationOptions = [
  'Dynamic power savings mode',
  'Static low power mode',
  'Static high performance mode',
  'OS control mode',
];

export const RadioButtonGroupValidationExample = () => {
  const [powerRegulation, setPowerRegulation] = useState();
  const [message, setMessage] = useState({
    error: 'Required information.',
    info: `To ensure your product is configured correctly, select 
    a Power Regulation option to resolve this error.`,
  });

  const onChange = value => {
    setPowerRegulation(value);
    if (value) setMessage({});
  };

  return (
    <Form>
      <FormField
        htmlFor="power-stzy"
        name="pwr-regulation"
        label="Label"
        error={message.error}
        info={message.info}
        required
      >
        <RadioButtonGroup
          id="power-stzy"
          name="pwr-regulation"
          options={powerRegulationOptions}
          value={powerRegulation}
          onChange={event => onChange(event.target.value)}
        />
      </FormField>
    </Form>
  );
};
