/* eslint-disable no-undef */
import { Selector } from 'testcafe';
import { waitForReact } from 'testcafe-react-selectors';
import Eyes from '@applitools/eyes-testcafe';
import { baseUrl, startResponsiveSnapshots } from '../utils';

const eyes = new Eyes();

const testAllDisplays = async t => {
  const fullScreenButton = Selector('button').withAttribute(
    'aria-label',
    'See Fullscreen',
  );

  await eyes.checkWindow({ tag: 'Inline', fully: true, target: 'window' });
  await t.click(fullScreenButton);
  await eyes.checkWindow({ tag: 'Fullscreen', fully: true, target: 'window' });
};

const title = 'Button page';

fixture(title)
  .page(`${baseUrl}/components/button`)
  .beforeEach(async () => {
    await waitForReact();
  })
  .afterEach(async () => eyes.close())
  .after(async () => {
    // Wait and collect all test results
    await eyes.waitForResults();
  });

test(`should display Button properly inline and fullscreen on 
desktop`, async t => {
  await startResponsiveSnapshots(title, 'desktop', eyes, t);
  await testAllDisplays(t);
});

test(`should display Button properly inline and fullscreen on 
mobile`, async t => {
  await startResponsiveSnapshots(title, 'mobile', eyes, t);
  await testAllDisplays(t);
});
