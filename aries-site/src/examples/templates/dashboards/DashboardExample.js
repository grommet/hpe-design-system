import React from 'react';
import { DashboardTiles } from '.';
import { AppHeaderExample, PageHeaderExample, ScreenContainer } from '..';

export const DashboardExample = ({ ...rest }) => {
  return (
    <ScreenContainer {...rest}>
      <AppHeaderExample />
      <PageHeaderExample title="Controls" />
      <DashboardTiles />
    </ScreenContainer>
  );
};
