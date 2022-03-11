const fs = require('fs')
const util = require('util');

const readFileFunc = async  (filePath) => {
  const readFile = util.promisify(fs.readFile);
  let data = await fs.readFile(filePath);
}


readFileFunc('test.js').then(data => {
  console.log(data)
})