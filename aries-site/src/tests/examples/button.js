/* eslint-disable no-undef */
import { Selector } from 'testcafe';
import { waitForReact } from 'testcafe-react-selectors';
import Eyes from '@applitools/eyes-testcafe';
import { baseUrl, startResponsiveSnapshots } from '../utils';

const testAllDisplays = async (eyes, t) => {
  const fullScreenButton = Selector('button').withText('See Fullscreen');

  await eyes.checkWindow({ tag: 'Inline' });
  await t.click(fullScreenButton);
  await eyes.checkWindow({ tag: 'Fullscreen' });
};

fixture('Button page')
  .page(`${baseUrl}/components/button`)
  .beforeEach(async () => {
    await waitForReact();
  });

test('should display Button properly inline and fullscreen', async t => {
  const eyes = new Eyes();
  const title = 'Button page';

  await startResponsiveSnapshots(title, 'desktop', eyes, t);
  await testAllDisplays(eyes, t);

  await startResponsiveSnapshots(title, 'mobile', eyes, t);
  await testAllDisplays(eyes, t);

  await eyes.close();
  await eyes.waitForResults();
});
