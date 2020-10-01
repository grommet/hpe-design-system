/* eslint-disable no-undef */
import { Selector } from 'testcafe';
import { waitForReact } from 'testcafe-react-selectors';
import percySnapshot from '@percy/testcafe';
import { baseUrl } from '../utils';

fixture('Template')
  .page(`${baseUrl}/templates/persistent-navigation`)
  .beforeEach(async () => {
    await waitForReact();
  });

test('should render filling inline Example width', async t => {
  await percySnapshot(t, 'Template inline on Laptop');
});

test('should render at partial width on inline Example', async t => {
  const mobileButton = Selector('button').withText('Mobile');
  await t.click(mobileButton);
  await percySnapshot(t, 'Template inline on Mobile');
});

test('should render full screen when in Fullscreen mode', async t => {
  const fullScreenButton = Selector('button').withText('See Fullscreen');
  await t.click(fullScreenButton);
  await percySnapshot(t, 'Template fullscreen on Laptop');
});
