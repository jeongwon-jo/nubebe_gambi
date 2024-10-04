$(function () {
	$(window).on('load', function () {
		setTimeout(function () {
			var pageUrl = window.location.href;
			$('ul.gnb > li').siblings('li').children('a').removeClass('active');
    
			if (pageUrl.indexOf('clinic') > -1) {
				$('ul.gnb > li:nth-child(1)').children('a').addClass('active');
			}  else if (pageUrl.indexOf('product') > -1) {
				$('ul.gnb > li:nth-child(2)').children('a').addClass('active');
			} else if (pageUrl.indexOf('howto') > -1) {
				$('ul.gnb > li:nth-child(3)').children('a').addClass('active');
			} else if (pageUrl.indexOf('diet') > -1) {
				$('ul.gnb > li:nth-child(3)').children('a').addClass('active');
			} else if (pageUrl.indexOf('facility') > -1) {
				$('ul.gnb > li:nth-child(4)').children('a').addClass('active');
			}
		},100)
	});

	// Include Header
	$("header").load("./_inc/header.html", function () {
		$('.gnb > li').mouseenter(function () {
			$(this).children('ul.sub-menu').stop().show()
		}).mouseleave(function () {
			$(this).children('ul.sub-menu').stop().hide()
		})
	});

	// Include Footer
	$("footer").load("./_inc/footer.html", function () {
		$('.custom-select').niceSelect();
	});

	// Include ScrollTop
	$(".scroll-top").load("./_inc/scroll-top.html", function () {
		$(".btn-scroll-top").click(function () {
			$("html, body").animate({ scrollTop: 0 }, 500);
		});
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
		var scrollHeight = $(document).height();
		$("html").animate({ scrollTop: scrollHeight }, 2000);
		return false;
	});
});
