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
  const { height } = document.querySelector('body').getBoundingClientRect();
  const numberRegions = Array(Math.ceil(height / 15000));

  const regions = [];
  numberRegions.forEach(region =>
    regions.push({
      top: region + 1 * 15000,
      left: 0,
      height: 15000,
      width: 1280,
    }),
  );
  async function takeRegionSnapshot(array) {
    array.forEach(async item => {
      await eyes.checkWindow({
        tag: 'Inline',
        fully: true,
        target: 'window',
        region: item,
      });
    });
  }

  takeRegionSnapshot(regions);
  await eyes.close();
  await eyes.waitForResults();
});

test('should render all components and theme properly on mobile', async t => {
  const eyes = new Eyes();

  await startResponsiveSnapshots(title, 'mobile', eyes, t);
  await eyes.checkWindow({ tag: 'Inline', fully: true, target: 'window' });
  await eyes.close();
  await eyes.waitForResults();
});
