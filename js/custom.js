/*
Theme Name: korea women
Author: css3studio
Version:1.0
*/

var device_status = "";
var didScroll;
var lastScrollTop = 0;
var delta = 5;

$(window).resize(function() {
	var dw = viewport().width;
	if(dw <= 991 && device_status == "pc"){	//PC에서 모바일로 변경시
		$("body").removeClass('pc');
		$("body").addClass('mobile');
		init_mobile();
		device_status = "mobile";
	}else if(dw > 991 && device_status == "mobile"){	//모바일에서 PC로 변경시
		$("body").removeClass('mobile');
		$("body").addClass('pc');
		init_pc();
		device_status = "pc";
	}
});

$(document).ready(function() {
	//푸터 패밀리 사이트
	$('footer #family_site').change(function(){
		location.href = $(this).val();
	});

	//2022 캠페인 모금액 카운팅
	var target =  Number($('ul.collection-data li.target span').text());
	var collection = Number($('ul.collection-data li.collection span').text());
	var donator = Number($('ul.collection-data li.donator span').text());
	var finish_day = $('ul.collection-data li.finish span').text();
	var collection_percent = Math.round(collection/target*100);

	var masTime = new Date(finish_day);
	var todayTime = new Date();
	var diff = masTime - todayTime;
	var diffDay = Math.floor(diff / (1000*60*60*24)) + 1;
	var diffDay = 0; //마감

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
	if(dw <= 991){	//모바일
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

	// 메인 W스토리
	/*
	setTimeout(() => {
		$('#newest_w202207155927692832b65 .post_row').on('init', function(event, slick, direction){
			$('#newest_w202207155927692832b65 .post_row').css('visibility','visible');
		});
		$('#newest_w202207155927692832b65 .post_row').slick({
			dots:false,
			arrows:true,
			infinite: true,
			variableWidth: true,
			slidesToShow: 3,
			touchThreshold:100
		});
	}, 1000);
	*/
	//연혁 연도 슬라이딩
	$('.sub-menu.h-menu-type2.menu-horizontal ul').on('init',function(){
		//현재 년도로 이동
		var class_names = $('body').attr('class');
		var myRegex = /_body_menu_\w+/;
		var result = class_names.match(myRegex);
		if(result.length > 0){
			var page_code = result[0].replace('_body_menu_','');
			var li_index = $('.sub-menu.h-menu-type2.menu-horizontal ul li[data-code="'+ page_code +'"]').index();
			setTimeout(function(){
				$('.sub-menu.h-menu-type2.menu-horizontal ul').slick('slickGoTo',li_index);
			},500);
		}
	});
	$('.sub-menu.h-menu-type2.menu-horizontal ul').slick({
		dots: false,
		arrows: true,
		slidesToShow: 9,
		infinite: false,
		slidesToScroll: 1,
		speed: 600,
		responsive: [
			{
			breakpoint: 1024,
			settings: {
				slidesToShow: 7,
				slidesToScroll: 1,
			}
			},
			{
			breakpoint: 600,
			settings: {
				slidesToShow: 5,
				slidesToScroll: 2
			}
			},
			{
			breakpoint: 480,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 1
			}
			}
		]
	});
	//기부안내 FAQ 아코디언
	$('.accordion01 dl dt').on('click', function(){
		if($(this).parent().hasClass('active')){
			$(this).parent().removeClass('active');
		}
		else{
			$(this).parent().addClass('active');
		}
		event.preventDefault();
	});



	//2022 캠페인 carousel
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
	//메인 퀵메뉴
	$('#w2022071528a92574ee808 .button_wrap').slick({
		dots: false,
		arrows: true,
		slidesToShow: 4,
		infinite: false,
		slidesToScroll: 1,
        speed: 600,
	});

}

//모바일 버젼 초기화
function init_mobile(){

	//2022 캠페인 헤더 LNB 메뉴(mobile)
	$(".btn-mobile-menu").on("click",function(event){
		if($(".campaign-header01").hasClass('open-mobile-menu')){
			$(".campaign-header01").removeClass('open-mobile-menu');
		}else{
			$(".campaign-header01").addClass('open-mobile-menu');
		}
		event.preventDefault();
	});
	//2022 캠페인 헤더 기부버튼 보이기
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
