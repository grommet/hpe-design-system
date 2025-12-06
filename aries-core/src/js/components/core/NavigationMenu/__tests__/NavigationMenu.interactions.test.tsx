import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { AnnounceContext, Grommet } from 'grommet';
import { NavigationMenu } from '../NavigationMenu';
import { NavItemType } from '../NavItem/NavItem';

const testTheme = {};

const simpleItems: NavItemType[] = [
  { label: 'Item 1', url: '/item1' },
  { label: 'Item 2', url: '/item2' },
];

const renderNavigationMenu = (props: any = {}) => {
  const defaultProps = {
    items: simpleItems,
    title: 'Test Menu',
    ...props,
  };

  return render(
    <Grommet theme={testTheme}>
      <NavigationMenu {...defaultProps} />
    </Grommet>
  );
};

describe('NavigationMenu Interactions', () => {
  test('should toggle menu open/close when header button is clicked', async () => {
    const user = userEvent.setup();
    renderNavigationMenu();

    // Default is open
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    
    // Find toggle button by its accessible name (from tip)
    const closeButton = screen.getByRole('button', { name: /close navigation/i });
    expect(closeButton).toHaveAttribute('aria-expanded', 'true');
    
    await user.click(closeButton);
    
    // Should be closed
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    
    // Button should now be "Open navigation"
    const openButton = screen.getByRole('button', { name: /open navigation/i });
    expect(openButton).toHaveAttribute('aria-expanded', 'false');
    
    await user.click(openButton);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close navigation/i })).toHaveAttribute('aria-expanded', 'true');
  });

  test('should call onSelect and setActiveItem when an item is clicked', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    const setActiveItem = jest.fn();
    
    renderNavigationMenu({ onSelect, setActiveItem });
    
    const item = screen.getByRole('menuitem', { name: /item 1/i });
    await user.click(item);
    
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(setActiveItem).toHaveBeenCalledWith('Item 1');
  });

  test('should render custom header if provided', () => {
    renderNavigationMenu({ header: <div data-testid="custom-header">Custom Header</div> });
    
    expect(screen.getByTestId('custom-header')).toBeInTheDocument();
    // Default header title should not be present
    expect(screen.queryByRole('heading', { name: /test menu/i })).not.toBeInTheDocument();
  });

  test('should announce selection', async () => {
    const user = userEvent.setup();
    const announce = jest.fn();
    
    render(
      <Grommet theme={testTheme}>
        <AnnounceContext.Provider value={announce}>
          <NavigationMenu items={simpleItems} title="Test Menu" />
        </AnnounceContext.Provider>
      </Grommet>
    );
    
    const item = screen.getByRole('menuitem', { name: /item 1/i });
    await user.click(item);
    
    expect(announce).toHaveBeenCalledWith('Selected Item 1.', 'assertive', 2000);
  });

  test('should render items with href when url is provided', () => {
    renderNavigationMenu();
    
    const item1 = screen.getByRole('menuitem', { name: /item 1/i });
    expect(item1).toHaveAttribute('href', '/item1');
    
    const item2 = screen.getByRole('menuitem', { name: /item 2/i });
    expect(item2).toHaveAttribute('href', '/item2');
  });
});
