// 页数
var page = 0;
// 每页展示10个
var size = 30;
var allpage = 0;
var total = 0;
var deptid = '';
var schtext = '';
var hyids='';
var pxh='vulcount';
//获取地区
http.get('/mobile/hyzg_desktop/qylist.html').done(function(data) {
	//	console.log(data);
	var result = '';
	var arrLen = data.length;
	if(arrLen > 0) {
		for(var i = 0; i < arrLen; i++) {
			result += '<li data-id="' + data[i].deptId + '">' + data[i].deptName + '</li>';
		}
	}
	$('.cont-area ul').append(result);
});

//获取页数
function pages() {
 	http.post('/mobile/hyzg_desktop/weblist.html', {
		qyid: deptid,
		isPoint:hyids,
		sort: pxh,
		pageNum: page,
		pageSize: size,
		searchtext: schtext
	}).done(function(data) {
		console.log(data);
		total = data.total;
		allpage = Math.ceil(total / size);

	})
}

// dropload
var dropload2 = $('.inner').dropload({
	domDown: {
		domClass: 'dropload-down',
		domRefresh: '<div class="dropload-refresh"></div>',
		domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
		domNoData: '<div class="dropload-noData">暂无更多数据</div>'
	},
	loadDownFn: function(me) {
		$('.dropload-down').show();
		page++;
		var result = '';
 	http.post('/mobile/hyzg_desktop/weblist.html', {
		qyid: deptid,
		isPoint:hyids,
		sort: pxh,
		pageNum: page,
		pageSize: size,
		searchtext: schtext
		}).done(function(data) {
			console.log(data);
			$('.nodata').hide();
			var result = '';
			var arrLen = data.rows.length;
			if(arrLen>0) {
				for(var i = 0; i < arrLen; i++) {
					//是否可以通报
					var toolstate = '';
					toolstate = data.rows[i].cols.canNotice;
					if(toolstate == '1') {
						toolstate = ''
					};
					if(toolstate == '0') {
						toolstate = 'none'
					};
		
			result += '<li id="../monitor-detail/monitor-detail.html?bill_id='+data.rows[i].cols.website_id
  				+'" onclick="clicked(this.id)"><h2>' +data.rows[i].cols.hyname+ '<span>'+data.rows[i].cols.qyname+'</span></h2>' +
  				'<h1>' +''+ '</h1>' + '<h2>' +data.rows[i].cols.website_url+ '</h2>' +
  				'<p><span>漏洞</span>&nbsp;<span class="blue">' +data.rows[i].cols.vulcount+ 
  				'</span><span>暗链</span>&nbsp;<span class="red">'+data.rows[i].cols.hiddenlinkcount+ '</span>' +
  				'<span>DNS劫持</span>&nbsp;<span  class="green">' +data.rows[i].cols.dnshijackcount+ '</span>' +
  				'<span>中断</span>&nbsp;<span class="true">' +data.rows[i].cols.isbreakoff+ '</span>' +
  				'</p><h3 class="addr"><p>业主单位：</p><span>' +data.rows[i].cols.deptname+ 
  				'</span></h3></li>';
				}
				// 如果没有数据
			} else {
				// 锁定
				me.lock();
				// 无数据
				me.noData();
			}
			// 插入数据到页面，放到最后面
			$('.lists ul').append(result);
			color();

			// 每次数据插入，必须重置
			dropload2.resetload();
		}).fail(function() {
			$('.nodata').show();
			// 即使加载出错，也得重置
			dropload2.resetload();
		});

	}
});
//解锁
function unlock(){
	$('.lists ul').html('');
	$('.dropload-down').hide();//底部加载时显示
	dropload2.unlock();
    dropload2.noData(false);
}
//搜索
function searchData(pag) {
	$('.cont-area,.cont-tool,.cont-threat,.bg,.bg2,.bg3').hide();//隐藏下拉框
	schtext = $.trim($('.search').val());
	//失去焦点
	$('.search').blur();
	page = 1;
	unlock();//解锁
 	http.post('/mobile/hyzg_desktop/weblist.html', {
		qyid: deptid,
		isPoint:hyids,
		sort: pxh,
		pageNum: page,
		pageSize: size,
		searchtext: schtext
	}).done(function(data) {
		console.log(data);
		var result = '';
		var arrLen = data.rows.length;
		if(arrLen <= 0) {
			$('.nodata').show();
		} else {
			$('.nodata').hide();
			for(var i = 0; i < arrLen; i++) {
					//是否可以通报
					var toolstate = '';
					toolstate = data.rows[i].cols.canNotice;
					if(toolstate == '1') {
						toolstate = ''
					};
					if(toolstate == '0') {
						toolstate = 'none'
					};
		
			result += '<li id="../monitor-detail/monitor-detail.html?bill_id='+data.rows[i].cols.website_id
  				+'" onclick="clicked(this.id)"><h2>' +data.rows[i].cols.hyname+ '<span>'+data.rows[i].cols.qyname+'</span></h2>' +
  				'<h1>' +''+ '</h1>' + '<h2>' +data.rows[i].cols.website_url+ '</h2>' +
  				'<p><span>漏洞</span>&nbsp;<span class="blue">' +data.rows[i].cols.vulcount+ 
  				'</span><span>暗链</span>&nbsp;<span class="red">'+data.rows[i].cols.hiddenlinkcount+ '</span>' +
  				'<span>DNS劫持</span>&nbsp;<span  class="green">' +data.rows[i].cols.dnshijackcount+ '</span>' +
  				'<span>中断</span>&nbsp;<span class="true">' +data.rows[i].cols.isbreakoff+ '</span>' +
  				'</p><h3 class="addr"><p>业主单位：</p><span>' +data.rows[i].cols.deptname+ 
  				'</span></h3></li>';		
			}
			$('.lists ul').html(result);
			color();
			// 每次数据加载完，必须重置
			dropload2.resetload();			
			// 解锁loadDownFn里锁定的情况
			dropload2.unlock();
			dropload2.noData(false);

		}

	}).fail(function() {
		$('.nodata').show();
		// 即使加载出错，也得重置
		dropload2.resetload();	
	});

}

