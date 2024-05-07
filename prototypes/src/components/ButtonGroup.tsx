import React from "react";
import { Box } from "grommet";

export const ButtonGroup = ({
  children,
  ...rest
}: {
  children: React.ReactNode;
}) => {
  return (
    <Box direction="row" gap="small" {...rest}>
      {children}
    </Box>
  );
};
