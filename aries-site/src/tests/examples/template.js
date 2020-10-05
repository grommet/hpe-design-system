import { Selector } from 'testcafe';
import { waitForReact } from 'testcafe-react-selectors';
import { baseUrl, takeResponsiveSnapshots } from '../utils';

fixture('Template')
  .page(`${baseUrl}/templates/persistent-navigation`)
  .beforeEach(async () => {
    await waitForReact();
  });

test('should render filling inline Example width on laptop', async t => {
  await takeResponsiveSnapshots(t, 'Template inline on Laptop');
});

test('should render at partial width on inline Example on mobile', async t => {
  const mobileButton = Selector('button').withText('Mobile');
  await t.click(mobileButton);
  await takeResponsiveSnapshots(t, 'Template inline on mobile');
});

test('should render full screen when in Fullscreen mode', async t => {
  const fullScreenButton = Selector('button').withText('See Fullscreen');
  await t.click(fullScreenButton);
  await takeResponsiveSnapshots(t, 'Template in fullscreen mode');
});
