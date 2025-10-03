// avoid duplication of padding between Card header, body, and footer
export const adjustPad = (direction, context, theme) => {
  const pad = theme?.card?.body?.pad;

  let adjustedPad;
  if (context === 'header') {
    adjustedPad = {
      left: pad,
      right: pad,
      bottom: '3xsmall',
      top: pad,
    };
  }
  if (context === 'body') {
    adjustedPad = {
      left: pad,
      right: pad,
      top: undefined,
      bottom: pad,
    };
  } else if (context === 'footer') {
    adjustedPad = {
      left: direction !== 'row' ? pad : undefined,
      right: pad,
      bottom: pad,
      top: direction !== 'row' ? undefined : pad,
    };
  }
  return adjustedPad;
};
