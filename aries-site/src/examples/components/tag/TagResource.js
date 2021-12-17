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
import { details, tags } from '.';

const Section = ({ ...rest }) => <Box gap="medium" flex={false} {...rest} />;

const SectionHeader = ({ heading }) => (
  <Box border="bottom" pad={{ bottom: 'small' }} flex={false}>
    <Heading level={2} margin="none" size="small">
      {heading}
    </Heading>
  </Box>
);

const SectionDetails = ({ data }) => (
  <NameValueList valueProps={{ width: ['auto', 'medium'] }}>
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
    <Box alignSelf="center" gap="large" pad="medium" flex={false}>
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
