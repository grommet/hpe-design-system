import Pocketbase, { type RecordModel } from 'pocketbase';
import { useCallback, useEffect, useState } from 'react';
import {
	Box,
	Data,
	DataFilters,
	DataSearch,
	DataSummary,
	DataTable,
	Menu,
	Page,
	PageContent,
	PageHeader,
	Toolbar,
} from 'grommet';
import {
	ContentPane,
	InvalidPermissions,
	ReverseAnchor,
} from '../../components';
import { useCollection } from '../../hooks';
import { skeletonUsers, tableColumns } from './config';

const pb = new Pocketbase(import.meta.env.VITE_POCKETBASE_URL);

const defaultActions = [
	{ label: 'Add user', onClick: () => {}, condition: 'all' },
	{ label: 'Edit user', onClick: () => {}, condition: 'single' },
	{ label: 'Assign role', onClick: () => {}, condition: 'all' },
];

const Users = ({ ...rest }) => {
	const [selected, setSelected] = useState<(string | number)[]>([]);
	const [actions, setActions] = useState(defaultActions);

	const getUsers = useCallback(async () => {
		const users = await pb.collection('users').getFullList({
			sort: 'name',
		});
		const adjustedUsers = users.map((user) => {
			if (user.avatar) {
				user.avatar = pb.files.getURL(user, user.avatar);
			}
			return user;
		});
		return adjustedUsers;
	}, []);
	const { data, loading, authorized } = useCollection({
		collection: 'users',
		method: getUsers,
	});
	const users = data as RecordModel[];

	// Update actions based on selection
	useEffect(() => {
		if (selected.length > 1) {
			const nextActions = defaultActions.filter(
				(action) => action.condition !== 'single',
			);
			setActions(nextActions);
		} else {
			setActions(defaultActions);
		}
	}, [selected]);

	return (
		<Page pad={{ bottom: 'xlarge' }} {...rest}>
			<PageContent>
				<PageHeader
					title="Users"
					parent={<ReverseAnchor label="Home" href="/" />}
				/>
				{authorized ? (
					<ContentPane alignSelf="start">
						<Data data={loading ? skeletonUsers : users}>
							<Toolbar justify="between">
								<Toolbar responsive="container" flex>
									<DataSearch />
									<DataFilters layer />
								</Toolbar>
								<Menu label="Actions" items={actions} />
							</Toolbar>
							<Box skeleton={loading}>
								<DataSummary />
							</Box>
							<Box skeleton={loading}>
								<DataTable
									columns={tableColumns}
									select={selected}
									onSelect={setSelected}
								/>
							</Box>
						</Data>
					</ContentPane>
				) : (
					<InvalidPermissions onClick={() => {}} />
				)}
			</PageContent>
		</Page>
	);
};

export default Users;
