import { Header } from "grommet";
import { LinkNext } from 'grommet-icons';
import { ContentContainer, Identifier, RoutedButton } from '../../components';
import type { ReactNode } from "react";

export interface HubItemProps {
	fill?: boolean;
	href: string;
	icon?: ReactNode;
	label: string;
}

export const HubItem = ({ href, label, icon, fill }: HubItemProps) => {
	return (
		<RoutedButton href={href} plain>
			{({hover}) => 
			<ContentContainer
				as="section"
				elevation={hover ? 'small' : undefined}
				fill={fill}
			>
				<Header>
					<Identifier heading={label} level={1} size="small" icon={icon} />
					<LinkNext aria-hidden="true" color="brand" />
				</Header>
			</ContentContainer>}
		</RoutedButton>
	);
}