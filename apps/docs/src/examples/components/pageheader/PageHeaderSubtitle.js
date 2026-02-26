import React from 'react';
import PropTypes from 'prop-types';
import { PageHeader, NameValueList, NameValuePair } from 'grommet';
import { ReverseAnchor } from '../../templates';

export const PageHeaderSubtitle = ({ bestPractice = true }) => (
  <PageHeader
    title="Order 201928"
    subtitle={bestPractice ? <SubtitleBestPractice /> : <SubtitleBadPractice />}
    parent={<ReverseAnchor label="Orders" />}
  />
);

PageHeaderSubtitle.propTypes = {
  bestPractice: PropTypes.bool,
};

const SubtitleBestPractice = () => (
  <NameValueList nameProps={{ width: '3xsmall' }} gap="none">
    <NameValuePair name="Created on">05/05/2020</NameValuePair>
  </NameValueList>
);

const SubtitleBadPractice = () => (
  <NameValueList
    nameProps={{ width: '3xsmall' }}
    valueProps={{ width: '3xsmall' }}
    pairProps={{ direction: 'column' }}
    layout="grid"
  >
    <NameValuePair name="Status">In transit</NameValuePair>
    <NameValuePair name="Created on">05/05/2020</NameValuePair>
    <NameValuePair name="Created by">Jane Doe</NameValuePair>
  </NameValueList>
);
