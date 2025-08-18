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
		<NavContainer open={open} setOpen={setOpen} title={title} overflow="auto" {...rest}>
			{open && (
				<Nav a11yTitle={title ? `${title} main menu` : 'Main menu'} gap="xsmall" >
					<NavList items={items} activeItem={activeItem} setActiveItem={setActiveItem} />
				</Nav>
			)}
		</NavContainer>
	);
};


{/* <List
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
					</List> */}