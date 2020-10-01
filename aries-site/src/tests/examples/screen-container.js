/* eslint-disable no-undef */
import { Selector } from 'testcafe';
import { waitForReact } from 'testcafe-react-selectors';
import percySnapshot from '@percy/testcafe';
import { baseUrl } from '../utils';

fixture('Screen Container')
  .page(`${baseUrl}/templates/wizard`)
  .beforeEach(async () => {
    await waitForReact();
  });

test('should wrap content, content should fill width on laptop', async t => {
  await percySnapshot(t, 'Screen Container on Laptop');
});

test(`should wrap content, content should fill partial width on 
desktop`, async t => {
  const desktopButton = Selector('button').withText('Desktop');
  await t.click(desktopButton);
  await percySnapshot(t, 'Screen Container on Desktop');
});

test('should not appear on mobile', async t => {
  const mobileButton = Selector('button').withText('Mobile');
  await t.click(mobileButton);
  await percySnapshot(t, 'Screen Container on Mobile');
});

// test(`should not appear on full screen and content should display as if in 
// application`, async t => {
//   const fullScreenButton = Selector('button').withText('See Fullscreen');
//   await t.click(fullScreenButton).wait(500);
//   await percySnapshot(t, 'Fullscreen mode');
// });
