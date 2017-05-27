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


//遍历写入颜色
function color(){
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
			totals(deptid)
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

//处理方法
function states1(){
	status=3;page=1;pages();load();unlock();	
}
function states2(){
	status=4;page=1;pages();load();unlock();
}
function states3(){
	status=6;page=1;pages();load();unlock();
}
//按钮跳转
function btnclick(){
	$('.bul ul li>div .flow,.bul ul li>div h1,.bul ul li>div h3,.bul ul li>div .bul-time').click(function() {
		$(this).each(function() {
			$(this).parent().siblings('.cli-btn').click();
			$(this).parent().siblings('.cli-btn').focus();
		});
	
	});
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
	page = 1; //页数清零
	var result = '';
	http.get('/mobile/hyzg_hiddenlink/list.html', {
		qyid: deptid,
		hiddenLink_status: status,
		pageNum: page,
		pageSize: size
	}).done(function(data) {
		console.log(data);
		$('.nodata').hide();
		var arrLen = data.rows.length;
		if(arrLen > 0) {
			for(var i = 0; i < arrLen; i++) {
				var toolstate = '';
				toolstate = data.rows[i].cols.hid_status;
				if(toolstate == '3') {
					toolstate = '未处理'
				};
				if(toolstate == '4') {
					toolstate = '处理中'
				};
				if(toolstate == '6') {
					toolstate = '已处理'
				};
				result += '<li id="../../dark-detail/dark-detail.html?bill_id=' + data.rows[i].cols.hid_id +
				'" onclick="clicked(this.id)"><div><h1>' + data.rows[i].cols.hid_pageurl +
				'</h1><div class="state"><span>' + toolstate + '</span></div><br/>' +
				'<h2 class="log">类型：' + data.rows[i].cols.hid_type + '</h2>' +
				'<h3 class="net">' + data.rows[i].cols.website_name + '</h3><h4>'+
				data.rows[i].cols.hid_happened_time
				+ '</h4></div></li>';	
			}
			// 如果没有数据
		}
		setTimeout(function() {	
			$('.lists ul').html(result);
			color();
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
