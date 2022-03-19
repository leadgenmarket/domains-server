const fs = require('fs')
const util = require('util');

fs.readFile('./build/index.html', 'utf8', (err, data) => {
  data = replaceScripts(data)
  data = data.replaceAll('"/css', '"/templates/plans_template/build/css')
  data = data.replaceAll('"/static', '"/templates/plans_template/build/static')
  data = data.replaceAll('"static/js/', '"/templates/plans_template/build/static/js/')
  data = data.replace('href="favicon.ico"', 'href="/templates/plans_template/build/favicon.ico"')
  data = data.replace('</body>', '<script> let domainSettings = JSON.parse("{{ .scripts }}")</script></body>')
  data = data.replace('</body>', "{{if .google}}<script async src=\"https://www.googletagmanager.com/gtag/js?id={{.google}}\"></script>{{end}}</body>")
  data = data.replace('</body>', "{{if .vk}}<script type=\"text/javascript\">!function(){var t=document.createElement(\"script\");t.type=\"text/javascript\",t.async=!0,t.src=\"https://vk.com/js/api/openapi.js?162\",t.onload=function(){VK.Retargeting.Init(\"{{.vk}}\"),VK.Retargeting.Hit()},document.head.appendChild(t)}();</script>{{end}}</body>")
  data = data.replace('</body>', " <script type=\"text/javascript\" > \
      {{if .roistat}}\
        (function(w, d, s, h, id) {\
          w.roistatProjectId = id; w.roistatHost = h;\
          var p = d.location.protocol == \"https:\" ? \"https://\" : \"http://\";\
          var u = /^.*roistat_visit=[^;]+(.*)?$/.test(d.cookie) ? \"/dist/module.js\" : \"/api/site/1.0/\"+id+\"/init\";\
          var js = d.createElement(s); js.charset=\"UTF-8\"; js.async = 1; js.src = p+h+u; var js2 = d.getElementsByTagName(s)[0]; js2.parentNode.insertBefore(js, js2);\
        })(window, document, 'script', 'cloud.roistat.com', 'ae9cbfdb4a59f3dd07844cef447758ca');\
      {{end}}\
      {{if .qoopler}}\
        (function (d, w) {\
          var n = d.getElementsByTagName(\"script\")[0],\
            s = d.createElement(\"script\");\
            s.type = \"text/javascript\";\
            s.async = true;\
            s.src = \"https://qoopler.ru/index.php?ref=\"+d.referrer+\"&page=\" + encodeURIComponent(w.location.href);\
            n.parentNode.insertBefore(s, n);\
        })(document, window);\
      {{end}}\
      {{if .google}} window.dataLayer = window.dataLayer || []; function gtag(){window.dataLayer.push(arguments);} gtag(\'js\', new Date()); gtag(\'config\', \'{{.google}}\');{{end}}\
      setTimeout(() => {\
        {{if .yandex}} (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)}; m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)}) (window, document, \"script\", \"https://mc.yandex.ru/metrika/tag.js\", \"ym\"); ym({{ .yandex }}, \"init\", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });{{end}}\
        {{if .mytarget}}\
          var _tmr = window._tmr || (window._tmr = []); \
          _tmr.push({id: \"{{ .mytarget}}\", type: \"pageView\", start: (new Date()).getTime()}); \
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
  fs.writeFileSync("./build/plans_template.html", data)
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

  let style = "css/style_mask.css"
  let styleContent = fs.readFileSync("build/" + style, 'utf8')
  data.replace
  data = data.replace(`<link rel="stylesheet" href="/css/style_mask.css"/>`, '<style>*{\
    --main-bg-color: #{{ .main_color}};\
    --secondary-bg-color: #{{ .secondary_color}};\
}</style>'+ `<style type="text/css">${styleContent}</style>`)

  return data
}