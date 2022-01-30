import axios from "axios"
import jsCookie from "js-cookie"
import md5Hex from 'md5-hex';

const sendLeadUrl = "/lead"

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
			if (domainSettings.locations[key].NameFull === rayon) {
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
			if (parseInt(path) > 0) {
				result.push(path)
			}
		})
	})
	return result
}

const getRooms = (rooms) => {
	let result = []
	let list = rooms.split(", ")
	list.forEach((room) => {
		if (room === "Студии") {
			result.push(0)
		} else if (room === "1 - комнатные квартиры") {
			result.push(1)
		} else if (room === "2 - комнатные квартиры") {
			result.push(2)
		} else if (room === "3 - комнатные квартиры") {
			result.push(3)
		} else if (room === "4 - комнатные квартиры") {
			result.push(4)
		}
	})
	return result
}
const SendData = (form, setForm, callback, raionsName, roomsName, sdachaName, celtype) => {
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
		"yclid": getParam('yclid') === null ? "" : getParam('yclid'),
		"gclid": getParam('gclid') === null ? "" : getParam('gclid'),
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

	if (getParam('utm_campaign') !== null) {
		leadgen["utm_campaign"] = getParam('utm_campaign')
	}
	if (getParam('utm_medium') !== null) {
		leadgen["utm_medium"] = getParam('utm_medium')
	}
	if (getParam('utm_term') !== null) {
		leadgen["utm_term"] = getParam('utm_term')
	}
	if (getParam('utm_source') !== null) {
		leadgen["utm_source"] = getParam('utm_source')
	}
	if (getParam('send') !== null) {
		leadgen["utm_send"] = getParam('send')
	}

	if (getParam('utm_send') !== null) {
		leadgen["utm_send"] = getParam('utm_send')
	}

	//console.log(raionsName)
	let text = []
	Object.keys(form).map((key) => {
		if (key === 'name') {
			leadgen.name = form['name']
		} else if (key === 'phone') {
			leadgen.phone = form['phone']
		} else if (key !== 'lead_id') {
			text.push(key + " - " + form[key])
		}
	})
	leadgen = { ...leadgen, "f_info[]": text }
	/*axios.post("https://api.g-n.ru/local/ajax/", leadgen, {
			crossDomain: true
	},)*/
	SendCell(celtype, leadgen.phone)
	if (celtype === "getForm") {
		leadgen["celType"] = "getForm"
		leadgen["s[cel]"] = "getForm"
		axios.put(sendLeadUrl + window.location.search, leadgen).then((resp) => {
			setForm({
				...form,
				lead_id: resp.data.data
			})
		})
	} else {
		leadgen["celType"] = "getName"
		leadgen["s[cel]"] = "getName"
		leadgen = { ...leadgen, id: form.lead_id }
		axios.put(sendLeadUrl + window.location.search, leadgen).then((resp) => {
			console.log('updated')
		})
	}

	//console.log(leadgen)
	callback()
}

const generateParamsForUrl = (form) => {
	//?utm_content=1ekran&roistatVisitId=8504168&utm_name=test&utm_phone=+7 ( 999 ) 999 - 99 - 99
	let query = "?utm_content=1ekran"
	if (getParam('utm_campaign') !== null) {
		query += "&utm_campaign=" + getParam('utm_campaign')
	}
	if (getParam('utm_medium') !== null) {
		query += "&utm_medium=" + getParam('utm_medium')
	}
	if (getParam('utm_term') !== null) {
		query += "&utm_term=" + getParam('utm_term')
	}
	if (getParam('utm_source') !== null) {
		query += "&utm_source=" + getParam('utm_source')
	}
	if (getParam('send') !== null) {
		query += "&utm_send=" + getParam('send')
	}
	if (getParam('utm_send') !== null) {
		query += "&utm_send=" + getParam('utm_send')
	}
	query += "&roistatVisitId=" + jsCookie.get('roistat_visit') + "&utm_phone=" + form['phone']
	return query
}

const SendCell = (celType, phone) => {
	console.log("celType " + celType);
	try {
		if (celType === "form" || celType === "getForm") {
			VK.Goal("lead");
			console.log("VK set lead");
		}
	} catch (err) {
		console.log("err VK set lead");
	}

	try {
		if (celType === "form" || celType === "getForm") {
			console.log("fb set Lead {content_name : " + celType + "}");
			let event_id = phone;
			event_id = event_id.split(' ').join('');
			event_id = event_id.replace(/[^0-9]/gim, '');
			console.log("fb set Lead {event_id : " + event_id + "}");
			fbq('track', "Lead", { content_name: "form", 'event_id': md5Hex(event_id) });
		}
	} catch (err) {
		console.log("err fb set Lead");
	}

	try {
		console.log("GA set generate_lead");
		gtag('event', 'generate_lead', {});
	} catch (err) {
		console.log("err GA set generate_lead");
	}

	console.log("YA set " + celType);
	try {
		ym(parseInt(domainSettings.domain.yandex), 'reachGoal', celType);
	} catch (err) {
		console.log('error send to yandex')
	}

	try {
		ym(domainSettings.domain.yandex, 'reachGoal', 'vse');
	} catch (err) {

	}

	try {
		if (celType === "form" || celType === "getForm") {
			console.log(`top mail sended ${domainSettings.domain.mail}`);
			_tmr.push({ id: `${domainSettings.domain.mail}`, type: 'reachGoal', goal: 'all_cells' });
		}
	} catch (err) {
		console.log(`err top mail sended ${domainSettings.domain.mail}`);
	}
}

