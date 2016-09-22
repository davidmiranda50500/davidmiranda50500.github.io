//minified isMobile
!function(a){var b=/iPhone/i,c=/iPod/i,d=/iPad/i,e=/(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,f=/Android/i,g=/(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,h=/(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,i=/IEMobile/i,j=/(?=.*\bWindows\b)(?=.*\bARM\b)/i,k=/BlackBerry/i,l=/BB10/i,m=/Opera Mini/i,n=/(CriOS|Chrome)(?=.*\bMobile\b)/i,o=/(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,p=new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)","i"),q=function(a,b){return a.test(b)},r=function(a){var r=a||navigator.userAgent,s=r.split("[FBAN");return"undefined"!=typeof s[1]&&(r=s[0]),s=r.split("Twitter"),"undefined"!=typeof s[1]&&(r=s[0]),this.apple={phone:q(b,r),ipod:q(c,r),tablet:!q(b,r)&&q(d,r),device:q(b,r)||q(c,r)||q(d,r)},this.amazon={phone:q(g,r),tablet:!q(g,r)&&q(h,r),device:q(g,r)||q(h,r)},this.android={phone:q(g,r)||q(e,r),tablet:!q(g,r)&&!q(e,r)&&(q(h,r)||q(f,r)),device:q(g,r)||q(h,r)||q(e,r)||q(f,r)},this.windows={phone:q(i,r),tablet:q(j,r),device:q(i,r)||q(j,r)},this.other={blackberry:q(k,r),blackberry10:q(l,r),opera:q(m,r),firefox:q(o,r),chrome:q(n,r),device:q(k,r)||q(l,r)||q(m,r)||q(o,r)||q(n,r)},this.seven_inch=q(p,r),this.any=this.apple.device||this.android.device||this.windows.device||this.other.device||this.seven_inch,this.phone=this.apple.phone||this.android.phone||this.windows.phone,this.tablet=this.apple.tablet||this.android.tablet||this.windows.tablet,"undefined"==typeof window?this:void 0},s=function(){var a=new r;return a.Class=r,a};"undefined"!=typeof module&&module.exports&&"undefined"==typeof window?module.exports=r:"undefined"!=typeof module&&module.exports&&"undefined"!=typeof window?module.exports=s():"function"==typeof define&&define.amd?define("isMobile",[],a.isMobile=s()):a.isMobile=s()}(this);

var shuffleUl = function (ul){
	for (var i = ul.children.length; i >= 0; i--) {
		ul.appendChild(ul.children[Math.random() * i | 0]);
	}
};

$(function(){
	shuffleUl(document.querySelector('ul.quem-apoia'));
	shuffleUl(document.querySelector('ul.videos'));

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
        speed: 1000,
        maxwidth: 960,
        nav: true
	});

	$('.js-slide-propostas').responsiveSlides({
        auto: false,
        speed: 1000,
        nav: true
	});

	if(isMobile.any){
		$('.na-imprensa > ul').addClass('rslides').responsiveSlides({
	        auto: true,
	        speed: 1000,
	        nav: true
		});
	}


	var $next = $(".rslides_nav.next");
	var $prev = $(".rslides_nav.prev");
	// $('.js-slideshow').on('swipe', function(ev){
	// 	console.log(ev);
	// });

	$next.text("▶");
	$prev.text("◀");

	var $proximoApoio = $("#quem-apoia > .next");
	var $botaoApoio = $("#quem-apoia > .next, #quem-apoia > .prev");
	var proximoApoioInterval = setInterval(function(){
		$proximoApoio.click();
	}, 3000);
	$botaoApoio.on('click', function(ev){
		if(!ev.isTrigger)
			clearInterval(proximoApoioInterval);
	});
	$('#quem-apoia li').on('click', function(ev){
		clearInterval(proximoApoioInterval);
	})

	var $proximoVideo = $("#videos > .next");
	var $botaoVideo = $("#videos > .next, #videos > .prev");
	var proximoVideoInterval = setInterval(function(){
		$proximoVideo.click();
	}, 2500);
	$botaoVideo.on('click', function(ev){
		if(!ev.isTrigger)
			clearInterval(proximoVideoInterval);
	});

	var $imgPlay = $('.js-img-play');
	$imgPlay.on('click', function(){
		clearInterval(proximoVideoInterval);
		$(this).siblings('.play').fadeOut(200);
		$(this).fadeOut(200, function(){
			var src = "https://www.youtube.com/embed/" + $(this).attr('data-video') + "?autoplay=1";
			$(this).parent().append('<iframe width="960" height="530" src='+src+' frameborder="0" allowfullscreen></iframe>');
		});
	});
	$("#videos .play").on('click', function(){
		$(this).siblings(".js-img-play").click();
	});
});
