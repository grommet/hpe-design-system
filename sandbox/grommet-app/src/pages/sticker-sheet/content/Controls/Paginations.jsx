import { Pagination } from 'grommet';
import { Compare } from '../../components/Compare';
import ContentPane from '../../../../components/ContentPane';

export const Paginations = () => {
  return (
    <ContentPane>
      <Compare>
        <Pagination numberItems={100} size="small" />
      </Compare>
      <Compare>
        <Pagination numberItems={100} />
      </Compare>
    </ContentPane>
  );
};
