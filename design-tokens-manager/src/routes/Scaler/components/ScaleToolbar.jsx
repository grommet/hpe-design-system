import { Box, Button } from 'grommet';
import { Sidebar } from 'grommet-icons';
import { CopyButton } from '../../../components/CopyButton';

export const ScaleToolbar = ({ scale, open, setOpen, ...rest }) => {
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
