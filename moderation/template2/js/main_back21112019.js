$(document).ready(function() {
    function validFIO(value) {
        return (/^[А-ЯЁа-яё]+(-[А-ЯЁа-яё]+)? [А-ЯЁа-яё]+( [А-ЯЁа-яё]+)? [А-ЯЁа-яё]+( [А-ЯЁа-яё]+)?$/.test(value))
    }

    function validPhone(value) {
        return (/^([\+\ \d-()]{2,20})$/.test(value))
    }

    function validateField(fieldConainerSelector, className, filedValue, funcName, showErrorMsg) {
        var res = true;
        var funcValid = true;
        var placeholderValid = true;
        var fieldPlaceholder = $(fieldConainerSelector).find(className).attr('data');
        if (funcName) {
            funcValid = funcName(filedValue)
        }
        if (fieldPlaceholder) {
            if (filedValue == fieldPlaceholder) {
                placeholderValid = false
            }
        }
        if (filedValue == '' || filedValue == '7(___)_______' || filedValue == '7(999)9999999' || !funcValid || !placeholderValid) {
            res = false;
            $(fieldConainerSelector).find(className).addClass('err');
            if (showErrorMsg) {
                $(fieldConainerSelector).find(className).parent().find(".nezapolnenno").show()
            }
        } else {
            $(fieldConainerSelector).find(className).removeClass('err');
            if (showErrorMsg) {
                $(fieldConainerSelector).find(className).parent().find(".nezapolnenno").hide()
            }
        }
        return res
    }

    function ajaxSendData(sendData, serverScriptName, sendType, celType) {
        $.ajax({
            type: sendType,
            url: serverScriptName,
            data: sendData,
            success: function(msg) {
                mes = '';
                showAlert(mes, sendData, celType)
            }
        })
    }

    function showAlert(mes, form_data, celType) {
        //
        // gtag('event', 'send', {
        //     'event_category': 'forms',
        //     'event_label': celType,
        //     'value': 1
        // });
        ym(55546963, 'reachGoal', celType);
        ym(55546963, 'reachGoal', 'vse');
        // console.log('send to google ' + celType);
        var send_data;
        send_data = $('#send_data').val();
        send_data += '&s[cel]=' + celType;
        send_data += '&s[a]=2';
        if (form_data) {
            send_data += '&' + form_data
        }
        $.ajax({
            type: "POST",
            url: "/fd_log/main.php",
            data: send_data,
            success: function(msg) {
                mes = ''
            }
        })
    }
    var flag = $('#celtype').attr('id');
    if (!flag) {
        $('body').append('<input type="hidden" id="celtype" value="">')
    }
    $('a[data],button[data]').on('click', null, function() {
        $('#celtype').val($(this).attr('data'))
    });
    $("body").on("click", ".lead-btn", function() {
        var form = $(this).closest("form");
        var celType = $(this).attr('celtype');
        var name = form.find("input.form_name").val();
        var name_req = form.find("input.form_name").attr('req');
        var phone = form.find("input.form_phone").val();
        var phone_req = form.find("input.form_phone").attr('req');
        var email = form.find("input.form_mail").val();
        var email_req = form.find("input.form_mail").attr('req');
        var email_template = $(this).attr('template');
        var text = form.find(".text").val();
        var dop_info = "";
        form.find('.dop-info').each(function(i, e) {
            if (e.getAttribute('data') != e.value) {
                var tmp = e.getAttribute('data') + ": " + e.value + "; ";
                dop_info += tmp
            }
        });
        if (dop_info && dop_info != '') text += "; " + dop_info;
        if (!email_template || email_template == '') email_template = 1;
        var f = true;

        if (phone_req == 'y') f = validateField(form, ".form_phone", phone, validPhone) && f;
        if (phone == "") {
            f = false;
            form.find("input.phone").addClass("err");
            form.find(".necessary_info").addClass("err")
        };
        if (email_req == 'y') f = validateField(form, ".form_mail", email, validEmail) && f;
        // if (email == "" || email == "undefined" || email == "Ваш e-mail") {
        //     f = false;
        //     form.find("input.email").addClass("err")
        // }
        var utm_source = $("#utm_source").val();
        var utm_content = $("#utm_content").val();
        var utm_medium = $("#utm_medium").val();
        var utm_req = $("#utm_req").val();
        var utm_term = $("#utm_term").val();
        var utm_campaign = $("#utm_campaign").val();

        var floor = form.find('#floor').val();
        var rooms = form.find('#rooms').val()

        var term = form.find('select.period').val();
        var vznos = form.find('select.vznos').val();



        if ($(this).hasClass("button_podb") && f) {
            $(".popup_search_flat").hide()
        }
        if (f) {

            $("#pu_thx").find('img').each(function(i,e){
                $(e).attr('src',$(e).data('original'));
            });
            $(".popup_main").hide();
            $(".popup_rgba").show();
            $("#pu_thx").fadeIn(300);
            $("body").addClass("overflow");

            form.find(".necessary_info").removeClass("err");
            var send_data = celType + "=Y";
            if (name) send_data += "&name=" + name;
            if (phone) send_data += "&phone=" + phone;
            if (email) send_data += "&email=" + email;
            if (utm_source) send_data += "&utm_source=" + utm_source;
            if (utm_medium) send_data += "&utm_medium=" + utm_medium;
            if (utm_term) send_data += "&utm_term=" + utm_term;
            if (utm_content) send_data += "&utm_content=" + utm_content;
            if (utm_campaign) send_data += "&utm_campaign=" + utm_campaign;
            if (utm_req) send_data += "&utm_req=" + utm_req;

            if (floor) send_data += "&floor=" + floor;
            if (rooms) send_data += "&rooms=" + rooms;
            if (term) send_data += "&term=" + term;
            if (vznos) send_data += "&vznos=" + vznos;

            send_data += "&text=" + text + "&email_template=" + email_template + "&celtype=" + celType;
            console.log(_tmr.push({id: "3141834", type: "reachGoal", goal: celType, value:1}));
            console.log(_tmr.push({id: "3141834", type: "reachGoal", goal: 'vse', value:1}));
            console.log(celType);
            ajaxSendData(send_data, "/fd_log/ajax.php", "POST", celType)
        }
        return false
    })
});

function validEmail(value) {
    return (/^[a-zA-Z0-9!#$%&\'*+\\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&\'*+\\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/.test(value))
}