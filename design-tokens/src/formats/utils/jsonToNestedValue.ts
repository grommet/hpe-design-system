export const jsonToNestedValue = (
  token: string | { [key: string]: any } | undefined,
) => {
  if (!token || typeof token !== 'object') return token;
  if ('value' in token) return token.value;
  const nextObj: { [key: string]: any } = {};
  Object.entries(token).forEach(([key, value]) => {
    nextObj[key] = jsonToNestedValue(value);
  });

  return nextObj;
};
