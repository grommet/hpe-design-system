/* eslint-disable no-undef */
import { Selector } from 'testcafe';
import { waitForReact } from 'testcafe-react-selectors';
import percySnapshot from '@percy/testcafe';
import { baseUrl } from '../utils';

fixture('Button page')
  .page(`${baseUrl}/components/button`)
  .beforeEach(async () => {
    await waitForReact();
  });

test('should render Button inline example properly', async t => {
  await percySnapshot(t, 'Button page');
});

test('should render Button full screen example properly', async t => {
  const fullScreenButton = Selector('button').withText('See Fullscreen');
  await t.click(fullScreenButton);
  await percySnapshot(t, 'Full screen button');
});
