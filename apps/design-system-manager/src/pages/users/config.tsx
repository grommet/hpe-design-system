import type { RecordModel } from 'pocketbase';
import { Avatar, Box, Tag, Text } from 'grommet';
import { RoutedAnchor, TextEmphasis } from '../../components';
import { EmailPrivate } from './components';

export const tableColumns = [
	{
		property: 'id',
		primary: true,
		header: 'User',
		render: (datum: RecordModel) => {
			const parts = datum.name ? datum.name.split(' ') : ['Anonymous'];
			const initials = parts[0][0] + (parts[1] ? parts[1][0] : '');
			return (
				<Box direction="row" align="center" gap="small">
					{datum.avatar ? (
						<Avatar src={datum.avatar} />
					) : (
						<Avatar background="blue">
							<TextEmphasis>{initials}</TextEmphasis>
						</Avatar>
					)}
					<RoutedAnchor href={`/users/${datum.id}`}>
						<Text>{datum.name}</Text>
					</RoutedAnchor>
				</Box>
			);
		},
	},
	{
		property: 'email',
		header: 'Email',
		render: (datum: RecordModel) => <EmailPrivate email={datum.email} />,
	},
	{
		property: 'role',
		header: 'Roles',
		render: (datum: RecordModel) => (
			<Box direction="row" gap="xxsmall">
				{datum.role.map((role: string) => (
					<Tag key={role} value={role} size="xsmall" />
				))}
			</Box>
		),
	},
];

export const skeletonUsers = Array.from({ length: 10 }, (_, index) => ({
	id: index,
	name: '',
	email: '',
	role: [],
}));
