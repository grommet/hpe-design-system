import {
  IconBrand,
  IconColor,
  IconIcons,
  IconLayout,
  IconType,
  IconToken,
} from './index';

export const iconsMap = {
  // Foundation
  branding: size => <IconBrand size={size} />,
  color: size => <IconColor size={size} />,
  iconography: size => <IconIcons size={size} />,
  layout: size => <IconLayout size={size} />,
  tokens: size => <IconToken size={size} />,
  typography: size => <IconType size={size} />,
};
