/* eslint-disable no-undef */
import { waitForReact } from 'testcafe-react-selectors';
import Eyes from '@applitools/eyes-testcafe';
import { baseUrl, startResponsiveSnapshots } from '../utils';

const title = 'All Components';

fixture(title)
  .page(`${baseUrl}/components/all-components`)
  .beforeEach(async () => {
    await waitForReact();
  });

test('should render all components and theme properly on desktop', async t => {
  const eyes = new Eyes();

  await startResponsiveSnapshots(title, 'desktop', eyes, t);

  // capture page regions, height is ~33000px
  await eyes.checkWindow({
    tag: 'Region 1',
    fully: true,
    target: 'window',
    region: {
      top: 0,
      left: 0,
      height: 15000,
      width: 1280,
    },
  });
  await eyes.checkWindow({
    tag: 'Region 2',
    fully: true,
    target: 'window',
    region: {
      top: 15000,
      left: 0,
      height: 15000,
      width: 1280,
    },
  });
  await eyes.checkWindow({
    tag: 'Region 3',
    fully: true,
    target: 'window',
    region: {
      top: 30000,
      left: 0,
      height: 15000,
      width: 1280,
    },
  });

  await eyes.close();
  await eyes.waitForResults();
});

test('should render all components and theme properly on mobile', async t => {
  const eyes = new Eyes();

  await startResponsiveSnapshots(title, 'mobile', eyes, t);
  // capture page regions, height is ~28000px
  await eyes.checkWindow({
    tag: 'Region 1',
    fully: true,
    target: 'window',
    region: {
      top: 0,
      left: 0,
      height: 15000,
      width: 1280,
    },
  });
  await eyes.checkWindow({
    tag: 'Region 2',
    fully: true,
    target: 'window',
    region: {
      top: 15000,
      left: 0,
      height: 15000,
      width: 1280,
    },
  });

  await eyes.close();
  await eyes.waitForResults();
});
