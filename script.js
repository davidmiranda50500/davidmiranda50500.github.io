$(function(){
	var $root = $('html, body');
	var $menuicon = $("#menu-icon");
	$('#side-menu a').click(function() {
	    var href = $.attr(this, 'href');
	    $root.animate({
	        scrollTop: href=="#"? 0 : $(href).offset().top
	    }, 500, function () {
	        window.location.hash = href;
	    });
	    $menuicon.click();
	    return false;
	});
	$menuicon.click(function(){
		$(this).toggleClass('open');
	});

	$('.js-slideshow').responsiveSlides({
        auto: false,
        speed: 500,
        maxwidth: 960,
        nav: true
	});

	$('.js-slide-propostas').responsiveSlides({
        auto: true,
        speed: 1000,
        nav: true
	});


	var $next = $(".rslides_nav.next");
	var $prev = $(".rslides_nav.prev");
	// $('.js-slideshow').on('swipe', function(ev){
	// 	console.log(ev);
	// });

	$next.text("▶");
	$prev.text("◀");
});