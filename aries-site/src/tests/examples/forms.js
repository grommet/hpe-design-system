/* eslint-disable no-undef */
import { waitForReact } from 'testcafe-react-selectors';
import Eyes from '@applitools/eyes-testcafe';
import { baseUrl, startResponsiveSnapshots } from '../utils';

const title = 'Forms';

fixture(title)
  .page(`${baseUrl}/templates/forms`)
  .beforeEach(async () => {
    await waitForReact();
  });

test('should render inputs and default values properly', async t => {
  const eyes = new Eyes();

  await startResponsiveSnapshots(title, 'desktop', eyes, t);
  await eyes.checkWindow().close().waitForResults();
});
