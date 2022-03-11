import PropTypes from 'prop-types';
import { Header, Heading } from 'grommet';

export const PageHeader = ({ title }) => (
  <Header>
    <Heading level={1} margin="none" size="small">
      {title}
    </Heading>
  </Header>
);

PageHeader.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};
