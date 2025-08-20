import { useMemo } from 'react';
import { Text, NameValueList, NameValuePair } from 'grommet';
import { TextEmphasis } from '../../../../components';
import type { FeatureCategory } from './FeatureCategoryContainer';

interface AdoptionStatsProps {
	category: FeatureCategory;
	[key: string]: unknown;
}

export const AdoptionStats = ({ category, ...rest }: AdoptionStatsProps) => {
	const adoptionStats = useMemo(() => {
		const totalFeatures = category.features.length;
		const adoptedCode = category.features.filter(
			(feature) => feature.adopted_code,
		).length;
		const adoptedDesign = category.features.filter(
			(feature) => feature.adopted_design,
		).length;
		return {
			totalFeatures,
			adoptedCode,
			adoptedDesign,
		};
	}, [category.features]);

	const adoptedPercentage = useMemo(() => {
		return Math.round(
			(adoptionStats.adoptedCode / adoptionStats.totalFeatures) * 100,
		);
	}, [adoptionStats.adoptedCode, adoptionStats.totalFeatures]);

	return (
		<NameValueList
			fill="horizontal"
			gap="xxsmall"
			layout="grid"
			align="center"
			pairProps={{ direction: 'column-reverse' }}
			nameProps={{
				align: 'center',
			}}
			valueProps={{
				width: { max: 'xsmall' },
				align: 'center',
			}}
			{...rest}
		>
			<NameValuePair name={<Text size="medium">Adoption</Text>}>
				<TextEmphasis size="large">{`${adoptedPercentage} %`}</TextEmphasis>
			</NameValuePair>
			<NameValuePair name={<Text size="small">Design</Text>}>
				<TextEmphasis>
					{adoptionStats.adoptedDesign} of {adoptionStats.totalFeatures}
				</TextEmphasis>
			</NameValuePair>
			<NameValuePair name={<Text size="small">Code</Text>}>
				<TextEmphasis>
					{adoptionStats.adoptedCode} of {adoptionStats.totalFeatures}
				</TextEmphasis>
			</NameValuePair>
		</NameValueList>
	);
};
