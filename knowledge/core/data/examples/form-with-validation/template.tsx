import { Box, Form, FormField, TextInput, Select, CheckBox, Button } from 'grommet';
import { useState } from 'react';

interface FormValues {
  name: string;
  email: string;
  role: string;
  notifications: boolean;
}

export function UserForm({ onSubmit }: { onSubmit: (values: FormValues) => void }) {
  const [formData, setFormData] = useState<FormValues>({
    name: '',
    email: '',
    role: '',
    notifications: false,
  });

  return (
    <Form
      value={formData}
      onChange={setFormData}
      onSubmit={({ value }) => onSubmit(value)}
    >
      <FormField
        label="Full Name"
        name="name"
        required
        validate={[
          { regexp: /^[a-zA-Z\s]+$/, message: 'Only letters and spaces allowed' },
          { min: 2, message: 'Name must be at least 2 characters' },
        ]}
      >
        <TextInput name="name" placeholder="John Doe" />
      </FormField>

      <FormField
        label="Email"
        name="email"
        required
        validate={{
          regexp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: 'Enter a valid email address',
        }}
      >
        <TextInput name="email" type="email" placeholder="user@example.com" />
      </FormField>

      <FormField label="Role" name="role" required>
        <Select
          name="role"
          options={['Admin', 'Editor', 'Viewer']}
          placeholder="Select a role"
        />
      </FormField>

      <FormField name="notifications">
        <CheckBox
          name="notifications"
          label="Send email notifications"
        />
      </FormField>

      <Box direction="row" gap="small" margin={{ top: 'medium' }}>
        <Button type="submit" label="Submit" primary />
        <Button type="reset" label="Reset" />
      </Box>
    </Form>
  );
}