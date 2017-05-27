
  // 页数
    var page = 0;
    // 每页展示10个
    var size = 30;   
    var allpage=0;
    var total=0;
    var deptid='';
    var status=3;
    var isHis='';
    
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
//获取dns数量
function totals(deptid){
  http.get('/mobile/hyzg_dns/fixstatus.html',{qyid: deptid}).done(function(data) {
  	console.log(data);
  	$('#complete').text(data.status_6);
  	$('#tooling').text(data.status_4);
  	$('#untool').text(data.status_3);
  })	
}
totals('');

//获取页数
function pages(){
  http.get('/mobile/hyzg_dns/list.html', 
  {qyid: deptid,dnsHijack_status:status,pageNum:page,pageSize:size}).done(function(data) {
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
				http.get('/mobile/hyzg_dns/list.html', {
					qyid: deptid,
					dnsHijack_status: status,
					pageNum: page,
					pageSize: size
				}).done(function(data) {
					console.log(data);
					$('.nodata').hide();
					var arrLen = data.rows.length;
					if(arrLen > 0) {
						for(var i = 0; i < arrLen; i++) {
							var toolstate = '';
							toolstate = data.rows[i].cols.dns_status;
							if(toolstate == '3') {
								toolstate = '未处理';isHis=0;
							};
							if(toolstate == '4') {
								toolstate = '处理中';isHis=0;
							};
							if(toolstate == '6') {
								toolstate = '已完成';isHis=1;
							};
							result += '<li id="../../hijack-detail/hijack-detail.html?bill_id=' + data.rows[i].cols.dns_id +
							'&isHis='+isHis+
								'" onclick="clicked(this.id)"><div><h1>域名：' + data.rows[i].cols.website_url +
								'</h1><div class="state"><span>' + toolstate + '</span></div><br/>' +	
								'<h2 class="log">劫持地址：'+data.rows[i].cols.dns_hjdns+'</h2>'+
								'<h3 class="net">' + data.rows[i].cols.website_name + '</h3><h4>'+
								data.rows[i].cols.dns_happened_time+ '</h4></div></li>';					

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




