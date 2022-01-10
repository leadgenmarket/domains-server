
	    $(function(){
	    $(window).scroll(function() {
	        var top = $(document).scrollTop();
	        var height1 = $(document).height()-$(window).height()-100;
	        var result =  $(document).scrollTop();
	        if (top < 190)
	        {
	        	$(".hl_top").removeClass("hl_top_act");
	        }
	        else
	        {
	        	$(".hl_top").addClass("hl_top_act");
	        }
	    });

	    $(function(){ 
		resizeHeader(); 
		}); 
		function resizeHeader(){ 
		var w=window, 
		d=document, 
		e=d.documentElement, 
		g=d.getElementsByTagName('body')[0], 
		x=w.innerWidth||e.clientWidth||g.clientWidth, 
		y=w.innerHeight||e.clientHeight||g.clientHeight; 
		wihdowH = y; 
		$(".h100").css({'height':(wihdowH-0) + 'px'}); 
		} 
		$(window).resize(function(){ 
		resizeHeader(); 
		});

		
    function move(parent_block,animated_block) {
        $(window).on("scroll load resize", function() {
            var w_top = $(window).scrollTop();
            var e_top = $(parent_block).offset().top;
            var w_height = $(window).height();
            var d_height = $(document).height();
            var e_height = $(parent_block).outerHeight();
            if (w_top + 300 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height) {
                $(animated_block).addClass("move");
            }
            else{
            	$(animated_block).removeClass("move");           	
            }
        })
    }
    function move_transition(parent_block,animated_block,transition_block,transition,transition_delay,delay) {
        $(window).on("scroll load resize", function() {
            var w_top = $(window).scrollTop();
            var e_top = $(parent_block).offset().top;
            var w_height = $(window).height();
            var d_height = $(document).height();
            var e_height = $(parent_block).outerHeight();
            if (w_top + 300 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height) {
                $(animated_block).addClass("move");
                setTimeout(function(){
                	$(transition_block).css("transition-delay","0s");
                	$(transition_block).css("transition","0s");
                },delay);
            }
            else{
                $(transition_block).css("transition-delay",transition_delay);
                $(transition_block).css("transition",transition); 
            	$(animated_block).removeClass("move");           	
            }
        })
    }
    	// move_transition(".outlook",".ol_decor",".ol_decor.move .bd",".8s","1s","2000");
    	// move(".outlook_list",".bus",".move.bus");
	});


