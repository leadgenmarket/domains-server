const fs = require('fs')

fs.readFile('./build/index.html', 'utf8' , (err, data) => {
  data = data.replaceAll('"/css', '"/templates/blue_template/build/css')
  data = data.replaceAll('"/static', '"/templates/blue_template/build/static')
  data = data.replace('href="favicon.ico"', 'href="/templates/blue_template/build/favicon.ico"')
  data = data.replace('</body>', '<script> let domainSettings = JSON.parse("{{ .scripts }}")</script></body>')
  fs.writeFileSync("./build/blue_template.html", data)
  fs.unlink("./build/index.html", ()=>{})
})