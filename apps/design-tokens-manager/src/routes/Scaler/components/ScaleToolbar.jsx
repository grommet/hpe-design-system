import { Box, Button } from 'grommet';
import { Sidebar } from '@hpe-design/icons-grommet';
import { CopyButton } from '../../../components/CopyButton';

export const ScaleToolbar = ({
  scale: scaleProp,
  settings,
  contentSizes,
  spacingSizes,
  open,
  setOpen,
  ...rest
}) => {
  const scale = {
    name: `${settings.base}-${settings.factor}-${settings.nearest}-${settings.steps}`,
    description: `${settings.base}px based scale at ${settings.factor} factor. Rounded to ${settings.nearest}px grid unit with ${settings.steps} steps`,
    settings: settings,
    scale: scaleProp,
    content: contentSizes,
    spacing: spacingSizes,
  };

  return (
    <Box gap="xsmall" flex={false} {...rest}>
      <Button
        tip={open ? 'Hide scale settings' : 'Open scale settings'}
        icon={<Sidebar aria-hidden="true" />}
        onClick={setOpen}
      />
      <CopyButton content={scale} tip="Copy scale to clipboard" />
    </Box>
  );
};
