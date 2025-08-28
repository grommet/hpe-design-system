import {
  Box,
  Form,
  FormField,
  TextInput,
  Button,
  Page,
  PageContent,
  Heading,
  Paragraph,
} from 'grommet';
import PropTypes from 'prop-types';
import ContentPane from './components/ContentPane';

export const Login = ({ setAuthenticated }) => {
  return (
    <Page>
      <PageContent pad={{ vertical: 'xlarge' }} align="center">
        <ContentPane background="background-front" pad="medium" round='xlarge'>
          <Box gap="medium">
            <Box>
              <Heading margin="none">HPE Design System Demo</Heading>
              <Paragraph margin="none">
                Please log in to view the designs.
              </Paragraph>
            </Box>
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
                validate={{
                  regexp: new RegExp(`${import.meta.env.VITE_PASSWORD}`),
                  status: 'error',
                  message: 'Incorrect password',
                }}
                required
              >
                <TextInput type="password" name="password" id="password" />
              </FormField>
              <Button
                label="Submit"
                type="submit"
                kind="primary"
                margin={{ top: 'xsmall' }}
              />
            </Form>
          </Box>
        </ContentPane>
      </PageContent>
    </Page>
  );
};

Login.propTypes = {
  setAuthenticated: PropTypes.func,
};
