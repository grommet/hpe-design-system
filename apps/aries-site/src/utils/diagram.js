export const connection = (fromTarget, toTarget, direction, type) => ({
  anchor: direction || 'horizontal',
  type: type || 'direct',
  color: 'border',
  thickness: 'hair',
  fromTarget,
  toTarget,
});
