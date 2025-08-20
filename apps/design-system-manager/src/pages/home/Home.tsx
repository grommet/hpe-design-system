import { Grid, Heading, Page, PageContent } from 'grommet';
import { usePocket } from '../../contexts';
import {	
	ScreenReaderOnly,
	HubItem
} from '../../components';

const actions = [
	{
		label: 'Manage assets',
		href: '/assets',
	},
	{
		label: 'Start adoption assessment',
		href: '/adoption',
	},
	{
		label: 'View adoption dashboard',
		href: '/adoption',
	},
];

export const Home = () => {
	const { user } = usePocket();
	const firstName = user?.name?.split(' ')[0];

	return (
		<Page pad={{ top: 'large', bottom: 'xlarge' }} fill>
			<PageContent>
				<ScreenReaderOnly>
					<Heading level={1}>Home page</Heading>
				</ScreenReaderOnly>
				<Heading level={2} size='xlarge'>
					Hello{firstName ? `, ${firstName}` : '.'}
				</Heading>
				<Grid columns={{ count: 'fit', size: 'small' }} gap="large">
					{actions.map(action => (
						<HubItem key={action.label} href={action.href} label={action.label} fill />
					))}
				</Grid>
			</PageContent>
		</Page>
	);
}

