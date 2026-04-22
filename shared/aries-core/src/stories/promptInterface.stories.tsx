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
  render: () => <PromptInterfaceStory />,
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
