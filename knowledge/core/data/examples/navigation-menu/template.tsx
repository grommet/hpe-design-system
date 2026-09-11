import { useState, useContext, useEffect } from 'react';
import { Nav, List, Button, Box, Collapsible, Text, Layer, ResponsiveContext } from 'grommet';
import { Down, Up, Sidebar } from '@hpe-design/icons-grommet';

// NavItemType:
// { label: string; url?: string; icon?: React.ReactNode;
//   children?: NavItemType[]; type?: 'group' | 'item'; }

// Simplified core — see examples/NavigationMenu/ for the full implementation
// including stable IDs, full keyboard nav, AnnounceContext, and NavContainer.
export const NavigationMenu = ({ items, open = true, title, activeItem, onSelect }) => {
  const [expanded, setExpanded] = useState([]);

  const toggleExpand = (label) =>
    setExpanded((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );

  const renderItem = (item) => {
    const isExpanded = expanded.includes(item.label);
    const isActive = activeItem === item.label;

    if (item.type === 'group') {
      return (
        <Box key={item.label}>
          <Text weight="bold" margin={{ vertical: 'xsmall', horizontal: 'small' }}>
            {item.label}
          </Text>
          {item.children?.map(renderItem)}
        </Box>
      );
    }

    if (item.children) {
      return (
        <Box key={item.label}>
          <Button
            plain
            fill="horizontal"
            aria-haspopup
            aria-expanded={isExpanded}
            aria-current={isActive ? 'page' : undefined}
            label={
              <Box direction="row" justify="between" align="center" pad={{ vertical: '3xsmall', horizontal: 'small' }}>
                <Box direction="row" gap="xsmall" align="center">
                  {item.icon}
                  <Text>{item.label}</Text>
                </Box>
                {isExpanded ? <Up aria-hidden /> : <Down aria-hidden />}
              </Box>
            }
            onClick={(event) => {
              toggleExpand(item.label);
              if (item.url) onSelect?.({ item, event });
            }}
          />
          <Collapsible open={isExpanded}>
            <Box pad={{ left: 'medium' }}>
              {item.children.map(renderItem)}
            </Box>
          </Collapsible>
        </Box>
      );
    }

    return (
      <Button
        key={item.label}
        plain
        fill="horizontal"
        aria-current={isActive ? 'page' : undefined}
        label={
          <Box
            direction="row"
            gap="xsmall"
            align="center"
            pad={{ vertical: '3xsmall', horizontal: 'small' }}
            background={isActive ? 'background-active' : undefined}
            round="xsmall"
          >
            {item.icon}
            <Text>{item.label}</Text>
          </Box>
        }
        onClick={(event) => onSelect?.({ item, event })}
      />
    );
  };

  return (
    <Box background="background-front" overflow="auto">
      {title && (
        <Text weight="bold" pad="medium">{title}</Text>
      )}
      {open && <Nav gap="3xsmall">{items.map(renderItem)}</Nav>}
    </Box>
  );
};