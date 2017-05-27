/**
 * author:申屠
 */

//默认选地区第一个
$('.cont-area li:first-child').addClass('active');
//区域弹窗
$('.slt-lt').click(function() {
	$('.bg,.cont-area').toggle();
	areaval()
});
$('.bg').click(function() {
	$('.bg,.cont-area').hide()
});
//地区取值
function areaval() {
	$('.bg3,.cont-threat,.cont-tool').hide();
	$('.cont-area li').click(function() {
		$(this).each(function() {

			if($(this).text() == '全部') {
				$('.slt-lt span').text('区域');
				deptid = '';
				$('.lists ul').html('');

			} else {
				$('.slt-lt span').text($(this).text());
				deptid = $(this).attr('data-id');
				$('.lists ul').html('');
			}
			search();

			$('.bg,.cont-area').hide();
			//变色打钩
			$('.cont-area li').removeClass('active');
			$(this).addClass('active');
		});

	});
}
//威胁弹窗
$('.slt-ct').click(function() {
	$('.bg2,.cont-threat').toggle();
	threatval();
});
$('.bg2').click(function() {
	$('.bg2,.cont-threat').hide()
});
//威胁取值
function threatval() {
	$('.bg,.bg3,.cont-area,.cont-tool').hide();
	$('.cont-threat li').click(function() {
		$(this).each(function() {
			$('.slt-ct span').text($(this).text());
			$('.bg2,.cont-threat').hide();
			//变色打钩
			$('.cont-threat li').removeClass('active');
			$(this).addClass('active');
		});

	});
}

//处理弹窗
$('.slt-rt').click(function() {
	$('.bg3,.cont-tool').toggle();
	toolval();
});
$('.bg3').click(function() {
	$('.bg3,.cont-tool').hide()
});
//处理取值
function toolval() {
	$('.bg2,.bg,.cont-threat,.cont-area').hide();
	$('.cont-tool li').click(function() {
		$(this).each(function() {
			$('.slt-rt span').text($(this).children('span').text());
			$('.bg3,.cont-tool').hide();
			//变色打钩
			$('.cont-tool li').removeClass('active');
			$(this).addClass('active');
		});

	});
}

//搜索传值
function search() {
	//	alert($.trim($('.search').val()));
	var value = $.trim($('.search').val());

	if(value !== '') {
		searchData();
	} else {
		layer.msg('输入内容不能为空！', {
			time: 2000
		});
	}
	$('.search').blur()
}
//显示叉叉
function showx() {
	if($('.search').val() == '') {
		$('.x').hide();
	} else {
		$('.x').show();
	}　　
}
$('.x').click(function() {
	$('.search').val('')
})
setInterval(showx, 50);

//处理传值
function statecom1() {

	status = 1;
	page = 1;
	pages();
	search()
}

function statecom2() {
	status = 2;
	page = 1;
	pages();
	search()
}

function statecom3() {
	status = 0;
	page = 1;
	pages();
	search()
}
//按钮跳转
function btnclick(){
	$('.bul ul li>div .flow,.bul ul li>div h1,.bul ul li>div h2,.bul ul li>div h3,.bul ul li>div .bul-time').click(function() {
		$(this).each(function() {
			$(this).parent().siblings('.cli-btn').click();
			$(this).parent().siblings('.cli-btn').focus();
		});
	
	});
	$('.tel span,.bul-time span').click(function() {
		$(this).each(function() {
			$(this).parent().parent().parent().siblings('.cli-btn').click();
			$(this).parent().parent().parent().siblings('.cli-btn').focus();
		});
	
	});
}