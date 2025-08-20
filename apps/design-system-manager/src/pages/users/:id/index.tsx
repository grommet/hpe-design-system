import PocketBase, { type RecordModel } from 'pocketbase';
import { useParams } from 'react-router-dom';
import {
	Avatar,
	Box,
	NameValueList,
	NameValuePair,
	Page,
	PageContent,
	PageHeader,
	Text,
} from 'grommet';
import {
	ContentPane,
	InvalidPermissions,
	ReverseAnchor,
} from '../../../components';
import { useCollection } from '../../../hooks';
import { useCallback } from 'react';
import { formatDate } from '../../../utils';
import { EmailPrivate } from '../components';

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

const User = () => {
	const { id } = useParams();

	const getUser = useCallback(async () => {
		if (!id) return [];
		const user = await pb.collection('users').getOne(id);
		const adjustedUser = {
			...user,
			avatar: user.avatar ? pb.files.getURL(user, user.avatar) : user.avatar,
		};
		return adjustedUser;
	}, [id]);

	const { data, authorized } = useCollection({
		collection: 'users',
		method: getUser,
	});

	const user = data as RecordModel;
	const { username, email, name, created, updated, avatar } = user || {};

	return (
		<Page pad={{ bottom: 'xlarge' }}>
			<PageContent>
				<PageHeader
					title={name || '--'}
					parent={<ReverseAnchor href="/users" label="Users" />}
				/>
				{authorized ? (
					<ContentPane heading="User details" level={2} contained flex="grow">
						<Box gap="medium">
							<NameValueList nameProps={{ width: 'max-content' }}>
								<NameValuePair name="User ID">{id}</NameValuePair>
								<NameValuePair name="Name">{name || '--'}</NameValuePair>
								<NameValuePair name="Username">{username}</NameValuePair>
								<NameValuePair name="Email">
									<EmailPrivate email={email} />
								</NameValuePair>
								<NameValuePair name="Avatar">
									{avatar ? <Avatar src={avatar} /> : <Text>--</Text>}
								</NameValuePair>
								<NameValuePair name="Created">
									{created &&
										formatDate({
											utc: created,
											options: { dateStyle: 'medium', timeStyle: 'short' },
										})}
								</NameValuePair>
								<NameValuePair name="Last modified">
									{updated &&
										formatDate({
											utc: updated,
											options: { dateStyle: 'medium', timeStyle: 'short' },
										})}
								</NameValuePair>
							</NameValueList>
						</Box>
					</ContentPane>
				) : (
					<InvalidPermissions onClick={() => {}} />
				)}
			</PageContent>
		</Page>
	);
};

export default User;
