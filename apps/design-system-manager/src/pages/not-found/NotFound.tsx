import { Button, Page, PageContent } from 'grommet';
import { useNavigate } from 'react-router-dom';
import { EmptyState } from '../../components';
import { DocumentMissing } from 'grommet-icons';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Page pad={{ bottom: 'xlarge' }} fill>
      <PageContent flex justify="center">
        <EmptyState
          title="404 - Page not found"
          level={1}
          actions={<Button primary label="Go back" onClick={() => navigate(-1)} />}
          icon={<DocumentMissing />}
        />
      </PageContent>
    </Page>
  );
};
