import { CheckBoxGroup, FormField } from 'grommet';
import ContentPane from '../../../../components/ContentPane';
import { Compare, StyleInProgress } from '../../components';

export const CheckboxGroups = () => {
  return (
    <ContentPane>
      <StyleInProgress />
      <Compare guidingChild="last">
        <CheckBoxGroup
          options={[
            { label: 'Option 1' },
            { label: 'Option 2' },
            { label: 'Option 3', disabled: true },
          ]}
          value={['Option 2']}
        />
      </Compare>
      <Compare>
        <FormField label="Label">
          <CheckBoxGroup
            options={['Option 1', 'Option 2', 'Option 3']}
            value={['Option 2']}
          />
        </FormField>
      </Compare>
      <Compare>
        <FormField label="Label" error="There is an error">
          <CheckBoxGroup
            options={['Option 1', 'Option 2', 'Option 3']}
            value={['Option 2']}
          />
        </FormField>
      </Compare>
    </ContentPane>
  );
};
