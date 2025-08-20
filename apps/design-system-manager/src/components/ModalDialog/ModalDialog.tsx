import { Box, Layer, type LayerProps } from 'grommet';
import { LayerHeader } from '../Layer';

interface ModalDialogProps {
	children: React.ReactNode;
	title?: string;
	subtitle?: string;
	onClose?: () => void;
	layerProps?: LayerProps;
}

export const ModalDialog = ({
	children,
	title,
	subtitle,
	onClose,
	...layerProps
}: ModalDialogProps) => {
	return (
		<Layer {...layerProps}>
			<Box gap="medium" pad="medium" width={{ min: 'medium' }} flex="grow">
				<LayerHeader title={title} subtitle={subtitle} onClose={onClose} />
				{children}
			</Box>
		</Layer>
	);
};
