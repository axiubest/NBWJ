//遍历写入颜色
function color(){
	$('.true:contains("是")').each(function(){
	$(this).css('color','#f9ac26');
	});
	$('.true:contains("否")').each(function(){
	$(this).css('color','#c000e3');
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

			load();unlock();
			
			 $('.bg,.cont-area').hide();
			 //变色打钩
			$('.cont-area li').removeClass('active');
			$(this).addClass('active');
		});	

	});	
}
//行业主管弹窗
$('.slt-ct').click(function(){
    $('.bg2,.cont-threat').toggle();
    threatval();
});
$('.bg2').click(function(){
    $('.bg2,.cont-threat').hide()
});
//行业主管取值
function threatval(){
	$('.bg,.bg3,.cont-area,.cont-tool').hide();
	$('.cont-threat li').click(function(){

			if($(this).text()=='全部'){
				$('.slt-ct span').text('行业主管');
				hyids='';
			}
			if($(this).text()!=='全部'){
				$('.slt-ct span').text($(this).text());
				hyids=$(this).attr('data-id');
			}
			page=1;pages();load();unlock();	
			
			$('.bg2,.cont-threat').hide();
			//变色打钩
			$('.cont-threat li').removeClass('active');
			$(this).addClass('active');

		
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
	pxh='vulcount';page=1;pages();load();unlock();	
}
function states2(){
	pxh='hiddenlinkcount';page=1;pages();load();unlock();
}
function states3(){
	pxh='dnshijackcount';page=1;pages();load();unlock();
}
function states4(){
	pxh='isbreakoff';page=1;pages();load();unlock();
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
	http.post('/mobile/desktop/queryWeblist.html', {
		qyids: deptid,
		hyids:hyids,
		pxh: pxh,
		pageNum: page,
		pageSize: size
	}).done(function(data) {
		console.log(data);
		$('.nodata').hide();
		var arrLen = data.rows.length;
		if(arrLen > 0) {
			for(var i = 0; i < arrLen; i++) {
				//是否可以通报
				var toolstate = '';
				toolstate = data.rows[i].cols.canNotice;
				if(toolstate == '1') {
					toolstate = ''
				};
				if(status == '0') {
					toolstate = 'none'
				};				
  			result += '<li><h2>' +data.rows[i].cols.hyname+ '<span>'+data.rows[i].cols.qyname+'</span></h2>' +
  				'<h1>' +''+ '</h1>' + '<h2>' +data.rows[i].cols.website_url+ '</h2>' +
  				'<p><span>漏洞</span>&nbsp;<span class="blue">' +data.rows[i].cols.vulcount+ 
  				'</span><span>暗链</span>&nbsp;<span class="red">'+data.rows[i].cols.hiddenlinkcount+ '</span>' +
  				'<span>DNS劫持</span>&nbsp;<span  class="green">' +data.rows[i].cols.dnshijackcount+ '</span>' +
  				'<span>中断</span>&nbsp;<span class="true">' +data.rows[i].cols.isbreakoff+ '</span>' +
  				'</p><h3 class="addr"><p>业主单位：</p><span>' +data.rows[i].cols.deptname+ 
  				'</span><button id="../monitor-detail/monitor-detail.html?bill_id='+data.rows[i].cols.website_id
  				+'" onclick="clicked(this.id)" class="' +toolstate+ '">通报</button></h3></li>	';	
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