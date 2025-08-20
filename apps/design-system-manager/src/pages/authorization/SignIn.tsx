import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Form,
  FormField,
  Page,
  PageContent,
  TextInput
} from "grommet";

import { usePocket } from "../../contexts";
import { ContentPane, RoutedAnchor } from "../../components";

const LANDING_PAGE = "/";

export const SignIn = () => {
  const [formValue, setFormValue] = useState({ email: '', password: '' });
  const { login } = usePocket();
  const navigate = useNavigate();

  const handleOnSubmit = useCallback(
    async () => {
      if (login === undefined) {
        console.error("Login function is not defined in PocketContext");
        return;
      }
      if (typeof login !== 'function') {
        console.error("Login is not a function:", login);
        return;
      }
      await login(formValue.email, formValue.password);
      navigate(LANDING_PAGE);
    },
    [login, navigate, formValue]
  );

  return (
    <Page kind="narrow" pad={{ top: 'large', bottom: 'xlarge' }}>
      <PageContent>
        <ContentPane heading="Sign In" level={1} alignSelf="center">
          <Form
            value={formValue}
            onChange={setFormValue}
            onSubmit={handleOnSubmit}
          >
            <Box gap='medium' width="medium">
              <Box>
                <FormField htmlFor="email" name="email" label="Email">
                  <TextInput id="email" name="email" />
                </FormField>
                <FormField htmlFor="password" name="password" label="Password" >
                  <TextInput id="password" name="password" type="password" />
                </FormField>
              </Box>
              <Box direction="row" gap="small" align="center">
                <Button secondary type="submit" label="Sign in" alignSelf="start" />
                <RoutedAnchor href="/sign-up" size="small" label="Create an account" />
              </Box>
            </Box>
          </Form>
        </ContentPane>
      </PageContent>
    </Page>
  );
};