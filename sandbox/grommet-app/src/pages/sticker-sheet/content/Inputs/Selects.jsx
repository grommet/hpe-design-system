import { Select } from 'grommet';
import ContentPane from '../../../../components/ContentPane';
import { Compare } from '../../components';

export const Selects = () => {
  return (
    <ContentPane>
      <Compare>
        <Select
          options={['Option 1', 'Option 2', 'Option 3']}
          placeholder="Select option"
        />
      </Compare>
    </ContentPane>
  );
};
