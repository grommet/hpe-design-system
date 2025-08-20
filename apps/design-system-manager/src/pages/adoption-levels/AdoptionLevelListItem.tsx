import { Box } from 'grommet';
import { Next } from 'grommet-icons';
import type { RecordModel } from 'pocketbase';
import { Identifier, RoutedButton } from '../../components';

interface AdoptionLevelListItemProps {
	level: RecordModel;
}

export const AdoptionLevelListItem = ({
	level,
}: AdoptionLevelListItemProps) => {
	return (
		<RoutedButton
			a11yTitle={`View ${level.name}`}
			href={`/adoption-levels/${level.id}`}
		>
			<Box
				direction="row"
				align="center"
				background="background-front"
				elevation="xsmall"
				pad={{ vertical: 'small', horizontal: 'medium' }}
				round="small"
				hoverIndicator
				onClick={() => {}}
			>
				<Identifier
					heading={level.name}
					level="2"
					size="small"
					description={level.description}
					icon={level.icon}
					flex
				/>
				<Next color="brand" aria-hidden={true} />
			</Box>
		</RoutedButton>
	);
};
