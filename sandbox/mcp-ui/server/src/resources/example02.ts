import { createUIResource } from '@mcp-ui/server';
// import { Chart } from './Chart.tsx';
import myhtml from './example02.html?raw';

const example02Resource = createUIResource({
  uri: 'ui://my-component/example02',
  content: {
    type: 'rawHtml',
    // htmlString: Chart({ data: myData }),
    htmlString: myhtml,
  },
  encoding: 'text',
  metadata: {
    title: 'Example 02 UI Resource',
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

export { example02Resource };
