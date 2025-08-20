import {
  Box,
  Button,
  NameValueList,
  NameValuePair,
  Page,
  PageContent,
  PageHeader,
} from 'grommet';

import { CollapsibleDetail, ContentPane } from '../../components';
import { usePocket } from '../../contexts';

export const Protected = () => {
  const { logout, user } = usePocket();

  return (
    <Page pad={{ top: 'large', bottom: 'xlarge' }}>
      <PageContent>
        <PageHeader
          title="Protected"
          actions={<Button secondary label="Sign out" onClick={logout} />}
        />
        <ContentPane heading="User" level={2} contained flex="grow">
          {user && (
            <Box gap="medium">
              <NameValueList>
                <NameValuePair name="User name">{user.username}</NameValuePair>
                <NameValuePair name="Name">{user.name || '--'}</NameValuePair>
                <NameValuePair name="Email">{user.email}</NameValuePair>
                <NameValuePair name="Created">
                  {Intl.DateTimeFormat(undefined, {
                    dateStyle: 'medium',
                    timeStyle: 'medium',
                  }).format(new Date(user.created))}
                </NameValuePair>
                <NameValuePair name="Last modified">
                  {Intl.DateTimeFormat(undefined, {
                    dateStyle: 'medium',
                    timeStyle: 'medium',
                  }).format(new Date(user.updated))}
                </NameValuePair>
              </NameValueList>
              <CollapsibleDetail>
                <pre>
                  <code>{JSON.stringify(user, null, 2)}</code>
                </pre>
              </CollapsibleDetail>
            </Box>
          )}
        </ContentPane>
      </PageContent>
    </Page>
  );
};
