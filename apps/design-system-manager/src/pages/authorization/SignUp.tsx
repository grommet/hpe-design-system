import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Box,
	Button,
	Form,
	FormField,
	TextInput,
	Page,
	PageContent,
	Text,
} from 'grommet';

import { usePocket } from '../../contexts';
import { ContentPane, RoutedAnchor } from '../../components';

export const SignUp = () => {
	const [formValue, setFormValue] = useState({ email: '', password: '' });
	const { register } = usePocket();
	const navigate = useNavigate();

	const handleOnSubmit = useCallback(async () => {
		await register(formValue.email, formValue.password);
		navigate('/sign-in');
	}, [navigate, register, formValue]);

	return (
		<Page kind="narrow" pad={{ top: 'large', bottom: 'xlarge' }}>
			<PageContent>
				<ContentPane heading="Sign Up" level={1} alignSelf="center">
					<Form
						value={formValue}
						onChange={setFormValue}
						onSubmit={handleOnSubmit}
					>
						<Box width="medium" gap="medium">
							<Box>
								<FormField htmlFor="email" name="email" label="Email">
									<TextInput id="email" name="email" />
								</FormField>
								<FormField htmlFor="password" name="password" label="Password">
									<TextInput id="password" name="password" type="password" />
								</FormField>
							</Box>
							<Box direction="row" gap="small" align="center">
								<Button secondary type="submit" label="Create account" />
								<Text size="small">
									Have an account?{' '}
									<RoutedAnchor href="/sign-in" label="Sign in" />
									.
								</Text>
							</Box>
						</Box>
					</Form>
				</ContentPane>
			</PageContent>
		</Page>
	);
};
