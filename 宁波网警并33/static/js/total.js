/**
 * author:申屠
 */
//tab页
function nTabs(thisObj,num) {
$('.normal').removeClass('active');
$(thisObj).addClass('active');
$('#tab0,#tab1,#tab2,#tab3').hide();
var a="#tab"+num;
$(a).show();
}
//禁止滑动
function addnone(){
	$('.swiper-container').addClass('swiper-no-swiping');
	if($('.bg').css('display')=='none'){swipe()};
}
//滑动
function swipe(){
	$('.swiper-container').removeClass('swiper-no-swiping');
}
 
//默认选地区第一个
$('#cont-tool li:first-child,#time-leak2 li:first-child').addClass('active');
//通报分析横屏
//统计弹窗
$('#slt1').click(function(){
    $('.bg,#cont-area').toggle();
    
    areaval()
});
$('.bg').click(function(){
    $('.bg,.cont-area').hide()
});
//取值
function areaval(){
	addnone();
	$('.bg3,.cont-threat,#cont-tool').hide();
}
$('#cont-area li').click(function(){
	$(this).each(function(){
	$('#slt1 span,#cross-slt1').text($(this).text());
	$('.bg,.cont-area').hide();
	if($('#slt1 span').text()=='按月统计'){	
		$('#time1,#time2,#time3').hide();
		$('#time1').show();
		$('#time1 li').removeClass('active');
		$('#time1 li:first-child').addClass('active');
		$('#srt1 span,#cross-srt1').text($('#time1 li:first-child').text());//时间取值;
		schmon=$('#a0').attr('data-mon');schbegin='';schend='';schyear='';
	}
	if($('#slt1 span').text()=='按季统计'){	
		$('#time1,#time2,#time3').hide();
		$('#time2').show();
		$('#time2 li').removeClass('active');
		$('#time2 li:first-child').addClass('active');
		$('#srt1 span,#cross-srt1').text($('#time2 li:first-child').text());//时间取值
		schmon='';schbegin=$('#c0').attr('data-begin');schend=$('#c0').attr('data-end');schyear='';
	}
	if($('#slt1 span').text()=='按年统计'){	
		$('#time2,#time3,#time1').hide();
		$('#time3').show();
		$('#time3 li').removeClass('active');
		$('#time3 li:first-child').addClass('active');
		$('#srt1 span,#cross-srt1').text($('#time3 li:first-child').text());//时间取值
		schmon='';schbegin='';schend='';schyear=$('#b0').attr('data-year');
					
		}
		bulletin();swipe();
		//变色打钩
	$('#cont-area li').removeClass('active');
	$(this).addClass('active');
	});	

});	
//时间弹窗
$('#srt1').click(function(){
    $('.bg3,#cont-tool').toggle();
    toolval();
});
$('.bg3').click(function(){
    $('.bg3,.cont-tool').hide()
});
//处理取值
function toolval(){
	addnone();
	$('.bg2,.bg,.cont-threat,.cont-area').hide();
}
$('#cont-tool li').click(function(){
	$(this).each(function(){
		$('#srt1 span,#cross-srt1').text($(this).children('span').text());
		$('.bg3,.cont-tool').hide();
		//变色打钩
		$('#cont-tool li').removeClass('active');
		$(this).addClass('active');
		if($(this).attr('data-mon') !== undefined) {
			schmon=$(this).attr('data-mon');schbegin='';schend='';schyear='';
		} else if($(this).attr('data-year') !== undefined) {
			schmon='';schbegin='';schend='';schyear=$(this).attr('data-year');
		} else {
			schmon='';schbegin=$(this).attr('data-begin');schend=$(this).attr('data-end');schyear='';
		}
		bulletin();swipe()
	});	
	
});	
//漏洞分析横屏
//统计弹窗
$('#slt2').click(function(){
    $('.bg,#cont-leak').toggle();
    areaval2()
});
$('.bg').click(function(){
    $('.bg,#cont-leak').hide();swipe();
});
//取值
function areaval2(){
	addnone();
	$('.bg3,.cont-threat,.cont-tool').hide();
}
$('#cont-leak li').click(function(){
	$(this).each(function(){
	$('#slt2 span,#cross-slt2').text($(this).text());
	$('.bg,#cont-leak').hide();
	if($('#slt2 span').text()=='按月统计'){	
		$('#time4,#time5,#time6').hide();
		$('#time4').show();
		$('#time4 li').removeClass('active');
		$('#time4 li:first-child').addClass('active');
		$('#srt2 span,#cross-srt2').text($('#time4 li:first-child').text());//时间取值
		schmon2=$('#a0').attr('data-mon');schbegin2='';schend2='';schyear2='';
	}
	if($('#slt2 span').text()=='按季统计'){	
		$('#time4,#time5,#time6').hide();
		$('#time5').show();
		$('#time5 li').removeClass('active');
		$('#time5 li:first-child').addClass('active');
		$('#srt2 span,#cross-srt2').text($('#time5 li:first-child').text());//时间取值
		schmon2='';schbegin2=$('#c0').attr('data-begin');schend2=$('#c0').attr('data-end');schyear2='';
	}
	if($('#slt2 span').text()=='按年统计'){	
		$('#time4,#time5,#time6').hide();
		$('#time6').show();
		$('#time6 li').removeClass('active');
		$('#time6 li:first-child').addClass('active');
		$('#srt2 span,#cross-srt2').text($('#time6 li:first-child').text());//时间取值
		schmon2='';schbegin2='';schend2='';schyear2=$('#b0').attr('data-year');
	}
	leak();swipe();
	//变色打钩
	$('#cont-leak li').removeClass('active');
	$(this).addClass('active');
	});	

});	
//时间弹窗
$('#srt2').click(function(){
    $('.bg3,#time-leak2').toggle();
    toolval2();
});
$('.bg3').click(function(){
    $('.bg3,#time-leak2').hide();swipe();
});
//处理取值
function toolval2(){
	addnone();
	$('.bg2,.bg,.cont-threat,.cont-area').hide();

}
$('#time-leak2 li').click(function(){
	$(this).each(function(){
		$('#srt2 span,#cross-srt2').text($(this).children('span').text());
		$('.bg3,.cont-tool').hide();
		if($(this).attr('data-mon') !== undefined) {
			schmon2=$(this).attr('data-mon');schbegin2='';schend2='';schyear2='';
		} else if($(this).attr('data-year') !== undefined) {
			schmon2='';schbegin2='';schend2='';schyear2=$(this).attr('data-year');
		} else {
			schmon2='';schbegin2=$(this).attr('data-begin');schend2=$(this).attr('data-end');schyear2='';
		}
		leak();swipe();
		//变色打钩
		$('#time-leak2 li').removeClass('active');
		$(this).addClass('active');
	});			
});	

