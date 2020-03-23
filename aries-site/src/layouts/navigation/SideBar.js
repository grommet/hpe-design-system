/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Box, Button, Text } from 'grommet';
import { nameToPath } from '../../utils';

const SideBarItem = ({ item }) => {
  const { pathname } = useRouter();
  const path = nameToPath(item);
  const active = pathname === path;
  const [hover, setHover] = useState(false);
  return (
    // Need to pass href because of: https://github.com/zeit/next.js/#forcing-the-link-to-expose-href-to-its-child
    <Link href={path} passHref>
      <Button
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
        <Box
          pad="small"
          round="small"
          background={active || hover ? 'active-background' : undefined}
        >
          <Text weight="bold">{item}</Text>
        </Box>
      </Button>
    </Link>
  );
};

export const SideBar = ({ items }) => {
  return (
    <Box
      border={{ side: 'left' }}
      margin={{ left: 'xlarge' }}
      pad={{ left: 'medium' }}
      width="small"
      gap="xsmall"
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
