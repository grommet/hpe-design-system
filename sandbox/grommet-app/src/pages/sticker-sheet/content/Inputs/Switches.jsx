import { CheckBox } from 'grommet';
import ContentPane from '../../../../components/ContentPane';
import { Compare } from '../../components';

export const Switches = () => {
  return (
    <ContentPane>
      <Compare>
        <CheckBox label="Switch label" toggle />
        <CheckBox label="Switch label" toggle checked />
        <CheckBox label="Switch label" toggle disabled />
        <CheckBox label="Switch label" toggle disabled checked />
      </Compare>
    </ContentPane>
  );
};
