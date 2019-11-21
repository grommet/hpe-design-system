import React from 'react';
import { Text } from 'grommet';
import PropTypes from 'prop-types';

import { Layout } from './Layout';
import { MainContent } from '../content';
import { SideBar } from '../navigation';

export const PageLayout = ({ children, title }) => (
  <Layout title={title}>
    <SideBar>
      <Text>Secondary Nav</Text>
    </SideBar>
    <MainContent>{children}</MainContent>
  </Layout>
);

PageLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  title: PropTypes.string,
};

PageLayout.defaultProps = {
  title: undefined,
};
