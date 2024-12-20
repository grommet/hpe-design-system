import { TextArea } from 'grommet';
import ContentPane from '../../../../components/ContentPane';
import { Compare } from '../../components';

export const TextAreas = () => {
  return (
    <ContentPane>
      <Compare>
        <TextArea placeholder="Type something" />
      </Compare>
    </ContentPane>
  );
};
