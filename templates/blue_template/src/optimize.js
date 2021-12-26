const fs = require('fs')

fs.readFile('./build/index.html', 'utf8' , (err, data) => {
  /*if (err) {
    console.error(err)
    return
  }
  let script1=""
  let i=data.indexOf('script defer="defer" src="')+ 'script defer="defer" src="'.length;
  while (data[i]!='"') {
    script1 +=data[i]  
    i++
  }*/
  //data = data.replace('<script defer="defer" src="'+script1+'"></script>', '<script type="text/javascript" src="/templates/blue_template/'+script1+'"></script>')
  data = data.replaceAll('"/css', '"/templates/blue_template/build/css')
  data = data.replaceAll('"/static', '"/templates/blue_template/build/static')
  fs.writeFileSync("./build/blue_template.html", data)
  fs.unlink("./build/index.html", ()=>{})
})