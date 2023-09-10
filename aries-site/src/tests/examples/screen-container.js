/* eslint-disable no-undef */
import { Selector } from 'testcafe';
import { waitForReact } from 'testcafe-react-selectors';
import Eyes from '@applitools/eyes-testcafe';
import { baseUrl, startResponsiveSnapshots } from '../utils';

const eyes = new Eyes();

const testAllDisplays = async t => {
  const laptopButton = Selector('button').withText('Laptop');
  const mobileButton = Selector('button').withText('Mobile');

  await t.click(laptopButton);
  await eyes.checkWindow({ tag: 'Laptop Mode', fully: true, target: 'window' });

  await t.click(mobileButton);
  await eyes.checkWindow({ tag: 'Mobile Mode', fully: true, target: 'window' });
};

const title = 'Screen Container';

fixture(title)
  .page(`${baseUrl}/templates/wizard`)
  .beforeEach(async () => {
    await waitForReact();
  })
  .afterEach(async () => eyes.close())
  .after(async () => {
    // Wait and collect all test results
    await eyes.waitForResults();
  });

test(`should wrap example content properly on all 
screen layouts on desktop`, async t => {
  await startResponsiveSnapshots(title, 'desktop', eyes, t);
  await testAllDisplays(t);
});

test(`should wrap example content properly on all 
screen layouts on mobile`, async t => {
  await startResponsiveSnapshots(title, 'mobile', eyes, t);
  await testAllDisplays(t);
});
