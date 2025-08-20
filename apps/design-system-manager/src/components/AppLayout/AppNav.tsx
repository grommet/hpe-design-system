import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Collapsible, List, Nav, Sidebar } from 'grommet';
import {
	AppsRounded as Components,
	Down,
	Sidebar as SidebarIcon,
	Up,
} from 'grommet-icons';
import { NavItem } from './NavItem';
import { usePocket } from '../../contexts';

type NavItemType = {
	label: string;
	href?: string;
	icon?: React.ReactNode;
	children?: NavItemType[];
};

const navItems: NavItemType[] = [
	{
		label: 'Components',
		href: '/components',
		icon: <Components aria-hidden="true" />,
	},
	{
		label: 'Adoption',
		children: [
			{ label: 'Teams', href: '/adoption' },
			{ label: 'Adoption Levels', href: '/adoption-levels' },
		],
	},
];

export const AppNav = ({ ...rest }) => {
	const { user } = usePocket();
	const [open, setOpen] = useState(!!user);
	const [expanded, setExpanded] = useState<string[]>([]);
	const location = useLocation();

	return (
		<Sidebar
			header={
				<Button
					icon={<SidebarIcon />}
					active={open}
					tip={open ? 'Close navigation' : 'Open navigation'}
					alignSelf="end"
					onClick={() => setOpen(!open)}
				/>
			}
			background="background-front"
			pad={{ horizontal: 'small', vertical: 'small' }}
			width={open ? { min: 'small' } : undefined}
			{...rest}
		>
			{open && (
				<Nav a11yTitle="Main menu" gap="xsmall">
					<List
						role="menubar"
						data={navItems}
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
										label={item.label}
										icon={item.icon}
										actions={
											expanded.includes(item.label) ? (
												<Up aria-hidden="true" />
											) : (
												<Down aria-hidden="true" />
											)
										}
										aria-haspopup="true"
										aria-expanded={expanded.includes(item.label)}
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
														href={child.href}
														icon={child.icon}
														active={location.pathname === child.href}
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
										href={item.href}
										icon={item.icon}
										active={location.pathname.includes(item.href || '')}
									/>
								);
							}
							return result;
						}}
					</List>
				</Nav>
			)}
		</Sidebar>
	);
};
