import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Header, Heading } from 'grommet';

import { PageContainerContext } from '../../page-layouts';

export const PageHeader = ({ title }) => {
  const { ...pageContainer } = useContext(PageContainerContext);
  return (
    <Header {...pageContainer}>
      <Heading level={1} margin="none" size="small">
        {title}
      </Heading>
    </Header>
  );
};

PageHeader.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};
