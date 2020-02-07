const createTestCafe = require('testcafe');
const BrowserStack = require('browserstack');

const browserStackCredentials = {
  username: process.env.BROWSERSTACK_USERNAME,
  password: process.env.BROWSERSTACK_PASSWORD,
};

// TBD: What browsers to we want to test against
const SUPPORTED_BROWSERS = ['browserstack:firefox@72.0:Windows 10'];

async function getRunningBrowserstackSessions() {
  const client = BrowserStack.createClient(browserStackCredentials);
  const workerStatus = await new Promise((resolve, reject) => {
    client.getApiStatus((error, workers) => {
      if (error) reject(error);
      else resolve(workers);
    });
  });
  return workerStatus;
}

async function createTestCafeInstance(browsers, testFiles) {
  let testcafe;
  await createTestCafe()
    .then(tc => {
      testcafe = tc;
      return tc
        .createRunner()
        .startApp('yarn next start')
        .src(testFiles)
        .browsers(browsers)
        .run();
    })
    .then(failedCount => {
      console.log(`Tests failed: ${failedCount}`);
      testcafe.close();
    })
    .catch(err => console.error(err));
}

async function startTests(browsers) {
  // Check that there are no tests already running
  const sessionInfo = await getRunningBrowserstackSessions();
  if (sessionInfo.running_sessions !== 0) {
    console.error(
      // eslint-disable-next-line max-len
      'There are not enough available Browserstack workers to run these tests. \nPlease cancel any running sessions from the Browserstack Automate dashboard and try again. \n',
    );
  } else {
    // Create a new testcafe instance for each batch of browsers
    for (let i = 0; i < browsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await createTestCafeInstance(browsers[i], 'src/tests/');
    }
  }
}

startTests(SUPPORTED_BROWSERS);
