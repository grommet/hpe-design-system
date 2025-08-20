import { useCallback, useState } from 'react';
import PocketBase, { type RecordModel } from 'pocketbase';
import { useParams } from 'react-router-dom';
import { Grid, Page, PageContent, PageHeader } from 'grommet';
import { useCollection } from '../../../hooks';
import {
	ContentPane,
	InvalidPermissions,
	ReverseAnchor,
} from '../../../components';
import { Summary } from './Summary';
import { EmptyStateNoData } from './EmptyStateNoData';
import { CreateAssessmentModal } from './CreateAssessmentModal';
import { Assessments } from './Assessments';

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

const gridAreas = [['summary'], ['assessments']];

const TeamAdoption = ({ ...rest }) => {
	const { id } = useParams();
	const [createAssessment, setCreateAssessment] = useState(false);

	// Fetch the team details
	const getTeam = useCallback(async () => {
		if (!id) return [];
		const team = await pb.collection('teams').getOne(id);
		return team;
	}, [id]);
	const { data: teamData } = useCollection({
		collection: 'teams',
		method: getTeam,
	});
	const team = teamData as RecordModel;

	// Fetch the scorecard summary
	const getScorecardSummary = useCallback(async () => {
		if (!id) return [];
		const scorecard = await pb
			.collection('team_scorecard_summary_level_category')
			.getList(1, 50, {
				filter: `team_id = '${id}'`,
			});
		return scorecard.items;
	}, [id]);
	const { data: scorecardData, loading: scorecardLoading } = useCollection({
		collection: 'team_scorecard_summary_level_category',
		method: getScorecardSummary,
	});
	const scorecardSummary = scorecardData as RecordModel[];

	// Fetch the assessments for the team
	const getAssessments = useCallback(async () => {
		if (!id) return [];
		const assessments = await pb.collection('assessments').getList(1, 10, {
			filter: `team_id = '${id}'`,
			sort: '-assessment_date',
			expand: 'team_id,theme,theme_package',
		});
		return assessments.items;
	}, [id]);
	const {
		data: assessmentsData,
		loading: assessmentsLoading,
		authorized,
	} = useCollection({
		collection: 'assessments',
		method: getAssessments,
	});
	const assessments = assessmentsData as RecordModel[];

	return (
		<Page pad={{ bottom: 'xlarge' }} {...rest}>
			<PageContent>
				<PageHeader
					title="Adoption Scorecard"
					subtitle={team.name}
					parent={<ReverseAnchor label="Adoption" href="/adoption" />}
				/>
				{assessments.length === 0 && (
					<EmptyStateNoData onClick={() => setCreateAssessment(true)} />
				)}
				{createAssessment && (
					<CreateAssessmentModal
						team={team}
						onClose={() => setCreateAssessment(false)}
					/>
				)}
				{authorized ? (
					<Grid
						areas={gridAreas}
						columns={['flex']}
						rows={['auto']}
						gap="large"
					>
						<ContentPane
							gridArea="summary"
							heading="Summary"
							level={2}
							contained={false}
							srOnly={true}
						>
							{(scorecardLoading || scorecardSummary) && (
								<Summary
									skeleton={scorecardLoading}
									summary={scorecardSummary}
								/>
							)}
						</ContentPane>
						{(assessmentsLoading || assessments.length > 0) && (
							<ContentPane
								gridArea="assessments"
								heading="Assessments"
								level={2}
								contained={false}
							>
								<Assessments data={assessments} loading={assessmentsLoading} />
							</ContentPane>
						)}
					</Grid>
				) : (
					<InvalidPermissions onClick={() => {}} />
				)}
			</PageContent>
		</Page>
	);
};

export default TeamAdoption;
