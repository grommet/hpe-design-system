import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Grid,
  Diagram,
  Stack,
  ThemeContext,
  Text,
} from 'grommet';
import { Add, Down } from '@hpe-design/icons-grommet';
import { Annotation } from '../../../layouts';

const color = 'border';
const thickness = 'hair';
const type = 'direct';
const menuTextStyle = {
  fontSize: '16px',
  lineHeight: '1.5rem',
  fontWeight: 500,
};
const nonInteractiveStyle = {
  pointerEvents: 'none',
  userSelect: 'none',
};

const connections = [
  {
    anchor: 'horizontal',
    type,
    color,
    thickness,
    fromTarget: '1',
    toTarget: 'menu-button',
  },
  {
    anchor: 'vertical',
    type,
    color,
    thickness,
    fromTarget: '1a',
    toTarget: 'menu-label',
  },
  {
    anchor: 'vertical',
    type,
    color,
    thickness,
    fromTarget: '1b',
    toTarget: 'menu-icon',
  },
  {
    anchor: 'horizontal',
    type,
    color,
    thickness,
    fromTarget: '2',
    toTarget: 'first-item',
  },
  {
    anchor: 'horizontal',
    type,
    color,
    thickness,
    fromTarget: '3',
    toTarget: 'menu-item',
  },
  {
    anchor: 'vertical',
    type,
    color,
    thickness,
    fromTarget: '3a',
    toTarget: 'item-label',
  },
  {
    anchor: 'vertical',
    type,
    color,
    thickness,
    fromTarget: '3b',
    toTarget: 'item-icon',
  },
  {
    anchor: 'horizontal',
    type,
    color,
    thickness,
    fromTarget: '4',
    toTarget: 'divider',
  },
];

const AnatomyGrid = ({ ...rest }) => (
  <Grid
    columns={['xsmall', '48px']}
    // eslint-disable-next-line max-len
    rows={['auto', '36px', '36px', '42px', '36px', '50px', '56px', '36px' ]}
    areas={[
      ['annotations-top', 'annotations-top'],
      ['menu-area', 'annotation-1'],
      ['menu-area', 'annotation-2'],
      ['menu-area', 'empty-1'],
      ['menu-area', 'annotation-4'],
      ['menu-area', 'empty-2'],
      ['menu-area', 'annotation-3'],
      ['annotations-bottom', 'annotations-bottom'],
    ]}
    gap="xsmall"
    {...rest}
  />
);

const MenuText = ({ children, ...rest }) => (
  <Text style={menuTextStyle} {...rest}>
    {children}
  </Text>
);

const MenuItem = ({ id, pad, children }) => (
  <Box id={id} pad={pad}>
    <MenuText>{children}</MenuText>
  </Box>
);

const MenuItemWithLeadingIcon = ({ pad, icon, label }) => (
  <Box pad={pad} direction="row" gap="xsmall" align="center">
    {icon}
    <MenuText>{label}</MenuText>
  </Box>
);

const MenuItemTrailingIcon = ({ id, pad, label, icon }) => (
  <Box
    id={id}
    pad={pad}
    direction="row"
    gap="xsmall"
    align="center"
    justify="between"
  >
    <MenuText id="item-label">{label}</MenuText>
    {icon}
  </Box>
);

MenuText.propTypes = {
  children: PropTypes.node,
};

MenuItem.propTypes = {
  id: PropTypes.string,
  pad: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.node,
};

MenuItemWithLeadingIcon.propTypes = {
  pad: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  icon: PropTypes.node,
  label: PropTypes.string.isRequired,
};

MenuItemTrailingIcon.propTypes = {
  id: PropTypes.string,
  pad: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  label: PropTypes.string.isRequired,
  icon: PropTypes.node,
};

