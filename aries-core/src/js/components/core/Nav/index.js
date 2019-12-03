/* eslint-disable no-nested-ternary */
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Collapsible, Text, ResponsiveContext } from 'grommet';
import { Close, Hpe, Menu } from 'grommet-icons';
import { AnchorGroup } from '../../helpers';
import NavContext from '../../helpers/NavContext';

const PAD_SIZES = ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge'];

export const Nav = ({
  background,
  children,
  activePath,
  defaultActiveItem,
  direction,
  href,
  items,
  level,
  pad,
  title,
}) => {
  const size = useContext(ResponsiveContext);
  const [open, setOpen] = useState(false);

  return (
    <NavContext.Provider value={{ activePath, defaultActiveItem, level }}>
      <Box background={background}>
        <Box
          // To-do: If there is more than one nav, an aria-label needs to be
          // added to differentiate between the them. We should decide how
          // we want to title these by default.
          role="navigation"
          direction="row"
          justify="between"
          pad={
            pad || {
              vertical: direction !== 'vertical' ? 'small' : undefined,
              horizontal:
                direction !== 'vertical'
                  ? size !== 'small'
                    ? 'xlarge'
                    : 'large'
                  : undefined,
            }
          }
        >
          {/* Show HPE logo and service name only on primary nav */}
          {level === 1 && (
            <Button href={href}>
              <Box direction="row" align="center" gap="medium">
                <Hpe color="#01a982" size="large" />
                <Box direction="row" gap="xsmall">
                  <Text weight="bold">HPE</Text>
                  <Text>{title}</Text>
                </Box>
              </Box>
            </Button>
          )}
          <Box
            direction={direction === 'vertical' ? 'column' : 'row'}
            gap="medium"
            align={direction === 'vertical' ? 'start' : 'center'}
          >
            {size !== 'small' ? (
              // By default, treat nav item as anchors
              // unless children are provided
              !children ? (
                <AnchorGroup
                  items={items}
                  level={level}
                  activePath={activePath}
                  defaultActiveItem={defaultActiveItem}
                  direction={direction}
                />
              ) : children.length > 1 ? (
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
                plain
              />
            )}
          </Box>
        </Box>
        {size === 'small' && (
          <Collapsible background="white" open={open}>
            {children &&
              (children.length > 1
                ? children.map((child, index) => {
                    return React.cloneElement(child, {
                      lastSection: index === children.length - 1,
                    });
                  })
                : React.cloneElement(children, {
                    lastSection: true,
                  }))}
            {!children && (
              <AnchorGroup
                items={items}
                level={level}
                activePath={activePath}
              />
            )}
          </Collapsible>
        )}
      </Box>
    </NavContext.Provider>
  );
};

Nav.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  activePath: PropTypes.string,
  defaultActiveItem: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  direction: PropTypes.string,
  href: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  background: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      dark: PropTypes.string,
      light: PropTypes.string,
    }),
  ]),
  level: PropTypes.number,
  pad: PropTypes.oneOfType([
    PropTypes.oneOf(['none', ...PAD_SIZES]),
    PropTypes.shape({
      bottom: PropTypes.oneOfType([
        PropTypes.oneOf(PAD_SIZES),
        PropTypes.string,
      ]),
      horizontal: PropTypes.oneOfType([
        PropTypes.oneOf(PAD_SIZES),
        PropTypes.string,
      ]),
      left: PropTypes.oneOfType([PropTypes.oneOf(PAD_SIZES), PropTypes.string]),
      right: PropTypes.oneOfType([
        PropTypes.oneOf(PAD_SIZES),
        PropTypes.string,
      ]),
      top: PropTypes.oneOfType([PropTypes.oneOf(PAD_SIZES), PropTypes.string]),
      vertical: PropTypes.oneOfType([
        PropTypes.oneOf(PAD_SIZES),
        PropTypes.string,
      ]),
    }),
    PropTypes.string,
  ]),
};

Nav.defaultProps = {
  children: undefined,
  defaultActiveItem: undefined,
  direction: 'horizontal',
  href: '/',
  level: 1,
  title: undefined,
  background: undefined,
  pad: undefined,
};
