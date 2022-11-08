export const connection = (fromTarget, toTarget, direction) => ({
  anchor: direction || 'horizontal',
  type: 'direct',
  color: 'border',
  thickness: 'hair',
  fromTarget,
  toTarget,
});
