const fs = require('fs')

fs.readFile('./build/index.html', 'utf8', (err, data) => {
  data = data.replaceAll('"/css', '"/plans_admin/build/css')
  data = data.replaceAll('"/static', '"/plans_admin/build/static')
  data = data.replace('href="favicon.ico"', 'href="/plans_admin/build/favicon.ico"')
  //data = data.replace('</body>', '<script> let domainSettings = JSON.parse("{{ .scripts }}")</script></body>')
  fs.unlink("./build/index.html", () => { })
  fs.writeFileSync("./build/plans_admin.html", data)
  //
})