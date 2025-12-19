import React from 'react';
import PropTypes from 'prop-types';
import {
  Anchor,
  Box,
  Button,
  Heading,
  NameValuePair,
  NameValueList,
  Tag,
  Page,
  PageContent,
  PageHeader,
} from 'grommet';
import { Left } from '@hpe-design/icons-grommet';
import { ContentPane } from '../../../layouts';
import { details, tags } from '.';

const SectionDetails = ({ data }) => (
  <NameValueList
    nameProps={{ width: ['5xsmall', '3xsmall'] }}
    valueProps={{ width: ['auto', 'medium'] }}
  >
    {Object.entries(data).map(([name, value]) => (
      <NameValuePair key={name} name={value.displayName}>
        {value.value}
      </NameValuePair>
    ))}
  </NameValueList>
);

export const TagResource = () => (
  <Page kind="narrow">
    <PageContent gap="xsmall">
      <PageHeader
        title="Store C-3P0"
        subtitle="Aruba 530 32930F"
        parent={<Anchor icon={<Left />} label="Devices" />}
        actions={<Button label="Edit" primary />}
      />
      <Box gap="medium" flex={false}>
        <ContentPane gap="medium">
          <Heading level={2} margin="none">
            Detail
          </Heading>
          <SectionDetails data={details} />
        </ContentPane>
        <ContentPane gap="medium">
          <Heading level={2} margin="none">
            Tags
          </Heading>
          <Box direction="row" pad={{ vertical: 'xsmall' }} wrap>
            {tags.map((t, index) => {
              const [name] = Object.keys(t);
              const [value] = Object.values(t);
              return (
                <Tag
                  key={index}
                  name={name}
                  value={value}
                  margin={{ right: 'xsmall', vertical: '3xsmall' }}
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
        </ContentPane>
      </Box>
    </PageContent>
  </Page>
);

SectionDetails.propTypes = {
  data: PropTypes.shape({
    displayName: PropTypes.string,
    value: PropTypes.string,
  }),
};
