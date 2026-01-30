/* eslint-disable import/no-unresolved */
import React from 'react';
/* eslint-disable max-len */
import { SimpleSignUpExample } from 'apps/docs/src/examples/templates/forms/SimpleSignUpExample';
import { SortExample } from 'apps/docs/src/examples/templates/forms/SortExample';
import { SingleFormFieldExample } from 'apps/docs/src/examples/templates/forms/SingleFormFieldExample';
import { SignUpExample } from 'apps/docs/src/examples/templates/forms/SignUpExample';
import { SignInExample } from 'apps/docs/src/examples/templates/forms/SignInExample';
import { ShippingExample } from 'apps/docs/src/examples/templates/forms/ShippingExample';
import { SettingsExample } from 'apps/docs/src/examples/templates/forms/SettingsExample';
import { PayExample } from 'apps/docs/src/examples/templates/forms/PayExample';
import { RequiredFieldsExample } from 'apps/docs/src/examples/templates/forms/RequiredFieldsExample';
import { CustomizeExample } from 'apps/docs/src/examples/templates/forms/CustomizeExample';
import { CharacterCounterExample } from 'apps/docs/src/examples/templates/forms/CharacterCounterExample';
import { ChangePasswordExample } from 'apps/docs/src/examples/templates/forms/ChangePasswordExample';

const meta = {
  title: 'Forms',
};

export default meta;

export const ChangePassword = {
  render: () => <ChangePasswordExample />,
};

export const CharacterCounter = {
  render: () => <CharacterCounterExample />,
};

export const Customize = {
  render: () => <CustomizeExample />,
};

export const RequiredFields = {
  render: () => <RequiredFieldsExample />,
};

export const Pay = {
  render: () => <PayExample />,
};

export const Settings = {
  render: () => <SettingsExample />,
};

export const Shipping = {
  render: () => <ShippingExample />,
};

export const SignIn = {
  render: () => <SignInExample />,
};

export const SignUp = {
  render: () => <SignUpExample />,
};

export const SimpleSignUp = {
  render: () => <SimpleSignUpExample />,
};

export const SingleFormField = {
  render: () => <SingleFormFieldExample />,
};

export const Sort = {
  render: () => <SortExample />,
};
