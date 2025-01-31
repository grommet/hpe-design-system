import { DateInput } from 'grommet';
import ContentPane from '../../../../components/ContentPane';
import { Compare } from '../../components';

export const DateInputs = () => {
  return (
    <ContentPane>
      <Compare>
        <DateInput
          format="mm/dd/yyyy-mm/dd/yyyy"
          inline
          value={[
            new Date().toISOString(),
            new Date(+new Date() + 86400000 * 9).toISOString(),
          ]}
        />
      </Compare>
    </ContentPane>
  );
};
