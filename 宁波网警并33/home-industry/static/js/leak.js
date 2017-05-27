/**
 * author:申屠
 */
//双击退出
mui.init();


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
//威胁弹窗
$('.slt-ct').click(function(){
    $('.bg2,.cont-threat').toggle();
    threatval();
});
$('.bg2').click(function(){
    $('.bg2,.cont-threat').hide()
});
//威胁取值
function threatval(){
	$('.bg,.bg3,.cont-area,.cont-tool').hide();
	$('.cont-threat li').click(function(){
		$(this).each(function(){
			$('.slt-ct span').text($(this).text());
			$('.bg2,.cont-threat').hide();
			//变色打钩
			$('.cont-threat li').removeClass('active');
			$(this).addClass('active');
		});	
		
	});	
}
//状态处理方法
function states1(){
	status=3;resetWord()
}
function states2(){
	status=4;resetWord()
}
function states3(){
	status=6;resetWord()
}
//威胁处理方法
function leak0(){
	level='';totals(deptid);resetWord()
}
function leak1(){
	level='高危';totals(deptid);resetWord()
}
function leak2(){
	level='中危';totals(deptid);resetWord()
}
function leak3(){
	level='低危';totals(deptid);resetWord()
}
//重置数据
function resetWord(){
	page=1;pages();load();unlock();
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
	http.get('/mobile/hyzg_vul/list.html', {
		qyid: deptid,
		vul_status: status,
		pageNum: page,
		pageSize: size,
		danger_level:level
	}).done(function(data) {
		console.log(data);
		$('.nodata').hide();
		var arrLen = data.rows.length;
		if(arrLen > 0) {
			for(var i = 0; i < arrLen; i++) {
				var toolstate = '';
				toolstate = data.rows[i].cols.vul_status;
				if(status == '3') {
					toolstate = '未处理';isHis=0;
				};
				if(status == '4') {
					toolstate = '处理中';isHis=0;
				};
				if(status == '6') {
					toolstate = '已完成';isHis=1;
				};
				result += '<li id="../../leak-detail/leak-detail.html?bill_id=' + data.rows[i].cols.vul_id +
						'&isHis='+isHis+
						'" onclick="clicked(this.id)"><div><h1>' + data.rows[i].cols.vul_name +
						'</h1><div class="state"><span>'+data.rows[i].cols.vul_danger_level+
						'</span><span>' + toolstate + '</span></div><br/>' +
						'<h2 class="log">'+data.rows[i].cols.vul_description+'</h2>'+
						'<h3 class="net">' + data.rows[i].cols.website_name + '</h3><h4>'+
						data.rows[i].cols.vul_happened_time+ '</h4></div></li>';						
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




//首页传值
var threat='';
function getQueryString(name) { 
var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
var r = window.location.search.substr(1).match(reg); 
if (r != null) return unescape(r[2]); return null; 
}
//威胁程度取值
threat=getQueryString("threat");
function leakIndex(){
	downloading();
	if(threat==1){
	$('.slt-ct span').text('低危');
	$('.cont-threat li').removeClass('active');
	$('.cont-threat li').eq(3).addClass('active');
	level='低危';status=3;totals(deptid);resetWord();
	$('.lists').hide();leak3();$('.lists').show(1200);
	}else if(threat==2){
		$('.slt-ct span').text('高危');
		$('.cont-threat li').removeClass('active');
		$('.cont-threat li').eq(1).addClass('active');
		level='高危';status=3;totals(deptid);resetWord();
		$('.lists').hide();leak1();$('.lists').show(1200);
	}else if(threat==3){
		$('.slt-ct span').text('中危');
		$('.cont-threat li').removeClass('active');
		$('.cont-threat li').eq(2).addClass('active');
		level='中危';status=3;totals(deptid);resetWord();
		$('.lists').hide();leak2();$('.lists').show(1200);
	}else{
		level='';
	}
	
}
leakIndex();

setTimeout(function(){$('.inner ul').show()},500);