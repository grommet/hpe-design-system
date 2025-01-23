import { FormField, TextInput } from 'grommet';
import ContentPane from '../../../../components/ContentPane';
import { Compare } from '../../components';

export const TextInputs = () => {
  return (
    <ContentPane>
      <Compare guidingChild="last">
        <FormField
          label="Label"
          help="Here is help text"
          info="Here is info text"
        >
          <TextInput value="Value" />
        </FormField>
      </Compare>
      <Compare guidingChild="last">
        <FormField
          label="Disabled input"
          help="Here is help text"
          info="Here is info text"
          disabled
        >
          <TextInput value="Value" disabled />
        </FormField>
      </Compare>
    </ContentPane>
  );
};
