/**
 * author:申屠
 */


    // 高危漏洞
    $('#Tab0').dropload({
        scrollArea : window,
        domUp : {
            domClass   : 'dropload-up',
            domRefresh : '<div class="dropload-refresh">↓ 下拉刷新</div>',
            domUpdate  : '<div class="dropload-update">↑ 释放刷新</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中</div>'
        },
//更新方法
        loadUpFn : function(me){ 
    	setTimeout(function(){
        	load();// 每次数据插入，必须重置
            me.resetload();
          },500);
        },
        threshold : 50
    });
     // 暗链
    $('#Tab1').dropload({
        scrollArea : window,
        domUp : {
            domClass   : 'dropload-up',
            domRefresh : '<div class="dropload-refresh">↓ 下拉刷新</div>',
            domUpdate  : '<div class="dropload-update">↑ 释放刷新</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中</div>'
        },
//更新方法
        loadUpFn : function(me){
		setTimeout(function(){
        	load();// 每次数据插入，必须重置
            me.resetload();
          },500);
        },
        threshold : 50
    });
     // DNS劫持
    $('#Tab2').dropload({
        scrollArea : window,
        domUp : {
            domClass   : 'dropload-up',
            domRefresh : '<div class="dropload-refresh">↓ 下拉刷新</div>',
            domUpdate  : '<div class="dropload-update">↑ 释放刷新</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中</div>'
        },
//更新方法
        loadUpFn : function(me){
		setTimeout(function(){
        	load();// 每次数据插入，必须重置
            me.resetload();
          },500);
        },
        threshold : 50
    });

