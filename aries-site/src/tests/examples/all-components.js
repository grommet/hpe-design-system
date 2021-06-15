/* eslint-disable no-undef */
import { waitForReact } from 'testcafe-react-selectors';
import Eyes from '@applitools/eyes-testcafe';
import { baseUrl, startResponsiveSnapshots } from '../utils';

const title = 'All Components';

fixture(title)
  .page(`${baseUrl}/components/all-components`)
  .beforeEach(async () => {
    await waitForReact();
  });

test('should render all components and theme properly on desktop', async t => {
  const eyes = new Eyes();

  await startResponsiveSnapshots(title, 'desktop', eyes, t);
  await eyes.checkWindow({ tag: 'Inline', fully: true, target: 'window' });
  await eyes.close();
  await eyes.waitForResults();
});

test('should render all components and theme properly on mobile', async t => {
  const eyes = new Eyes();

  await startResponsiveSnapshots(title, 'mobile', eyes, t);
  await eyes.checkWindow({ tag: 'Inline', fully: true, target: 'window' });
  await eyes.close();
  await eyes.waitForResults();
});
