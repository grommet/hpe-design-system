export // the prefix name of the Create option entry
const prefix = 'Create';

export const updateCreateOption = (text, dataVal) => {
  const len = dataVal.length;
  const d =
    dataVal[len - 1] && typeof dataVal[len - 1] === 'object'
      ? dataVal[len - 1].label
      : dataVal[len - 1];

  if (d && d.includes(prefix)) {
    // remove Create option before adding an updated one
    dataVal.pop();
  }
  const res = `${prefix} '${text}'`;
  if (text)
    dataVal.push(
      dataVal[dataVal.length - 1] &&
        typeof dataVal[dataVal.length - 1] === 'object'
        ? { label: res, values: [] }
        : res,
    );
};

// improving Search support of special characters
export const getRegExp = text => {
  // The line below escapes regular expression special characters:
  // [ \ ^ $ . | ? * + ( )
  const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

  // Create the regular expression with modified value which
  // handles escaping special characters. Without escaping special
  // characters, errors will appear in the console
  return new RegExp(escapedText, 'i');
};
