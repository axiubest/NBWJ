/**
 * author:申屠
 */
//双击退出
mui.init();
//打开浏览器
//function openUrl(url){
//mui.plusReady(function() {
//plus.runtime.openURL(url);
//});		
//} 
//退出应用
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
//默认选地区第一个
$('.cont-area li:first-child').addClass('active');
//区域弹窗
$('.slt-lt').click(function(){
    $('.bg,.cont-area').toggle();
    areaval()
});
$('.bg').click(function(){
    $('.bg,.cont-area').hide()
});
//地区取值
function areaval(){
	$('.bg3,.cont-threat,.cont-tool').hide();
	$('.cont-area li').click(function(){
		$(this).each(function(){
			
			if($(this).text()=='全部'){
				$('.slt-lt span').text('区域');
				deptid='';
				$('.lists ul').html('');

			}else{
				$('.slt-lt span').text($(this).text())	;
				deptid=$(this).attr('data-id');
				$('.lists ul').html('');
			}
			load();unlock();
			
			 $('.bg,.cont-area').hide();
			 //变色打钩
			$('.cont-area li').removeClass('active');
			$(this).addClass('active');
		});	

	});	
}

//处理弹窗
$('.slt-rt').click(function(){
    $('.bg3,.cont-tool').toggle();
    toolval();
});
$('.bg3').click(function(){
    $('.bg3,.cont-tool').hide()
});
//处理取值
function toolval(){
	$('.bg2,.bg,.cont-threat,.cont-area').hide();
	$('.cont-tool li').click(function(){
		$(this).each(function(){
			$('.slt-rt span').text($(this).children('span').text());
			$('.bg3,.cont-tool').hide();			
			//变色打钩
			$('.cont-tool li').removeClass('active');
			$(this).addClass('active');
		});	
		
	});	
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
//处理方法
function states1(){
	status=1;page=1;pages();load();unlock();
}
function states2(){
	status=2;page=1;pages();load();unlock();
}
function states3(){
	status=0;page=1;pages();load();unlock();
}
//解锁
function unlock(){
	$('.lists ul').html('');
	$('.dropload-down').hide();//底部加载时显示
	dropload.unlock();
    dropload.noData(false);
}
//点击区域加载
function load(){
	page = 1;
	var result = '';
	http.post('/mobile/desktop/billlist.html', {
		qyids: deptid,
		finish_status: status,
		pageNum: 1,
		pageSize: size
	}).done(function(data) {
	$('.nodata').hide();
	var arrLen = data.rows.length;
	if(arrLen > 0) {
		for(var i = 0; i < arrLen; i++) {
			result += '<li><div><p class="flow"><span>流水单号：' + data.rows[i].cols.bill_djhm + '</span><span>' +
				data.rows[i].cols.bill_create_date + '</span></p><h1><span>' + data.rows[i].cols.qy_name +
				'</span>' + data.rows[i].cols.creator_name + '</h1><h2 class="blue">' +
				data.rows[i].cols.website_url + '</h2><h3 class="addr-bul"><p>业主单位：</p><span>' + data.rows[i].cols.yezhu_name +
				'</span></h3><div class="bul-p"><p class="tel"><span>' + data.rows[i].cols.lxr_name +
				'</span><a href="tel:' + data.rows[i].cols.lxr_phone + '" class="blue">' + data.rows[i].cols.lxr_phone +
				'</a><i>|</i></p><p class="bul-time"><span>整改时限</span><span>' + data.rows[i].cols.bill_rectify_date.substr(0, 10) +
				'</span></p></div></div>' +
				'<button id="../bulletin-detail/bulletin-detail.html?bill_id=' + data.rows[i].cols.bill_id +
				'" onclick="clicked(this.id)" class="cli-btn"></button></li>';
		}

	}
	setTimeout(function() {
		$('.lists ul').html(result);
		btnclick();
		// 每次数据加载完，必须重置
		dropload.resetload();
		// 解锁loadDownFn里锁定的情况
		dropload.unlock();
		dropload.noData(false);
	}, 0);
	
	}).fail(function() {
		$('.nodata').show();
		// 即使加载出错，也得重置
		dropload.resetload();
	});
}