export const MenuAnatomy = () => {
  const theme = useContext(ThemeContext);
  const menuTheme = theme?.menu || {};
  const dropTheme = theme?.drop || {};
  const dropBackground =
    menuTheme?.drop?.background || dropTheme?.background || 'background-front';
  const dropRound =
    dropTheme?.border?.radius || menuTheme?.container?.round || 'xsmall';
  const dropElevation = dropTheme?.shadowSize || 'medium';
  const dropMargin = dropTheme?.margin || { top: 'xsmall' };
  const groupPad =
    menuTheme?.group?.container?.pad ||
    menuTheme?.container?.pad ||
    { horizontal: 'medium', vertical: 'xsmall' };
  const groupGap =
    menuTheme?.group?.container?.gap || menuTheme?.container?.gap || 'none';
  const itemPad = menuTheme?.item?.pad || {
    horizontal: 'medium',
    vertical: 'xsmall',
  };
  const separatorColor =
    menuTheme?.group?.separator?.color || 'border-weak';
  const separatorSize =
    menuTheme?.group?.separator?.size || 'hair';
  const topAnnotations = [
    { id: '1a', margin: { left: '28px' } },
    { id: '1b', margin: { left: '8px' } },
  ];
  const sideAnnotations = [
    { id: '1', gridArea: 'annotation-1', alignSelf: 'center' },
    { id: '2', gridArea: 'annotation-2', alignSelf: 'center' },
    { id: '4', gridArea: 'annotation-4', alignSelf: 'center' },
    { id: '3', gridArea: 'annotation-3', alignSelf: 'top' },
  ];
  const bottomAnnotations = [{ id: '3a' }, { id: '3b' }];

  return (
    <Stack margin={{ bottom: 'medium' }} interactiveChild="last">
      <AnatomyGrid>
        {/* Annotations on top */}
        <Box 
          gridArea="annotations-top" 
          direction="row" 
          gap="small" 
          justify="start"
          pad={{ bottom: 'small' }}
        >
          {topAnnotations.map(({ id, margin }) => (
            <Annotation key={id} id={id} target={id} margin={margin} />
          ))}
        </Box>

        {/* Annotations on right side */}
        {sideAnnotations.map(({ id, gridArea, alignSelf }) => (
          <Annotation
            key={id}
            id={id}
            target={id}
            gridArea={gridArea}
            alignSelf={alignSelf}
          />
        ))}

        {/* Annotations below */}
        <Box 
          gridArea="annotations-bottom" 
          direction="row" 
          gap="small" 
          justify="start"
          pad={{ top: 'small' }}
        >
          {bottomAnnotations.map(({ id }) => (
            <Annotation key={id} id={id} target={id} />
          ))}
        </Box>

        {/* Empty boxes for grid spacing */}
        <Box gridArea="empty-1" />
        <Box gridArea="empty-2" />

        {/* Menu anatomy mock (inline to avoid scroll-position drift) */}
        <Box
          gridArea="menu-area"
          align="start"
          justify="start"
          style={nonInteractiveStyle}
          onClick={(e) => e.preventDefault()}
        >
          <Button
            id="menu-button"
            label={
              <MenuText id="menu-label">Menu</MenuText>
            }
            icon={<Down id="menu-icon" />}
            reverse
            gap="xsmall"
          />
          <Box
            id="drop-container"
            background={dropBackground}
            elevation={dropElevation}
            round={dropRound}
            margin={dropMargin}
            pad={groupPad}
            gap={groupGap}
            width="160px"
          >
            <Box gap={groupGap}>
              <MenuItem id="first-item" pad={itemPad}>
                Action
              </MenuItem>
              <MenuItem pad={itemPad}>Action</MenuItem>
              <MenuItem pad={itemPad}>Action</MenuItem>
            </Box>
            <Box
              id="divider"
              background={separatorColor}
              height={separatorSize}
              margin={{ vertical: 'xsmall' }}
            />
            <Box gap={groupGap}>
              <MenuItem pad={itemPad}>Action</MenuItem>
              <MenuItemWithLeadingIcon
                pad={itemPad}
                icon={<Add />}
                label="Action"
              />
              <MenuItemTrailingIcon
                id="menu-item"
                pad={itemPad}
                label="Action"
                icon={<Add id="item-icon" />}
              />
            </Box>
          </Box>
        </Box>
      </AnatomyGrid>
      <Diagram connections={connections} />
    </Stack>
  );
};
