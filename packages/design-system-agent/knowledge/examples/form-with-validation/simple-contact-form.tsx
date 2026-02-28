<Form onSubmit={({ value }) => handleSubmit(value)}>
  <FormField label="Name" name="name" required>
    <TextInput name="name" />
  </FormField>
  
  <FormField
    label="Email"
    name="email"
    required
    validate={{
      regexp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Enter a valid email'
    }}
  >
    <TextInput name="email" type="email" />
  </FormField>
  
  <FormField label="Message" name="message" required>
    <TextArea name="message" rows={4} />
  </FormField>
  
  <Button type="submit" label="Send" primary />
</Form>