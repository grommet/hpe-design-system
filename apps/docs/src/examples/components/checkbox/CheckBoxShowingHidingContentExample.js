import React, { useState } from 'react';
import { CheckBox, Form, FormField, TextInput } from 'grommet';
import { ContentPane } from '../../../layouts/content/ContentPane';

export const CheckBoxShowingHidingContentExample = () => {
  const [shipToDifferent, setShipToDifferent] = useState(false);
  return (
    <ContentPane width="medium">
      <Form>
        <FormField
          label="Billing address"
          htmlFor="billing-address"
          name="billing-address"
        >
          <TextInput
            id="billing-address"
            name="billing-address"
            placeholder="123 Main St, City, State"
          />
        </FormField>
        {/* CheckBox label provides the accessible name;
            htmlFor on FormField would create a duplicate
            label, causing an a11y violation. */}
        {/* eslint-disable-next-line grommet/formfield-htmlfor-id */}
        <FormField name="ship-to-different">
          <CheckBox
            id="ship-to-different"
            name="ship-to-different"
            label="Ship to a different address"
            checked={shipToDifferent}
            toggle
            onChange={event => setShipToDifferent(event.target.checked)}
          />
        </FormField>
        {shipToDifferent && (
          <>
            <FormField
              label="Shipping address"
              htmlFor="shipping-address"
              name="shipping-address"
            >
              <TextInput
                id="shipping-address"
                name="shipping-address"
                placeholder="456 Other St, City, State"
              />
            </FormField>
            <FormField
              label="Shipping note"
              htmlFor="shipping-note"
              name="shipping-note"
            >
              <TextInput
                id="shipping-note"
                name="shipping-note"
                placeholder="Leave at front door"
              />
            </FormField>
          </>
        )}
      </Form>
    </ContentPane>
  );
};
