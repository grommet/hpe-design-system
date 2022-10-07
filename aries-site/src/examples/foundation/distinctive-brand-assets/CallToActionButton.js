import { Box, Button } from 'grommet';

export const CallToActionButton = () => {
  return (
    <Box align="center" gap="medium">
      <Button kind="cta-primary" label="Take a test drive" />
      <Button kind="cta-alternate" label="Take a test drive" />
    </Box>
  );
};
