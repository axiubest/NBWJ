// 页数
var page = 0;
// 每页展示10个
var size = 30;
var allpage = 0;
var total = 0;
var deptid = '';
var status = 1;
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
	http.post('/mobile/desktop/billlist.html', {
		qyids: deptid,
		finish_status: status,
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

		// 拼接HTML

		var result = '';
		http.post('/mobile/desktop/billlist.html', {
			qyids: deptid,
			finish_status: status,
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
			result += '<li><div><p class="flow"><span>流水单号：' + data.rows[i].cols.bill_djhm + '</span><span>' +
				data.rows[i].cols.bill_create_date + '</span></p><h1><span>' + data.rows[i].cols.qy_name +
				'</span>' + data.rows[i].cols.creator_name + '</h1><h2 class="blue"' +
				data.rows[i].cols.website_url + '</h2><h3 class="addr-bul"><p>业主单位：</p><span>' + data.rows[i].cols.yezhu_name +
				'</span></h3><div class="bul-p"><p class="tel"><span>' + data.rows[i].cols.lxr_name +
				'</span><a href="tel:' + data.rows[i].cols.lxr_phone + '" class="blue">' + data.rows[i].cols.lxr_phone +
				'</a><i>|</i></p><p class="bul-time"><span>整改时限</span><span>' + data.rows[i].cols.bill_rectify_date.substr(0, 10) +
				'</span></p></div></div>' +
				'<button id="../bulletin-detail/bulletin-detail.html?bill_id=' + data.rows[i].cols.bill_id +
				'" onclick="clicked(this.id)" class="cli-btn"></button></li>';
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
			btnclick();

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
	http.post('/mobile/desktop/billlist.html', {
		qyids: deptid,
		finish_status: status,
		pageNum: 1,
		pageSize: size,
		searchtext: schtext
	}).done(function(data) {
		var result = '';
		var arrLen = data.rows.length;
		if(arrLen <= 0) {
			$('.nodata').show();
		} else {
			$('.nodata').hide();
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
			$('.lists ul').html(result);
			btnclick();
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

