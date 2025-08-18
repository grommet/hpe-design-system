import { useState } from 'react';
import { type BoxProps, Nav } from 'grommet';
import { NavItemType } from './NavItem';
import { NavContainer } from './NavContainer';
import { NavList } from './NavList';

interface NavigationMenuProps extends BoxProps {
	activeItem?: string;
	setActiveItem?: (item: string | undefined) => void;
  items: NavItemType[];
	title?: string;
}

export const NavigationMenu = ({ activeItem, setActiveItem, items, title, ...rest }: NavigationMenuProps) => {
	const [open, setOpen] = useState(true);

	return (
		<NavContainer as="aside" open={open} setOpen={setOpen} title={title} overflow="auto" {...rest}>
			{open && (
				<Nav a11yTitle={title ? `${title} main menu` : 'Main menu'} gap="xsmall" >
					<NavList items={items} activeItem={activeItem} setActiveItem={setActiveItem} />
				</Nav>
			)}
		</NavContainer>
	);
};
