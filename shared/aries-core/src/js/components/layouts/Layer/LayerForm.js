import { useEffect, useState } from 'react';
import { Form, FormField, TextInput, CheckBoxGroup } from 'grommet';
import { useConfirmation } from '@shared/hooks';

const defaultFormValues = {
  'application-title': '',
  'publisher-title': '',
  'pricing-select': [],
  'delivery-select': [],
};

export const LayerForm = ({ ...rest }) => {
  const [formValue, setFormValue] = useState(defaultFormValues);

  const { setShowLayer, setTouched } = useConfirmation();

  // setTouched to false when form dismounts
  useEffect(() => () => setTouched(false), [setTouched]);

  return (
    <Form
      onSubmit={event => {
        console.log(event.value);
        setShowLayer(false);
      }}
      messages={{
        required: 'This is a required field.',
      }}
      value={formValue}
      onChange={(nextValue, { touched }) => {
        console.log('Change', nextValue, touched);
        setFormValue(nextValue);
        setTouched(Object.keys(touched).length);
      }}
      {...rest}
    >
      <FormField
        label="Title"
        contentProps={{ width: 'medium' }}
        required
        name="application-title"
        htmlFor="application-title"
      >
        <TextInput id="application-title" name="application-title" />
      </FormField>
      <FormField
        label="Publisher"
        contentProps={{ width: 'medium' }}
        required
        name="publisher"
        htmlFor="publisher"
      >
        <TextInput name="publisher" id="publisher" />
      </FormField>
      <FormField
        label="Pricing"
        contentProps={{ width: 'medium' }}
        name="pricing"
        htmlFor="pricing"
        required
      >
        <CheckBoxGroup
          id="pricing"
          name="pricing"
          options={[
            'Annual license',
            'Free',
            'Free trial',
            'Monthly Subscription',
          ]}
        />
      </FormField>
      <FormField
        label="Delivery"
        contentProps={{ width: 'medium' }}
        name="delivery"
        htmlFor="delivery"
        required
      >
        <CheckBoxGroup
          id="delivery"
          name="delivery"
          options={['License key', 'Package manager', 'Web application']}
        />
      </FormField>
    </Form>
  );
};