//轮播
var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    spaceBetween: 0,
    centeredSlides: true,
    autoplay: false,//显示时间
    autoplayDisableOnInteraction: true
});
//控制显示的轮播页
//$('.swiper-pagination span').eq(1).trigger('click');

//图片控制横竖屏
//横屏图片
$('.cross1').on('click',function(){
	$('#tr0').click();cross();//chart5()
})
$('.cross2').on('click',function(){
	$('#tr1').click();cross();//chart6()
})
$('.cross3').on('click',function(){
	$('#tr2').click();cross();//chart7()
})
$('.cross4').on('click',function(){
	$('#tr3').click();cross();//chart8()
})
//竖屏图片
$('.cross-img1').on('click',function(){
	$('.swiper-pagination span').eq(0).trigger('click');vertical();
})
$('.cross-img2').on('click',function(){
	$('.swiper-pagination span').eq(1).trigger('click');vertical();
})
$('.cross-img3').on('click',function(){
	$('.swiper-pagination span').eq(2).trigger('click');vertical();
})
$('.cross-img4').on('click',function(){
	$('.swiper-pagination span').eq(3).trigger('click');vertical();
})
//双击退出
mui.init();
(function($, doc) {
	$.init();
	$.plusReady(function() {
		//退出应用
		$.oldBack = mui.back;
		var backButtonPress = 0;
		$.back = function(event) {
			backButtonPress++;
			if (backButtonPress > 1) {
				plus.runtime.quit();
			} else {
				plus.nativeUI.toast('再按一次退出应用');
			}
			setTimeout(function() {
				backButtonPress = 0;
			}, 1000);
			return false;
		};
	});
}(mui, document));
//横屏全屏
function cross(){
mui.plusReady(function() {
plus.screen.lockOrientation("landscape");
setTimeout(function(){plus.navigator.setFullscreen(true);},1000);
//plus.navigator.setFullscreen(true); 
});		
}
//竖屏不全屏
function vertical(){
mui.plusReady(function() {
plus.screen.lockOrientation("portrait-primary");
setTimeout(function(){plus.navigator.setFullscreen(false);},1000);
//plus.navigator.setFullscreen(false); 
});		
}