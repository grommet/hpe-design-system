export const sentenceCase = (str: string | number) => {
  let adjustedStr = str;
  if (typeof adjustedStr === 'number') adjustedStr = adjustedStr.toString();
  adjustedStr = adjustedStr.toLowerCase();
  return adjustedStr.charAt(0).toUpperCase() + adjustedStr.slice(1);
}
