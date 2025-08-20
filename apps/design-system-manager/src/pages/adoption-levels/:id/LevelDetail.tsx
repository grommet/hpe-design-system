import { Box, Data, NameValueList, NameValuePair } from 'grommet';
import PocketBase, { type RecordModel } from 'pocketbase';
import { useCallback } from 'react';
import { useCollection } from '../../../hooks';
import { ContentPane } from '../../../components';
import { ListView } from './ListView';

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

interface LevelDetailProps {
	level: RecordModel;
}

export const LevelDetail = ({ level, ...rest }: LevelDetailProps) => {
	const getFeatures = useCallback(
		() =>
			pb.collection('features').getFullList({
				filter: `adoption_level_id = "${level.id}"`,
				sort: 'category_id.name,name',
				expand: 'adoption_level_id,category_id',
			}),
		[level.id],
	);
	const { data } = useCollection({
		collection: 'features',
		method: getFeatures,
	});
	const features = data as RecordModel[];

	return (
		<Box gap="large" pad={{ vertical: 'medium' }} {...rest}>
			<ContentPane>
				<NameValueList nameProps={{ width: { min: 'xxsmall', max: 'xsmall' } }}>
					<NameValuePair name="Objective">{level.objective}</NameValuePair>
					<NameValuePair name="Examples">{level.examples}</NameValuePair>
				</NameValueList>
			</ContentPane>
			<ContentPane heading="Features" level={2} contained={false}>
				<Data data={features} toolbar>
					<ListView />
				</Data>
			</ContentPane>
		</Box>
	);
};
