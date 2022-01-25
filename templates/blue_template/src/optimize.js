const fs = require('fs')
const util = require('util');

fs.readFile('./build/index.html', 'utf8', (err, data) => {
  data = replaceScripts(data)
  //data = data.replaceAll('"/css', '"/templates/blue_template/build/css')
  data = data.replaceAll('"/static', '"/templates/blue_template/build/static')
  data = data.replaceAll('"static/js/', '"/templates/blue_template/build/static/js/')
  data = data.replace('href="favicon.ico"', 'href="/templates/blue_template/build/favicon.ico"')
  data = data.replace('</body>', '<script> let domainSettings = JSON.parse("{{ .scripts }}")</script></body>')
  data = data.replace('</body>', "{{if .google}}<script async src=\"https://www.googletagmanager.com/gtag/js?id={{.google}}\"></script>{{end}}</body>")
  data = data.replace('</body>', " <script type=\"text/javascript\" > \
      setTimeout(() => {\
        {{if .yandex}} (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)}; m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)}) (window, document, \"script\", \"https://mc.yandex.ru/metrika/tag.js\", \"ym\"); ym({{ .yandex }}, \"init\", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });{{end}}\
        {{if .google}} window.dataLayer = window.dataLayer || []; function gtag(){window.dataLayer.push(arguments);} gtag(\'js\', new Date()); gtag(\'config\', \'{{.google}}\');{{end}}\
        {{if .mail}}\
          var _tmr = window._tmr || (window._tmr = []); \
          _tmr.push({id: \"{{ .mail}}\", type: \"pageView\", start: (new Date()).getTime()}); \
          (function (d, w, id) { \
            if (d.getElementById(id)) return; \
            var ts = d.createElement(\"script\"); ts.type = \"text/javascript\"; ts.async = true; ts.id = id; \
            ts.src = \"https://top-fwz1.mail.ru/js/code.js\"; \
            var f = function () {var s = d.getElementsByTagName(\"script\")[0]; s.parentNode.insertBefore(ts, s);}; \
            if (w.opera == \"[object Opera]\") { d.addEventListener(\"DOMContentLoaded\", f, false); } else { f(); } \
          })(document, window, \"topmailru-code\"); \
        {{end}}\
        {{if .facebook}}\
          !function(f,b,e,v,n,t,s)\
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?\
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};\
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';\
            n.queue=[];t=b.createElement(e);t.async=!0;\
            t.src=v;s=b.getElementsByTagName(e)[0];\
            s.parentNode.insertBefore(t,s)}(window, document,'script',\
            'https://connect.facebook.net/en_US/fbevents.js');\
            fbq('init', '{{ .facebook}}');\
            fbq('track', 'PageView');\
        {{end}}\
      }, 2700)\
    </script>\
    </body>")
  fs.writeFileSync("./build/blue_template.html", data)
  fs.unlink("./build/index.html", () => { })
})


const replaceScripts = (data) => {
  //надо разобраться со скриптами
  /*let script = ""
  let i = data.indexOf('script defer="defer" src="/') + 'script defer="defer" src="/'.length;
  while (data[i] != '"') {
    script += data[i]
    i++
  }
  let scriptContent = fs.readFileSync("build/" + script, 'utf8')
  data = data.replace('<script defer="defer" src="/' + script + '"></script>', `<script type="text/javascript">${scriptContent}</script>`)*/

  let style = "css/style.css"
  let styleContent = fs.readFileSync("build/" + style, 'utf8')
  data = data.replace(`<link rel="stylesheet" href="/css/style.css"/>`, `<style type="text/css">${styleContent}</style>`)

  style = "/css/header.css"
  styleContent = fs.readFileSync("build/" + style, 'utf8')
  data = data.replace(`<link rel="stylesheet" href="/css/header.css"/>`, `<style type="text/css">${styleContent}</style>`)

  return data
}