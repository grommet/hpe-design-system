import { useState } from 'react';
import { PromptInterface as PromptInterfaceStory } from '../js/components/core/PromptInterface';
import PromptInterfaceSource from '../js/components/core/PromptInterface/PromptInterface.tsx?raw';

const meta = {
  title: 'Patterns/Prompt Interface',
  component: PromptInterfaceStory,
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
};

export default meta;

export const PromptInterface = {
  render: () => {
    const [formValue, setFormValue] = useState<{ message: string }>({ message: '' });

    const onChange = (newValue: { message: string }) => {
      setFormValue(newValue);
    };

    const onSubmit = () => {
      console.log('Submitted message:', formValue.message);
    };

    return (
      <PromptInterfaceStory
        formValue={formValue}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    );
  },
  parameters: {
    docs: {
      source: {
        code: PromptInterfaceSource,
        language: 'tsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};
