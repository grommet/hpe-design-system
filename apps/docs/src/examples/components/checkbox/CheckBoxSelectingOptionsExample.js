import React, { useState } from 'react';
import { Box, CheckBox, Form, FormField, Text } from 'grommet';

const options = [
  { id: 'email', label: 'Email' },
  { id: 'sms', label: 'SMS' },
  { id: 'push', label: 'Push notifications' },
  { id: 'slack', label: 'Slack' },
];

export const CheckBoxSelectingOptionsExample = () => {
  const [selected, setSelected] = useState([]);

  const toggle = id =>
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(s => s !== id)
        : [...prev, id],
    );

  return (
    <Box pad="medium" width="medium" gap="small">
      <Text weight="bold">Notification preferences</Text>
      <Form>
        {options.map(({ id, label }) => (
          <FormField key={id} name={id} htmlFor={id}>
            <CheckBox
              id={id}
              name={id}
              label={label}
              checked={selected.includes(id)}
              onChange={() => toggle(id)}
            />
          </FormField>
        ))}
      </Form>
      {selected.length > 0 && (
        <Text size="small" color="text-weak">
          {`Notifying via: ${selected.join(', ')}`}
        </Text>
      )}
    </Box>
  );
};
