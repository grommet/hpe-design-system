/* eslint-disable grommet/formfield-htmlfor-id */
import React, { useState } from 'react';
import {
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
} from 'grommet';

const channels = [
  { id: 'email', label: 'Email' },
  { id: 'sms', label: 'SMS' },
  { id: 'push', label: 'Push notifications' },
  { id: 'slack', label: 'Slack' },
];

export const CheckBoxSelectingMultipleOptionsExample =
  () => {
    const [value, setValue] = useState(['email']);

    const handleChange = (id, checked) => {
      if (checked) {
        setValue(prev => [...prev, id]);
      } else {
        setValue(prev => prev.filter(c => c !== id));
      }
    };

    return (
      <Box width="medium">
        <Form>
          {channels.map(channel => (
            <FormField
              key={channel.id}
              name={channel.id}
            >
              <CheckBox
                name={channel.id}
                id={channel.id}
                label={channel.label}
                checked={value.includes(channel.id)}
                onChange={event =>
                  handleChange(
                    channel.id,
                    event.target.checked,
                  )
                }
              />
            </FormField>
          ))}
          <Box
            direction="row"
            margin={{ top: 'small' }}
          >
            <Button
              type="submit"
              primary
              label="Save preferences"
            />
          </Box>
        </Form>
      </Box>
    );
  };
