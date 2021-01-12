/* eslint-disable no-undef */
import { Selector } from 'testcafe';
import { waitForReact } from 'testcafe-react-selectors';
import Eyes from '@applitools/eyes-testcafe';
import { baseUrl, startResponsiveSnapshots } from '../utils';

const testAllDisplays = async (eyes, t) => {
  const desktopButton = Selector('button').withText('Desktop');
  const laptopButton = Selector('button').withText('Laptop');
  const mobileButton = Selector('button').withText('Mobile');

  await t.click(laptopButton);
  await eyes.checkWindow({ tag: 'Laptop Mode' });

  await t.click(desktopButton);
  await eyes.checkWindow({
    tag: 'Desktop Mode',
    fully: true,
    target: 'window',
  });

  await t.click(mobileButton);
  await eyes.checkWindow({ tag: 'Mobile Mode' });
};

const title = 'Screen Container';

fixture(title)
  .page(`${baseUrl}/templates/wizard`)
  .beforeEach(async () => {
    await waitForReact();
  });

test(`should wrap example content properly on all 
screen layouts on desktop`, async t => {
  const eyes = new Eyes();

  await startResponsiveSnapshots(title, 'desktop', eyes, t);
  await testAllDisplays(eyes, t);

  await eyes.close();
  await eyes.waitForResults();
});

test(`should wrap example content properly on all 
screen layouts on mobile`, async t => {
  const eyes = new Eyes();

  await startResponsiveSnapshots(title, 'mobile', eyes, t);
  await testAllDisplays(eyes, t);

  await eyes.close();
  await eyes.waitForResults();
});
