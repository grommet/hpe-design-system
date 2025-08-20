import { useContext, useEffect, useMemo, useState } from 'react';
import { List, DataContext, type DataProps, Box } from 'grommet';
import { groupFeaturesByAdoptionAndCategory } from '../../../../utils/groupFeatures';
import { ContentPane } from '../../../../components';
import type { RecordModel } from 'pocketbase';
import { FeatureCategoryContainer } from './FeatureCategoryContainer';

type DataContextType = {
	data: RecordModel[];
	view: DataProps['view'];
};

export const AdoptedFeaturesListView = () => {
	const { data, view }: DataContextType = useContext(DataContext);
	const [expanded, setExpanded] = useState(false);
	const groupedFeatures = useMemo(() => {
		return groupFeaturesByAdoptionAndCategory(data);
	}, [data]);

	useEffect(() => {
		setExpanded((view?.search?.length ?? 0) > 0);
	}, [view?.search?.length]);

	return (
		<List
			data={groupedFeatures}
			defaultItemProps={{ pad: { vertical: 'small' } }}
		>
			{(item) => (
				<ContentPane
					contained={false}
					heading={`Level ${item.adoptionLevel}`}
					level={2}
				>
					<Box
						background={{ color: 'background-back' }}
						border={{
							color: 'border-weak',
							size: 'xsmall',
							style: 'inset',
						}}
						pad={{ vertical: 'medium', horizontal: 'medium' }}
						round="small"
					>
						<List
							data={item.categories}
							defaultItemProps={{ pad: { vertical: 'xsmall' } }}
						>
							{(category) => {
								return (
									<FeatureCategoryContainer
										category={category}
										expanded={expanded}
									/>
								);
							}}
						</List>
					</Box>
				</ContentPane>
			)}
		</List>
	);
};
