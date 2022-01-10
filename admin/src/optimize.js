const fs = require('fs')

fs.readFile('./build/index.html', 'utf8' , (err, data) => {
  data = data.replaceAll('"/css', '"/admin/css')
  data = data.replaceAll('"/static', '"/admin/static')
  data = data.replace('href="favicon.ico"', 'href="/admin/favicon.ico"')
  //data = data.replace('</body>', '<script> let domainSettings = JSON.parse("{{ .scripts }}")</script></body>')
  fs.writeFileSync("./build/index.html", data)
  //fs.unlink("./build/index.html", ()=>{})
})