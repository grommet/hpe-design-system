import React from 'react';
import { Box, Button, Nav, Sidebar, Text } from 'grommet';
import { Sidebar as SidebarIcon } from 'grommet-icons';
import { CollapsibleMenu } from '../CollapsibleMenu';

const SidebarHeader = ({ expanded, setExpanded, title }) => {
  return (
    <Box direction="row" align="center" justify="between" gap="xlarge">
      {expanded && <Text size="large">{title}</Text>}
      <Button icon={<SidebarIcon />} onClick={() => setExpanded(!expanded)} />
    </Box>
  );
};

export const NavSidebar = ({ title, active, items, ...rest }) => {
  const [open, setOpen] = React.useState(true);
  const [selected, setSelected] = React.useState(active);

  return (
    <Sidebar
      background="background-front"
      gap="xsmall"
      header={
        <SidebarHeader expanded={open} setExpanded={setOpen} title={title} />
      }
      pad={open ? 'xsmall' : { vertical: 'xsmall', horizontal: '3xsmall' }}
      {...rest}
    >
      {open && (
        <Nav
          border={{ side: 'top', color: 'border-weak' }}
          gap="xsmall"
          pad={{ vertical: 'xsmall' }}
        >
          <CollapsibleMenu
            items={items}
            selected={selected}
            onSelect={setSelected}
            gap="xsmall"
          />
        </Nav>
      )}
    </Sidebar>
  );
};
