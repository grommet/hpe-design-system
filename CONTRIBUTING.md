# Contributing 
Thanks for helping us make the HPE Design System better! You came to the right place to start your contribution.

## Project Structure
The HPE Design System is a monorepo built from two modules.
See the [README](https://github.com/hpe-design/design-system#welcome-to-hpe-design-system)
for a break down of the Design System structure.

## How to Contribute 
Code, Code, Code...

## Submitting Pull Requests 
To make a pull request you will need a GitHub account. For help, see
GitHub’s documentation on [forking] and [pull requests].
1. Fork the design-system repository
1. Clone the repository
```
git clone https://github.com/hpe-design/design-system.git
```
3. Install dependencies
```
yarn install
```

### Pre Commits
Linting and end-to-end tests are run using husky.

#### aries-site
- There are pre-commit hooks in place that will run linting checks and
fixes. It will then run the test suites that we have in place for Aries-Site.
- [TestCafe](https://devexpress.github.io/testcafe/documentation/getting-started/) is used as our end-to-end testing. While running the tests, your local browsers will open with TestCafe. During this time DO NOT CLOSE OR MINIMIZE YOUR BROWSER WINDOWS. The browser will need to stay in focus in order
to run and complete all of the test suites.
- The [tests will pause](https://github.com/DevExpress/testcafe/issues/1198) if they are not in focus which will lead to pre-commits taking much longer than needed. If your pre-commit checks are taking longer than 2.5 minutes, it is likely that your browser is not in focus. Put your browser in focus to allow the checks to continue.
After the pre-commit checks are finished on aries-site, they will be run on aries-core.

#### aries-core
- The pre-commit checks will run linting checks for aries-core.

### Completed Pre-Commits
Once all of the pre-commit checks are passed, you can add your commit message and push up a PR to be reviewed.
