import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, PageHeader, NameValueList, NameValuePair } from 'grommet';
import { FormPrevious } from 'grommet-icons';

export const PageHeaderSubtitle = ({ bestPractice = true }) => (
  <PageHeader
    title="Order 201928"
    subtitle={bestPractice ? <SubtitleBestPractice /> : <SubtitleBadPractice />}
    parent={<Anchor label="Orders" icon={<FormPrevious />} />}
  />
);

PageHeaderSubtitle.propTypes = {
  bestPractice: PropTypes.bool,
};

const SubtitleBestPractice = () => (
  <NameValueList nameProps={{ width: 'xsmall' }} gap="none">
    <NameValuePair name="Created On">05/05/2020</NameValuePair>
  </NameValueList>
);

const SubtitleBadPractice = () => (
  <NameValueList
    nameProps={{ width: 'xsmall' }}
    valueProps={{ width: 'xsmall' }}
    pairProps={{ direction: 'column' }}
    layout="grid"
  >
    <NameValuePair name="Status">In Transit</NameValuePair>
    <NameValuePair name="Created On">05/05/2020</NameValuePair>
    <NameValuePair name="Created By">Jane Doe</NameValuePair>
  </NameValueList>
);