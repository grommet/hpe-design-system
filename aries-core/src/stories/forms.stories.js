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

export const ChangePassword = () => <ChangePasswordExample />;
export const CharacterCounter = () => <CharacterCounterExample />;
export const Customize = () => <CustomizeExample />;
export const RequiredFields = () => <RequiredFieldsExample />;
export const Pay = () => <PayExample />;
export const Settings = () => <SettingsExample />;
export const Shipping = () => <ShippingExample />;
export const SignIn = () => <SignInExample />;
export const SignUp = () => <SignUpExample />;
export const SimpleSignUp = () => <SimpleSignUpExample />;
export const SingleFormField = () => <SingleFormFieldExample />;
export const Sort = () => <SortExample />;

export default {
  title: 'Forms',
};
