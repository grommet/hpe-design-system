import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Heading,
  NameValuePair,
  NameValueList,
  Tag,
  Text,
} from 'grommet';
import { FormPrevious, More } from 'grommet-icons';

const details = {
  name: {
    displayName: 'Name',
    value: 'store-C-3PO',
  },
  model: {
    displayName: 'Model',
    value: 'Aruba 530 32930F',
  },
  type: {
    displayName: 'Type',
    value: 'Gateway',
  },
  partNumber: {
    displayName: 'Part Number',
    value: 'JL258A',
  },
  serialNumber: {
    displayName: 'Serial Number',
    value: '381503203862',
  },
  macAddress: {
    displayName: 'MAC Address',
    value: '38:17:C7:B8:90210',
  },
  ipAddress: {
    displayName: 'IP Address',
    value: '172.16.255.321.8',
  },
  location: {
    displayName: 'Location',
    value: 'Atlanta, Georgia',
  },
  firmwareVersion: {
    displayName: 'Firmware Version',
    value: 'v.2.0',
  },
};

const assignment = {
  application: {
    displayName: 'Application',
    value: 'ClearPass Device Insight',
  },
  applicationIstance: {
    displayName: 'Application Instance',
    value: 'US-West-1',
  },
};

const subscription = {
  subscriptionKey: {
    displayName: 'Subscription Key',
    value: 'ENXYQZJTPTUSETBY',
  },
  expirationDate: {
    displayName: 'Expiration Date',
    value: 'July 5, 2022',
  },
  subscriptionTier: {
    displayName: 'Subscription Tier',
    value: 'Aruba Airwave 25 Device License LTE E-LTU',
  },
  warrantyStart: {
    displayName: 'Warranty Start',
    value: 'July 5, 2021',
  },
  warrantyEnd: {
    displayName: 'Warranty End',
    value: 'July 4, 2021',
  },
};

const tags = {
  department: {
    displayName: 'Department',
    value: 'Finance',
  },
  timezone: {
    displayName: 'Timezone',
    value: 'MT',
  },
  location: {
    displayName: 'Location',
    value: 'FTC_DC',
  },
  environment: {
    displayName: 'Environment',
    value: 'Test',
  },
  application: {
    displayName: 'Application',
    value: 'MyApp',
  },
};

const Section = ({ ...rest }) => <Box gap="medium" flex={false} {...rest} />;

const SectionHeader = ({ heading }) => (
  <Box border="bottom" pad={{ bottom: 'small' }} flex={false}>
    <Heading level={2} margin="none" size="small">
      {heading}
    </Heading>
  </Box>
);

const SectionDetails = ({ data }) => (
  <NameValueList>
    {Object.entries(data).map(([name, value]) => (
      <NameValuePair key={name} name={value.displayName}>
        {value.value}
      </NameValuePair>
    ))}
  </NameValueList>
);

export const TagResource = () => (
  <Box width={{ max: 'xxlarge' }} margin="auto" overflow="auto" fill>
    <Box align="start" pad="medium">
      <Button label="Devices" icon={<FormPrevious />} />
    </Box>
    <Box alignSelf="center" width="large" gap="large" pad="medium" flex={false}>
      <Box
        border="bottom"
        align="start"
        direction="row"
        justify="between"
        pad={{ bottom: 'large' }}
        flex={false}
      >
        <Box>
          <Heading size="small" margin="none">
            Store C-3P0
          </Heading>
          <Text size="large">Aruba 530 32930F</Text>
        </Box>
        <Button icon={<More />} />
      </Box>
      <Section>
        <SectionHeader heading="Details" />
        <SectionDetails data={details} />
      </Section>
      <Section>
        <SectionHeader heading="Assignment" />
        <SectionDetails data={assignment} />
      </Section>
      <Section>
        <SectionHeader heading="Subscription" />
        <SectionDetails data={subscription} />
      </Section>
      <Section>
        <SectionHeader heading="Tags" />
        <Box direction="row" gap="small" wrap>
          {Object.entries(tags).map(([, value]) => (
            <Tag
              name={value.displayName}
              value={value.value}
              margin={{ bottom: 'small' }}
            />
          ))}
        </Box>
      </Section>
    </Box>
  </Box>
);

SectionHeader.propTypes = {
  heading: PropTypes.string,
};

SectionDetails.propTypes = {
  data: PropTypes.shape({
    displayName: PropTypes.string,
    value: PropTypes.string,
  }),
};
