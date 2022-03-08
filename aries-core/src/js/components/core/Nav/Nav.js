/* eslint-disable no-nested-ternary */
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Collapsible, Text, ResponsiveContext } from 'grommet';
import { Close, Hpe, Menu } from 'grommet-icons';

const PAD_SIZES = ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge'];

export const Nav = ({
  href,
  title,
  children,
  background,
  brandOnly,
  collapse,
  pad,
}) => {
  const size = useContext(ResponsiveContext);
  const [open, setOpen] = useState(false);
  const textSize = 'small';

  return (
    <Box background={background}>
      <Box
        role="navigation"
        direction="row"
        justify="between"
        pad={
          pad || {
            vertical: 'small',
            horizontal: !['xsmall', 'small'].includes(size)
              ? 'xlarge'
              : 'large',
          }
        }
      >
        <Button
          href={href}
          margin={{ right: brandOnly ? 'medium' : undefined }}
        >
          <Box direction="row" align="center" gap="medium">
            <Hpe color="brand" size="large" />
            {!brandOnly && (
              <Box direction="row" gap="xsmall">
                <Text weight="bold" size={textSize}>
                  HPE
                </Text>
                <Text size={textSize}>{title}</Text>
              </Box>
            )}
          </Box>
        </Button>
        <Box direction="row" gap="medium" align="center">
          {children && !collapse ? (
            children
          ) : !['xsmall', 'small'].includes(size) ? (
            children &&
            (children.length > 1
              ? children.map((child, index) =>
                  React.cloneElement(child, {
                    lastSection: index === children.length - 1,
                    key: index,
                  }),
                )
              : React.cloneElement(children, {
                  lastSection: true,
                }))
          ) : (
            <Button
              icon={!open ? <Menu /> : <Close />}
              onClick={() => setOpen(!open)}
              plain
            />
          )}
        </Box>
      </Box>
      {['xsmall', 'small'].includes(size) && (
        <Collapsible background="white" open={open}>
          {children &&
            (children.length > 1
              ? children.map((child, index) =>
                  React.cloneElement(child, {
                    lastSection: index === children.length - 1,
                    key: index,
                  }),
                )
              : React.cloneElement(children, {
                  lastSection: true,
                }))}
        </Collapsible>
      )}
    </Box>
  );
};

Nav.propTypes = {
  brandOnly: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.node,
  ]),
  collapse: PropTypes.bool,
  href: PropTypes.string,
  title: PropTypes.string,
  background: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      dark: PropTypes.string,
      light: PropTypes.string,
    }),
  ]),
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
  brandOnly: false,
  children: undefined,
  collapse: true,
  href: '/',
  title: undefined,
  background: undefined,
  pad: undefined,
};
