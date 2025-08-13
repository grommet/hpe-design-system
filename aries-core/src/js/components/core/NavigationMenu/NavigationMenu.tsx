import { useState } from 'react';
import { type BoxProps, Button, Collapsible, List, Nav, Sidebar } from 'grommet';
import {
	Down,
	Sidebar as SidebarIcon,
	Up,
} from 'grommet-icons';
import { NavItem, NavItemType } from './NavItem';
import { NavContainer } from './NavContainer';

interface NavigationMenuProps extends BoxProps {
  items: NavItemType[];
}

export const NavigationMenu = ({ items, ...rest }: NavigationMenuProps) => {
	const [open, setOpen] = useState(false);
	const [expanded, setExpanded] = useState<string[]>([]);

	return (
		<NavContainer open={open} setOpen={setOpen} {...rest}>
			{open && (
				<Nav a11yTitle="Main menu" gap="xsmall">
					<List
						role="menubar"
						data={items}
						defaultItemProps={{
							pad: { vertical: 'xsmall' },
						}}
					>
						{(item) => {
							let result = null;
							if (item.children) {
								result = (
									<NavItem
										id={item.label}
                    aria-haspopup="true"
										aria-expanded={expanded.includes(item.label)}
										label={item.label}
										icon={item.icon}
										actions={
											expanded.includes(item.label) ? (
												<Up aria-hidden="true" />
											) : (
												<Down aria-hidden="true" />
											)
										}
										onClick={() => {
											setExpanded((prev) => {
												let result: string[];
												if (prev.includes(item.label)) {
													result = prev.filter((i) => i !== item.label);
												} else {
													result = [...prev, item.label];
												}
												return result;
											});
										}}
									>
										<Collapsible open={expanded.includes(item.label)}>
											<List
												role="menu"
												aria-labelledby={item.label}
												data={item.children}
												defaultItemProps={{
													pad: { vertical: 'xxsmall' },
													margin: { left: 'small' },
												}}
											>
												{(child) => (
													<NavItem
														label={child.label}
														href={child.url}
														icon={child.icon}
														active={location.pathname === child.url}
													/>
												)}
											</List>
										</Collapsible>
									</NavItem>
								);
							} else {
								result = (
									<NavItem
										label={item.label}
										href={item.url}
										icon={item.icon}
										active={location.pathname.includes(item.url || '')}
									/>
								);
							}
							return result;
						}}
					</List>
				</Nav>
			)}
		</NavContainer>
	);
};


