import { Box } from "grommet";

interface ModalBodyProps {
  children: React.ReactNode;
}

export const ModalBody = ({ children, ...boxProps }: ModalBodyProps) => {
	return <Box {...boxProps}>{children}</Box>;
};
