<Form
  validate="blur"
  onSubmit={({ value }) => handleSubmit(value)}
>
  <FormField
    label="Password"
    name="password"
    required
    validate={[
      { min: 8, message: 'At least 8 characters' },
      { regexp: /[A-Z]/, message: 'Must contain uppercase letter' },
      { regexp: /[0-9]/, message: 'Must contain a number' },
    ]}
  >
    <TextInput name="password" type="password" />
  </FormField>
  
  <FormField
    label="Confirm Password"
    name="confirmPassword"
    required
    validate={(value, formValue) => {
      if (value !== formValue.password) {
        return 'Passwords must match';
      }
    }}
  >
    <TextInput name="confirmPassword" type="password" />
  </FormField>
  
  <Button type="submit" label="Create Account" primary />
</Form>