// Wizard width is not a t-shirt size but instead dependent
// on the max number of columns it will contain * the width
// of those columns (medium) + gap between columns + small amount
// of pad to ensure focus is visible.
export const getWidth = (numberColumns, theme, size) => {
  const inputWidth =
    parseInt(theme.global.size.medium.replace('px', ''), 10) * numberColumns;
  const gapWidth = !['xsmall', 'small'].includes(size)
    ? parseInt(theme.global.edgeSize.xlarge.replace('px', ''), 10) *
      (numberColumns - 1)
    : 0;
  const focusPad =
    2 *
    (['xsmall', 'small'].includes(size)
      ? parseInt(theme.global.edgeSize.xsmall.replace('px', ''), 10)
      : parseInt(theme.global.edgeSize['5xsmall'].replace('px', ''), 10));
  return `${inputWidth + gapWidth + focusPad}px`;
};
