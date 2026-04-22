
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
	const defaultRows = 2;
	const [rows, setRows] = useState<number | undefined>(defaultRows);

	useEffect(() => {
		const lineCount = formValue.message.split('\n').length;
		if (lineCount > defaultRows) {
			setRows(lineCount);
		} else {
			setRows(defaultRows);
		}
	}, [formValue.message]);

  return (
    <Form value={formValue} onChange={onChange} {...rest}>
      <FormField name="message">
        <Box pad={{ top: '3xsmall' }}>
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
