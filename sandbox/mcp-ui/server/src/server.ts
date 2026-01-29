import express from 'express';
import cors from 'cors';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  registerAppTool,
  registerAppResource,
} from '@modelcontextprotocol/ext-apps/server';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { isInitializeRequest } from '@modelcontextprotocol/sdk/types.js';
import { createUIResource } from '@mcp-ui/server';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { example01Resource } from './resources/example01.ts';

const app = express();
const port = 3000;

app.use(
  cors({
    origin: '*',
    exposedHeaders: ['Mcp-Session-Id'],
    allowedHeaders: ['Content-Type', 'Mcp-Session-Id'],
  }),
);
app.use(express.json());

// Map to store transports by session ID
const transports: { [sessionId: string]: StreamableHTTPServerTransport } = {};

// Handle POST requests to /mcp
app.post('/mcp', async (req, res) => {
  const sessionId = req.header('Mcp-Session-Id') as string | undefined;
  let transport: StreamableHTTPServerTransport;

  if (sessionId && transports[sessionId]) {
    // Reuse existing transport for the session
    transport = transports[sessionId];
  } else if (!sessionId && isInitializeRequest(req.body)) {
    // Create a new transport for a new session
    transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => randomUUID(),
      onsessioninitialized: newSessionId => {
        transports[newSessionId] = transport;
        console.log(`MCP session initialized: ${newSessionId}`);
        // res.setHeader('Mcp-Session-Id', newSessionId);
      },
    });

    // Clean up transport on session end
    transport.onclose = () => {
      if (transport.sessionId && transports[transport.sessionId]) {
        delete transports[transport.sessionId];
        console.log(`MCP session ended: ${transport.sessionId}`);
      }
    };

    const mcpServer = new McpServer({
      name: 'mcp-ui-server',
      version: '0.1.0',
    });

    // Register MCP UI tool
    mcpServer.registerTool(
      'greet',
      {
        title: 'Greeting Tool',
        description: 'A tool that provides UI greeting messages.',
        inputSchema: {},
      },
      async () => {
        const uiResource = createUIResource({
          uri: 'ui://greeting',
          content: {
            type: 'externalUrl',
            iframeUrl: 'https://example.com/greeting-ui',
          },
          encoding: 'text',
        });

        return {
          content: [uiResource],
        };
      },
    );

    // Register additional app tools or resources as needed
    // Example: registerAppTool(mcpServer, myCustomTool);
    // Example: registerAppResource(mcpServer, myCustomResource);

    // Register resource handler
    registerAppResource(
      mcpServer,
      'example01',
      example01Resource.resource.uri,
      {},
      async () => {
        return {
          contents: [example01Resource.resource],
        };
      },
    );

    // Register tool with _meta.ui.resourceUri
    registerAppTool(
      mcpServer,
      'show_example01',
      {
        title: 'Show Example 01',
        description: 'Tool to show example01 UI resource.',
        inputSchema: {
          query: z.string().describe('User query'),
        },
        _meta: {
          ui: {
            resourceUri: example01Resource.resource.uri,
          },
        },
      },
      async ({ query }: { query: string }) => {
        return {
          content: [{ type: 'text', text: `Processing: ${query}` }],
        };
      },
    );

    // Connect MCP server to the transport
    await mcpServer.connect(transport);
  } else {
    return res.status(400).json({
      error: { message: 'Bad Request: Invalid session ID or request body' },
    });
  }

  await transport.handleRequest(req, res, req.body);
});

// Reusable handler for GET and DELETE requests
const handleSessionRequest = (req: express.Request, res: express.Response) => {
  const sessionId = req.header('Mcp-Session-Id') as string | undefined;

  if (!sessionId || !transports[sessionId]) {
    return res.status(400).send('Session not found or invalid session ID');
  }

  const transport = transports[sessionId];
  transport.handleRequest(req, res);
};

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// GET handles the long-lived streaming connection for server-to-client messages
app.get('/mcp', handleSessionRequest);

// DELETE handles session termination from the client
app.delete('/mcp', handleSessionRequest);

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
  console.log(`MCP endpoint available at http://localhost:${port}/mcp`);
});
