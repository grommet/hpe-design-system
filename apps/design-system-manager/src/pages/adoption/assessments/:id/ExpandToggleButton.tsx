import { Button } from 'grommet';
import { Down, Up } from 'grommet-icons';

interface ExpandToggleButtonProps {
	expanded: boolean;
	[key: string]: unknown;
}

export const ExpandToggleButton = ({ expanded, ...rest }: ExpandToggleButtonProps) => (
	<Button
		label={expanded ? 'Hide features' : 'View features'}
		icon={expanded ? <Up /> : <Down />}
		reverse
		focusIndicator={false}
		tabIndex={-1}
		{...rest}
	/>
);
