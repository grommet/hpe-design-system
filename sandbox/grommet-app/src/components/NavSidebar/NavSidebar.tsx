import React from 'react';
import { Anchor, Box, Button, Nav, Sidebar, Text } from 'grommet';
import { Sidebar as SidebarIcon } from 'grommet-icons';
import { CollapsibleMenu } from '../CollapsibleMenu';

const SidebarHeader = ({ expanded, setExpanded }) => {
  return (
    <Box
      direction='row'
      align='center'
      justify='between'
      gap="large"
      pad={{ left: 'small', vertical: 'small' }}
    >
      {expanded && <Text size='large' >Private Cloud</Text>}
      <Button icon={<SidebarIcon />} onClick={() => setExpanded(!expanded)} />
    </Box>
  );
}

const items = {
  "Dashboard": { key: "dashboard", label: "Dashboard" },
  "Systems": { key: "systems", label: "Systems" },
  "Virtual Machines": [
    { key: "vm1", label: "Private Cloud" },
    { key: "vm2", label: "Public Cloud" },
    { key: "vm3", label: "View all" },
  ],
  "Bare Metal": [
    { key: "bm1", label: "Las Vegas", count: 0 },
    { key: "bm2", label: "Frankfurt", count: 3 },
    { key: "bm3", label: "New York", count: 4 },
    { key: "all", label: "View all" }
  ],
  "Clusters": { key: "clusters", label: "Clusters" },
  "Protection": { key: "protection", label: "Protection Groups" },
  "Encryption": { key: "encryption", label: "Encryption Detection" },
  "Reports": { key: "reports", label: "Reports" },
};

const defaultSelected = items["Dashboard"];

export const NavSidebar = ({ ...rest }) => {
  const [open, setOpen] = React.useState(true);
  const [selected, setSelected] = React.useState(defaultSelected);

  return (
    <Sidebar
      background="background-front"
      flex={false}
      gap="small"
      header={< SidebarHeader expanded={open} setExpanded={setOpen} />}
      {...rest}
    >
      {open &&
        <Nav
          border={{ side: "top", color: "border-weak" }}
          gap="small"
          pad={{ vertical: "small" }}
        >
          <CollapsibleMenu
            items={items}
            selected={selected}
            onSelect={setSelected}
            gap="small"
          />
          <Anchor href="/home" label="Home" />
          <Anchor href="/about" label="About" />
          <Anchor href="/contact" label="Contact" />
        </Nav>
      }
    </Sidebar >
  );
};
