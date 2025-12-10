import React from 'react';
/* eslint-disable max-len */
import { SimpleSignUpExample } from 'aries-site/src/examples/templates/forms/SimpleSignUpExample';
import { SortExample } from 'aries-site/src/examples/templates/forms/SortExample';
import { SingleFormFieldExample } from 'aries-site/src/examples/templates/forms/SingleFormFieldExample';
import { SignUpExample } from 'aries-site/src/examples/templates/forms/SignUpExample';
import { SignInExample } from 'aries-site/src/examples/templates/forms/SignInExample';
import { ShippingExample } from 'aries-site/src/examples/templates/forms/ShippingExample';
import { SettingsExample } from 'aries-site/src/examples/templates/forms/SettingsExample';
import { PayExample } from 'aries-site/src/examples/templates/forms/PayExample';
import { RequiredFieldsExample } from 'aries-site/src/examples/templates/forms/RequiredFieldsExample';
import { CustomizeExample } from 'aries-site/src/examples/templates/forms/CustomizeExample';
import { CharacterCounterExample } from 'aries-site/src/examples/templates/forms/CharacterCounterExample';
import { ChangePasswordExample } from 'aries-site/src/examples/templates/forms/ChangePasswordExample';

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
