const fs = require('fs')

fs.readFile('./build/index.html', 'utf8' , (err, data) => {
  data = data.replaceAll('"/css', '"/templates/blue_template/build/css')
  data = data.replaceAll('"/static', '"/templates/blue_template/build/static')
  data = data.replace('href="favicon.ico"', 'href="/templates/blue_template/build/favicon.ico"')
  data = data.replace('</body>', '<script> let domainSettings = JSON.parse("{{ .scripts }}")</script></body>')
  data = data.replace('</body>', " {{if .yandex}}  <script type=\"text/javascript\" > (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)}; m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)}) (window, document, \"script\", \"https://mc.yandex.ru/metrika/tag.js\", \"ym\"); ym({{ .yandex }}, \"init\", { clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true });  </script>  <noscript><div><img src=\"https://mc.yandex.ru/watch/{{ .yandex }}\" style=\"position:absolute; left:-9999px;\" alt=\"\" /></div></noscript> {{end}} </body>")
  data = data.replace('</body>', '{{if .google}} <script async src="https://www.googletagmanager.com/gtag/js?id={{.google}}"></script> <script> window.dataLayer = window.dataLayer || []; function gtag(){window.dataLayer.push(arguments);} gtag(\'js\', new Date()); gtag(\'config\', \'{{.google}}\'); </script>{{end}}</body>')
  data = data.replace('</body>', '{{if .mail}} <script type="text/javascript"> \
  var _tmr = window._tmr || (window._tmr = []); \
  _tmr.push({id: "{{ .mail}}", type: "pageView", start: (new Date()).getTime()}); \
  (function (d, w, id) { \
    if (d.getElementById(id)) return; \
    var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id; \
    ts.src = "https://top-fwz1.mail.ru/js/code.js"; \
    var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);}; \
    if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); } \
  })(document, window, "topmailru-code"); \
  </script><noscript><div> \
  <img src="https://top-fwz1.mail.ru/counter?id={{ .mail}};js=na"  \ style="border:0;position:absolute;left:-9999px;" alt="Top.Mail.Ru" /> \
  </div></noscript> \
  {{end}}</body>')
  
  data = data.replace('</body>', "{{if .facebook}}\
      <script>\
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
        </script>\
      {{end}}</body>")
  /*data = data.replace('</body>', "{{ if .marquiz}} <div data-marquiz-id=\"{{ .marquiz}}\"></div> <script>(function(t, p) {window.Marquiz ? Marquiz.add([t, p]) : document.addEventListener('marquizLoaded', function() {Marquiz.add([t, p])})})('Button', {id: '{{ .marquiz}}', buttonText: 'Пройти тест', bgColor: '#23c8ec', rounded: true, shadow: 'rgba(35, 200, 236, 0.5)', blicked: true})</script><script> \
  (function(w, d, s, o){ \
    var j = d.createElement(s); j.async = true; j.src = '//script.marquiz.ru/v2.js';j.onload = function() {\
      if (document.readyState !== 'loading') Marquiz.init(o);\
      else document.addEventListener(\"DOMContentLoaded\", function() {\
        Marquiz.init(o);\
      });\
    };\
    d.head.insertBefore(j, d.head.firstElementChild);\
  })(window, document, 'script', {\
      host: '//quiz.marquiz.ru',\
      region: 'eu',\
      id: '{{ .marquiz}}',\
      autoOpen: false,\
      autoOpenFreq: 'once',\
      openOnExit: false,\
      disableOnMobile: false\
    }\
  );\
  </script>{{end}}</body>")*/
  


  fs.writeFileSync("./build/blue_template.html", data)
  fs.unlink("./build/index.html", ()=>{})
})

/*

<!-- Marquiz script start -->

<!-- Marquiz script end -->

*/