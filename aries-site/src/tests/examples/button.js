import { Selector } from 'testcafe';
import { waitForReact } from 'testcafe-react-selectors';
import { baseUrl, takeResponsiveSnapshots } from '../utils';

fixture('Button page')
  .page(`${baseUrl}/components/button`)
  .beforeEach(async () => {
    await waitForReact();
  });

test('should align Button to center of inline Example', async t => {
  await takeResponsiveSnapshots(t, 'Button page');
});

test('should align Button to center of full screen layer', async t => {
  const fullScreenButton = Selector('button').withText('See Fullscreen');
  await t.click(fullScreenButton);
  await takeResponsiveSnapshots(t, 'Full screen button example');
});
