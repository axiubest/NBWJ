// 页数
var page = 0;
// 每页展示10个
var size = 30;
var allpage = 0;
var total = 0;
var deptid = '';
var status = 3;
var schtext = '';

//获取地区
http.get('/mobile/home/area.html').done(function(data) {
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
	http.get('/mobile/hiddenLink/list.html', {
		qyid: deptid,
		hiddenLink_status: status,
		pageNum: page,
		pageSize: size,
		webName: schtext
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
		http.get('/mobile/hiddenLink/list.html', {
		qyid: deptid,
		hiddenLink_status: status,
		pageNum: page,
		pageSize: size,
		webName: schtext
		}).done(function(data) {
			console.log(data);
			$('.nodata').hide();
			var result = '';
			var arrLen = data.rows.length;
			if(arrLen>0) {
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
					result += '<li id="../dark-detail/dark-detail.html?bill_id=' + data.rows[i].cols.hid_id +
						'" onclick="clicked(this.id)"><div><h1>' + data.rows[i].cols.hid_pageurl +
						'</h1><div class="state"><span>' + toolstate + '</span></div><br/>' +
						'<h2 class="log">类型：' + data.rows[i].cols.hid_type + '</h2>' +
						'<h3 class="net">' + data.rows[i].cols.website_name + '</h3><h4>'+
						data.rows[i].cols.hid_happened_time
						+ '</h4></div></li>';			
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
	http.get('/mobile/hiddenLink/list.html', {
		qyid: deptid,
		hiddenLink_status: status,
		pageNum: page,
		pageSize: size,
		webName: schtext
	}).done(function(data) {
		console.log(data);
		var result = '';
		var arrLen = data.rows.length;
		if(arrLen <= 0) {
			$('.nodata').show();
		} else {
			$('.nodata').hide();
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
				result += '<li id="../dark-detail/dark-detail.html?bill_id=' + data.rows[i].cols.hid_id +
					'" onclick="clicked(this.id)"><div><h1>' + data.rows[i].cols.hid_pageurl +
					'</h1><div class="state"><span>' + toolstate + '</span></div><br/>' +
					'<h2 class="log">类型：' + data.rows[i].cols.hid_type + '</h2>' +
					'<h3 class="net">' + data.rows[i].cols.website_name + '</h3><h4>'+
					data.rows[i].cols.hid_happened_time
					+ '</h4></div></li>';				
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

