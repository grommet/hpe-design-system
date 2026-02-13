/* eslint-disable react/prop-types */
import React from 'react';
import { Box } from 'grommet';
import {
  MockMenuItem,
  MockMenuContainer,
  MockMenuGroup,
  MockMenuButton,
} from './MenuMockComponents';

// MenuMock component that replicates Menu visual presentation
// without using the actual Menu component

export const MenuMock = ({ label, items, iconDown }) => {
  // Check if items is grouped (array of arrays) or flat (array of objects)
  const isGrouped = items?.length > 0 && Array.isArray(items[0]);

  return (
    <Box align="start">
      <MockMenuButton label={label} iconDown={iconDown} />
      <MockMenuContainer>
        {isGrouped ? (
          // Render grouped items with dividers between groups
          items.map((group, groupIndex) => (
            <MockMenuGroup key={groupIndex} showDivider={groupIndex > 0}>
              {group.map((item, itemIndex) => (
                <MockMenuItem
                  key={itemIndex}
                  label={item.label}
                  icon={item.icon}
                  reverse={item.reverse}
                  onClick={item.onClick}
                />
              ))}
            </MockMenuGroup>
          ))
        ) : (
          // Render flat items without dividers
          <MockMenuGroup>
            {items.map((item, itemIndex) => (
              <MockMenuItem
                key={itemIndex}
                label={item.label}
                icon={item.icon}
                reverse={item.reverse}
                onClick={item.onClick}
              />
            ))}
          </MockMenuGroup>
        )}
      </MockMenuContainer>
    </Box>
  );
};
