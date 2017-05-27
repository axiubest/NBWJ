/**
 * author:申屠
 */
//遍历写入颜色
function color(){
	$('.state span:contains("中危")').each(function(){
	$(this).css('background','#aa71e5');
	});
	$('.state span:contains("高危")').each(function(){
	$(this).css('background','#ff2d42');
	});
	$('.state span:contains("处理中")').each(function(){
	$(this).css('background','#35bcf8');
	});
	$('.state span:contains("未处理")').each(function(){
	$(this).css('background','#ff8a00');
	});
}
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

	status = 3;
	page = 1;
	pages();
	search()
}

function statecom2() {
	status = 4;
	page = 1;
	pages();
	search()
}

function statecom3() {
	status = 6;
	page = 1;
	pages();
	search()
}

