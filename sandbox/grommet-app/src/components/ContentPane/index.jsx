import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Header, Heading } from 'grommet';
import { BackgroundContext } from '../../App';
// import { skeleton as skeletonAnimation } from '../../dashboard/components/utils/animations'

const ContentPane = ({
  actions,
  children,
  contain: containProp,
  heading,
  level,
  skeleton,
  ...rest
}) => {
  const { backgroundBack } = useContext(BackgroundContext);
  const contain = containProp || backgroundBack;

  return (
    <Box
      gap="medium"
      background={contain ? 'background-front' : undefined}
      pad={contain ? { horizontal: 'medium', vertical: 'medium' } : undefined}
      elevation={contain ? 'medium' : undefined}
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
        // skeleton={skeleton ? skeletonAnimation : undefined}
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
