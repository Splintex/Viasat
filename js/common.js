$(document).ready(function() {

// fotorama slider
	// 1. Initialize fotorama manually.
	   var $fotoramaDiv = $('.js-fotorama').fotorama({
	   		width: "100%",
	   		nav: "thumbs",
	   		allowfullscreen: false,
	   		thumbheight: "80",
	   		loop: true,
	   		arrows: false
	   });

	// 2. Get the API object.
	var fotorama = $fotoramaDiv.data('fotorama');
	var fotoramaCaption = $(".js-fotorama-caption").children();

	function showThumb() {
		var prevImg = $(".js-prev-thumb img");
		var nextImg = $(".js-next-thumb img");
		var activeThumb = $(".fotorama__nav--thumbs .fotorama__active");
		var prevThumb = activeThumb.prev().find("img").attr("src");
		var nextThumb = activeThumb.next().find("img").attr("src");
		var firstThumb = activeThumb.parent().children().eq(1).find("img").attr("src");
		var lastThumb = activeThumb.parent().children().last().find("img").attr("src");
		
		if (prevThumb) {
			prevImg.attr("src", prevThumb);
		}
		else {
			prevImg.attr("src", lastThumb);
		}

		if (nextThumb) {
			nextImg.attr("src", nextThumb);
		}
		else {
			nextImg.attr("src", firstThumb);
		}

	}

	

	$('.js-fotorama').on('fotorama:ready', function (e, fotorama) {
		var index = fotorama.activeIndex;
		fotoramaCaption.hide();
		fotoramaCaption.eq(index).show();
		setTimeout(function(){
			showThumb();
		},500)
	});
	
	$('.js-fotorama').on('fotorama:show', function (e, fotorama) {
		var index = fotorama.activeIndex;
		fotoramaCaption.hide();
		fotoramaCaption.eq(index).fadeIn(500);
	});
	$('.js-fotorama').on('fotorama:showend', function (e, fotorama) {
		showThumb();
	});

	

	$(".js-fotorama-prev").on("click", function () {
		fotorama.show('<');
	});
	$(".js-fotorama-next").on("click", function () {
		fotorama.show('>');
	});

// tabs
	function tabsLoad() {
        var hash = window.location.hash;
        if (hash) {
            $('[href="'+hash+'"]').parents(".js-tabs-group").find(".js-tabs-content").hide().removeClass("is-visible");
            $('[data-id="'+hash+'"]').addClass("is-visible").show();
            $('[href="'+hash+'"]').parents(".js-tabs").find("li").removeClass("is-active");
            $('[href="'+hash+'"]').parent().addClass("is-active");
        }
        else {
        	if ($('.js-tabs').length > 0) {
        		$('.js-tabs li:first').addClass("is-active");
        		window.location.hash = $('.js-tabs li:first a').attr("href");
        	}
            
        }
        
    }
   tabsLoad();
   // alert(hash);
    $('.js-tabs a').on("click",function (e) {
        var content = $(this).attr("href");
        $(this).parents(".js-tabs").find("li").removeClass("is-active");
        $(this).parent().addClass("is-active");
        $(this).parents(".js-tabs-group").find(".js-tabs-content").hide().removeClass("is-visible");
        $('[data-id="'+content+'"]').addClass("is-visible").show();
        window.location.hash = this.hash;
        return false;
    });

    $(".js-toggle-menu").on("touchstart click",function () {
    	$(".menu").parent().toggleClass("is-visible");
    	$(this).toggleClass("is-active");
		return false;
    });

// popup
    $(".js-toggle-popup").on("click", function(){
    		var popup = $(this).attr("href");
    		$(".js-popup").fadeOut(300);
    		$("."+popup).fadeIn(300);
    		$(".js-overlay").fadeIn(300);
    		return false;
    	});

    	$(".js-overlay").on("click", function(event){
    		$(".js-popup").fadeOut(300);
    		$(this).fadeOut(300);
    	});

    	$(".js-close-popup").on("click", function(){
    		$(".js-popup").fadeOut(300);
    		$(".js-overlay").fadeOut(300);
    		return false;
    	});

	
});

