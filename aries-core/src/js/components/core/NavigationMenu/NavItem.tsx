import { Box, Button, Text } from 'grommet';

interface ActiveMarkerProps {
  active: boolean | undefined;
  hover: boolean | undefined;
}

const ActiveMarker = ({ active, hover }: ActiveMarkerProps) => {
	return (
		<Box
			background={
				active
					? hover
						? 'background-primary-strong-hover'
						: 'background-primary-strong'
					: undefined
			}
			fill="vertical"
			pad={{ left: '4px' }}
			round
		/>
	);
};

interface ItemLabelProps {
	icon: React.ReactNode;
	label: string;
}

const ItemLabel = ({ icon, label }: ItemLabelProps) => {
	return (
		<Box direction="row" align="center" gap="xsmall" flex>
			{icon}
			<Text color="text-strong">{label}</Text>
		</Box>
	);
};

interface ItemContainerProps {
	active: boolean | undefined;
	children: React.ReactNode;
	hover: boolean;
}

const ItemContainer = ({ active, children, hover, ...rest }: ItemContainerProps) => {
	return (
		<Box
			direction="row"
			background={active ? 'background-active' : undefined}
			round="xsmall"
      {...rest}
		>
			<Box
				direction="row"
				align="center"
				background={hover ? 'background-hover' : undefined}
				gap="xsmall"
				pad={{ vertical: 'xsmall', left: 'xsmall', right: 'small' }}
				round="xsmall"
				flex
			>
        <ActiveMarker active={active} hover={hover} />
				{children}
			</Box>
		</Box>
	);
};

export type NavItemType = {
  label: string;
  url?: string;
  icon?: React.ReactNode;
  children?: NavItemType[];
};

interface NavItemProps {
	active?: boolean;
	actions?: React.ReactNode;
	children?: React.ReactNode;
	url?: string;
	icon?: React.ReactNode;
	label: string;
	onClick?: () => void;
	[key: string]: unknown; // For additional props like 'id', 'aria-label', etc.
}

export const NavItem = ({
	active,
	actions,
	children,
	url,
	icon,
	label,
	onClick,
	...rest
}: NavItemProps) => {
	return (
		<Box tabIndex={-1} {...rest}>
			<Button role="menuitem" href={url} plain onClick={onClick}>
				{({ hover }) => {
					return (
						<ItemContainer active={active} hover={hover}>
							<ItemLabel icon={icon} label={label} />
							{actions}
						</ItemContainer>
					);
				}}
			</Button>
			{children}
		</Box>
	);
};
