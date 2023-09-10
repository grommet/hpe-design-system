/* eslint-disable no-undef */
import { waitForReact } from 'testcafe-react-selectors';
import Eyes from '@applitools/eyes-testcafe';
import { baseUrl, startResponsiveSnapshots } from '../utils';

const title = 'Forms';

const eyes = new Eyes();

fixture(title)
  .page(`${baseUrl}/templates/forms`)
  .beforeEach(async () => {
    await waitForReact();
  })
  .afterEach(async () => eyes.close())
  .after(async () => {
    // Wait and collect all test results
    await eyes.waitForResults();
  });

test('should render inputs and default values properly', async t => {
  await startResponsiveSnapshots(title, 'desktop', eyes, t);
  await eyes.checkWindow({ fully: true, target: 'window' });
});
