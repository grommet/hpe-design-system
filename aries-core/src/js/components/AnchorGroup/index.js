import React from 'react';
import { Anchor, ThemeContext } from 'grommet';

export const AnchorGroup = ({ items }) => {
  return (
    <>
      {items &&
        items.map((item, index) => (
          <ThemeContext.Extend
            value={{
              anchor: {
                textDecoration: 'none',
              },
            }}
          >
            <Anchor
              tabIndex={0}
              key={index}
              icon={item.icon}
              label={item.label}
              margin="small"
              color="dark-2"
            />
          </ThemeContext.Extend>
        ))}
    </>
  );
};
