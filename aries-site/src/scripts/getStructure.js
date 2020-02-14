const structure = require('../data/structure');

module.exports = () => {
  const structureCopy = JSON.parse(JSON.stringify(structure));

  for (let i = 0; i < structureCopy.length; i += 1)
    delete structureCopy[i].icon;
  return structureCopy;
};
