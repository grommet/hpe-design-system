import {
	ContentContainer,
	Identifier,
	RoutedButton,
} from '../../../../components';
import type { RecordModel } from 'pocketbase';
import { formatDate, formatRelativeTime } from '../../../../utils';
import { Next } from 'grommet-icons';
import { Grid, Text } from 'grommet';

interface AssessmentListItemProps {
	assessment: RecordModel;
}

export const AssessmentListItem = ({ assessment }: AssessmentListItemProps) => {
	const { assessment_date, expand, type, updated } = assessment;
	const { theme } = expand ?? {};

  const formattedAssessmentDate = formatDate({
    utc: assessment_date,
    options: { dateStyle: 'long' },
  });

	return (
		<RoutedButton
			a11yTitle={`View ${type} ${formattedAssessmentDate}`}
			href={`/adoption/assessments/${assessment.id}`}
		>
			<ContentContainer
				direction="row"
				justify="between"
				align="center"
				gap="small"
        hoverIndicator
        onClick={() => {}}
			>
				<Grid
					columns={{ count: 'fit', size: ['auto', 'small'] }}
					fill
					align="end"
				>
					<Identifier
						heading={formattedAssessmentDate}
						level={3}
						pretitle={type}
					/>
					<Text>{theme.name}</Text>
					<Text>Last updated: {formatRelativeTime(new Date(updated))}</Text>
				</Grid>
				<Next color="brand" />
			</ContentContainer>
		</RoutedButton>
	);
};
