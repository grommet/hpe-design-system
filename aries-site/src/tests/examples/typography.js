/* eslint-disable no-undef */
import { Selector } from 'testcafe';
import { waitForReact } from 'testcafe-react-selectors';
import Eyes from '@applitools/eyes-testcafe';
import { baseUrl, startResponsiveSnapshots } from '../utils';

const testAllDisplays = async (eyes, t) => {
  const fullScreenButton = Selector('button').withText('See Fullscreen');

  await eyes.checkWindow({ tag: 'Inline', fully: true, target: 'window' });
  await t.click(fullScreenButton);
  await eyes.checkWindow({ tag: 'Fullscreen', fully: true, target: 'window' });
};

const title = 'Typography page';

fixture(title)
  .page(`${baseUrl}/foundation/typography`)
  .beforeEach(async () => {
    await waitForReact();
  });

test(`should display Typography properly inline and fullscreen on 
desktop`, async t => {
  const eyes = new Eyes();

  await startResponsiveSnapshots(title, 'desktop', eyes, t);
  await testAllDisplays(eyes, t);

  await eyes.close();
  await eyes.waitForResults();
});

test(`should display Typography properly inline and fullscreen on 
mobile`, async t => {
  const eyes = new Eyes();

  await startResponsiveSnapshots(title, 'mobile', eyes, t);
  await testAllDisplays(eyes, t);

  await eyes.close();
  await eyes.waitForResults();
});
