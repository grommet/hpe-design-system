/* eslint-disable react/prop-types */
import { Box, Button, Drop } from 'grommet';
import { Close } from 'grommet-icons';

export const Popover = ({
  a11yTitle,
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
        {/* // see if we have a close t shirt size for the 8 px */}
        {/* // have xsmall for right or small none cuts off focus   */}
        <Box pad={{ right: 'xsmall', top: '8px' }}>
          <Button
            size="small"
            icon={<Close size="small" />}
            onClick={onClose}
            autoFocus
            a11yTitle={
              { a11yTitle } ||
              `You are in a popover,
            to close this popover, press Enter.`
            }
          />
        </Box>
      </Box>
    </Drop>
  );
};
