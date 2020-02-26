import React from 'react';
import { StyledList } from '.';
import { AppHeaderExample, PageHeaderExample, ScreenContainer } from '..';

export const ListScreenExample = ({ ...rest }) => {
  return (
    <ScreenContainer {...rest}>
      <AppHeaderExample />
      <PageHeaderExample title="User Controls" />
      <StyledList />
    </ScreenContainer>
  );
};
