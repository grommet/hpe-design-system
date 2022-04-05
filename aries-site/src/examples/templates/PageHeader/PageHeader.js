import PropTypes from 'prop-types';
import { Header, Heading } from 'grommet';

export const PageHeader = ({ title, actions, ...rest }) => (
  <Header {...rest}>
    <Heading level={1} margin="none" size="small">
      {title}
    </Heading>
    {actions}
  </Header>
);

PageHeader.propTypes = {
  actions: PropTypes.oneOfType([PropTypes.node]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};
