import { AppRenderer, type AppRendererHandle } from '@mcp-ui/client';
import { Client } from '@modelcontextprotocol/sdk/client';
import { type CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { useEffect, useRef, useState } from 'react';

interface ToolUIProps {
  client: Client;
  toolName: string;
  toolInput?: Record<string, unknown>;
}

export const ToolUI = ({ client, toolName, toolInput }: ToolUIProps) => {
  const [toolResult, setToolResult] = useState<CallToolResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const appRef = useRef<AppRendererHandle>(null);

  useEffect(() => {
    if (!toolInput) return;

    const callTool = async () => {
      try {
        const result = await client.callTool({
          name: toolName,
          arguments: toolInput,
        });
        setToolResult(result as CallToolResult);
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      }
    };

    callTool();
  }, [client, toolName, toolInput]);

  const sandboxUrl = new URL('/sandbox_proxy.html', window.location.origin);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <AppRenderer
        ref={appRef}
        client={client}
        sandbox={{ url: sandboxUrl }}
        toolName={toolName}
        toolInput={toolInput}
        toolResult={toolResult ?? { content: [] }}
        onOpenLink={async ({ url }) => {
          // Handle link requests from the UI
          window.open(url, '_blank');
          return { isError: false };
        }}
        onMessage={async params => {
          // Handle message requests from the UI (e.g., follow up prompts)
          console.log('Message from UI:', params);
          return { isError: false };
        }}
        onSizeChanged={params => {
          // Handle size change notifications
          console.log('Size changes:', params);
        }}
        onError={error => {
          console.log('UI Error:', error);
          setError(error.message);
        }}
      />
    </div>
  );
};
