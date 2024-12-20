import { FormField, RadioButtonGroup } from 'grommet';
import ContentPane from '../../../../components/ContentPane';
import { Compare, StyleInProgress } from '../../components';

export const RadioButtonGroups = () => {
  return (
    <ContentPane>
      <StyleInProgress />
      <Compare guidingChild="last">
        <RadioButtonGroup
          options={['Option 1', 'Option 2', 'Option 3']}
          value="Option 2"
          name="radio-group"
        />
      </Compare>
      <Compare>
        <FormField label="Label">
          <RadioButtonGroup
            options={['Option 1', 'Option 2', 'Option 3']}
            value="Option 2"
            name="radio-group-form"
          />
        </FormField>
      </Compare>
    </ContentPane>
  );
};
