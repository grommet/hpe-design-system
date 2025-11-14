# Contributing

Thanks for helping us make the HPE Design System better! You came to the right place to start your contribution.

## Project Structure

The HPE Design System is a monorepo built from two modules.
See the [README](https://github.com/grommet/hpe-design-system#welcome-to-hpe-design-system)
for a break down of the Design System structure.

## Submitting Pull Requests

To make a pull request you will need a GitHub account. For help, see
GitHub’s documentation on [forking] and [pull requests].

1. Fork the hpe-design-system repository
2. Clone the repository

```
git clone https://github.com/grommet/hpe-design-system.git
```

3. Install dependencies

```
pnpm install
```

4. Implement your changes

### Committing your changes

To commit your changes: `git commit`

Upon running this command, pre-commit checks will run:

- Ensuring consistent code formatting, best practices, and enforce code style guidelines (Prettier & ESLint)
- Executing testing suites:
  - Unit tests (future)
  - End-to-end tests ([TestCafe](https://devexpress.github.io/testcafe/documentation/getting-started/))

#### About TestCafe

TestCafe is tool which assists end-to-end testing (i.e. test behavior and interactions for applications / Websites) across browsers and operating systems. TestCafe executes these tests in live browser instances (as opposed to simulated or headless environments).

NOTE: Things to be aware of while the TestCafe test suites are running.

- TestCafe will launch a browser instance for any browsers you have on your local machine
- Browser windows must be in focus in order for the tests to run. If the browser window is minimized or hidden by other windows, the test will pause and will not complete until the browser is in focus.

Linting and end-to-end tests are run using husky.

#### aries-site

- There are pre-commit hooks in place that will run linting checks and
  fixes. It will then run the test suites that we have in place for aries-site.
- [TestCafe](https://devexpress.github.io/testcafe/documentation/getting-started/) is used as our end-to-end testing. While running the tests, your local browsers will open with TestCafe. During this time DO NOT CLOSE OR MINIMIZE YOUR BROWSER WINDOWS. The browser will need to stay in focus in order
  to run and complete all of the test suites.
- The [tests will pause](https://github.com/DevExpress/testcafe/issues/1198) if they are not in focus which will lead to pre-commits taking much longer then needed.
- If your test suites are taking longer than 2.5 minutes, make sure your browser windows are in focus and running.

After the pre-commit checks are finished on aries-site, they will be run on aries-core.

#### aries-core

- The pre-commit checks will run linting checks for aries-core.

### Completed Pre-Commits

Once all of the pre-commit checks are passed, you can add your commit message and push up a PR to be reviewed.
