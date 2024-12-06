import {
  Form,
  FormField,
  TextInput,
  Button,
  Page,
  PageContent,
  PageHeader,
} from 'grommet';
import PropTypes from 'prop-types';

export const Login = ({ setAuthenticated }) => {
  return (
    <Page>
      <PageContent>
        <PageHeader
          title="HPE Design System Demo"
          subtitle="Please log in to view the designs."
        />
        <Form
          onSubmit={({ value }) => {
            if (value.password === process.env.NEXT_PUBLIC_PASSWORD) {
              localStorage.setItem('theme-update-demo', 'true');
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

Login.propTypes = {
  setAuthenticated: PropTypes.func,
};
