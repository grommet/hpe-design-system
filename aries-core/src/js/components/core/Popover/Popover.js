import { Box, Button, Drop } from 'grommet';
import PropTypes from 'prop-types';
import { FormClose } from 'grommet-icons';

export const Popover = ({
  title,
  children,
  footer,
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
      target={targetRef?.current}
      onClose={onClose}
      {...rest}
    >
      <Box direction="row">
        <Box flex gap="small" pad="small">
          {title}
          {children}
          {footer}
        </Box>
        <Box pad={{ horizontal: 'small', top: 'xsmall' }}>
          <Button
            icon={<FormClose />}
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
  title: PropTypes.node,
  footer: PropTypes.node,
  onClose: PropTypes.func,
  targetRef: PropTypes.func,
};
