const fs = require('fs')
const util = require('util');

fs.readFile('./public/index.html', 'utf8', (err, data) => {
  //data = data.replaceAll('"/css', '"/templates/blue_template/build/css')
  
  data = data.replace('<body><div id="root"></div></body></html>', `<body><div id="root"></div></body><body><div id="root"></div></body><script src="test-data.js"></script></html></html>`)
  fs.writeFileSync("./public/index.html", data)
})

