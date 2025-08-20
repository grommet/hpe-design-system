import { Box, Text } from "grommet";
import { Lock } from "grommet-icons";


export const EmailPrivate = ({ email }: { email: string }) => {
  return email ? (
    <Text>{email}</Text>
  ) : (
    <Box direction="row" gap="xsmall">
      <Lock height="medium" />
      <Text color="text-weak">Private</Text>
    </Box>
  );
}