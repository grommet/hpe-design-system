import { SelectMultiple } from 'grommet';
import ContentPane from '../../../../components/ContentPane';
import { Compare } from '../../components';

export const SelectMultiples = () => {
  return (
    <ContentPane>
      <Compare>
        <SelectMultiple
          options={['Option 1', 'Option 2', 'Option 3']}
          value={['Option 1', 'Option 2']}
          showSelectedInline
        />
      </Compare>
    </ContentPane>
  );
};
