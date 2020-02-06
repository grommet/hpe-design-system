import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import { NavLink } from 'aries-core';
import { nameToPath } from '../../utils';

const SideBarItem = ({ item }) => {
  const { pathname } = useRouter();
  const path = nameToPath(item);
  const active = pathname === path;

  return (
    // Need to pass href because of: https://github.com/zeit/next.js/#forcing-the-link-to-expose-href-to-its-child
    <Link href={path} passHref>
      <NavLink data-test-id="side-bar" active={active}>{item}</NavLink>
    </Link>
  );
};

export const SideBar = ({ items }) => {
  return (
    <Box
      border={{ side: 'left' }}
      gap="medium"
      margin={{ left: 'xlarge' }}
      pad={{ left: 'medium' }}
      width="small"
    >
      {items.map(item => (
        <SideBarItem item={item} key={item} />
      ))}
    </Box>
  );
};

SideBar.propTypes = {
  items: PropTypes.array,
};

SideBar.defaultProps = {
  items: [],
};

SideBarItem.propTypes = {
  item: PropTypes.string,
};

SideBarItem.defaultProps = {
  item: '',
};
