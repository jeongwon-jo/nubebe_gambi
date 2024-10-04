$(function () {
	$("header").load("./_inc/header.html", function () {
		$('.header__nav .btn-menu').click(function () {
			$('.mobile-nav').show()
			$('.mobile-nav__inner').addClass('active')
		})
	});

	$("nav.mobile-nav").load("./_inc/mobile_header.html", function () {
		$('ul.mobile__gnb li > a').click(function () {
			$('.mobile__gnb > li >a > span').not($(this).children('span')).removeClass('active')
			$(this).children('span').toggleClass('active')
			$('ul.sub-menu').not($(this).siblings()).slideUp()
			$(this).siblings('ul.sub-menu').slideToggle()
		})

		$('.mobile-nav__header .btn-close').click(function () {
			$(".mobile-nav").hide();
			$(".mobile-nav__inner").removeClass("active");
		})
	});

	$("footer").load("./_inc/footer.html", function () {
		$('.custom-select').niceSelect();
	});
	
	$(".scroll-top").load("./_inc/scroll-top.html", function () {
		$(".btn-scroll-top").click(function () {
			$(this).siblings(".scroll-top__menu").fadeToggle();
		});
	});

	var mobileNav = document.getElementById("mobile-nav");

	window.onclick = function (event) {
		if (event.target == mobileNav) {
			mobileNav.style.display = "none";
		}
	};

	var pageUrl = window.location.href;
	
	$(window).on('load', function(){
    $('ul.mobile__gnb > li').siblings('li').children('a').removeClass('active');
    
    if (pageUrl.indexOf('clinic') > -1) {
			$('ul.mobile__gnb > li:nth-child(1)').children('a').addClass('active');
		} else if (pageUrl.indexOf('product') > -1) {
			$('ul.mobile__gnb > li:nth-child(2)').children('a').addClass('active');
		} else if (pageUrl.indexOf('howto') > -1) {
			$('ul.mobile__gnb > li:nth-child(3)').children('a').addClass('active');
			$('ul.mobile__gnb > li:nth-child(3) > ul.sub-menu').slideDown()
			$('ul.mobile__gnb > li:nth-child(3) > ul.sub-menu > li:nth-child(1)').children('a').addClass('active');
		} else if (pageUrl.indexOf('diet_video') > -1) {
			$('ul.mobile__gnb > li:nth-child(3)').children('a').addClass('active');
			$('ul.mobile__gnb > li:nth-child(3) > ul.sub-menu').slideDown()
			$('ul.mobile__gnb > li:nth-child(3) > ul.sub-menu > li:nth-child(2)').children('a').addClass('active');
		} else if (pageUrl.indexOf('facility') > -1) {
			$('ul.mobile__gnb > li:nth-child(4)').children('a').addClass('active');
		}
	});

	// 감비정 얼마나 감량될까 결과확인
	$(".btn-result").click(function () {
		$("p.main-result").hide();
		$("p.main-result__smry").hide();
		$("p.sub-result").hide();
		let sex = $('input[name="radio-sex"]:checked').val();
		let age = $("#age").val();
		let tall = $("#tall").val();
		let weight = $("#weight").val();

		if (age == "") {
			alert("나이를 입력해주세요");
			$("#age").focus();
			return false;
		} else if (tall == "") {
			alert("신장을 입력해주세요");
			$("#tall").focus();
			return false;
		} else if (weight == "") {
			alert("체중을 입력해주세요");
			$("#weight").focus();
			return false;
		}

		tall = tall * 0.01;
		var bmi = tall * tall;
		bmi = weight / bmi;
		bmi = bmi.toFixed(2);
		if (sex == "m") {
			var avg_weight = tall * tall * 22;
		} else {
			var avg_weight = tall * tall * 21;
		}
		avg_weight = Math.floor(avg_weight);
		var down_weight = weight - avg_weight;
		var f_weight = (-4.654 + 0.153 * weight + 1.224) * 1.2;
		f_weight = Math.floor(f_weight);

		var bmi_state;
		bmi = Math.floor(bmi);

		if (bmi > 30) {
			bmi_state = "고도비만";
			point = bmi + 50;
			$("p.main-result.typeB").show();
			$("p.main-result__smry.sum5").show();
			$(".down_weight").text(down_weight + "kg");
			$(".f_weight").text(f_weight + "kg");
			$("p.sub-result.sum2").show();
		} else if (bmi > 25) {
			bmi_state = "비만";
			point = bmi + 42;
			$("p.main-result.typeB").show();
			$("p.main-result__smry.sum4").show();
			$(".down_weight").text(down_weight + "kg");
			$(".f_weight").text(f_weight + "kg");
			$("p.sub-result.sum2").show();
		} else if (bmi > 23) {
			bmi_state = "과체중";
			point = bmi + 32;
			$("p.main-result.typeB").show();
			$("p.main-result__smry.sum3").show();
			$(".down_weight").text(down_weight + "kg");
			$(".f_weight").text(f_weight + "kg");
			$("p.sub-result.sum2").show();
		} else if (bmi > 18.5) {
			bmi_state = "정상";
			point = bmi + 13;
			$("p.main-result.typeA").show();
			$("p.main-result__smry.sum2").show();
			$("p.sub-result.sum1").show();
		} else {
			bmi_state = "저체중";
			point = bmi + 2;
			$("p.main-result.typeA").show();
			$("p.main-result__smry.sum1").show();
			$("p.sub-result.sum1").show();
		}

		point = Math.floor(point);
		if (point > 99) {
			point = 99;
		}
		$(".bmi").text(bmi_state);
		$("#kg").text(avg_weight + "kg");
		$(".bmi-arrow").css("left", point + "%");

		$(".how-loss__result").show();

		var offset = $("#how-loss__result").offset();
		$("html, body").animate({ scrollTop: offset.top }, 800);
	});
});


// 메인 - 감비정D 처방 한의원
$('.area_list .area_result_list').first().slideDown()
$('.area__category').click(function () {
	$(this).toggleClass('active')
	$(this).siblings('.area__category').removeClass('active')
	$(this).siblings('.area_result_list').slideUp()
	if ($(this).next('.area_result_list').is(':visible')) {
		$(this).next('.area_result_list').slideUp()
	} else {
		$(this).next('.area_result_list').slideDown()
	}
})