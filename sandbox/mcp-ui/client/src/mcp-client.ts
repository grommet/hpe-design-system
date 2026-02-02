import { Client } from '@modelcontextprotocol/sdk/client';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import {
  type ClientCapabilitiesWithExtensions,
  UI_EXTENSION_CAPABILITIES,
} from '@mcp-ui/client';

export async function createMcpClient(serverUrl: string): Promise<Client> {
  const capabilities: ClientCapabilitiesWithExtensions = {
    roots: { listChanged: true },
    extensions: UI_EXTENSION_CAPABILITIES,
  };

  const mcpClient = new Client(
    { name: 'mcp-ui-client', version: '0.1.0' },
    { capabilities },
  );

  const transport = new StreamableHTTPClientTransport(new URL(serverUrl));

  await mcpClient.connect(transport);

  console.log('MCP Client connected to server at', serverUrl);

  return mcpClient;
}
