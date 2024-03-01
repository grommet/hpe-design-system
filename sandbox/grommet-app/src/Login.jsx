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
          title="HPE Design Tokens Demo"
          subtitle="Please log in to view the designs."
        />
        <Form
          onSubmit={({ value }) => {
            if (value.password === import.meta.env.VITE_PASSWORD) {
              localStorage.setItem('design-tokens-demo', 'true');
              setAuthenticated(true);
            }
          }}
        >
          <FormField
            label="Password"
            name="password"
            htmlFor="password"
            contentProps={{ width: 'medium' }}
          >
            <TextInput type="password" name="password" id="password" />
          </FormField>
          <Button label="Submit" type="submit" kind="primary" />
        </Form>
      </PageContent>
    </Page>
  );
};

Login.propTypes = {
  setAuthenticated: PropTypes.func,
};
