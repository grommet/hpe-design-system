import { Box, Button, Drop } from 'grommet';
import PropTypes from 'prop-types';
import { Close } from 'grommet-icons';

export const Popover = ({
  heading,
  children,
  footer,
  // eslint-disable-next-line react/prop-types
  targetRef,
  onClose,
  ...rest
}) => {
  return (
    <Drop
      round="xxsmall"
      role="dialog"
      elevation="medium"
      stretch={false}
      // eslint-disable-next-line react/prop-types
      target={targetRef?.current}
      onClose={onClose}
      {...rest}
    >
      <Box direction='row'>
        <Box flex gap="small" pad="small">
          {heading}
          {children}
          {footer}
        </Box>
        <Box pad="small">
          <Button
            icon={<Close size="small" />}
            onClick={onClose}
            a11yTitle={`You are in a popover containing information,
            to close this popover, press Enter.`}
            autoFocus
          />
        </Box>
      </Box>
    </Drop>
  );
};

Popover.propTypes = {
  children: PropTypes.node,
  heading: PropTypes.node,
  footer: PropTypes.node,
  onClose: PropTypes.func,
};
