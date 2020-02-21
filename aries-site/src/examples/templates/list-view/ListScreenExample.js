import React from 'react';
import PropTypes from 'prop-types';
import { StyledList } from '.';
import { AppHeaderExample, PageHeaderExample, ScreenContainer } from '..';

export const ListScreenExample = ({ mobile }) => {
  return (
    <ScreenContainer mobile={mobile}>
      <AppHeaderExample />
      <PageHeaderExample title="User Controls" />
      <StyledList />
    </ScreenContainer>
  );
};

ListScreenExample.propTypes = {
  mobile: PropTypes.bool,
};
