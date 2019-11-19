import React, { useState, useContext } from 'react';
import { Box, Button, Collapsible, Text, ResponsiveContext } from 'grommet';
import { Close, Hpe, Menu } from 'grommet-icons';

export const Nav = ({ href, title, children }) => {
  const size = useContext(ResponsiveContext);
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Box
        as="nav"
        direction="row"
        justify="between"
        pad={{ vertical: 'small', horizontal: 'xlarge' }}
      >
        {/* Assume the logo should return to the index page by default */}
        <Button href={href || '/'}>
          <Box direction="row" align="center" gap="medium">
            <Hpe color="#01a982" size="large" />
            <Box direction="row" gap="xsmall">
              <Text weight="bold">HPE</Text>
              <Text>{title}</Text>
            </Box>
          </Box>
        </Button>
        <Box direction="row" gap="medium" align="center">
          {children &&
            // eslint-disable-next-line no-nested-ternary
            (size !== 'small' ? (
              children.length > 1 ? (
                children.map((child, index) => {
                  return React.cloneElement(child, {
                    lastSection: index === children.length - 1,
                  });
                })
              ) : (
                React.cloneElement(children, {
                  lastSection: true,
                })
              )
            ) : (
              <Button
                icon={!open ? <Menu /> : <Close />}
                onClick={() => setOpen(!open)}
              />
            ))}
        </Box>
      </Box>
      {size === 'small' && (
        <Collapsible background="white" open={open}>
          {children.length > 1
            ? children.map((child, index) => {
                return React.cloneElement(child, {
                  lastSection: index === children.length - 1,
                });
              })
            : React.cloneElement(children, {
                lastSection: true,
              })}
        </Collapsible>
      )}
    </Box>
  );
};
