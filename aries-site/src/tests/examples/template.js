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
  await eyes.checkWindow({
    tag: 'Inline - Laptop Mode',
    fully: true,
    target: 'window',
  });

  await t.click(mobileButton);
  await eyes.checkWindow({
    tag: 'Inline - Mobile Mode',
    fully: true,
    target: 'window',
  });

  await t.click(fullScreenButton);
  await eyes.checkWindow({
    tag: 'Fullscreen Mode',
    fully: true,
    target: 'window',
  });
};

const title = 'Template Page (Persistent Nav)';

fixture(title)
  .page(`${baseUrl}/templates/persistent-navigation`)
  .beforeEach(async () => {
    await waitForReact();
  });

test(`should render dashboard properly across all display 
modes on desktop`, async t => {
  const eyes = new Eyes();
  await startResponsiveSnapshots(title, 'desktop', eyes, t);
  await testAllDisplays(eyes, t);

  await eyes.close();
  await eyes.waitForResults();
});

test(`should render dashboard properly across all display 
modes on mobile`, async t => {
  const eyes = new Eyes();
  await startResponsiveSnapshots(title, 'mobile', eyes, t);
  await testAllDisplays(eyes, t);

  await eyes.close();
  await eyes.waitForResults();
});
