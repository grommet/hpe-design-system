const fs = require('fs-extra');
const getStructure = require('./getStructure');

const structure = getStructure();

fs.writeFileSync('src/tests/structure.json', structure);
