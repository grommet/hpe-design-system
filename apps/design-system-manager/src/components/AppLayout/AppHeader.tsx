import PocketBase from 'pocketbase';
import {
	Avatar,
	Box,
	Button,
	DropButton,
	Header,
	Page,
	PageContent,
	Text,
} from 'grommet';
import { RoutedButton } from '../RoutedButton';
import { usePocket } from '../../contexts';
import { TextEmphasis } from '../TextEmphasis';

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

export const AppHeader = ({ ...rest }) => {
	const { logout, user } = usePocket();

	const adjustedUser = { ...user };
	if (user?.avatar) {
		adjustedUser.avatar = pb.files.getURL(user, user.avatar);
	}

	const parts = adjustedUser?.name ? adjustedUser.name.split(' ') : ['Anonymous'];
	const initials = parts[0][0] + (parts[1] ? parts[1][0] : '');

	return (
		<Page kind="full" {...rest}>
			<PageContent pad="none">
				<Header
					background="background-front"
					height={{ min: 'xxsmall' }}
					pad={{ horizontal: 'xsmall' }}
				>
					<RoutedButton href="/">
						<Box direction="row" align="center" gap="xsmall">
							<Text color="text-strong" weight="bold">
								ACME
							</Text>
							<Text color="text-strong" weight={500}>
								Design System Manager
							</Text>
						</Box>
					</RoutedButton>
					{user && (
						<DropButton
							icon={
								adjustedUser.avatar ? (
									<Avatar src={adjustedUser.avatar} />
								) : (
									<Avatar background="blue">
										<TextEmphasis>{initials}</TextEmphasis>
									</Avatar>
								)
							}
							dropAlign={{ top: 'bottom', right: 'right' }}
							dropContent={
								<Box
									align="start"
									background={{ color: 'background-floating' }}
									pad="small"
									gap="small"
									width={{ min: 'small' }}
								>
									<RoutedButton label="Profile" href={`/users/${user.id}`} />
									<Button label="Sign out" onClick={logout} />
								</Box>
							}
							a11yTitle="User Menu"
						/>
					)}
				</Header>
			</PageContent>
		</Page>
	);
};
