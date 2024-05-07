import {
  Form,
  FormField,
  TextInput,
  Button,
  Page,
  PageContent,
  PageHeader,
} from 'grommet';

export const Login = ({ setAuthenticated }) => {
  return (
    <Page>
      <PageContent>
        <PageHeader
          title="HPE Design Tokens Demo"
          subtitle="Please log in to view the designs."
        />
        <Form
          onSubmit={({ value }: { value: { password: string } }) => {
            if (value.password === import.meta.env.VITE_LOGIN_CREDENTIAL) {
              localStorage.setItem(import.meta.env.VITE_LOGIN_KEY, 'true');
              setAuthenticated(true);
            }
          }}
        >
          <FormField
            label="Password"
            name="password"
            htmlFor="password"
            contentProps={{ width: 'medium' }}
            required
          >
            <TextInput type="password" name="password" id="password" />
          </FormField>
          <Button
            label="Submit"
            type="submit"
            kind="primary"
            margin={{ top: 'small' }}
          />
        </Form>
      </PageContent>
    </Page>
  );
};