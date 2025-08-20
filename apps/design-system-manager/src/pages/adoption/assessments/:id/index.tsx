import {
	Box,
	Data,
	DataFilters,
	DataSearch,
	DataSummary,
	Page,
	PageContent,
	PageHeader,
	ToggleGroup,
	Toolbar,
} from 'grommet';
import { useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { RecordModel } from 'pocketbase';
import { ContentPane, InvalidPermissions } from '../../../../components';
import { useCollection } from '../../../../hooks';
import { formatDate } from '../../../../utils';
import { getAllRecords } from '../../../../utils/getAllRecords';
import { AdoptedFeaturesListView } from './AdoptedFeaturesListView';
import { AdoptedFeaturesTableView } from './AdoptedFeaturesTableView';
import { List, Table } from 'grommet-icons';

const adoptedCode = ['Custom + design tokens', 'Grommet + grommet-theme-hpe'];
const adoptedDesign = ['DS Figma', 'Composed'];

const AdoptionAssessment = () => {
	const { id } = useParams();
	const [dataVisualization, setDataVisualization] = useState('list');

	// Adopted features
	const getAdoptedFeatures = useCallback(async () => {
		const response = await getAllRecords({
			collection: 'feature_adoptions_view',
			options: {
				filter: `assessment_id = '${id}'`,
				sort: 'adoption_level, feature_category',
			},
		});
		return response;
	}, [id]);
	const { data, loading, authorized } = useCollection({
		collection: 'feature_adoptions_view',
		method: getAdoptedFeatures,
	});
	const adoptedFeatures = data as RecordModel[];

	// Available features
	const getAvailableFeatures = useCallback(async () => {
		const features = await getAllRecords({
			collection: 'features',
			options: {
				filter: `status = "available"`,
				sort: 'adoption_level_id, category_id, name',
				expand: 'adoption_level_id, category_id',
			},
		});
		return features;
	}, []);
	const { data: availableFeatures } = useCollection({
		collection: 'features',
		method: getAvailableFeatures,
	});
	const availableFeaturesData = availableFeatures as RecordModel[];

	// Merge available features with adopted features
	const mergedFeatures = useMemo(() => {
		const merged = availableFeaturesData.map((availableFeature) => {
			const adoptedFeature = adoptedFeatures.find(
				(feature) => feature.feature_id === availableFeature.id,
			);
			const mergedFeature = {
				...availableFeature,
				name: availableFeature.name,
				assessment_id: adoptedFeature?.assessment_id,
				assessment_date: adoptedFeature?.assessment_date,
				assessment_type: adoptedFeature?.assessment_type,
				team_id: adoptedFeature?.team_id,
				team_name: adoptedFeature?.team_name,
				adoption_level: availableFeature.expand?.adoption_level_id?.name,
				feature_category: availableFeature.expand?.category_id?.name,
				code: adoptedFeature?.code,
				design: adoptedFeature?.design,
				adopted_code: adoptedCode.includes(adoptedFeature?.code),
				adopted_design: adoptedDesign.includes(adoptedFeature?.design),
				adopted: '',
				feature_adoption_updated: adoptedFeature?.feature_adoption_updated,
			};

			const adoptionStatus = () => {
				if (mergedFeature.adopted_code) return 'Adopted';
				if (mergedFeature.adopted_design) return 'Designs only';
				return 'Not adopted';
			};

			mergedFeature.adopted = adoptionStatus();

			return mergedFeature;
		});

		// Sort merged features by adoption level, then category, then name
		merged.sort((a, b) => {
			if (a.adoption_level < b.adoption_level) return -1;
			if (a.adoption_level > b.adoption_level) return 1;
			if (a.feature_category < b.feature_category) return -1;
			if (a.feature_category > b.feature_category) return 1;
			return a.name.localeCompare(b.name);
		});

		return merged;
	}, [adoptedFeatures, availableFeaturesData]);

	const { team_name, assessment_date, assessment_type } =
		adoptedFeatures[0] || {};
	const assessmentDate = assessment_date
		? formatDate({ utc: assessment_date, options: { dateStyle: 'long' } })
		: '';

	return (
		<Page pad={{ bottom: 'xlarge' }}>
			<PageContent>
				<PageHeader
					title={`${team_name} Adoption Assessment`}
					subtitle={`${assessment_type} - ${assessmentDate}`}
				/>
				{authorized ? (
					<ContentPane skeleton={loading}>
						<Data id="adopted-features" data={mergedFeatures}>
							<Toolbar>
								<DataSearch />
								<DataFilters layer />
								<ToggleGroup
									a11yTitle="Choose data visualization"
									options={[
										{ icon: <List />, tip: 'List View', value: 'list' },
										{ icon: <Table />, tip: 'Table View', value: 'table' },
									]}
									value={dataVisualization}
									onToggle={({ value }) => {
										if (typeof value === 'string') {
											setDataVisualization(value);
										}
									}}
								/>
							</Toolbar>
							<DataSummary />
							{dataVisualization === 'list' && <AdoptedFeaturesListView />}
							{dataVisualization === 'table' && <AdoptedFeaturesTableView />}
						</Data>
					</ContentPane>
				) : (
					<InvalidPermissions onClick={() => {}} />
				)}
			</PageContent>
		</Page>
	);
};

export default AdoptionAssessment;
