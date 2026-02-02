import {
  registerAppTool,
  registerAppResource,
  RESOURCE_MIME_TYPE,
} from '@modelcontextprotocol/ext-apps/server';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type {
  CallToolResult,
  ReadResourceResult,
} from '@modelcontextprotocol/sdk/types.js';
import fs from 'node:fs/promises';
import path from 'node:path';

// Work from both source and compiled files (server.ts and dist/server.js)
const DIST_DIR = import.meta.filename.endsWith('.ts')
  ? path.join(import.meta.dirname, 'dist')
  : import.meta.dirname;

export function createServer(): McpServer {
  const server = new McpServer({
    name: 'Basic Server React MCP Server',
    version: '0.1.0',
  });

  const resourceUri = 'ui://get-time/mcp-app.html';

  registerAppTool(
    server,
    'get-time',
    {
      title: 'Get Time Tool',
      description: 'Returns the current server time as an ISO string.',
      inputSchema: {},
      _meta: {
        ui: { resourceUri }, // Link tool to its UI resource
      },
    },
    async (): Promise<CallToolResult> => {
      const time = new Date().toISOString();
      return {
        content: [
          {
            type: 'text',
            text: time,
          },
        ],
      };
    },
  );

  registerAppResource(
    server,
    resourceUri,
    resourceUri,
    {
      mimeType: RESOURCE_MIME_TYPE,
    },
    async (): Promise<ReadResourceResult> => {
      const html = await fs.readFile(
        path.join(DIST_DIR, 'mcp-app.html'),
        'utf-8',
      );
      return {
        contents: [
          { uri: resourceUri, mimeType: RESOURCE_MIME_TYPE, text: html },
        ],
      };
    },
  );

  return server;
}
