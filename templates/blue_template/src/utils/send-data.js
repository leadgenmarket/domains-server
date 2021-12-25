import axios from "axios"

const sendLeadUrl = "/lead"
const updateLeadUrl = "/lead"
const SendData = (form, setForm, callback) => {
    let data = {}
    //console.log(form)
    Object.keys(form).map((key) => {
        if (key === 'name') {
            data = {...data, name: form['name']}
        } else if (key === 'phone') {
            data = {...data, phone: form['phone']}
        } else if (key !== 'lead_id') {
            let newText = ""
            if (data.text !== undefined) {
                newText = data.text+"\n"+key+" "+form[key]
            } else {
                newText = key+" "+form[key]
            }
            data = {...data, text: newText}
        }
    })
    if (form.lead_id === undefined) {
        axios.put(sendLeadUrl, data).then((resp) => {
            setForm({
                ...form,
                lead_id: resp.data.ID
            })
        })
    } else {
        data = {...data, id: form.lead_id}
        axios.post(updateLeadUrl, data).then((resp) => {
            console.log('updated')
        })
    }
    callback()
}

export default SendData


/*

стандартный шаблон

{
	"AMO_ID": "false",
	"loc_type": "",
	"name": "",
	"roistatVisitId": "8527232",
	"user_ip": "178.217.152.251",
	"act": "tmp",
	"phone": "+7 ( 925 ) 120 - 20 - 20",
	"a_sda4a[]": "2024",
	"vtor": "0",
	"jk_id": "40892",
	"S_ID": "99793",
	"TEMA": "Заявка с одноэкранника",
	"r_codes": "primorskiy-rayon-piter, centr-spb, ",
	"m_codes": "",
	"s_name": "Санкт-Петербург",
	"f_info[]": [
		"Район - Приморский район, Центр, ",
		"Количество комнат - 3, 4, ",
		"Сдача - ЖК сдается в 2024 году, ",
		"Бюджет - До 84 567 000 руб."
	],
	"utm_content": "1ekran",
	"ut_type": "piter-kvartiri.ru",
	"yclid": "null",
	"gclid": "null",
	"send_type": "",
	"l_t": "la",
	"set_bd": "1",
	"s[sid]": "sqlvn8n8v1ddicp7r0tuhdfqdm",
	"s[d]": "piter-kvartiri.ru:443",
	"s[r]": "",
	"s[uri]": "/?city",
	"s[ua]": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:95.0) Gecko/20100101 Firefox/95.0",
	"s[ip]": "178.217.152.251",
	"s[cel]": "getForm",
	"s[a]": "2",
	"_fbp": "fb.1.1640332757686.1397046802",
	"_fbc": "",
	"fb_id": "1019377974900745",
	"clientID": "1640332757365252884",
	"metrika_id": "86822304",
	"celType": "getForm"
}



======////* отпрвленно имя

{
	"AMO_ID": "false",
	"loc_type": "",
	"name": "test",
	"roistatVisitId": "8527232",
	"user_ip": "178.217.152.251",
	"act": "tmp",
	"phone": "+7 ( 925 ) 120 - 20 - 20",
	"a_sda4a[]": "2024",
	"vtor": "0",
	"jk_id": "40892",
	"S_ID": "99793",
	"TEMA": "Заявка с одноэкранника",
	"r_codes": "primorskiy-rayon-piter, centr-spb, ",
	"m_codes": "",
	"s_name": "Санкт-Петербург",
	"f_info[]": [
		"Район - Приморский район, Центр, ",
		"Количество комнат - 3, 4, ",
		"Сдача - ЖК сдается в 2024 году, ",
		"Бюджет - До 84 567 000 руб."
	],
	"utm_content": "1ekran",
	"ut_type": "piter-kvartiri.ru",
	"yclid": "null",
	"gclid": "null",
	"send_type": "",
	"l_t": "la",
	"set_bd": "1",
	"s[sid]": "sqlvn8n8v1ddicp7r0tuhdfqdm",
	"s[d]": "piter-kvartiri.ru:443",
	"s[r]": "",
	"s[uri]": "/?city",
	"s[ua]": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:95.0) Gecko/20100101 Firefox/95.0",
	"s[ip]": "178.217.152.251",
	"s[cel]": "getName",
	"s[a]": "2",
	"_fbp": "fb.1.1640332757686.1397046802",
	"_fbc": "",
	"fb_id": "1019377974900745",
	"clientID": "1640332757365252884",
	"metrika_id": "86822304",
	"celType": "getName"
}

*/