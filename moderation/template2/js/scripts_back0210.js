function scroll(elem, time) {
    $('html, body').animate({
        scrollTop: $('#' + elem).offset().top - 50
    }, time)
}

$(function() {
    $(".lazy").lazyload({
        effect: "fadeIn"
    });
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
    $("body").on("click", ".phone", function() {
        $(this).inputmask("7(999)9999999")
    });
    $("body").on("focus", ".phone", function() {
        $(this).inputmask("7(999)9999999")
    });
    $("body").on("blur", ".phone", function() {
        $(this).inputmask("7(999)9999999")
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
        $("ul.plans_nav li").removeClass("act");
        $(this).addClass("act");
        var filt = $(this).attr('data-kol');
        var year = $('.param_year select').val();
        var area = $('.param_area select').val();
        var page = 0;
        $.ajax({
            type: "GET",
            url: "/flats_ajax.php?page=" + page + "&filt=" + filt + "&year=" + year + "&area=" + area,
            success: function(msg) {
                if (!msg.replace(/\s+/g, '')) {} else {
                    $('#loadflats').attr('data-page', 1).show();
                    $('.plans_list').html(msg);
                    checkQuant()
                }
            }
        });
        return false
    });
    $(".param_area select").change(function() {
        var filt = $('ul.plans_nav li').attr('data-kol');
        var year = $('.param_year select').val();
        var area = $('.param_area select').val();
        var page = 0;
        $.ajax({
            type: "GET",
            url: "/flats_ajax.php?page=" + page + "&filt=" + filt + "&year=" + year + "&area=" + area,
            success: function(msg) {
                if (!msg.replace(/\s+/g, '')) {} else {
                    $('#loadflats').attr('data-page', 1).show();
                    $('.plans_list').html(msg);
                    checkQuant()
                }
            }
        });
        return false
    });
    $(".param_year select").change(function() {
;
        var filt = $('ul.plans_nav li').attr('data-kol');
        var year = $('.param_year select').val();
        var area = $('.param_area select').val();
        var page = 0;
        $.ajax({
            type: "GET",
            url: "/flats_ajax.php?page=" + page + "&filt=" + filt + "&year=" + year + "&area=" + area,
            success: function(msg) {
                if (!msg.replace(/\s+/g, '')) {} else {
                    $('#loadflats').attr('data-page', 1).show();
                    $('.plans_list').html(msg);
                    checkQuant()
                }
            }
        });
        return false
    });

    /*hodstr*/
    $(".years_nav").find("a").click(function(){
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
            // console.log(elem);
            if($(elem).hasClass('filt_' +year+'_'+month))
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
            if($(elem).hasClass('filt_' +year+'_'+month))
                return true;
            else
                return false;
        });
        console.log('filt_' +year+'_'+month);
        return false;
    });

    // $(".years_nav").find("a:first").click();
});
