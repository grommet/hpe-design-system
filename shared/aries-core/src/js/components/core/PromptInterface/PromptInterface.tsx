import { Box, Button, Form, FormField, TextArea } from 'grommet';
import { Attachment, Image, Save, Send } from 'grommet-icons';
import { ScreenReaderOnly } from '../ScreenReaderOnly';

interface PromptInterfaceProps {
  formValue: { message: string };
  onChange: (nextValue: { message: string }) => void;
  onSubmit: () => void;
}

export const PromptInterface: React.FC<PromptInterfaceProps> = ({
  formValue,
  onChange,
  onSubmit,
  ...rest
}) => {
  return (
    <Form value={formValue} onChange={onChange} {...rest}>
      <FormField name="message">
        <Box
          direction="row"
          gap="small"
          align="center"
          justify="between"
          pad={{ right: 'xsmall' }}
        >
          <ScreenReaderOnly>
            <label htmlFor="message">Message</label>
          </ScreenReaderOnly>
          <TextArea
            id="message"
            name="message"
            placeholder="Enter your message..."
            resize={false}
            plain
            focusIndicator={false}
          />
          <Button
            a11yTitle="Submit message"
            icon={<Send />}
            secondary
            onClick={onSubmit}
          />
        </Box>
        <Box direction="row" gap="xsmall" pad="xsmall">
          <Button
            a11yTitle="Attach file"
            icon={<Attachment />}
            onClick={() => {}}
          />
          <Button a11yTitle="Add image" icon={<Image />} onClick={() => {}} />
          <Button
            a11yTitle="Refine context"
            icon={<Save />}
            onClick={() => {}}
          />
        </Box>
      </FormField>
    </Form>
  );
};
