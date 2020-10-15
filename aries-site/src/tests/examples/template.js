/* eslint-disable no-undef */
import { Selector } from 'testcafe';
import { waitForReact } from 'testcafe-react-selectors';
import Eyes from '@applitools/eyes-testcafe';
import { baseUrl, startResponsiveSnapshots } from '../utils';

const testAllDisplays = async (eyes, t) => {
  const fullScreenButton = Selector('button').withText('See Fullscreen');
  const laptopButton = Selector('button').withText('Laptop');
  const mobileButton = Selector('button').withText('Mobile');

  await t.click(laptopButton);
  await eyes.checkWindow({ tag: 'Inline - Laptop Mode' });

  await t.click(mobileButton);
  await eyes.checkWindow({ tag: 'Inline - Mobile Mode' });

  await t.click(fullScreenButton);
  await eyes.checkWindow({ tag: 'Fullscreen Mode' });
};

fixture('Template')
  .page(`${baseUrl}/templates/persistent-navigation`)
  .beforeEach(async () => {
    await waitForReact();
  });

test('should render dashboard properly across all display modes', async t => {
  const eyes = new Eyes();
  const title = 'Template Page (Persistent Nav)';
  await startResponsiveSnapshots(title, 'desktop', eyes, t);
  await testAllDisplays(eyes, t);

  await startResponsiveSnapshots(title, 'mobile', eyes, t);
  await testAllDisplays(eyes, t);

  await eyes.close();
  await eyes.waitForResults();
});
