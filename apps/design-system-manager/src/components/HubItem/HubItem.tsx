import { Header } from "grommet";
import { LinkNext } from 'grommet-icons';
import { ContentContainer, Identifier, RoutedButton } from '../../components';
import type { ReactNode } from "react";

export interface HubItemProps {
	href: string;
	label: string;
	icon?: ReactNode;
}

export const HubItem = ({ href, label, icon }: HubItemProps) => {
	return (
		<RoutedButton href={href} plain>
			{({hover}) => 
			<ContentContainer
				as="section"
				tabIndex={-1}
				elevation={hover ? 'small' : undefined}
			>
				<Header>
					<Identifier heading={label} level={1} size="small" icon={icon} />
					<LinkNext color="brand" />
				</Header>
			</ContentContainer>}
		</RoutedButton>
	);
}