import { App, type McpUiHostContext } from '@modelcontextprotocol/ext-apps';
import { useApp } from '@modelcontextprotocol/ext-apps/react';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { useCallback, useEffect, useState } from 'react';
// import { createRoot } from 'react-dom/client';
import styles from './mcp-app.module.css';

function extractTime(callToolResult: CallToolResult): string {
  const textContent = callToolResult.content?.find((c) => c.type === "text");
  const text = textContent ? textContent.text : '';
  return text;
}

const AppContent = ({
  app,
  hostContext,
  toolResult,
}: {
  app: App;
  hostContext: McpUiHostContext;
  toolResult: CallToolResult | null;
}) => {
  const [serverTime, setServerTime] = useState<string>('Loading...');
  const [messageText, setMessageText] = useState<string>('This is message text.');
  const [logText, setLogText] = useState<string>('This is log text.');
  const [linkUrl, setLinkUrl] = useState<string>('https://modelcontextprotocol.io');

  useEffect(() => {
    if (toolResult) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setServerTime(extractTime(toolResult));
    }
  }, [toolResult]);

  const handleGetTime = useCallback(async () => {
    try {
      console.log('Calling get-time tool...');
      const result = await app.callServerTool({
        name: 'get-time',
        arguments: {},
      });
      const time = extractTime(result);
      console.log('Received time from get-time tool:', time);
      setServerTime(time);
    } catch (error) {
      console.error('Error calling get-time tool:', error);
      setServerTime('Error fetching time');
    }
  }, [app]);

  const handleSendMessage = useCallback(async () => {
    const signal = AbortSignal.timeout(5000);
    try {
      console.log('Sending message to host:', messageText);
      const {isError} = await app.sendMessage(
        { role: 'user', content: [{ type: 'text', text: messageText }] },
        { signal}
      );
      console.info("Message", isError ? "rejected" : "accepted");
    } catch (error) {
      console.error('Error sending message to host:', signal.aborted ? 'Operation timed out' : error);
    }
  }, [app, messageText]);

  const handleSendLog = useCallback(async () => {
    console.info('Sending log to host:', logText);
    await app.sendLog({ level: 'info', data: logText });
  }, [app, logText]);

  const handleOpenLink = useCallback(async () => {
    console.info("Sending open link request to host:", linkUrl);
    const { isError } = await app.openLink({ url: linkUrl });
    console.info("Open link request", isError ? "rejected" : "accepted");
  }, [app, linkUrl]);

  return (
    <main
      className={styles.main}
      style={{
        paddingTop: hostContext?.safeAreaInsets?.top,
        paddingRight: hostContext?.safeAreaInsets?.right,
        paddingBottom: hostContext?.safeAreaInsets?.bottom,
        paddingLeft: hostContext?.safeAreaInsets?.left,
      }}
    >
      <p className={styles.notice}>Watch activity in the DevTools console!</p>

      <div className={styles.action}>
        <p>
          <strong>Server Time:</strong>{' '}
          <code className={styles.serverTime}>{serverTime}</code>
        </p>
        <button onClick={handleGetTime}>Get Server Time</button>
      </div>

      <div className={styles.action}>
        <textarea
          value={messageText}
          onChange={e => setMessageText(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send Message</button>
      </div>

      <div className={styles.action}>
        <input
          type="text"
          value={logText}
          onChange={e => setLogText(e.target.value)}
        />
        <button onClick={handleSendLog}>Send Log</button>
      </div>

      <div className={styles.action}>
        <input
          type="url"
          value={linkUrl}
          onChange={e => setLinkUrl(e.target.value)}
        />
        <button onClick={handleOpenLink}>Open Link</button>
      </div>
    </main>
  );
};

function McpApp() {
  const [toolResult, setToolResult] = useState<CallToolResult | null>(null);
  const [hostContext, setHostContext] = useState<McpUiHostContext | undefined>(
    undefined,
  );

  const { app, error } = useApp({
    appInfo: {
      name: 'Basic Server React MCP App',
      version: '0.1.0',
    },
    capabilities: {},
    onAppCreated: app => {
      app.onteardown = async () => {
        console.log('App is being torn down');
        return {};
      };
      app.ontoolinput = async input => {
        console.log('Received tool call input:', input);
      };
      app.ontoolresult = async result => {
        console.log('Received tool call result:', result);
        setToolResult(result);
      };
      app.ontoolcancelled = params => {
        console.log('Tool call was cancelled:', params.reason);
      };
      app.onerror = error => {
        // Filter out the "unknown message ID" errors during initialization
        // common during MCP app initialization due to React's development 
        // mode running effects twice
        // "Unknown message ID" warnings occur during the initial protocol 
        // handshake when React's Strict Mode causes duplicate initialization attempts.
        if (!error.message?.includes('unknown message ID')) {
          console.error('App error:', error);
        }
      };
      app.onhostcontextchanged = context => {
        console.log('Host context changed:', context);
        setHostContext(prev => ({ ...prev, ...context }));
      };
    },
  });

  useEffect(() => {
    if (app) {
      const initialContext = app.getHostContext();
      // Defer state update to avoid synchronous setState
      setTimeout(() => setHostContext(initialContext), 0);
    }
  }, [app]);

  if (error) {
    return <div>Error initializing app: {error.message}</div>;
  }

  if (!app || !hostContext) {
    return <div>Connecting...</div>;
  }

  return (
    <AppContent app={app} hostContext={hostContext} toolResult={toolResult} />
  );
}

export default McpApp;
