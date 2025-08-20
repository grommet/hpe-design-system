import { useState } from 'react';
import { Box, Button, Sidebar } from 'grommet';
import {
	HomeOption,
	Magic,
	Performance,
	Risk,
	Robot,
	Technology,
} from 'grommet-icons';
import { ContentPane } from '../ContentPane';
import { AgentConfiguration } from '../DSCopilot';

type ContextOptions = Record<string, ContextOption>;

interface ContextOption {
	label: string;
	icon: React.ReactElement;
	render: React.ReactNode;
}

const contextOptions: ContextOptions = {
	options: { label: 'Options', icon: <HomeOption />, render: <></> },
	aiAssistant: { label: 'AI assistant', icon: <Robot />, render: <></> },
	optimize: { label: 'Optimize', icon: <Magic />, render: <></> },
	configure: { label: 'Configure', icon: <Performance />, render: <AgentConfiguration /> },
	randomize: { label: 'Randomize', icon: <Risk />, render: <></> },
	technology: {
		label: 'Technology',
		icon: <Technology />,
		render: <></>,
	},
};

export const ContextPane = ({ ...rest }) => {
	const [option, setOption] = useState<ContextOption | null>(null);

	const onClick = (key: keyof typeof contextOptions) => {
		if (contextOptions[key] === option) {
			setOption(null);
		} else {
			setOption(contextOptions[key]);
		}
	};

	return (
		<Box gridArea="context" direction="row" gap="xsmall" {...rest}>
			{option && (
				<Box>
					<ContentPane>{option.render}</ContentPane>
				</Box>
			)}
			<Sidebar flex={false} pad="none">
				{Object.entries(contextOptions).map(([key, { label, icon }]) => (
					<Button
						key={key}
						icon={icon}
						onClick={() => onClick(key)}
						tip={label}
						active={option?.label === label}
					/>
				))}
			</Sidebar>
		</Box>
	);
};
