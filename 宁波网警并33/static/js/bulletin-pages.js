
  // 页数
    var page = 0;
    // 每页展示10个
    var size = 30;   
    var allpage=0;
    var total=0;
    var deptid='';
    var status=1;

    
//获取地区
http.get('/mobile/home/area.html').done(function(data) {
//	console.log(data);
	var result = '';
	var arrLen = data.length;
	if(arrLen > 0) {
		for(var i = 0; i < arrLen; i++) {
			result += '<li data-id="'+data[i].deptId+'">' + data[i].deptName + '</li>';
		}
	}
	$('.cont-area ul').append(result);
});
//获取页数
function pages(){
  http.post('/mobile/desktop/billlist.html', 
  {qyids:deptid,finish_status:status,pageSize:size}).done(function(data) {
  	console.log(data);
  	total=data.total;
  	allpage=Math.ceil(total/size) ;

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
				http.post('/mobile/desktop/billlist.html', {
					qyids: deptid,
					finish_status: status,
					pageNum: page,
					pageSize: size
				}).done(function(data) {
					console.log(data);
					$('.nodata').hide();
					var result = '';
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
						// 如果没有数据
					} else {
						// 锁定
						me.lock();
						// 无数据
						me.noData();
					}
					// 为了测试，延迟1秒加载
				
					// 插入数据到页面，放到最后面
					$('.lists ul').append(result);
					btnclick();
				
					// 每次数据插入，必须重置
					me.resetload();
				}).fail(function() {
					$('.nodata').show();
					// 即使加载出错，也得重置
					dropload.resetload();
				});


}

    });




