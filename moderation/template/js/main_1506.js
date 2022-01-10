$(document).ready(function(){
/*** BEGIN ВСПОМОГАТЕЛЬНЫЕ Ф-ИИ ******************************************************************************/
	/**
	* валидация ФИО
	*/
	function validFIO(value)
	{
		return (/^[А-ЯЁа-яё]+(-[А-ЯЁа-яё]+)? [А-ЯЁа-яё]+( [А-ЯЁа-яё]+)? [А-ЯЁа-яё]+( [А-ЯЁа-яё]+)?$/.test(value));
	}    
    /**
	* валидация Телефона
	*/
	function validPhone(value)
	{
		return (/^([\+\ \d-()]{2,20})$/.test(value));
	}	
	/**
	* валидация Поля формы
	*/
	function validateField(fieldConainerSelector, className, filedValue, funcName, showErrorMsg){
		var res = true;
		var funcValid = true;
		var placeholderValid = true;
		var fieldPlaceholder = $(fieldConainerSelector).find(className).attr('data');
		
		// если передана ф-я для проверки
		if (funcName){
			funcValid = funcName(filedValue);

		}
		// если есть плейсхолдер
		if (fieldPlaceholder){
			if (filedValue == fieldPlaceholder){
				placeholderValid = false;
			}
		}
		if (filedValue == '' || filedValue == '7(___)_______' || filedValue == '7(999)9999999' || !funcValid || !placeholderValid)
		{
			res = false;
			$(fieldConainerSelector).find(className).addClass('err');
            if(showErrorMsg){
                $(fieldConainerSelector).find(className).parent().find(".nezapolnenno").show();
            }
		}
		else
		{
			$(fieldConainerSelector).find(className).removeClass('err');
            if(showErrorMsg){
                $(fieldConainerSelector).find(className).parent().find(".nezapolnenno").hide();
            }
		}		
		return res;
	}	
	/**
	* отправка данных AJAX
	*/
	function ajaxSendData(sendData, serverScriptName, sendType,celType){
		$.ajax({
			type: sendType,
			url: serverScriptName,
			data: sendData,
			success: function(msg){
				mes = '';
				showAlert(mes, sendData,celType);
			}
		});	
	}	
	/**
	* вызов отправки данных 
	* лог отправки формы
    * окно сообщения
	* push целей Яндекс Метрики
	*/
	function showAlert(mes, form_data,celType)
	{			
	$(".popup_main").hide();
	 	$(".popup_rgba").show();
	 	$("#popup_ok").fadeIn(300);
	 	$("body").addClass("overflow");
			//$.fancybox(	"#popup_ok", {'scrolling' : 'no', 'closeBtn': false} );		
        // Google event send
		//ga('send', 'event', 'forms', 'send', eventName);
		ga('send', {
		  'hitType': 'event',          // Required.
		  'eventCategory': 'forms',   // Required.
		  'eventAction': 'send',      // Required.
		  'eventLabel': celType,
		  'eventValue': 1
		});
		console.log('send to google '+ celType);
		// Yandex метрика передача цели
		//yaCounter36540115
		console.log(yaCounter36540115.reachGoal(celType));
		console.log(yaCounter36540115.reachGoal("vse"));
        // посчитаем действие
        var send_data;
        send_data = $('#send_data').val();
        send_data += '&s[cel]=' + celType;
        send_data += '&s[a]=2';
        
        if (form_data){
            send_data += '&' + form_data;
        }
        
        $.ajax({
            type: "POST",
            url: "/fd_log/main.php",
            data: send_data,
            success: function(msg){
                mes = '';
            }
        });
	}
	
	/**
	* установка цели
	*/
    // если в разметке нет тега для записи цели, то добавим его
    var flag = $('#celtype').attr('id');
    if(!flag){
        $('body').append('<input type="hidden" id="celtype" value="">');
    }
	$('a[data],button[data]').on('click', null, function(){
		$('#celtype').val($(this).attr('data'));
	});	
/*** END ВСПОМОГАТЕЛЬНЫЕ Ф-ИИ ******************************************************************************/	
/**********************************ФОРМЫ************************************************************/

	$("body").on("click",".lead-btn",function(){

   		var form = $(this).closest("form");
        var celType = $(this).attr('celtype');             
        var name = form.find("input.name").val();
        var name_req = form.find("input.name").attr('req');
        var phone = form.find("input.phone").val();
        var phone_req = form.find("input.phone").attr('req');
        var email = form.find("input.email").val();
        var email_req = form.find("input.email").attr('req');			
		var email_template = $(this).attr('template');
		var text = form.find(".text").val();
		if ($(this).hasClass("button_podb")){
		var district = "";
		var rooms = "";
		var remont = "";
		var money_cost = "";
		var money_type = "";
		var srok = "";

		form.find('.district').each(function(i,e){
			if(e.checked)
			{
				var dis = e.getAttribute('data') + "; ";
				district+= dis;
			}
		});
		if(district && district != '')
			  $("#hidden1").val(district);

		form.find('.rooms').each(function(i,e){
			if(e.checked)
			{
				var room = e.getAttribute('data') + "; ";
				rooms+= room;
			}
		});
		if(rooms && rooms != '')
			  $("#hidden2").val(rooms);

		form.find('.remont').each(function(i,e){
			if(e.checked)
			{
				var rem = e.getAttribute('data') + "; ";
				remont+= rem;
			}
		});
		if(remont && remont != '')
			  $("#hidden3").val(remont);

		form.find('.money_cost').each(function(i,e){
			if(e.checked)
			{
				var cost = e.getAttribute('data') + "; ";
				money_cost+= cost;
			}
		});
		if(money_cost && money_cost != '')
			  $("#hidden4").val(money_cost);

		form.find('.money_type').each(function(i,e){
			if(e.checked)
			{
				var type = e.getAttribute('data') + "; ";
				money_type+= type;
			}
		});
		if(money_type && money_type != '')
			  $("#hidden5").val(money_type);

		form.find('.srok').each(function(i,e){
			if(e.checked)
			{
				var sr = e.getAttribute('data') + "; ";
				srok += sr;
			}
		});
		if(srok && srok != '')
			  $("#hidden6").val(srok);
		}

		var dop_info = "";
		form.find('.dop-info').each(function(i,e){
			if(e.getAttribute('data') != e.value)
			{
				var tmp = e.getAttribute('data') + ": " + e.value + "; ";
				dop_info+= tmp;
			}
		});
		if(dop_info && dop_info != '')
			 text += "; " + dop_info;

		if(!email_template || email_template == '')
			email_template = 1;

		var f = true;

		if(name && name_req == 'y')
			f = validateField(form, ".name", name, validFIO) && f;

		if(phone && phone_req == 'y')
			f = validateField(form, ".phone", phone, validPhone) && f;
		if (phone == "") {f = false; form.find("input.phone").addClass("err"); form.find(".necessary_info").addClass("err")};

		if(email && email_req == 'y')
			f = validateField(form, ".email", email, validEmail) && f;	
		var utm_source = $("#utm_source").val();
		var utm_req = $("#utm_req").val();
        var utm_term = $("#utm_term").val();
        var utm_campaign = $("#utm_campaign").val();
		
        if(f)
		{		$(this).hide();
				form.find(".necessary_info").removeClass("err")
				var send_data = celType+"=Y";
				if(name)
					send_data += "&name="+name;
				if(phone)
					send_data += "&phone="+phone;
				if(email)
					send_data += "&email="+email;
				
				if(utm_source)
					send_data += "&utm_source="+utm_source;
				if(utm_term)
					send_data += "&utm_term="+utm_term;
				if(utm_campaign)
					send_data += "&utm_campaign="+utm_campaign;
				if(utm_req)
					send_data += "&utm_req="+utm_req;
			

				send_data += "&text="+text
					+"&email_template="+email_template
					+"&celtype="+celType;

				console.log(celType);
				ajaxSendData(send_data, "ajax.php", "POST",celType);
		}
		return false;
	});



		
});


/**
* валидация Email телефона
*/
function validEmail(value)
{
	return (/^[a-zA-Z0-9!#$%&\'*+\\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&\'*+\\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/.test(value));
}