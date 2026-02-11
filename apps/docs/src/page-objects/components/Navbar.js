import { Selector, t } from 'testcafe';
import { repeatKeyPress, tabToSearch } from '../../tests/utils';

export default class Navbar {
  constructor() {
    this.searchButton = Selector('#search-button');
    this.searchInput = Selector('input').withAttribute(
      'aria-labelledby',
      'search-icon',
    );
  }

  async searchFor(text, options) {
    if (options && options.keyboard) {
      await t
        .pressKey(await repeatKeyPress('tab', await tabToSearch()))
        .pressKey('enter')
        // start typing for something
        .pressKey(text);
    } else {
      await t
        .click(this.searchButton)
        // paste enhances performance, so each letter isn't typed
        .typeText(this.searchInput, text, { paste: true });
    }
  }

  async navigateToSuggestion(page) {
    // find how many times to press down arrow key to get to suggestion
    const suggestions = await this.searchInput.getReact(
      ({ props }) => props.suggestions,
    );
    let count;
    suggestions.forEach((suggestion, index) =>
      // add one since array index starts at 0
      suggestion === page ? (count = index + 1) : undefined,
    );

    await t.pressKey(await repeatKeyPress('down', count)).pressKey('enter');
  }
}
