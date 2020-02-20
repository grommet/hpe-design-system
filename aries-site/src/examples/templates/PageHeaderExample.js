import React from 'react';
import PropTypes from 'prop-types';
import { Header, Heading, Button } from 'grommet';

export const PageHeaderExample = ({ title }) => (
  <Header>
    <Heading margin={{ vertical: 'medium' }} size="small">
      {title}
    </Heading>
    <Button label="Manage" primary />
  </Header>
);

PageHeaderExample.propTypes = {
  title: PropTypes.string,
};
