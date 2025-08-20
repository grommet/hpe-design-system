import { Header } from "grommet";
import { LinkNext } from 'grommet-icons';
import { ContentContainer, Identifier, RoutedButton } from '../../components';
import type { ReactNode } from "react";

export interface HubItemProps {
	fill?: boolean;
	href: string;
	icon?: ReactNode;
	label: string;
	level?: 1 | 2 | 3 | 4 | 5 | 6;
	size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
}

export const HubItem = ({ fill, href, icon, label, level = 1, size = 'small' }: HubItemProps) => {
	return (
		<RoutedButton href={href} plain>
			{({hover}) => 
			<ContentContainer
				as="section"
				elevation={hover ? 'small' : undefined}
				fill={fill}
			>
				<Header align="start">
					<Identifier heading={label} level={level} size={size} icon={icon} />
					<LinkNext aria-hidden="true" color="brand" />
				</Header>
			</ContentContainer>}
		</RoutedButton>
	);
}