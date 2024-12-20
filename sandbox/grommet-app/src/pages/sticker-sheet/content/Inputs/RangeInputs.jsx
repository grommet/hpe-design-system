import { RangeInput } from 'grommet';
import ContentPane from '../../../../components/ContentPane';
import { Compare } from '../../components';

export const RangeInputs = () => {
  return (
    <ContentPane>
      <Compare>
        <RangeInput value={60} />
      </Compare>
    </ContentPane>
  );
};
