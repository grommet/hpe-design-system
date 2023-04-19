// Calculate the mid point between two t-shirt sizes from the theme
export const midSize = (size1, size2, theme) => {
  const a = parseInt(theme.global.size[size1], 10);
  const b = parseInt(theme.global.size[size2], 10);
  return `${Math.floor((a + b) / 2)}px`;
};
