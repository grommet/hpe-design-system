import { useEffect, useState } from 'react';
import { Client } from '@modelcontextprotocol/sdk/client';
import { createMcpClient } from './mcp-client';
import { ToolUI } from './ToolUI';

function App() {
  const [client, setClient] = useState<Client | null>(null);
  const [tools, setTools] = useState<any[]>([]);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [toolInput, setToolInput] = useState<
    Record<string, unknown> | undefined
  >(undefined);
  const [error, setError] = useState<string | null>(null);

  // Connect to MCP server on mount
  useEffect(() => {
    const connect = async () => {
      try {
        const mcpClient = await createMcpClient('http://localhost:3000/mcp');
        setClient(mcpClient);

        const toolsResult = await mcpClient.listTools({});
        setTools(toolsResult.tools);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      }
    };

    connect();
  }, []);

  const toolsWithUI = tools.filter(tool => tool._meta?.ui?.resourceUri);
  console.log('All tools:', tools);
  console.log('Available tools with UI:', toolsWithUI);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!client) {
    return <div>Connecting to MCP server...</div>;
  }

  return (
    <>
      <h1>MCP Apps Client Demo</h1>
      <div>
        <h2>Available Tools with UI</h2>
        {toolsWithUI.length === 0 ? (
          <div>No tools with UI available.</div>
        ) : (
          <ul>
            {toolsWithUI.map(tool => (
              <li key={tool.name}>
                <button
                  onClick={() => {
                    setSelectedTool(tool.name);
                    setToolInput({ query: 'Hello from client!' });
                  }}
                >
                  {tool.name}
                </button>
                <span>{tool.description}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        {selectedTool ? (
          <>
            <h2>Tool UI: {selectedTool}</h2>
            <ToolUI
              client={client}
              toolName={selectedTool}
              toolInput={toolInput}
            />
          </>
        ) : (
          <div>Please select a tool to view its UI.</div>
        )}
      </div>
    </>
  );
}

export default App;
