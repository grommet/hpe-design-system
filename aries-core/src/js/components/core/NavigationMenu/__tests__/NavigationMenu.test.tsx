import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Grommet } from 'grommet';
import { NavigationMenu } from '../NavigationMenu';
import { NavItemType } from '../NavItem/NavItem';

// Simple theme for testing
const testTheme = {};

// Mock data for testing nested navigation
const nestedMenuItems: NavItemType[] = [
  {
    label: 'Home',
    url: '/home',
  },
  {
    label: 'Products',
    children: [
      {
        label: 'Hardware',
        children: [
          {
            label: 'Servers',
            url: '/products/hardware/servers',
          },
          {
            label: 'Storage',
            url: '/products/hardware/storage',
          },
        ],
      },
      {
        label: 'Software',
        url: '/products/software',
      },
    ],
  },
  {
    label: 'Services',
    url: '/services',
  },
];

// Helper function to render NavigationMenu with Grommet theme
const renderNavigationMenu = (props: any = {}) => {
  const defaultProps = {
    items: nestedMenuItems,
    open: true,
    title: 'Navigation Menu',
    ...props,
  };

  return render(
    <Grommet theme={testTheme}>
      <NavigationMenu {...defaultProps} />
    </Grommet>
  );
};

describe('NavigationMenu', () => {
  describe('Keyboard navigation', () => {
    it('should focus on immediate parent when pressing Escape in a nested submenu', async () => {
      const user = userEvent.setup();
      renderNavigationMenu();

      // First, expand the "Products" menu
      const productsButton = screen.getByRole('menuitem', { name: /products/i });
      await user.click(productsButton);

      // Wait for the submenu to appear and expand "Hardware"
      const hardwareButton = screen.getByRole('menuitem', { name: /hardware/i });
      await user.click(hardwareButton);

      // Navigate to a deeply nested item (Servers)
      const serversButton = screen.getByRole('menuitem', { name: /servers/i });
      
      // Focus on the servers button
      serversButton.focus();
      expect(serversButton).toHaveFocus();

      // Press Escape - should focus on Hardware (immediate parent)
      fireEvent.keyDown(serversButton, { key: 'Escape', code: 'Escape' });
      
      // Check that focus moved to Hardware button (immediate parent)
      expect(hardwareButton).toHaveFocus();
    });

    it('should focus on grandparent after two Escape presses in deeply nested menu', async () => {
      const user = userEvent.setup();
      renderNavigationMenu();

      // Expand Products menu
      const productsButton = screen.getByRole('menuitem', { name: /products/i });
      await user.click(productsButton);

      // Expand Hardware submenu
      const hardwareButton = screen.getByRole('menuitem', { name: /hardware/i });
      await user.click(hardwareButton);

      // Focus on a deeply nested item
      const storageButton = screen.getByRole('menuitem', { name: /storage/i });
      storageButton.focus();
      expect(storageButton).toHaveFocus();

      // First Escape - should focus on Hardware (immediate parent)
      fireEvent.keyDown(storageButton, { key: 'Escape', code: 'Escape' });
      expect(hardwareButton).toHaveFocus();

      // Second Escape - should focus on Products (grandparent)
      fireEvent.keyDown(hardwareButton, { key: 'Escape', code: 'Escape' });
      expect(productsButton).toHaveFocus();
    });

    it('should collapse submenu when pressing Escape on parent item', async () => {
      const user = userEvent.setup();
      renderNavigationMenu();

      // Expand Products menu
      const productsButton = screen.getByRole('menuitem', { name: /products/i });
      await user.click(productsButton);

      // Verify submenu is open by checking if Hardware is visible
      expect(screen.getByRole('menuitem', { name: /hardware/i })).toBeInTheDocument();

      // Press Escape on the Products button
      fireEvent.keyDown(productsButton, { key: 'Escape', code: 'Escape' });

      // Verify submenu is collapsed - Hardware should no longer be visible
      expect(screen.queryByRole('menuitem', { name: /hardware/i })).not.toBeInTheDocument();
    });

    it('should handle Escape in second-level menu correctly', async () => {
      const user = userEvent.setup();
      renderNavigationMenu();

      // Expand Products menu
      const productsButton = screen.getByRole('menuitem', { name: /products/i });
      await user.click(productsButton);

      // Focus on Software (second-level item without children)
      const softwareButton = screen.getByRole('menuitem', { name: /software/i });
      softwareButton.focus();
      expect(softwareButton).toHaveFocus();

      // Press Escape - should focus on Products (immediate parent)
      fireEvent.keyDown(softwareButton, { key: 'Escape', code: 'Escape' });
      expect(productsButton).toHaveFocus();
    });
  });

  describe('Menu expansion and collapse', () => {
    it('should expand and collapse menus when clicked', async () => {
      const user = userEvent.setup();
      renderNavigationMenu();

      const productsButton = screen.getByRole('menuitem', { name: /products/i });

      // Initially, submenu should be collapsed
      expect(screen.queryByRole('menuitem', { name: /hardware/i })).not.toBeInTheDocument();

      // Click to expand
      await user.click(productsButton);
      expect(screen.getByRole('menuitem', { name: /hardware/i })).toBeInTheDocument();

      // Click to collapse
      await user.click(productsButton);
      expect(screen.queryByRole('menuitem', { name: /hardware/i })).not.toBeInTheDocument();
    });

    it('should show correct aria-expanded state', async () => {
      const user = userEvent.setup();
      renderNavigationMenu();

      const productsButton = screen.getByRole('menuitem', { name: /products/i });

      // Initially collapsed
      expect(productsButton).toHaveAttribute('aria-expanded', 'false');

      // Expand
      await user.click(productsButton);
      expect(productsButton).toHaveAttribute('aria-expanded', 'true');

      // Collapse
      await user.click(productsButton);
      expect(productsButton).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('Active item handling', () => {
    it('should highlight active item correctly', () => {
      renderNavigationMenu({ activeItem: 'Home' });
      
      const homeButton = screen.getByRole('menuitem', { name: /home/i });
      expect(homeButton).toHaveAttribute('aria-current', 'page');
    });

    it('should expand parent menus of active item', async () => {
      const user = userEvent.setup();
      
      // Set deeply nested item as active
      renderNavigationMenu({ activeItem: 'Servers' });
      
      // Parent menus should be expanded to show the active item
      expect(screen.getByRole('menuitem', { name: /hardware/i })).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: /servers/i })).toBeInTheDocument();
      
      const serversButton = screen.getByRole('menuitem', { name: /servers/i });
      expect(serversButton).toHaveAttribute('aria-current', 'page');
    });
  });
});
