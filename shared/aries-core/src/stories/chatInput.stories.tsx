import { ChatInput as ChatInputExample } from '../js/components/core/ChatInput';
import ChatInputSource from '../js/components/core/ChatInput/ChatInput.tsx?raw';

const meta = {
  title: 'Patterns/Chat Input',
  component: ChatInputExample,
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
};

export default meta;

export const ChatInput = {
  render: () => <ChatInputExample />,
  parameters: {
    docs: {
      source: {
        code: ChatInputSource,
        language: 'tsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};
