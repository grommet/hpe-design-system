/* eslint-disable react/prop-types */
import { Box, Button, Drop } from 'grommet';
import { Close } from 'grommet-icons';

export const Popover = ({
  a11yTitle,
  title,
  children,
  footer,
  target,
  onClose,
  ...rest
}) => {
  return (
    <Drop
      role="dialog"
      aria-label="popover"
      elevation="medium"
      stretch={false}
      target={target}
      onClose={onClose}
      onEsc={onClose}
      // need this for drop to control focus
      restrictFocus
      {...rest}
    >
      <Box
        gap="3xsmall"
        pad={{ vertical: "xsmall", left: "xsmall", right: "3xsmall" }}
        direction="row"
      >
        <Box flex gap="xsmall">
          {title}
          {children}
          {footer}
        </Box>
        <Button
          size="small"
          icon={<Close aria-hidden size="small" />}
          onClick={onClose}
          autoFocus
          alignSelf="start"
          // need to align with text
          margin={{ top: '-2px' }}
          a11yTitle={
            a11yTitle ||
            `You are in a popover,
            to close this popover, press Enter or Esc.`
          }
        />
      </Box>
    </Drop>
  );
};
