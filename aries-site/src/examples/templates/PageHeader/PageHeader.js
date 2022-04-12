import { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Header,
  Heading,
  Menu,
  Paragraph,
  ResponsiveContext,
} from 'grommet';
import { More } from 'grommet-icons';

export const PageHeader = ({
  title,
  subtitle,
  actions,
  contextualNav,
  ...rest
}) => {
  const size = useContext(ResponsiveContext);

  return (
    <Header direction="column" align="stretch" gap="small" {...rest}>
      <Box align="start">{contextualNav}</Box>
      <Box align="start" direction="row" gap="small" justify="between">
        <Box gap="xsmall">
          <Heading level={1} margin="none" size="small">
            {title}
          </Heading>
          {typeof subtitle === 'string' ? (
            <Paragraph margin="none" size="large">
              {subtitle}
            </Paragraph>
          ) : (
            <>{subtitle}</>
          )}
        </Box>
        <Box direction="row" gap="small">
          {!['xsmall', 'small'].includes(size) ? (
            actions.map(action => (
              <Box flex={false}>
                <Button {...action} />
              </Box>
            ))
          ) : (
            <Menu
              icon={<More />}
              dropAlign={{
                top: 'bottom',
                right: 'right',
              }}
              items={actions}
            />
          )}
        </Box>
      </Box>
    </Header>
  );
};

PageHeader.propTypes = {
  actions: PropTypes.oneOfType([PropTypes.node]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  contextualNav: PropTypes.node,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};
