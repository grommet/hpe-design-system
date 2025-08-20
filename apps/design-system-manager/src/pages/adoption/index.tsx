import { useCallback } from 'react';
import PocketBase, { type RecordModel } from 'pocketbase';
import { Page, PageContent, PageHeader, Data } from 'grommet';
import { InvalidPermissions } from '../../components';
import { useCollection } from '../../hooks';
import { TeamsView } from './TeamsView';

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);
const LEVEL_THRESHOLD = Number.parseFloat(import.meta.env.VITE_ADOPTION_LEVEL_THRESHOLD) || 0.5; // Default to 0.5 if undefined or invalid

const Adoption = () => {
	const getScorecards = useCallback(
		() =>
			pb
				.collection('team_scorecard_summary_level_category')
				.getFullList({ sort: 'team_name' }),
		[],
	);

	const { data, authorized } = useCollection({
		collection: 'team_scorecard_summary_level_category',
		method: getScorecards,
	});

	const scorecards = data as RecordModel[];

	// Keep only one scorecard per team which had the highest adoption_level
	const aggregatedScorecards = Array.from(
		scorecards.reduce((map, scorecard) => {
			const levelRatio =
				scorecard.num_features_available > 0
					? scorecard.num_code_adopted / scorecard.num_features_available
					: 0;
			const existing = map.get(scorecard.team_name);
			if (!existing) {
				map.set(scorecard.team_name, { ...scorecard });
			} else {
				// Check if the current scorecard should replace the existing one
				const shouldReplace =
					scorecard.adoption_level > existing.adoption_level &&
					levelRatio >= LEVEL_THRESHOLD;

				if (shouldReplace) {
					// Replace with the one with the higher adoption level
					map.set(scorecard.team_name, { ...scorecard });
				} else {
					// Aggregate the scores only if not replacing
					const updated = map.get(scorecard.team_name);
					if (updated) {
						updated.num_code_adopted =
							existing.num_code_adopted + scorecard.num_code_adopted;
						updated.num_design_adopted =
							existing.num_design_adopted + scorecard.num_design_adopted;
						updated.num_features_available =
							existing.num_features_available + scorecard.num_features_available;
					}
				}
			}
			return map;
		}, new Map<string, RecordModel>()),
	).map(([, value]) => value);

	// Sort by team name
	aggregatedScorecards.sort((a, b) => a.team_name.localeCompare(b.team_name));
	return (
		<Page pad={{ bottom: 'xlarge' }}>
			<PageContent>
				<PageHeader
					title="Adoption"
					subtitle="Product teams adopting the Design System."
				/>
				{authorized ? (
					<Data data={aggregatedScorecards} toolbar>
						<TeamsView />
					</Data>
				) : (
					<InvalidPermissions onClick={() => {}} />
				)}
			</PageContent>
		</Page>
	);
};

export default Adoption;
