import { Grid, Heading, Page, PageContent } from 'grommet';
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
	return (
		<Page pad={{ top: 'large', bottom: 'xlarge' }} fill>
			<PageContent>
				<ScreenReaderOnly>
					<Heading level={1}>Home page</Heading>
				</ScreenReaderOnly>
				<Grid columns={{ count: 'fit', size: 'small' }} gap="medium">
					{actions.map(action => (
						<HubItem key={action.label} href={action.href} label={action.label} />
					))}
				</Grid>
			</PageContent>
		</Page>
	);
}

