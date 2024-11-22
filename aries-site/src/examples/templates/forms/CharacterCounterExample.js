import React, { useContext, useState } from 'react';
import { AnnounceContext, Form, FormField, TextArea } from 'grommet';

export const CharacterCounterExample = () => {
  const announce = useContext(AnnounceContext);
  const maxCharacterCount = 40;
  const threshold = maxCharacterCount * 0.5;
  const [value, setValue] = useState('');

  const handleFocus = () => {
    announce('The textarea has a maxium character count of 40.');
  };

  const handleChange = event => {
    const newValue = event.target.value;
    setValue(newValue);

    // Announce when the user exceeds the threshold
    if (newValue.length >= threshold && newValue.length < maxCharacterCount) {
      announce(
        `You have reached ${Math.round(
          (newValue.length / maxCharacterCount) * 100,
        )}% of the character limit.`,
      );
    } else if (newValue.length >= maxCharacterCount) {
      announce(
        `You have exceeded the maximum character
         limit of ${maxCharacterCount}.`,
      );
    }
  };
  return (
    <Form validate="change">
      <FormField
        contentProps={{ width: 'medium' }}
        label="Issue description"
        validate={{ max: 40, threshold: 0.5 }}
        name="issue-description"
        htmlFor="issue-description"
      >
        <TextArea
          value={value}
          onChange={handleChange}
          id="issue-description"
          name="issue-description"
          onFocus={handleFocus}
        />
      </FormField>
    </Form>
  );
};
