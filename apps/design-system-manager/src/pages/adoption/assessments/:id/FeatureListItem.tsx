import type { RecordModel } from 'pocketbase';
import { Box, Grid, Tag, Text } from 'grommet';
import { ContentContainer, Identifier } from '../../../../components';
import { useMemo } from 'react';

interface FeatureListItemProps {
  feature: RecordModel;
}

export const FeatureListItem = ({ feature }: FeatureListItemProps) => {
	const adopted = useMemo(() => {
		let result = {
			value: 'Not adopted',
			color: 'background-unknown',
		};
		if (feature.adopted_code) {
			result = {
				value: 'Adopted',
				color: 'background-ok',
			};
		} else if (feature.adopted_design) {
			result = {
				value: 'Designs only',
				color: 'background-warning',
			};
		}
		return result;
	}, [feature]);

	return (
		<ContentContainer round="xsmall">
			<Grid
				columns={[['auto', 'small'], ['auto', 'xsmall'], 'flex', 'xsmall']}
				gap="small"
				align="center"
			>
				<Identifier heading={feature.name} level={4} />
				<Text>{feature.design || '--'}</Text>
				<Text>{feature.code || '--'}</Text>
				<Box align="end">
					<Tag
						value={adopted.value}
						background={adopted.color}
						size="small"
					/>
				</Box>
			</Grid>
		</ContentContainer>
	);
};
