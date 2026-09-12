// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import {
  Box,
  FormField,
  CheckBox,
  NameValueList,
  NameValuePair,
  RadioButtonGroup,
  Select,
  Text,
  TextInput,
  Wizard,
} from 'grommet';

const steps = [
  {
    id: 'account',
    title: 'General',
    description: 'Define the LDAP connection and directory structure.',
    render: () => (
      <Box width="medium">
        <FormField
          htmlFor="wizard-ldap-type"
          label="LDAP type"
          name="ldapType"
          required
        >
          <Select
            id="wizard-ldap-type"
            name="ldapType"
            options={['Open LDAP', 'Red Hat']}
          />
        </FormField>
        <FormField
          htmlFor="wizard-user-base-dn"
          label="User Base DN"
          name="userBaseDn"
          required
        >
          <TextInput
            id="wizard-user-base-dn"
            name="userBaseDn"
            placeholder="ou=users,dc=example,dc=com"
          />
        </FormField>
        <FormField
          htmlFor="wizard-dn-type"
          label="Configure Distinguished Name"
          name="dnType"
        >
          <RadioButtonGroup
            id="wizard-dn-type"
            name="dnType"
            options={['Groups DN', 'Accounts DN']}
          />
        </FormField>
        <FormField htmlFor="wizard-groups-dn" label="Groups DN" name="groupsDn">
          <TextInput
            id="wizard-groups-dn"
            name="groupsDn"
            placeholder="ou=groups,dc=example,dc=com"
          />
        </FormField>
      </Box>
    ),
    validate: value =>
      value.ldapType && value.userBaseDn
        ? true
        : 'Select an LDAP type and enter a User Base DN before continuing.',
  },
  {
    id: 'environment',
    title: 'Settings',
    description: 'Configure binding and virtual domain settings.',
    render: () => (
      <Box width="medium">
        <Text weight={500}>Binding</Text>
        <FormField
          htmlFor="wizard-sasl-mechanism"
          label="SASL Mechanism"
          name="saslMechanism"
        >
          <Select
            id="wizard-sasl-mechanism"
            name="saslMechanism"
            options={['None', 'GSSAPI', 'DIGEST-MD5']}
          />
        </FormField>
        <FormField
          htmlFor="wizard-kerberos-realm"
          label="Kerberos Realm"
          name="kerberosRealm"
        >
          <TextInput
            id="wizard-kerberos-realm"
            name="kerberosRealm"
            placeholder="EXAMPLE.COM"
          />
        </FormField>
        <FormField
          htmlFor="wizard-kerberos-server"
          label="Kerberos Server IP"
          name="kerberosServerIp"
        >
          <TextInput
            id="wizard-kerberos-server"
            name="kerberosServerIp"
            placeholder="192.0.2.10"
          />
        </FormField>
        <Text weight={500}>Virtual domain settings</Text>
        <FormField
          htmlFor="wizard-domain-attribute"
          label="Domain name attribute"
          name="domainNameAttribute"
        >
          <TextInput
            id="wizard-domain-attribute"
            name="domainNameAttribute"
            placeholder="sAMAccountName"
          />
        </FormField>
        <FormField
          htmlFor="wizard-domain-prefix"
          label="Domain name prefix"
          name="domainNamePrefix"
        >
          <TextInput
            id="wizard-domain-prefix"
            name="domainNamePrefix"
            placeholder="hpe\\"
          />
        </FormField>
      </Box>
    ),
  },
  {
    id: 'access',
    title: 'AuthN & AuthZ',
    description: 'Choose authentication and authorization options.',
    render: () => (
      <Box width="medium">
        <FormField
          htmlFor="wizard-authentication"
          label="Authentication method"
          name="authenticationMethod"
        >
          <RadioButtonGroup
            id="wizard-authentication"
            name="authenticationMethod"
            options={['Password', 'Kerberos']}
          />
        </FormField>
        <FormField
          htmlFor="wizard-authorization"
          label="Authorization groups"
          name="authorizationGroups"
        >
          <TextInput
            id="wizard-authorization"
            name="authorizationGroups"
            placeholder="hpe-admins, hpe-operators"
          />
        </FormField>
        <FormField htmlFor="wizard-use-tls" name="useTls">
          <CheckBox
            id="wizard-use-tls"
            name="useTls"
            label="Use TLS for the LDAP connection"
          />
        </FormField>
      </Box>
    ),
  },
  {
    id: 'review',
    title: 'Summary',
    description: 'Review the LDAP configuration before saving it.',
    render: (_step, { formValue }) => (
      <Box width="medium">
        <NameValueList>
          <NameValuePair name="LDAP type">
            {formValue.ldapType || '--'}
          </NameValuePair>
          <NameValuePair name="User Base DN">
            {formValue.userBaseDn || '--'}
          </NameValuePair>
          <NameValuePair name="Groups DN">
            {formValue.groupsDn || '--'}
          </NameValuePair>
          <NameValuePair name="SASL Mechanism">
            {formValue.saslMechanism || '--'}
          </NameValuePair>
          <NameValuePair name="Kerberos Realm">
            {formValue.kerberosRealm || '--'}
          </NameValuePair>
          <NameValuePair name="Kerberos Server IP">
            {formValue.kerberosServerIp || '--'}
          </NameValuePair>
          <NameValuePair name="Domain name attribute">
            {formValue.domainNameAttribute || '--'}
          </NameValuePair>
          <NameValuePair name="Domain name prefix">
            {formValue.domainNamePrefix || '--'}
          </NameValuePair>
          <NameValuePair name="Authentication">
            {formValue.authenticationMethod || '--'}
          </NameValuePair>
          <NameValuePair name="Authorization groups">
            {formValue.authorizationGroups || '--'}
          </NameValuePair>
          <NameValuePair name="TLS">
            {formValue.useTls ? 'Enabled' : 'Disabled'}
          </NameValuePair>
        </NameValueList>
      </Box>
    ),
  },
];

export const WizardCompletingComplexLinearFlowsExample = () => (
  <Box background="transparent" fill>
    <Wizard
      defaultValue={{
        authenticationMethod: 'Kerberos',
        authorizationGroups: 'hpe-admins, hpe-operators',
        domainNameAttribute: 'sAMAccountName',
        domainNamePrefix: 'hpe\\',
        dnType: 'Groups DN',
        groupsDn: 'ou=groups,dc=example,dc=com',
        kerberosRealm: 'EXAMPLE.COM',
        kerberosServerIp: '192.0.2.10',
        ldapType: 'Open LDAP',
        networkRegion: 'North America',
        privateNetwork: true,
        saslMechanism: 'GSSAPI',
        useTls: true,
        userBaseDn: 'ou=users,dc=example,dc=com',
      }}
      messages={{ complete: 'Create workspace' }}
      scrollToTop={false}
      showProgress="horizontal"
      steps={steps}
      title="Set up workspace"
    />
  </Box>
);