import { Text } from 'grommet';

export const identityProvider = [
  {
    align: 'start',
    name: (
      <Text size="small" weight={500}>
        Domain Name
      </Text>
    ),
    value: <Text color="text-strong">att.com</Text>,
  },
  {
    name: (
      <Text size="small" weight={500}>
        Entity ID
      </Text>
    ),
    value: <Text color="text-strong">https://att.com/simplesaml/saml2</Text>,
  },
  {
    name: (
      <Text size="small" weight={500}>
        Login URL
      </Text>
    ),
    value: (
      <Text color="text-strong">
        https://att.com/simplesaml/saml2/SSOService
      </Text>
    ),
  },
  {
    name: (
      <Text size="small" weight={500}>
        Logout URL
      </Text>
    ),
    value: (
      <Text color="text-strong">https://att.com/adsf/ls/?wa=signout1.0</Text>
    ),
  },
];

export const attributesMapping = [
  {
    name: (
      <Text size="small" weight={500}>
        Email_Address
      </Text>
    ),
    value: <Text color="text-strong">email address</Text>,
  },
  {
    name: (
      <Text size="small" weight={500}>
        First_Name
      </Text>
    ),
    value: <Text color="text-strong">first name</Text>,
  },
  {
    name: (
      <Text size="small" weight={500}>
        Last_Name
      </Text>
    ),
    value: <Text color="text-strong">last name</Text>,
  },
];

export const enforcementPolicies = [
  {
    name: (
      <Text size="small" weight={500}>
        Policy 1
      </Text>
    ),
    value: <Text color="text-strong">My Enforcement Policy</Text>,
  },
  {
    name: (
      <Text size="small" weight={500}>
        Policy 2
      </Text>
    ),
    value: <Text color="text-strong">My Enforcement Policy</Text>,
  },
  {
    name: (
      <Text size="small" weight={500}>
        Policy 3
      </Text>
    ),
    value: <Text color="text-strong">My Enforcement Policy</Text>,
  },
  {
    name: (
      <Text size="small" weight={500}>
        Policy 4
      </Text>
    ),
    value: <Text color="text-strong">My Enforcement Policy</Text>,
  },
  {
    name: (
      <Text size="small" weight={500}>
        Policy 5
      </Text>
    ),
    value: <Text color="text-strong">My Enforcement Policy</Text>,
  },
  {
    name: (
      <Text size="small" weight={500}>
        Policy 6
      </Text>
    ),
    value: <Text color="text-strong">My Enforcement Policy</Text>,
  },
];

export const columns = [{ property: 'name' }, { property: 'value' }];
