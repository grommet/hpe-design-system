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

  describe('Unique ID Assignment', () => {
    it('should assign unique IDs to items without IDs', () => {
      const itemsWithoutIds: NavItemType[] = [
        { label: 'Components' },
        { label: 'Design Tokens' }
      ];
      
      renderNavigationMenu({ items: itemsWithoutIds });
      
      // Check that elements have been assigned IDs
      const componentsButton = screen.getByRole('menuitem', { name: /components/i });
      const designTokensButton = screen.getByRole('menuitem', { name: /design tokens/i });
      
      expect(componentsButton).toHaveAttribute('id');
      expect(designTokensButton).toHaveAttribute('id');
      
      // IDs should be different
      expect(componentsButton.id).not.toBe(designTokensButton.id);
    });

    it('should preserve existing IDs when provided', () => {
      const itemsWithIds: NavItemType[] = [
        { label: 'Components', id: 'custom-components-id' },
        { label: 'Design Tokens' }
      ];
      
      renderNavigationMenu({ items: itemsWithIds });
      
      const componentsButton = screen.getByRole('menuitem', { name: /components/i });
      expect(componentsButton).toHaveAttribute('id', 'custom-components-id');
    });

    it('should handle duplicate labels by creating unique IDs', () => {
      const itemsWithDuplicateLabels: NavItemType[] = [
        { label: 'Overview' },
        { label: 'Overview' },
        { label: 'Overview' }
      ];
      
      renderNavigationMenu({ items: itemsWithDuplicateLabels });
      
      const overviewButtons = screen.getAllByRole('menuitem', { name: /overview/i });
      expect(overviewButtons).toHaveLength(3);
      
      // All should have unique IDs
      const ids = overviewButtons.map(button => button.id);
      expect(new Set(ids).size).toBe(3);
      
      // Should follow pattern: overview, overview-1, overview-2
      expect(ids).toContain('overview');
      expect(ids).toContain('overview-1');
      expect(ids).toContain('overview-2');
    });

    it('should assign hierarchical IDs to nested items', async () => {
      const nestedItems: NavItemType[] = [
        {
          label: 'Components',
          children: [
            { label: 'Box' },
            { label: 'Card' }
          ]
        }
      ];
      
      renderNavigationMenu({ items: nestedItems });
      
      // Expand the parent to access children
      const componentsButton = screen.getByRole('menuitem', { name: /components/i });
      await userEvent.click(componentsButton);
      
      const boxButton = screen.getByRole('menuitem', { name: /box/i });
      const cardButton = screen.getByRole('menuitem', { name: /card/i });
      
      // Child IDs should include parent context
      expect(boxButton.id).toBe('components-box');
      expect(cardButton.id).toBe('components-card');
    });

    it('should handle mixed scenarios with existing IDs and collisions in nested items', async () => {
      const mixedItems: NavItemType[] = [
        {
          label: 'Components',
          id: 'components-custom',
          children: [
            { label: 'Overview' }, // Should become components-custom-overview
            { label: 'Overview' }  // Should become components-custom-overview-1
          ]
        },
        {
          label: 'Design Tokens',
          children: [
            { label: 'Overview', id: 'tokens-overview' }, // Should preserve custom ID
            { label: 'Colors' }  // Should become design-tokens-colors
          ]
        }
      ];
      
      renderNavigationMenu({ items: mixedItems });
      
      // Expand both parents
      const componentsButton = screen.getByRole('menuitem', { name: /^components$/i });
      const designTokensButton = screen.getByRole('menuitem', { name: /design tokens/i });
      
      await userEvent.click(componentsButton);
      await userEvent.click(designTokensButton);
      
      // Check parent IDs
      expect(componentsButton.id).toBe('components-custom');
      expect(designTokensButton.id).toBe('design-tokens');
      
      // Check nested items
      const overviewButtons = screen.getAllByRole('menuitem', { name: /overview/i });
      const colorsButton = screen.getByRole('menuitem', { name: /colors/i });
      
      const overviewIds = overviewButtons.map(btn => btn.id);
      expect(overviewIds).toContain('components-custom-overview');
      expect(overviewIds).toContain('components-custom-overview-1');
      expect(overviewIds).toContain('tokens-overview'); // Preserved custom ID
      
      expect(colorsButton.id).toBe('design-tokens-colors');
    });

    it('should create stable IDs that do not depend on array position', () => {
      const originalItems: NavItemType[] = [
        { label: 'Home' },
        { label: 'Components' },
        { label: 'Design Tokens' }
      ];
      
      const reorderedItems: NavItemType[] = [
        { label: 'Design Tokens' },
        { label: 'Home' },
        { label: 'Components' }
      ];
      
      // Render with original order
      const { unmount } = renderNavigationMenu({ items: originalItems });
      const originalHomeId = screen.getByRole('menuitem', { name: /home/i }).id;
      const originalComponentsId = screen.getByRole('menuitem', { name: /components/i }).id;
      const originalTokensId = screen.getByRole('menuitem', { name: /design tokens/i }).id;
      
      unmount();
      
      // Render with reordered items
      renderNavigationMenu({ items: reorderedItems });
      const reorderedHomeId = screen.getByRole('menuitem', { name: /home/i }).id;
      const reorderedComponentsId = screen.getByRole('menuitem', { name: /components/i }).id;
      const reorderedTokensId = screen.getByRole('menuitem', { name: /design tokens/i }).id;
      
      // IDs should be the same regardless of position
      expect(reorderedHomeId).toBe(originalHomeId);
      expect(reorderedComponentsId).toBe(originalComponentsId);
      expect(reorderedTokensId).toBe(originalTokensId);
    });
  });
});
