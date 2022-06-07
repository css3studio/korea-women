/*
Theme Name: korea women campaign
Author: css3studio
Version:1.0
*/

var device_status = "";
var didScroll;
var lastScrollTop = 0;
var delta = 5;

$(window).resize(function() {
	var dw = viewport().width;
	if(dw <= 768 && device_status == "pc"){	//PC에서 모바일로 변경시
		$("body").removeClass('pc');
		$("body").addClass('mobile');
		init_mobile();
		device_status = "mobile";
	}else if(dw > 768 && device_status == "mobile"){	//모바일에서 PC로 변경시
		$("body").removeClass('mobile');
		$("body").addClass('pc');
		init_pc();
		device_status = "pc";
	}
});

/*
$(window).scroll(function(e){
	var scroll_top = $(window).scrollTop();
	var event_top = $('#s20220530a7e1bcbe42c68').offset().top - 10;
	var result_top = $('#s202205307577598ce6b6d').offset().top - 10;
	if (scroll_top > event_top && scroll_top <= result_top) {
		$('.campaign-menu li.l1').addClass('active')
		$('.campaign-menu li.l2').removeClass('active')
	}else if(scroll_top > result_top) {
		$('.campaign-menu li.l1').removeClass('active')
		$('.campaign-menu li.l2').addClass('active')
	}else{
		$('.campaign-menu li.l1').removeClass('active')
		$('.campaign-menu li.l2').removeClass('active')
	}
	didScroll = true;
  });
  */
$(document).ready(function() {

	//모금액 카운팅
	var target =  Number($('ul.collection-data li.target span').text());
	var collection = Number($('ul.collection-data li.collection span').text());
	var donator = Number($('ul.collection-data li.donator span').text());
	var finish_day = $('ul.collection-data li.finish span').text();
	var collection_percent = Math.round(collection/target*100);

	var masTime = new Date(finish_day);
	var todayTime = new Date();
	var diff = masTime - todayTime;
	var diffDay = Math.floor(diff / (1000*60*60*24));

	$('.collection-bulletin dl.collection dd > span em').text(collection_percent);
	$('.collection-bulletin dl.donator dd > div span').text(numberWithCommas(donator));
	$('.collection-bulletin dl.period dd > div span').text(diffDay);

	$({ val : 0 }).animate({ val : collection }, {
		duration: 2000,
		step: function() {
			var num = numberWithCommas(Math.floor(this.val));
			$('.collection-bulletin dl.collection dd > div b').text(num);
		},
		complete: function() {
			var num = numberWithCommas(Math.floor(this.val));
			$('.collection-bulletin dl.collection dd > div b').text(num);
			$('.collection-bulletin dl.collection dd > span').show();
		}
	});
	$('.progresive-bar .inner-bar').animate({
		width: collection_percent + '%'
	}, 2000, function() {
		// Animation complete.
	});

    var dw = viewport().width;
	if(dw <= 768){	//모바일
		$("body").removeClass('pc');
		$("body").addClass('mobile');
		init_mobile();
		device_status = "mobile";
	}else{	//PC
		$("body").removeClass('mobile');
		$("body").addClass('pc');
		init_pc();
		device_status = "pc";
	}

	$(".campaign-carousel .slider").lightGallery({
		thumnail: true,
	});

	$('.campaign-carousel .slider').slick({
		dots: false,
		arrows: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		variableWidth: true
	});
});

//PC버젼 초기화
function init_pc(){
	$('btn-mobile-menu').off();
}

//모바일 버젼 초기화
function init_mobile(){
	//헤더 LNB 메뉴(mobile)
	$(".btn-mobile-menu").on("click",function(event){
		if($(".campaign-header01").hasClass('open-mobile-menu')){
			$(".campaign-header01").removeClass('open-mobile-menu');
		}else{
			$(".campaign-header01").addClass('open-mobile-menu');
		}
		event.preventDefault();
	});
	setInterval(function() {
		if (didScroll) {
			hasScrolled();
			didScroll = false;
		}
	}, 250);

}

function hasScrolled() {
    var st = $(this).scrollTop();

    if(Math.abs(lastScrollTop - st) <= delta)
        return;


    if (st > lastScrollTop){
        // Scroll Down
        $('.campaign-header01 .btn-donate').removeClass('up').addClass('down');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('.campaign-header01 .btn-donate').removeClass('down').addClass('up');
        }
    }
    lastScrollTop = st;
}

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function viewport() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window )) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}
