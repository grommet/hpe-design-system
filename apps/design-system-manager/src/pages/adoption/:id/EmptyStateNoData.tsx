import { Button, Paragraph } from 'grommet';
import { EmptyState } from '../../../components';

interface EmptyStateNoDataProps {
	onClick: () => void;
}

export const EmptyStateNoData = ({ onClick, ...rest }: EmptyStateNoDataProps) => {
	return (
		<EmptyState
			title="No scorecard data"
			level={2}
			description={<>
			<Paragraph margin="xsmall" textAlign="center">Scorecards summarize design system adoption progress within a team. Progress is tracked through periodic adoption assessments.</Paragraph>
			<Paragraph margin="xsmall" textAlign="center">Get started by beginning an adoption assessment.</Paragraph>
			</>}
			actions={
				<Button
					label="Begin assessment"
					primary
					onClick={onClick}
				/>
			}
			{...rest}
		/>
	);
};
