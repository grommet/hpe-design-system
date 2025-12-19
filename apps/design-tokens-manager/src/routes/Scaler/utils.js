const roundToNearest = (value, nearest) => {
  return Math.ceil(value / nearest) * nearest;
};

const createScale = (base, factor, steps, gridUnit) => {
  const values = [];
  // above base
  for (let i = 0; i < steps; i++) {
    values.push(roundToNearest(base * Math.pow(factor, i), gridUnit || base));
  }
  // below base
  for (let i = 0; i < steps; i++) {
    const value = base / Math.pow(factor, i);
    let nearest = gridUnit || base;

    // round to nearest even number
    if (value >= 4 && value < gridUnit) {
      nearest = 2;
    }
    // round to nearest integer
    else if (value < 4) {
      nearest = 1;
    }

    values.push(roundToNearest(value, nearest));
  }

  const result = values
    .reduce((acc, value) => {
      if (!acc.includes(value)) {
        acc.push(value);
      }
      return acc;
    }, [])
    .sort((a, b) => a - b);

  const stepsBelow = Math.ceil(steps / 2);
  const stepsAbove = Math.floor(steps / 2);
  const baseIndex = result.indexOf(base);
  const below = result.slice(
    Math.max(baseIndex + 1 - stepsBelow, 0),
    baseIndex + 1,
  );
  const above = result.slice(baseIndex + 1, baseIndex + 1 + stepsAbove);

  return [...below, ...above];
};

export { createScale };
