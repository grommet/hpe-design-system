import { CheckBox, FormField } from 'grommet';
import ContentPane from '../../../../components/ContentPane';
import { Compare, StyleInProgress } from '../../components';

export const Checkboxes = () => {
  return (
    <ContentPane>
      <StyleInProgress />
      <Compare>
        <CheckBox label="Checkbox label" />
      </Compare>
      <Compare guidingChild="last">
        <FormField label="Label">
          <CheckBox label="Checkbox label" />
        </FormField>
      </Compare>
      <Compare guidingChild="last">
        <FormField label="Label" error="There is an error.">
          <CheckBox label="Checkbox label" />
        </FormField>
      </Compare>
    </ContentPane>
  );
};
