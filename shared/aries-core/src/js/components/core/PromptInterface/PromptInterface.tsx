
import { Box, Button, Footer, Form, FormField, TextArea } from 'grommet';
import { Add, Send } from '@hpe-design/icons-grommet';
import { ScreenReaderOnly } from '../ScreenReaderOnly';
import { useEffect, useState } from 'react';

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
	const textareaId = 'message';
	const defaultRows = 2;
	const [rows, setRows] = useState<number | undefined>(defaultRows);

	// Dynamically adjust TextArea rows based on content, with a minimum of defaultRows
	useEffect(() => {
		const el = document.getElementById(textareaId);
		if (!el) return;
		const style = window.getComputedStyle(el);
		const lineHeight = parseInt(style.lineHeight || '0', 10);
		const padding =
			parseInt(style.paddingTop || '0', 10) +
			parseInt(style.paddingBottom || '0', 10);
		const visualLines = Math.floor((el.scrollHeight - padding) / lineHeight);

		if (visualLines > defaultRows) {
			setRows(visualLines);
		} else {
			setRows(defaultRows);
		}
	}, [formValue.message]);

  return (
    <Form value={formValue} onChange={onChange} {...rest}>
      <FormField name="message">
        <Box pad={{ top: '3xsmall' }}>
          <ScreenReaderOnly>
            <label htmlFor={textareaId}>Message</label>
          </ScreenReaderOnly>
          <TextArea
            id={textareaId}
            name="message"
            placeholder="Enter your message..."
            resize={false}
            plain
            focusIndicator={false}
						onKeyUp={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                onSubmit();
              }
            }}
						rows={rows}
          />
        </Box>
        <Footer
          pad={{ horizontal: 'xsmall', vertical: '3xsmall' }}
          responsive={false}
        >
          <Box direction="row" gap="3xsmall">
            <Button
              a11yTitle="Add context"
              icon={<Add />}
              onClick={() => {}}
              secondary
            />
          </Box>
          <Button
            a11yTitle="Submit message"
            icon={<Send />}
            secondary
            onClick={onSubmit}
          />
        </Footer>
      </FormField>
    </Form>
  );
};
