const grommetThemeHpeHeadingLabelMap = {
  borderWidth: 'borderWidth (borderSize)',
  breakpoint: 'breakpoint (breakpoint)',
  color: 'color (color)',
  container: 'container (size)',
  focusIndicator: 'focusIndicator (focus)',
  fontWeight: 'fontWeight (fontWeight)',
  fontStack: 'fontStack (font)',
  heading: 'heading (heading)',
  icon: 'icon (iconSize)',
  radius: 'radius (radius)',
  shadow: 'shadow (elevation)',
  spacing: 'spacing (edgeSize)',
  text: 'text (text)',
};

const getGrommetThemeHpeDisplayToken = (token, category) => {
  if (!token || !token.startsWith('hpe.')) return token;

  const parts = token.split('.');

  if (category === 'color') return parts.slice(2).join('-');

  if (
    [
      'borderWidth',
      'breakpoint',
      'container',
      'fontWeight',
      'heading',
      'icon',
      'radius',
      'shadow',
      'spacing',
      'text',
    ].includes(category)
  ) {
    return parts[2] || token;
  }

  return token;
};

export { grommetThemeHpeHeadingLabelMap, getGrommetThemeHpeDisplayToken };