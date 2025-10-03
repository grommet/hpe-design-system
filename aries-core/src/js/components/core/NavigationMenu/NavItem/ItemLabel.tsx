import { Box, Text } from 'grommet';

interface ItemLabelProps {
  icon: React.ReactNode;
  label: string;
}

export const ItemLabel = ({ icon, label }: ItemLabelProps) => {
  return (
    <Box direction="row" align="center" gap="3xsmall" flex>
      {icon}
      <Text color="text-strong">{label}</Text>
    </Box>
  );
};
