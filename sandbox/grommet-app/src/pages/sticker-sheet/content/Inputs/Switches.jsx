import { CheckBox } from 'grommet';
import ContentPane from '../../../../components/ContentPane';
import { Compare, StyleInProgress } from '../../components';

export const Switches = () => {
  return (
    <ContentPane>
      <StyleInProgress />
      <Compare>
        <CheckBox label="Switch label" toggle />
        <CheckBox label="Switch label" toggle checked />
        <CheckBox label="Switch label" toggle disabled />
      </Compare>
    </ContentPane>
  );
};
