import type { RecordModel } from 'pocketbase';
import {
	Box,
	Collapsible,
	List,
	Heading,
	Header,
	Grid,
} from 'grommet';
import { ContentContainer } from '../../../../components';
import { sentenceCase } from '../../../../utils';
import { FeatureListItem } from './FeatureListItem';
import { ExpandToggleButton } from './ExpandToggleButton';
import { AdoptionStats } from './AdoptionStats';
import { useEffect, useState } from 'react';

export type FeatureCategory = {
	category: string;
	features: RecordModel[];
};

interface FeatureCategoryContainerProps {
	category: FeatureCategory;
	expanded?: boolean;
	[key: string]: unknown;
}

export const FeatureCategoryContainer = ({
	category,
	expanded: expandedProp = false,
	...rest
}: FeatureCategoryContainerProps) => {
	const [expanded, setExpanded] = useState(expandedProp);

	useEffect(() => {
		setExpanded(expandedProp);
	}, [expandedProp]);

	return (
		<ContentContainer {...rest}>
			<Header
				onClick={() => setExpanded(!expanded)}
				pad={{ vertical: 'xsmall', horizontal: 'small' }}
				hoverIndicator
				round="xsmall"
			>
				<Grid columns={['small', 'flex', 'small']} gap="small" align="center" fill>
				<Heading level={3} margin="none">
					{sentenceCase(category.category)}
				</Heading>
				<AdoptionStats category={category} />
				<ExpandToggleButton expanded={expanded}/>
				</Grid>
			</Header>
			<Collapsible open={expanded}>
				<Box
					background="background-contrast"
					margin={{ vertical: 'small' }}
					pad={{ vertical: 'small', horizontal: 'medium' }}
					round="xsmall"
					border={{
						color: 'border-weak',
						size: 'xsmall',
						style: 'inset',
					}}
				>
					<List
						data={category.features}
						defaultItemProps={{ pad: { vertical: 'xsmall' } }}
					>
						{(feature) => <FeatureListItem feature={feature} />}
					</List>
				</Box>
			</Collapsible>
		</ContentContainer>
	);
};
