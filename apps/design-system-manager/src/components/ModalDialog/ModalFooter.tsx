import { Footer } from "grommet";

interface ModalFooterProps {
  children: React.ReactNode;
}

export const ModalFooter = ({ children, ...boxProps }: ModalFooterProps) => {
	return <Footer justify="end" gap="small" {...boxProps}>{children}</Footer>;
};
