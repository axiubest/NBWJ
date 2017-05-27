
  // 页数
    var page = 0;
    // 每页展示10个
    var size = 30;   
    var allpage=0;
    var total=0;
    var deptid='';
    var hyids='0';
    var pxh='vulcount';
//获取地区
http.get('/mobile/hyzg_desktop/qylist.html').done(function(data) {
//	console.log(data);
	var result = '';
	var arrLen = data.length;
	if(arrLen > 0) {
		for(var i = 0; i < arrLen; i++) {
			result += '<li data-id="'+data[i].deptId+'" id="a'+i+'">' + data[i].deptName + '</li>';
		}
	}
	$('.cont-area ul').append(result);
});


//获取页数
function pages(){
  http.post('/mobile/hyzg_desktop/weblist.html', {
		qyid: deptid,
		isPoint:hyids,
		sort: pxh,
		pageNum: page,
		pageSize: size
		}).done(function(data) {
  	console.log(data);
  	total = data.total;
  	allpage = Math.ceil(total / size);
  })
}
pages();

    // dropload
    var dropload = $('.inner').dropload({
        domUp : {
            domClass   : 'dropload-up',
            domRefresh : '<div class="dropload-refresh">↓下拉刷新</div>',
            domUpdate  : '<div class="dropload-update">↑释放更新</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
        },
        domDown : {
            domClass   : 'dropload-down',
            domRefresh : '<div class="dropload-refresh">加载更多</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
            domNoData  : '<div class="dropload-noData">暂无更多数据</div>'
        },
        loadUpFn : function(me){
					load();
        },
        loadDownFn : function(me){
				$('.dropload-down').show();
				page++;
				
				// 拼接HTML
				
				var result = '';
				  http.post('/mobile/hyzg_desktop/weblist.html', {
					qyid: deptid,
					isPoint:hyids,
					sort: pxh,
					pageNum: page,
					pageSize: size
				}).done(function(data) {
					$('.nodata').hide();
					var arrLen = data.rows.length;
					if(arrLen > 0) {
						for(var i = 0; i < arrLen; i++) {			
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
						$('.lists ul').append(result);
						color();
						// 如果没有数据
					} else {
						// 锁定
						me.lock();
						// 无数据
						me.noData();
				
					}
				
					// 每次数据插入，必须重置
					me.resetload();
				}).fail(function() {
					$('.nodata').show();
					// 即使加载出错，也得重置
					dropload.resetload();
				});
}

    });




