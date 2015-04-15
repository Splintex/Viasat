$(document).ready(function() {

	$(document).on("click", function(){
		$("html").removeClass("has-open-nav");
		$(".js-popup").fadeOut(300);
	});

// init variables
	var viewportWidth = verge.viewportW();
	var viewportHeight = verge.viewportH();
	var fullHeightBlock = $(".js-full-height");
	var winHeight = $(window).height();

// full height block
	function fullHeight() {
		var viewportWidth = verge.viewportW();
		var viewportHeight = verge.viewportH();
		var winHeight = $(window).height();
		if (viewportHeight >= 500) {
			fullHeightBlock.css({
				height: winHeight
			});

		}
		else {
			fullHeightBlock.css({
				height: 'auto'
			});
		}

		if (viewportWidth <= 992) {
			$(".js-swipe-location").css({
				height: winHeight
			});

		}
		
	}
	fullHeight();

// init functions on resize window event
	$(window).resize(function(){
		fullHeight();
		toggleInfo();
	});

// toogle menu
	$(".js-menu-toggle").on("click", function(event){
		$("html").toggleClass("has-open-nav");
		event.stopPropagation();
		return false;
	});
	$(".js-menu").on("click", function(event){
		event.stopPropagation();
	});

// scroll header
	function scrollHeader() {
		var scroll = $(window).scrollTop();
		if ( scroll >= winHeight ) {
			$(".index-page .header").addClass("is-scrolled");
		}
		else {
			$(".index-page .header").removeClass("is-scrolled");
		}
	}

	scrollHeader();

// init functions on scroll event
	$(window).scroll(function(){
		scrollHeader();
	});

// toogle any block
	$("body").on("click", ".js-toggle", function(){
		$(this).parents(".js-toggle-parent").find(".js-toggle-el").slideToggle(300);
		return false;
	});

// toogle info blocks
	var infoToggle = $(".js-toggle-info");
	function toggleInfo() {
		var viewportWidth = verge.viewportW();
		if (viewportWidth <= 480) {
			infoToggle.addClass("js-toggle");
		}
		else {
			infoToggle.removeClass("js-toggle");
			infoToggle.next().removeAttr("style");
		}
	}
	toggleInfo();

	
	
// swipe location
	var pager = $(".js-location-pager span");

	function swipeLocation() {
		$('.touch .js-swipe-location').swipe({
		    swipeLeft: function(event, direction, distance, duration, fingerCount) {
		        $("html").addClass("has-open-map");
		        pager.removeClass("is-active").first().addClass("is-active");
		    },
		    swipeRight: function(event, direction, distance, duration, fingerCount) {
		        $("html").removeClass("has-open-map");
		        pager.removeClass("is-active").last().addClass("is-active");
		    },
		    //Default is 75px, set to 0 for demo so any distance triggers swipe
		    threshold: 30
		});

	}
	if (viewportWidth<=480) {
		swipeLocation();
	}
	$(window).resize(function(){
		var viewportWidth = verge.viewportW();
		if (viewportWidth<=480) {
			swipeLocation();
		}
		
	});
	
	var btnFilter = $(".js-btn-filter");
	btnFilter.on("click", function(){
		var el = $(this).attr("data-filter");

		// if btn doesn't have class is-active
		if (!$(this).hasClass("is-active")) {

			if ($(".js-filter-el.is-inactive").length>0) {
				//$(".js-filter-el").addClass("is-inactive");
				$("."+el).removeClass("is-inactive");
				$(this).addClass("is-active");
			}

			else {
				$(".js-filter-el").addClass("is-inactive");
				$("."+el).removeClass("is-inactive");
				$(this).addClass("is-active");
			}
			

		}


		// if btn has class is-active
		else {

			// if objects have classes is-inactive
			if ($(".js-filter-el.is-inactive").length>0) {
				//$(".js-filter-el").addClass("is-inactive");
				$("."+el).addClass("is-inactive");
				$(this).removeClass("is-active");
			}

			// if objects don't have classes is-inactive
			else {
				$(".js-filter-el").removeClass("is-inactive");
				$(this).removeClass("is-active");
			}

			// click on the last active btn to reset blocks
			if ($(".js-btn-filter.is-active").length==0) {
				$(".js-filter-el").removeClass("is-inactive");
				$(this).removeClass("is-active");
			}
			

		}

		return false;

	});

	$(".js-fancybox a").fancybox({
		padding: 0,
		helpers: {
		    overlay: {
		      locked: false
		    },
		    title : {
	    		type : 'inside' // 'float', 'inside', 'outside' or 'over'
	    	}
		},
		nextEffect: 'fade',
		prevEffect: 'fade',
		beforeLoad: function() {
            this.title = $(this.element).attr('data-text');
        }
	});


// popups
	$(".js-popup-toggle").on("click", function(event){
		var popup = $(this).attr("data-popup");
		$("."+popup).fadeIn(300);
		event.stopPropagation();
		return false; 
	});

	$(".js-popup").children().on("click", function(event){
		event.stopPropagation();
	});

	if (viewportWidth <= 768) {
		$(".js-show-answer").on("click", function(){
			$(this).parents(".js-review").find(".js-review-answer").slideToggle(300);
			return false; 
		});
	}
	



	
});

