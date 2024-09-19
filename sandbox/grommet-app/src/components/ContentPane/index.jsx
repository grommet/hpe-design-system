import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Header, Heading } from 'grommet';
import { BackgroundContext } from '../../App';

const ContentPane = ({
  actions,
  children,
  contain: containProp = true,
  heading,
  level,
  skeleton,
  ...rest
}) => {
  const { backgroundBack } = useContext(BackgroundContext);
  const contain = containProp !== false ? backgroundBack : undefined;

  return (
    <Box
      gap="medium"
      background={contain ? 'background-front' : undefined}
      pad={contain ? { horizontal: 'medium', vertical: 'medium' } : undefined}
      round={contain}
      {...rest}
    >
      {heading && (
        <Header>
          <Heading level={level} margin="none">
            {heading}
          </Heading>
          {actions}
        </Header>
      )}
      <Box
        skeleton={skeleton ? true : undefined}
        height={skeleton && skeleton.height}
      >
        {children}
      </Box>
    </Box>
  );
};

ContentPane.propTypes = {
  actions: PropTypes.node,
  children: PropTypes.node.isRequired,
  contain: PropTypes.bool,
  heading: PropTypes.string,
  level: PropTypes.number,
  skeleton: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      height: PropTypes.string,
    }),
  ]),
};

ContentPane.defaultProps = {
  actions: undefined,
  contain: undefined,
  skeleton: undefined,
};

export default ContentPane;
