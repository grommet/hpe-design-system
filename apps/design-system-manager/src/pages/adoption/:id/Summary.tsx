import { Grid } from 'grommet';
import { AdoptionLevelCard } from './AdoptionLevelCard';
import {
	summarizeAdoption,
	type SummaryResult,
} from './summarizeAdoption';
import type { SkeletonType } from 'grommet/utils';
import type { RecordModel } from 'pocketbase';
import { useEffect, useState } from 'react';

interface SummaryProps {
	skeleton: SkeletonType;
	summary: RecordModel[];
}

const defaultSummary = {
	level_1: { total: 0, design: 0, code: 0 },
	level_2: { total: 0, design: 0, code: 0 },
	level_3: { total: 0, design: 0, code: 0 },
};

export const Summary = ({
	skeleton,
	summary: summaryProp,
	...rest
}: SummaryProps) => {
	const [summary, setSummary] = useState<SummaryResult>(defaultSummary);

	useEffect(() => {
		const fetchSummary = async () => {
			const result = await summarizeAdoption(summaryProp);
			setSummary(result);
		};
		fetchSummary();
	}, [summaryProp]);

	return (
		<Grid
			columns={{ count: 'fill', size: '1/3' }}
			rows={['auto']}
			gap="small"
			{...rest}
		>
			<AdoptionLevelCard
				level="Identity"
				levelNumber={1}
				summary={summary.level_1}
				skeleton={skeleton}
			/>
			<AdoptionLevelCard
				level="Presentation"
				levelNumber={2}
				summary={summary.level_2}
				skeleton={skeleton}
			/>
			<AdoptionLevelCard
				level="Patterns"
				levelNumber={3}
				summary={summary.level_3}
				skeleton={skeleton}
			/>
		</Grid>
	);
};
