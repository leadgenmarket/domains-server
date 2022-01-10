function scroll(elem,time){
    $('html, body').animate({scrollTop: $('#'+elem).offset().top-50	}, time);
}

$(function(){			
	$(".hl_nav a").click(function(){
        scroll($(this).attr("data"),1000);
        return false;
    });
	//$("input, textarea").on("focus", function(){
	$("body").on("focus","input, textarea",function(){
		if($(this).attr("data") != ''){
			if($(this).val() == $(this).attr("data"))
				$(this).val("");
		}
	});

	//$("input, textarea").on("blur", function(){
	/*$("body").on("blur","input, textarea",function(){
		if($(this).attr("data") != ''){
			if($(this).val() == "")
				$(this).val($(this).attr("data"));
		}
	});*/

	$("body").on("click",".closeform",function(){
		if($(this).hasClass("return"))
		{
		 	$(".popup_main").hide();
		 	$("#liter_popup").fadeIn(300);
		}else{
    		$(".popup_rgba").hide();
		 	$(".popup_main").hide();
		 	$("body").removeClass("overflow");
    	}
    	return false;
    });

    $("body").on("click",".phone",function(){$(this).inputmask("7(999)9999999");});

$(document).click(function (e){ // событие клика по веб-документу
		var div = $(".popup_main"); // тут указываем ID элемента

		if (!div.is(e.target) // если клик был не по нашему блоку
			&& div.has(e.target).length === 0 && div.is(":visible")) { // и не по его дочерним элементам
				$("body").removeClass("overflow");
				$(".popup_rgba").hide();
				$(".popup_main").hide();
				console.log(123);
		}
	});
	$(".show_popup").click(function(){
		var popup = $(this).attr("data");
	 	$(".popup_rgba").show();
	 	$("#"+popup).fadeIn(300);
	 	$("body").addClass("overflow");
	 	return false;
	 });

	$(".hl_menu a").click(function(){
		scroll($(this).attr("data"),1000);
		$(".hl_menu a").removeClass("act");
		$(this).addClass("act");
		$("#hidden").val($(this).html());
		return false;
	});

    $(".show_popup_gk").click(function(){
    	gk_name = $(this).attr("data-name");
    	$(".popup_rgba").show();
	 	$("#popup_gk").fadeIn(300);
	 	$("#gk_name").html(gk_name);
	 	$("#gk_text").val("Получить планировки и цены по "+gk_name);
    	return false;
    });

    $(".show_popup_gk_type").click(function(){
    	gk_type = $(this).attr("data-type");
    	$(".popup_rgba").show();
	 	$("#popup_gk_type").fadeIn(300);
	 	$("#gk_type").html(gk_type);
	 	$("#gk_type_text").val("Получить планировки и цены на все новостройки "+gk_type);
    	return false;
    });

});