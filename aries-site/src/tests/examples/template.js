/* eslint-disable no-undef */
import { Selector } from 'testcafe';
import { waitForReact } from 'testcafe-react-selectors';
import Eyes from '@applitools/eyes-testcafe';
import { baseUrl, startResponsiveSnapshots } from '../utils';

const eyes = new Eyes();

const testAllDisplays = async t => {
  const fullScreenButton = Selector('button').withAttribute(
    'aria-label',
    'Interact in fullscreen',
  );
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

const title = 'Template Page (Dashboards)';

fixture(title)
  .page(`${baseUrl}/templates/dashboards`)
  .beforeEach(async () => {
    await waitForReact();
  })
  .afterEach(async () => eyes.close())
  .after(async () => {
    // Wait and collect all test results
    await eyes.waitForResults();
  });

test(`should render dashboard properly across all display 
modes on desktop`, async t => {
  await startResponsiveSnapshots(title, 'desktop', eyes, t);
  await testAllDisplays(t);
});

test(`should render dashboard properly across all display 
modes on mobile`, async t => {
  await startResponsiveSnapshots(title, 'mobile', eyes, t);
  await testAllDisplays(t);
});
