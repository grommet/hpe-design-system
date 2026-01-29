import { createUIResource } from '@mcp-ui/server';

const example01Resource = createUIResource({
  uri: 'ui://my-component/example01',
  content: {
    type: 'rawHtml',
    htmlString: `<p>This is an example of a raw HTML UI resource.</p>`,
  },
  encoding: 'text',
  metadata: {
    title: 'Example 01 UI Resource',
    description: 'An example UI resource demonstrating raw HTML content.',
    created: new Date().toISOString(),
    preferredRenderContext: 'main',
  },
  uiMetadata: {
    'preferred-frame-size': ['medium', 'small'],
    'initial-render-data': {
      theme: 'dark',
    },
  },
});

export { example01Resource };
