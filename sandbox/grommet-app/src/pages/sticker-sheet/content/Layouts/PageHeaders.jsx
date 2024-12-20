import { PageHeader } from 'grommet';
import { Compare } from '../../components';
import ContentPane from '../../../../components/ContentPane';

export const PageHeaders = () => {
  return (
    <ContentPane>
      <Compare>
        <PageHeader
          title="Page title"
          subtitle="Here is a subtitle for the page."
        />
      </Compare>
    </ContentPane>
  );
};
