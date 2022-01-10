function scroll(elem, time) {
    $('html, body').animate({
        scrollTop: $('#' + elem).offset().top - 50
    }, time)
}

$(function() {
    $(".lazy").lazyload({
        effect: "fadeIn"
    });

    setTimeout(function(){
        $(".btn_block").click();
    },30000);
    
    $(".hl_nav a").click(function() {
        $(".hl_nav2").fadeOut(700);
        scroll($(this).attr("data"), 1000);
        return false
    });
    $("body").on("focus", "input, textarea", function() {
        if ($(this).attr("data") != '') {
            if ($(this).val() == $(this).attr("data")) $(this).val("")
        }
    });
    $("body").on("click", ".closeform", function() {
        if ($(this).hasClass("return")) {
            $(".popup_main").hide();
            $("#popup_akc").fadeIn(300)
        } else {
            $(".popup_rgba").hide();
            $(".popup_main").hide();
            $("body").removeClass("overflow")
        }
        return false
    });
    $(".fb").fancybox();
    /*$("body").on("click", ".form_phone", function() {
        $(this).inputmask("7(999)9999999")
    });
    $("body").on("focus", ".form_phone", function() {
        $(this).inputmask("7(999)9999999")
    });
    $("body").on("blur", ".form_phone", function() {
        $(this).inputmask("7(999)9999999")
    });*/
    $('.form_phone').on('input',function(event){
        var value = $(this).val();
        var lastVal = $(this).attr('lastVal');
        if (typeof lastVal =='undefined') {
            $(this).attr('lastVal','');
            lastVal = $(this).attr('lastVal');
        }
        
        if (value.length==1) {
           
            if (value==8) {
                $(this).val('+7 (');
                $(this).attr('lastVal','+7 (');
            } else if (value==9) {
                $(this).val('+7 (9');
                $(this).attr('lastVal','+7 (9');
                
            }else if (value==7) {
                $(this).val('+7 (');
                $(this).attr('lastVal','+7 (');
            } else {
                $(this).val('');
                $(this).attr('lastVal','');
            }
            value=$(this).val();;
            lastVal= $(this).attr('lastVal');;
        }

        

        if (value.length==8 && value.length>lastVal.length) {
            value=value.substring(0, value.length - 1)+') '+value.substring(value.length - 1, value.length);
            $(this).val(value);
        }

        if (value.length==9 && value.length<lastVal.length) {
            value = value.substring(0, value.length - 3);
            $(this).val(value);
        }

        if (value.length ==13 && value.length>lastVal.length) {
            value=value.substring(0, value.length - 1)+'-'+value.substring(value.length - 1, value.length);
            $(this).val(value);
        }
        if ((value.length ==13) && value.length<lastVal.length) {
            value=value.substring(0, value.length - 2);
            $(this).val(value);
        }

        if (value.length ==16 && value.length>lastVal.length) {
            value=value.substring(0, value.length - 1)+'-'+value.substring(value.length - 1, value.length);
            $(this).val(value);
        }
        if (value.length ==16 && value.length<lastVal.length) {
            value=value.substring(0, value.length - 2);
            $(this).val(value);
        }

        if (value.length >18) {
            $(this).addClass("err");
        } else {
            $(this).removeClass("err");
        }
        
        if (value.length<lastVal.length){
 
            if (value.length<5) {
                $(this).val('');
                $(this).attr('lastVal','');
            }
        }
       
        $(this).attr('lastVal', value);
       
});
    
    
    $(document).click(function(e) {
        var div = $(".popup_main");
        if (!div.is(e.target) && div.has(e.target).length === 0 && div.is(":visible")) {
            $("body").removeClass("overflow");
            $(".popup_rgba").hide();
            $(".popup_main").hide();
            console.log(123)
        }
    });

    $('.tj_list li').click(function(){
        $('.tj_list li').removeClass('act');
        $(this).addClass('act');

        var filt = $(this).data('map'),
            src  = '';

        $('.sel_map').hide();

        if(filt == 'car'){
            src = 'https://yandex.ru/map-widget/v1/-/CKQTMUN5';
        }else if(filt == 'train'){
            src = 'https://yandex.ru/map-widget/v1/-/CKQr4Amq';
        }else{
            src = 'https://yandex.ru/map-widget/v1/-/CKQrYEp~';
        }
        //$('.rout_inn[data-filt=' + filt +'] .tj_main_img iframe').attr('src',src);
        //$('.rout_inn[data-filt=' + filt +']').fadeIn();
        $('.sel_map[data-type='+filt +'] iframe').attr('src', src);
        $('.sel_map[data-type='+filt +']').fadeIn();
        return false;
    });

    $('.tj_list .slick-arrow').click(function(){

        var filt = $('.slick-current .tj_in').data('map'),
            src  = '';

        $('.sel_map').hide();

        if(filt == 'car'){
            src = 'https://yandex.ru/map-widget/v1/-/CKQTMUN5';
        }else if(filt == 'train'){
            src = 'https://yandex.ru/map-widget/v1/-/CKQr4Amq';
        }else{
            src = 'https://yandex.ru/map-widget/v1/-/CKQrYEp~';
        }
        //$('.rout_inn[data-filt=' + filt +'] .tj_main_img iframe').attr('src',src);
        //$('.rout_inn[data-filt=' + filt +']').fadeIn();
        $('.sel_map[data-type='+filt +'] iframe').attr('src', src);
        $('.sel_map[data-type='+filt +']').fadeIn();
        return false;
    });

    $(".show_popup").click(function() {
        var popup = $(this).attr("data-popup");
        $(".popup_main").hide();
        $(".popup_rgba").show();
        $("#" + popup).find('img').each(function(i,e){
            $(e).attr('src',$(e).data('original'));
        });
        $("#" + popup).fadeIn(300);
        $("body").addClass("overflow");
        return false
    });
    $('.map_switch li').click(function () {
        $('.map_switch li').removeClass('act');
        $(this).addClass('act');
        $('.tj_main_map div').hide();
        $('.tj_main_map div[data-type=' + $(this).data('map') + ']').show();
    });
    $("body").on("click", ".show_flat", function() {
        $("#pu_flat").load("flats_popup.php?id=" + $(this).attr("data-flat"), function() {
            $(".popup_rgba").show();
            $("#pu_flat").fadeIn(300);
            $("body").addClass("overflow")
        });
        return false
    });
    $("ul.plans_nav li").click(function() {
        $("ul.plans_nav li.act").removeClass("act");
        $(this).addClass("act");
        var filt = $(this).attr('data-kol');
        var year = $('.param_year select').val();
        var area = $('.param_area select').val();
        var page = 0;
        $.ajax({
            type: "GET",
            url: "/flats_ajax.php?page=" + page + "&filt=" + filt + "&year=" + year + "&area=" + area,
            success: function(msg) {
                if (!msg.replace(/\s+/g, '')) {
                    $('.plans_list').html('<span style="font-size:20px;">К сожалению, по выбранным вами параметрам ничего нет. Попробуйте изменить параметры фильтра</span>');
                    $('#loadflats').attr('data-page', 1).hide();
                } else {
                    $.ajax({
                        type: "GET",
                        url: "/flats_ajax.php?page=" + (page+1) + "&filt=" + filt + "&year=" + year + "&area=" + area,
                        success: function(msg) {
                            if (!msg.replace(/\s+/g, '')) {
                                $('#loadflats').hide();
                            } else {
                                $('#loadflats').attr('data-page', 1).show();
                            }
                        }
                    });
                    
                    $('.plans_list').html(msg);
                    checkQuant()
                }
            }
        });
        return false
    });
   
    $(".param_area select").change(function() {
        var filt = $('ul.plans_nav li.act').attr('data-kol');
        var year = $('.param_year select').val();
        var area = $('.param_area select').val();
        var page = 0;
        $.ajax({
            type: "GET",
            url: "/flats_ajax.php?page=" + page + "&filt=" + filt + "&year=" + year + "&area=" + area,
            success: function(msg) {
                if (!msg.replace(/\s+/g, '')) {
                    $('.plans_list').html('<span style="font-size:20px;">К сожалению, по выбранным вами параметрам ничего нет. Попробуйте изменить параметры фильтра</span>');
                    $('#loadflats').attr('data-page', 1).hide();
                } else {
                    $.ajax({
                        type: "GET",
                        url: "/flats_ajax.php?page=" + (page+1) + "&filt=" + filt + "&year=" + year + "&area=" + area,
                        success: function(msg) {
                            if (!msg.replace(/\s+/g, '')) {
                                $('#loadflats').hide();
                            } else {
                                $('#loadflats').attr('data-page', 1).show();
                            }
                        }
                    });
                    $('.plans_list').html(msg);
                    checkQuant()
                }
            }
        });
        return false
    });
    $(".param_year select").change(function() {
        var filt = $('ul.plans_nav li.act').attr('data-kol');
        var year = $('.param_year select').val();
        var area = $('.param_area select').val();
        var page = 0;
        $.ajax({
            type: "GET",
            url: "/flats_ajax.php?page=" + page + "&filt=" + filt + "&year=" + year + "&area=" + area,
            success: function(msg) {
                if (!msg.replace(/\s+/g, '')) {
                    $('.plans_list').html('<span style="font-size:20px;">К сожалению, по выбранным вами параметрам ничего нет. Попробуйте изменить параметры фильтра</span>');
                    $('#loadflats').attr('data-page', 1).hide();
                } else {
                    $.ajax({
                        type: "GET",
                        url: "/flats_ajax.php?page=" + (page+1) + "&filt=" + filt + "&year=" + year + "&area=" + area,
                        success: function(msg) {
                            if (!msg.replace(/\s+/g, '')) {
                                $('#loadflats').hide();
                            } else {
                                $('#loadflats').attr('data-page', 1).show();
                            }
                        }
                    });
                    $('.plans_list').html(msg);
                    checkQuant()
                }
            }
        });
        return false
    });

    $("#loadflats").click(function() {
        var filt = $('ul.plans_nav li.act').attr('data-kol');
        var year = $('.param_year select').val();
        var area = $('.param_area select').val();
        var page = parseInt($('#loadflats').attr('data-page'));
        $.ajax({
            type: "GET",
            url: "/flats_ajax.php?page=" + page + "&filt=" + filt + "&year=" + year + "&area=" + area,
            success: function(msg) {
                if (!msg.replace(/\s+/g, '')) {
                    $('#loadflats').hide();
                } else {
                    $.ajax({
                        type: "GET",
                        url: "/flats_ajax.php?page=" + (page+1) + "&filt=" + filt + "&year=" + year + "&area=" + area,
                        success: function(msg) {
                            if (!msg.replace(/\s+/g, '')) {
                                $('#loadflats').hide();
                            } else {
                                $('#loadflats').attr('data-page', (parseInt($('#loadflats').attr('data-page'))+1)).show();
                            }
                        }
                    });
                    $('.plans_list').html($('.plans_list').html()+msg);
                    checkQuant()
                }
            }
        });
        return false;
    });

    /*hodstr*/
    /*$(".years_nav").find("a").click(function(){
        $(".hod_slid").slick('slickUnfilter');
        var year = $(this).attr("data");
        var month = $('.month_nav ul[data-year=' + year + ']').find("li:first").attr("data");
        $('.month_nav ul').hide();
        $('.month_nav ul[data-year=' + year + ']').find("li:first").addClass("act");
        $('.month_nav ul[data-year=' + year + ']').show();
        $(".years_nav").find("a").removeClass("act");
        $(this).addClass("act");
        // $(".hod_slid").slick('slickFilter','.filt_'+year+'_'+month);

        $(".hod_slid").slick('slickFilter', function(index, elem) {
            if($(elem).find('.slide_item').hasClass('filt_' +year+'_'+month))
                return true;
            else
                return false;
        });

        console.log('.filt_'+year);
        return false;
    });

    $(".month_nav").find("li").click(function(){
        $(".hod_slid").slick('slickUnfilter');
        var year = $(".years_nav").find("a.act").attr("data");
        var month = $(this).attr("data");
        $(".month_nav").find("li").removeClass("act");
        $(this).addClass("act");
        // $(".hod_slid").slick('slickFilter','.filt_'+year+'_'+month);
        $(".hod_slid").slick('slickFilter', function(index, elem) {
            if($(elem).find('.slide_item').hasClass('filt_' +year+'_'+month))
                return true;
            else
                return false;
        });
        console.log('.filt_'+year);
        return false;
    });

    $(".years_nav").find("a:first").click();

    // $(".years_nav").find("a:first").click();*/
    $(".years_nav").find("a").click(function(){
        var year = $(this).attr("data");
        var month = $('.month_nav ul[data-year=' + year + ']').find("li:first").attr("data");
        $('.month_nav ul').hide();
        $('.month_nav ul[data-year=' + year + ']').find("li:first").addClass("act");
        $('.month_nav ul[data-year=' + year + ']').show();
        $(".years_nav").find("a").removeClass("act");
        $(this).addClass("act");
        getFile(year,month,0);
        return false;
    });
    $(".month_nav").find("li").click(function(){
        var year = $(".years_nav").find("a.act").attr("data");
        var month = $(this).attr("data");
        $(".month_nav").find("li").removeClass("act");
        $(this).addClass("act");
        getFile(year,month,0);
        return false;
    });

    $('.hd_right').on('click', function(){
        var index=parseInt($('.hd_in').data('index'));
        var year = $(".years_nav").find("a.act").attr("data");
        var month = $('.month_nav ul[data-year=' + year + ']').find("li.act").attr("data");
        ++index;
        getFile (year,month,index);
        return false;
    });
    $('.hd_left').on('click', function(){
        var index=parseInt($('.hd_in').data('index'));
        if (index==0) {return false;}
        var year = $(".years_nav").find("a.act").attr("data");
        var month = $('.month_nav ul[data-year=' + year + ']').find("li.act").attr("data");
        --index;
        getFile (year,month,index);
        return false;				
    });

    function getFile(year,month,index){
        //список месяцев в году у которых другое название значков не _m.jpg, а m.jpg
        let except=['2018_08','2018_07', '2018_06', '2019_10','2019_11'];
        $.ajax({
                type: 'GET',
                url: 'ajax_progress.php',
                data: ({
                        year_month:year+'_'+month,
                        index: index,
                    }),
                    success: function(data){
                        if (data!=''){
                            $('.hd_in').data('index',index);
                            $('.hd_in img').attr('src', data);
                            
                        }
                    }
        });
    };

});
