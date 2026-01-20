import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { AnnounceContext, Grommet } from 'grommet';
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
  describe('Rendering', () => {
    it('should render custom header if provided', () => {
      renderNavigationMenu({ header: <div data-testid="custom-header">Custom Header</div> });
      
      expect(screen.getByTestId('custom-header')).toBeInTheDocument();
      // Default header title should not be present
      expect(screen.queryByRole('heading', { name: /navigation menu/i })).not.toBeInTheDocument();
    });

    it('should render items with href when url is provided', () => {
      renderNavigationMenu();
      
      const homeButton = screen.getByRole('menuitem', { name: /home/i });
      expect(homeButton).toHaveAttribute('href', '/home');
      
      const servicesButton = screen.getByRole('menuitem', { name: /services/i });
      expect(servicesButton).toHaveAttribute('href', '/services');
    });

    it('should highlight active item correctly', () => {
      renderNavigationMenu({ activeItem: 'Home' });
      
      const homeButton = screen.getByRole('menuitem', { name: /home/i });
      expect(homeButton).toHaveAttribute('aria-current', 'page');
    });

    it('should expand parent menus of active item', async () => {
      // Set deeply nested item as active
      renderNavigationMenu({ activeItem: 'Servers' });
      
      // Parent menus should be expanded to show the active item
      expect(screen.getByRole('menuitem', { name: /hardware/i })).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: /servers/i })).toBeInTheDocument();
      
      const serversButton = screen.getByRole('menuitem', { name: /servers/i });
      expect(serversButton).toHaveAttribute('aria-current', 'page');
    });
  });

  describe('Interactions', () => {
    describe('Mouse', () => {
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

      it('should toggle menu open/close when header button is clicked', async () => {
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

      it('should allow default browser navigation when preventDefault is not called', async () => {
        const user = userEvent.setup();
        const onSelect = jest.fn();
        
        renderNavigationMenu({ onSelect });
        
        const item = screen.getByRole('menuitem', { name: /home/i });
        await user.click(item);
        
        // Verify onSelect was called
        expect(onSelect).toHaveBeenCalled();
        
        // Get the event object passed to the callback
        const event = onSelect.mock.calls[0][0].event;
        
        // Verify preventDefault was NOT called (defaultPrevented should be false)
        expect(event.defaultPrevented).toBe(false);
      });

      it('should prevent default browser navigation when preventDefault is called', async () => {
        const user = userEvent.setup();
        const onSelect = jest.fn(({ event }) => {
          event.preventDefault();
        });
        
        renderNavigationMenu({ onSelect });
        
        const item = screen.getByRole('menuitem', { name: /home/i });
        await user.click(item);
        
        // Verify onSelect was called
        expect(onSelect).toHaveBeenCalled();
        
        // Get the event object passed to the callback
        const event = onSelect.mock.calls[0][0].event;
        
        // Verify preventDefault WAS called (defaultPrevented should be true)
        expect(event.defaultPrevented).toBe(true);
      });

      it('should call onSelect when an item is clicked', async () => {
        const user = userEvent.setup();
        const onSelect = jest.fn();
        
        renderNavigationMenu({ onSelect });
        
        const item = screen.getByRole('menuitem', { name: /home/i });
        await user.click(item);
        
        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onSelect).toHaveBeenCalledWith(
          expect.objectContaining({
            item: expect.objectContaining({
              label: 'Home',
              url: '/home',
            }),
            event: expect.anything(),
          }),
        );
      });

      it('should handle parent item with both url and children', async () => {
        const user = userEvent.setup();
        const onSelect = jest.fn();
        
        const itemsWithUrlParent: NavItemType[] = [
          {
            label: 'Documentation',
            url: '/docs',
            children: [
              { label: 'Get Started', url: '/docs/get-started' }
            ]
          }
        ];

        const { rerender } = renderNavigationMenu({ items: itemsWithUrlParent, onSelect });
        
        const parentItem = screen.getByRole('menuitem', { name: /documentation/i });
        
        // Verify it has href
        expect(parentItem).toHaveAttribute('href', '/docs');

        // Initially collapsed
        expect(screen.queryByRole('menuitem', { name: /get started/i })).not.toBeInTheDocument();
        
        // Click parent
        await user.click(parentItem);
        
        // Verify onSelect called
        expect(onSelect).toHaveBeenCalledWith(
          expect.objectContaining({
            item: expect.objectContaining({
              label: 'Documentation',
              url: '/docs',
            }),
            event: expect.anything(),
          }),
        );

        // Verify expansion
        expect(screen.getByRole('menuitem', { name: /get started/i })).toBeInTheDocument();

        // Verify active state
        rerender(
          <Grommet theme={testTheme}>
            <NavigationMenu 
              items={itemsWithUrlParent}
              open={true}
              title="Navigation Menu"
              onSelect={onSelect}
              activeItem="Documentation"
            />
          </Grommet>
        );
        
        const activeParent = screen.getByRole('menuitem', { name: /documentation/i });
        expect(activeParent).toHaveAttribute('aria-current', 'page');
      });
    });

    describe('Keyboard', () => {
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
        
        // Focus on the servers button using user interaction
        await user.click(serversButton);
        expect(serversButton).toHaveFocus();
  
        // Press Escape - should focus on Hardware (immediate parent)
        await user.keyboard('{Escape}');
        
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
        await user.click(storageButton);
        expect(storageButton).toHaveFocus();
  
        // First Escape - should focus on Hardware (immediate parent)
        await user.keyboard('{Escape}');
        expect(hardwareButton).toHaveFocus();
  
        // Second Escape - should focus on Products (grandparent)
        await user.keyboard('{Escape}');
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
        await user.keyboard('{Escape}');
  
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
        await user.click(softwareButton);
        expect(softwareButton).toHaveFocus();
  
        // Press Escape - should focus on Products (immediate parent)
        await user.keyboard('{Escape}');
        expect(productsButton).toHaveFocus();
      });
    });
  });

  describe('Accessibility', () => {
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

    it('should announce selection', async () => {
      const user = userEvent.setup();
      const announce = jest.fn();
      
      render(
        <Grommet theme={testTheme}>
          <AnnounceContext.Provider value={announce}>
            <NavigationMenu items={nestedMenuItems} title="Navigation Menu" />
          </AnnounceContext.Provider>
        </Grommet>
      );
      
      const item = screen.getByRole('menuitem', { name: /home/i });
      await user.click(item);
      
      expect(announce).toHaveBeenCalledWith('Selected Home.', 'assertive', 2000);
    });
  });

  describe('Grouping', () => {
    const groupedItems: NavItemType[] = [
      {
        label: 'Components',
        children: [
          {
            label: 'Layout',
            type: 'group',
            children: [
              { label: 'Box', url: '/box' },
              { label: 'Grid', url: '/grid' },
            ],
          },
          {
            label: 'Controls',
            type: 'group',
            children: [
              { label: 'Button', url: '/button' },
            ],
          },
        ],
      },
    ];

    it('should render group headers correctly', async () => {
      const user = userEvent.setup();
      renderNavigationMenu({ items: groupedItems });

      // Open the parent menu first
      await user.click(screen.getByRole('menuitem', { name: /components/i }));

      const layoutHeader = screen.getByRole('heading', { name: /layout/i });
      expect(layoutHeader).toBeInTheDocument();
      expect(layoutHeader).toHaveAttribute('aria-level', '3');
    });

    it('should render group children within group container', async () => {
      const user = userEvent.setup();
      renderNavigationMenu({ items: groupedItems });

      await user.click(screen.getByRole('menuitem', { name: /components/i }));

      const layoutHeader = screen.getByRole('heading', { name: /layout/i });
      const layoutGroup = screen.getByRole('group', { name: /layout/i });

      expect(layoutGroup).toBeInTheDocument();
      expect(layoutGroup).toHaveAttribute('aria-labelledby', layoutHeader.id);

      const boxItem = within(layoutGroup).getByRole('menuitem', { name: /box/i });
      expect(boxItem).toBeInTheDocument();
    });

    it('should not allow interaction with group headers', async () => {
      const user = userEvent.setup();
      renderNavigationMenu({ items: groupedItems });

      await user.click(screen.getByRole('menuitem', { name: /components/i }));

      const layoutHeader = screen.getByRole('heading', { name: /layout/i });

      // Should not be a button
      expect(layoutHeader.tagName).not.toBe('BUTTON');

      // Ensure it doesn't have button role either
      expect(
        screen.queryByRole('button', { name: /layout/i }),
      ).not.toBeInTheDocument();
    });

    it('should allow interaction with group children', async () => {
      const user = userEvent.setup();
      const onSelect = jest.fn();
      renderNavigationMenu({ items: groupedItems, onSelect });

      await user.click(screen.getByRole('menuitem', { name: /components/i }));
      const childItem = screen.getByRole('menuitem', { name: /box/i });
      await user.click(childItem);

      expect(onSelect).toHaveBeenCalledWith(
        expect.objectContaining({
          item: expect.objectContaining({
            label: 'Box',
            url: '/box',
          }),
        }),
      );
    });
  });
});
