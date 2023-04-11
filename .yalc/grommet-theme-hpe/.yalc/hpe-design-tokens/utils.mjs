export const resolveValues = (tokens) => {
  const result = {};

  Object.entries(tokens).forEach(([key, value]) => {
    let currentValue = value;
    while (currentValue in tokens) {
      currentValue = tokens[currentValue];
    }

    result[key] = currentValue;
  });

  return result;
};
