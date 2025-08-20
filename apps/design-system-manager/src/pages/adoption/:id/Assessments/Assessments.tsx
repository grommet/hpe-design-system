import { Box, Data, List, type BoxProps } from 'grommet';
import type { RecordModel } from 'pocketbase';
import { AssessmentListItem } from './AssessmentListItem';

interface AssessmentsProps {
	data: RecordModel[]; // Replace with the actual type of your data
	loading: BoxProps['skeleton'];
}

export const Assessments = ({ data, loading }: AssessmentsProps) => {
	return (
		<Box skeleton={loading}>
			<Data data={data}>
				<List defaultItemProps={{ pad: { vertical: 'small' } }}>
					{(item: RecordModel) => <AssessmentListItem assessment={item} />}
				</List>
			</Data>
		</Box>
	);
};
