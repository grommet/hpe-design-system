import PropTypes from 'prop-types';
import { Box, Header, Heading, Paragraph } from 'grommet';

export const PageHeader = ({ title, subtitle, actions, ...rest }) => (
  <Header {...rest}>
    <Box>
      <Heading level={1} margin="none" size="small">
        {title}
      </Heading>
      {typeof subtitle === 'string' ? (
        <Paragraph margin="none">{subtitle}</Paragraph>
      ) : (
        subtitle
      )}
    </Box>
    {actions}
  </Header>
);

PageHeader.propTypes = {
  actions: PropTypes.oneOfType([PropTypes.node]),
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  title: PropTypes.string,
};
