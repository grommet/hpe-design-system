import { Box, NameValueList, NameValuePair } from 'grommet';
import type { RecordModel } from 'pocketbase';
import { formatDate, formatRelativeTime } from '../../../utils';

interface AssessmentSummaryProps {
	assessment: RecordModel;
}

export const AssessmentSummary = ({
	assessment,
	...rest
}: AssessmentSummaryProps) => {
	const { theme, theme_package } = assessment.expand || {};
	const assessmentDate = new Date(assessment.assessment_date);

	return (
		<Box gap="medium" {...rest}>
			<NameValueList
				layout="grid"
				columns={{ count: 'fit', size: ['auto', 'small'] }}
				pairProps={{ direction: 'column' }}
			>
				<NameValuePair name="Last assessed">
					{formatRelativeTime(assessmentDate)}
					{' - '}
					{formatDate({
						utc: assessment.assessment_date,
						options: { dateStyle: 'long' },
					})}
				</NameValuePair>
				<NameValuePair name="Type">{assessment.type}</NameValuePair>
				<NameValuePair name="Theme">{theme.name}</NameValuePair>
				<NameValuePair name="Theme package">
					{theme_package.name}, {theme_package.version}
				</NameValuePair>
			</NameValueList>
			{/* <RoutedAnchor
				label={`View all ${team.name} assessments`}
				href={`/assessments?team_id=${team.id}`}
				icon={<Next />}
				reverse
			/> */}
		</Box>
	);
};
