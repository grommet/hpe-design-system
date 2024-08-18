import { Box, Button, Drop, Heading } from 'grommet';
import { Close } from 'grommet-icons';

const align = { top: 'bottom', left: 'left' };

const PopoverHeading = ({ heading, onClose }) => (
  <Box align='center' justify="between" direction="row">
    <Heading size="small" level={2} margin="none">
      {heading}
    </Heading>
    <Button
      icon={<Close size="small" />}
      onClick={onClose}
      a11yTitle={`You are in a popover containing... To close this popover,
      press Enter.`}
      autoFocus
    />
  </Box>
);

export const Popover = ({
  heading,
  children,
  body,
  footer,
  targetRef,
  onClose,
  ...rest
}) => {
  return (
    <Drop
      round="xxsmall"
      elevation="medium"
      stretch={false}
      align={align}
      target={targetRef?.current}
      onClose={onClose}
      {...rest}
    >
      <Box flex gap="small" pad="small">
        <PopoverHeading onClose={onClose} heading={heading} />
        {children}
        {footer}
      </Box>
    </Drop>
  );
};
