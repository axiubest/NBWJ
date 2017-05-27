/**
 * author:申屠
 */
// 页数
    var page = 0;
    // 每页展示10个
    var size = 30;   
    var allpage=0;
    var total=0;
//获取页数
function pages(){
  http.post('/mobile/msg/listdata.html', 
  {pageSize:size}).done(function(data) {
  	console.log(data);
  	total=data.total;
  	allpage=Math.ceil(total/size) ;
  	if(allpage==0){$('.nodata').show();}else{
  		load()
  	}

  })	
}
pages();
  

function load(){
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

	  http.post('/mobile/msg/listdata.html', 
{pageNum:1,pageSize:size}).done(function(data) {
	console.log(data);
	$('.nodata').hide();
	var result = '';
	var arrLen = data.rows.length;
for(var i = 0; i < arrlen; i++) {
	result += '<li>' + '<span style="display:none">' + data.rows[i].cols.bus_id + '</span>' +
		'<h1>' + data.rows[i].cols.title + '</h1><h2>' + data.rows[i].cols.msg_create_date +
		'</h2><p></span>' +JSON.parse(data.rows[i].cols.msg_content).display + '</span></p></li>';

	// 为了测试，延迟1秒加载
}
		$('.lists ul').html(result);
		// 每次数据加载完，必须重置
		dropload.resetload();
		page = 1; //页数清零
		// 解锁loadDownFn里锁定的情况
		me.unlock();
		me.noData(false);
}).fail(function() {
	$('.nodata').show();
	// 即使加载出错，也得重置
	dropload.resetload();
});
        },
        loadDownFn : function(me){

page++;

	// 拼接HTML

var result = '';
http.post('/mobile/msg/listdata.html', 
{pageNum:page,pageSize:size}).done(function(data) {
	console.log(data);
	$('.nodata').hide();
	var result = '';
	var arrLen = data.rows.length;
		if(page<=allpage){     	
for(var i = 0; i < data.rows.length; i++) {
	result += '<li>' + '<span style="display:none">' + data.rows[i].cols.bus_id + '</span>' +
		'<h1>' + data.rows[i].cols.title + '</h1><h2>' + data.rows[i].cols.msg_create_date +
		'</h2><p></span>' +JSON.parse(data.rows[i].cols.msg_content).display + '</span></p></li>';

}
        // 如果没有数据
        }else{
//      	$('.nodata').show();
            // 锁定
            me.lock();
            // 无数据
            me.noData();
        }
        // 为了测试，延迟1秒加载

            // 插入数据到页面，放到最后面
            $('.lists ul').append(result);

            // 每次数据插入，必须重置
            me.resetload();
}).fail(function() {
	$('.nodata').show();
	// 即使加载出错，也得重置
	dropload.resetload();
});



}

    });
}
