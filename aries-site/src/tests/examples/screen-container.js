/* eslint-disable no-undef */
import { Selector } from 'testcafe';
import { waitForReact } from 'testcafe-react-selectors';
import { baseUrl, takeResponsiveSnapshots } from '../utils';

fixture('Screen Container')
  .page(`${baseUrl}/templates/wizard`)
  .beforeEach(async () => {
    await waitForReact();
  });

test('should wrap content, content should fill width on laptop', async t => {
  await takeResponsiveSnapshots(t, 'Screen Container on Laptop');
});

test(`should wrap content, content should fill partial width on 
desktop`, async t => {
  const desktopButton = Selector('button').withText('Desktop');
  await t.click(desktopButton);
  await takeResponsiveSnapshots(t, 'Screen Container on Desktop');
});

test('should not appear on mobile', async t => {
  const mobileButton = Selector('button').withText('Mobile');
  await t.click(mobileButton);
  await takeResponsiveSnapshots(t, 'Screen Container on Mobile');
});
