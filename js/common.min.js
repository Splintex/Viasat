$(document).ready(function() {

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
	
});

