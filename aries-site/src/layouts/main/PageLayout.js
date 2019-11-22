import React from 'react';
import PropTypes from 'prop-types';

import { Layout } from './Layout';
import { MainContent } from '../content';


export const PageLayout = ({ children, title }) => (
  <Layout title={title}>
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
