import React from 'react';
import PropTypes from 'prop-types';
import {
  Anchor,
  Box,
  Button,
  Heading,
  NameValuePair,
  NameValueList,
  PageHeader,
  Tag,
  Text,
  Page,
  PageContent,
} from 'grommet';
import { FormPrevious, More } from 'grommet-icons';
import { details, tags } from '.';

function Section({ ...rest }) {
  return <Box gap="medium" flex={false} {...rest} />;
}

function SectionHeader({ heading }) {
  return <Box
    border={{ color: 'border-weak', side: 'bottom' }}
    pad={{ bottom: 'small' }}
    flex={false}
  >
    <Heading level={2} margin="none" size="small">
      {heading}
    </Heading>
  </Box>;
}

function SectionDetails({ data }) {
  return <NameValueList valueProps={{ width: ['auto', 'medium'] }}>
    {Object.entries(data).map(([name, value]) => (
      <NameValuePair key={name} name={value.displayName}>
        {value.value}
      </NameValuePair>
    ))}
  </NameValueList>;
}

export function TagResource() {
  return <Page kind="narrow">
    <PageContent gap="small">
      <Box gap="large" flex={false}>
        <PageHeader
          title="Store C-3PO"
          subtitle="Aruba 530 32930F"
          actions={<Button label="Edit" primary />}
          parent={<Anchor icon={<FormPrevious />} label="Devices" />}
          border={{ color: 'border-weak', side: 'bottom' }}
          pad={{ bottom: 'medium' }}
        />
        <Section>
          <SectionHeader heading="Details" />
          <SectionDetails data={details} />
        </Section>
        <Section gap="none">
          <SectionHeader heading="Tags" />
          <Box direction="row" pad={{ vertical: 'small' }} wrap>
            {tags.map((t, index) => {
              const [name] = Object.keys(t);
              const [value] = Object.values(t);
              return (
                <Tag
                  key={index}
                  name={name}
                  value={value}
                  margin={{ right: 'small', vertical: 'xsmall' }}
                  onClick={() =>
                    // eslint-disable-next-line no-alert
                    alert(
                      // eslint-disable-next-line max-len
                      `Clicking on '${name}: ${value}' tag could take a user to a filtered view displaying all devices with '${name}: ${value}' applied.`,
                    )
                  }
                />
              );
            })}
          </Box>
        </Section>
      </Box>
    </PageContent>
  </Page>;
}

SectionHeader.propTypes = {
  heading: PropTypes.string,
};

SectionDetails.propTypes = {
  data: PropTypes.shape({
    displayName: PropTypes.string,
    value: PropTypes.string,
  }),
};
