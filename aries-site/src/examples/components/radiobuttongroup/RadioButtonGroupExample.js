import React, { useState } from 'react';
import { Form, FormField, RadioButtonGroup } from 'grommet';

const powerRegulationOptions = [
  'Dynamic power savings mode',
  'Static low power mode',
  'Static high performance mode',
  'OS control mode',
];

export const RadioButtonGroupExample = () => {
  const [powerRegulation, setPowerRegulation] = useState(
    'Static high performance mode',
  );

  return (
    <Form>
      <FormField htmlFor="power-stzw" name="power-regulation" label="Label">
        <RadioButtonGroup
          id="power-stzw"
          name="power-regulation"
          options={powerRegulationOptions}
          value={powerRegulation}
          onChange={event => setPowerRegulation(event.target.value)}
        />
      </FormField>
    </Form>
  );
};
