import { Box, Button, Drop } from 'grommet';
import PropTypes from 'prop-types';
import { Close } from 'grommet-icons';

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
      <Box gap="small" direction="row">
        <Box flex gap="small" pad={{ vertical: 'small', left: 'small' }}>
          {/* do we like this format of passing in
           title children and footer? */}
          {title}
          {children}
          {footer}
        </Box>
        <Box pad={{ right: 'small', top: 'xsmall' }}>
          <Button
            icon={<Close size="small" />}
            onClick={onClose}
            // should we make this a message that the user passes in?
            // maybe we can have a default just incase they forget?
            a11yTitle={`You are in a popover containing information,
            to close this popover, press Enter.`}
            autoFocus
          />
        </Box>
      </Box>
    </Drop>
  );
};

// should we be still doing proptypes?
Popover.propTypes = {
  children: PropTypes.node,
  title: PropTypes.node,
  footer: PropTypes.node,
  onClose: PropTypes.func,
  targetRef: PropTypes.func,
};