const GetJKList = async (form, raionsName, roomsName, sdachaName, raionsPrice) => {
	if (raionsName === "" || roomsName === "" || sdachaName === "" || raionsPrice === "") {
		return false
	}
	let data = {
		city_id: domainSettings.city.portal_id,
		sdacha: getSdachaList(form[sdachaName]),
		maxPrice: form[raionsPrice],
		rooms: getRooms(form[roomsName]),
		raions: getRayonCodes(form[raionsName])
	}
	let resp = await axios.post("/jks/", data)
	return resp.data
}

const SendFilter = (sroks, rooms, number) => {
	let text = ""
	sroks.forEach((srok) => {
		if (text!==""){
			text+=", "
		}
		text += "Сдача - "+srok
	})
	if (text !== "" && rooms.length >0) {
		text+="\n"
	}
	let roomsText = "Количество комнат -"
	rooms.forEach((room) => {
		if (roomsText !== "Количество комнат -"){
			roomsText+=", "
		}
		if (room === "0") {
			roomsText+="Студии"
		} else {
			roomsText += room+"-к"
		}
	})
	text+=roomsText
	let data = {
		"remont": "false",
		"is_loc": "0",
		"s_id": "",
		"l_type": "",
		"text": text,
		"_fbp": jsCookie.get("_fbp"),
		"_fbc": jsCookie.get("_fbc"),
		"fb_id": domainSettings.domain.facebook,
		"user_a": window.navigator.userAgent,
		"metrika_id": domainSettings.domain.yandex,
		"ut_type": domainSettings.domain.url,
		"celType": "form",
		"clientID": domainSettings.domain.clientID,
		"utm_content": "1ekran",
		"user_ip": domainSettings.ip,
		"roistatVisitId": jsCookie.get('roistat_visit'),
		"rooms_new[]": [...rooms],
		"srok[]": [...sroks],
		"yclid": getParam('yclid') === null ? "" : getParam('yclid'),
		"gclid": getParam('gclid') === null ? "" : getParam('gclid'),
		"phone": number,
	}

	if (getParam('utm_campaign') !== null) {
		data["utm_campaign"] = getParam('utm_campaign')
	}
	if (getParam('utm_medium') !== null) {
		data["utm_medium"] = getParam('utm_medium')
	}
	if (getParam('utm_term') !== null) {
		data["utm_term"] = getParam('utm_term')
	}
	if (getParam('utm_source') !== null) {
		data["utm_source"] = getParam('utm_source')
	}
	if (getParam('send') !== null) {
		data["utm_send"] = getParam('send')
	}

	if (getParam('utm_send') !== null) {
		data["utm_send"] = getParam('utm_send')
	}

	if (getParam('utm_type') !== null) {
		data["utm_type"] = getParam('utm_type')
	}

	if (getParam('utm_roistat') !== null) {
		data["utm_roistat"] = getParam('utm_roistat')
	}

	let sendData = ""
	Object.keys(data).map((key) => {
		if (sendData!="") {
			sendData+="&"
		}
		sendData+=key+"="+data[key]
	})

	//надо отправлять не как json, а form data
	axios({
		method: "post",
		url:  "http://t.g-n.ru/local/ajax/filters.php",
		data:   sendData,
		headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
	}).then((resp) => {
		console.log(resp.data)
	})
}

const SetUniqID = () => {
	let now = new Date();
	let data = {
			"city": domainSettings.city.Name,
			"send": getParam('utm_send'),
			"uniqId": '1117'+now.getMonth()+''+now.getDate()+''+ now.getHours() +''+ now.getMinutes() +''+ now.getSeconds() + ''+now.getMilliseconds(),
			"_fbp": jsCookie.get("_fbp"),
			"_fbc": jsCookie.get("_fbc"),
			"fb_id": domainSettings.domain.facebook,
			"s_id": domainSettings.city.portal_id,
			"user_a": window.navigator.userAgent,
			"user_ip": domainSettings.ip,
			"celType": "form",
			"roistatVisitId": jsCookie.get('roistat_visit'),
			"domen": domainSettings.domain.url,
			"price_ot": null,
			"price_do": null,
			"price": null,
			//"k": domainSettings.title,
	}

	let sendData = ""
	Object.keys(data).map((key) => {
		if (sendData!="") {
			sendData+="&"
		}
		sendData+=key+"="+data[key]
	})

	axios({
		method: "post",
		url:  "//chats.g-n.ru/local/api/uniqIdBd/",
		data:   sendData,
		headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
	}).then((resp) => {
		console.log(resp.data)
	})
}

export {
	SendData,
	GetJKList,
	generateParamsForUrl,
	SendFilter,
	SetUniqID
}