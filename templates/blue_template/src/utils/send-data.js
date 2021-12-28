import axios from "axios"
import jsCookie from "js-cookie"

const sendLeadUrl = "/lead"
const updateLeadUrl = "/lead"
const getParam = (p) => {
    var match = RegExp('[?&]' + p + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

const getRayonCodes = (rayonName) => {
	let result = []
	if (rayonName === undefined) {
		return ""
	}
	let rayons = rayonName.split(", ")
	rayons.map((rayon) => {
		Object.keys(domainSettings.locations).map((key) => {
			if (domainSettings.locations[key].NameFull == rayon) {
				result.push(domainSettings.locations[key].Path)
			}
		})
	})
	return result
}

const getSdachaList = (sdacha) => {
	if (sdacha === undefined) {
		return ""
	}
	let list = sdacha.split(", ")
	let result = []
	list.forEach((sdacha) => {
		sdacha.split(' ').forEach((path) => {
			if (parseInt(path)>0) {
				result.push(path)
			}
		})
	})
	return result
}
const SendData = (form, setForm, callback, raionsName, roomsName, sdachaName) => {
	let leadgen = {
		"AMO_ID": "false",
		"loc_type": "",
		"roistatVisitId": jsCookie.get('roistat_visit'),
		"act": "tmp",
		"vtor": "0",
		"jk_id": "",
		"TEMA": "Заявка с одноэкранника",
		"m_codes": "",
		"f_info[]": [],
		"yclid": getParam('yclid') == null? "": getParam('yclid'),
		"gclid": getParam('gclid') == null? "": getParam('gclid'),
		"send_type": "",
		"l_t": "la",
		"set_bd": "1",
		"s[sid]": "",
		"s[d]": window.location.host,
		"s[r]": "",
		"s[uri]": decodeURIComponent(window.location.search),
		"fb_id": domainSettings.domain.facebook,
		"metrika_id": domainSettings.domain.yandex,
		"ut_type": window.location.host,
		"s[ua]": window.navigator.userAgent,
		"a_sda4a[]": getSdachaList(form[sdachaName]),
		"r_codes": getRayonCodes(form[raionsName]),
		"clientID": domainSettings.domain.clientID,
		"_fbp": jsCookie.get("_fbp"),
		"_fbc": jsCookie.get("_fbc"),
		"S_ID": domainSettings.city.portal_id,
		"s_name": domainSettings.city.Name,
		"s[ip]": domainSettings.ip,
		"user_ip": domainSettings.ip,
		"utm_content": "1ekran",
		"name": "",
		"phone": "",
		"celType": "",
		"s[cel]": "",
	}

	if (getParam('utm_campaign') != null) {
		leadgen["utm_campaign"] = getParam('utm_campaign')
	}
	if (getParam('utm_medium') != null) {
		leadgen["utm_medium"] = getParam('utm_medium')
	}
	if (getParam('utm_term') != null) {
		leadgen["utm_term"] = getParam('utm_term')
	}
	if (getParam('utm_source') != null) {
		leadgen["utm_source"] = getParam('utm_source')
	}

	//console.log(raionsName)
	let text = []
    Object.keys(form).map((key) => {
        if (key === 'name') {
			leadgen.name = form['name']
        } else if (key === 'phone') {
			leadgen.phone = form['phone']
        } else if (key !== 'lead_id') {
			text.push(key+" - "+form[key])
        }
    })
	leadgen = {...leadgen, "f_info[]": text}
    if (form.lead_id === undefined) {
		leadgen["celType"] = "getForm"
		leadgen["s[cel]"] = "getForm"
        axios.put(sendLeadUrl+window.location.search, leadgen).then((resp) => {
            setForm({
                ...form,
                lead_id: resp.data.ID
            })
        })
    } else {
		leadgen["celType"] = "getName"
		leadgen["s[cel]"] = "getName"
        leadgen = {...leadgen, id: form.lead_id}
        axios.post(updateLeadUrl+window.location.search, leadgen).then((resp) => {
            console.log('updated')
        })
    }
	console.log(leadgen)
    callback()
}

export default SendData