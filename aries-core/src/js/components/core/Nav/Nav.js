import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Collapsible, Text, ResponsiveContext } from 'grommet';
import { Close, Hpe, Menu } from 'grommet-icons';

const PAD_SIZES = ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge'];

export const Nav = ({ href, title, children, background, pad }) => {
  const size = useContext(ResponsiveContext);
  const [open, setOpen] = useState(false);

  return (
    <Box background={background}>
      <Box
        role="navigation"
        direction="row"
        justify="between"
        pad={
          pad || {
            vertical: 'small',
            horizontal: size !== 'small' ? 'xlarge' : 'large',
          }
        }
      >
        <Button href={href}>
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
                    key: index,
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
            ))}
        </Box>
      </Box>
      {size === 'small' && (
        <Collapsible background="white" open={open}>
          {children &&
            (children.length > 1
              ? children.map((child, index) => {
                  return React.cloneElement(child, {
                    lastSection: index === children.length - 1,
                    key: index,
                  });
                })
              : React.cloneElement(children, {
                  lastSection: true,
                }))}
        </Collapsible>
      )}
    </Box>
  );
};

Nav.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
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
  children: undefined,
  href: '/',
  title: undefined,
  background: undefined,
  pad: undefined,
};
