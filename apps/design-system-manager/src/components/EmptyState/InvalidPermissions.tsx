import { Button } from 'grommet';
import { Lock } from 'grommet-icons';
import { EmptyState } from './EmptyState';

interface InvalidPermissionsProps {
  onClick: () => void;
}

export const InvalidPermissions = ({ onClick }: InvalidPermissionsProps) => {
	return (
		<EmptyState
			title="Access denied"
			level={2}
			description="Please enable view permission for this collection."
			icon={<Lock />}
			actions={<Button label="Request access" primary onClick={onClick} />}
		/>
	);
};
