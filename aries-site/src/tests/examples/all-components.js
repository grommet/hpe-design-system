/* eslint-disable no-undef */
import { waitForReact } from 'testcafe-react-selectors';
import Eyes from '@applitools/eyes-testcafe';
import {
  baseUrl,
  startResponsiveSnapshots,
  DESKTOP_WIDTH,
  MOBILE_WIDTH,
} from '../utils';

const title = 'All Components';

fixture(title)
  .page(`${baseUrl}/components/all-components`)
  .beforeEach(async () => {
    await waitForReact();
  });

test('should render all components and theme properly on desktop', async t => {
  const eyes = new Eyes();

  await startResponsiveSnapshots(title, 'desktop', eyes, t);

  // Applitools window capture has a max height of 15000px.
  // Need to take incremental snapshots. Current page height is ~33000px.
  // TO DO: Investigate programmatically getting window height and
  // implementing loop for captures. Async-await was causing issues in
  // initial attempt.
  await eyes.checkWindow({
    tag: 'Region 1',
    target: 'region',
    region: {
      top: 0,
      left: 0,
      height: 15000,
      width: DESKTOP_WIDTH,
    },
  });
  await eyes.checkWindow({
    tag: 'Region 2',
    target: 'region',
    region: {
      top: 15000,
      left: 0,
      height: 15000,
      width: DESKTOP_WIDTH,
    },
  });
  await eyes.checkWindow({
    tag: 'Region 3',
    target: 'region',
    region: {
      top: 30000,
      left: 0,
      height: 15000,
      width: DESKTOP_WIDTH,
    },
  });

  await eyes.close();
  await eyes.waitForResults();
});

test('should render all components and theme properly on mobile', async t => {
  const eyes = new Eyes();

  await startResponsiveSnapshots(title, 'mobile', eyes, t);
  // capture page regions, height is ~32000px
  await eyes.checkWindow({
    tag: 'Region 1',
    target: 'region',
    region: {
      top: 0,
      left: 0,
      height: 15000,
      width: MOBILE_WIDTH,
    },
  });
  await eyes.checkWindow({
    tag: 'Region 2',
    target: 'region',
    region: {
      top: 15000,
      left: 0,
      height: 15000,
      width: MOBILE_WIDTH,
    },
  });
  await eyes.checkWindow({
    tag: 'Region 2',
    target: 'region',
    region: {
      top: 30000,
      left: 0,
      height: 15000,
      width: MOBILE_WIDTH,
    },
  });

  await eyes.close();
  await eyes.waitForResults();
});
