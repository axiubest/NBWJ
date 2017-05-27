/**
 * author:申屠
 */
$(function(){

    // 高危漏洞
    $('#Tab0 .lists').dropload({
        scrollArea : window,
        domUp : {
            domClass   : 'dropload-up',
            domRefresh : '<div class="dropload-refresh">↓ 下拉刷新</div>',
            domUpdate  : '<div class="dropload-update">↑ 释放刷新</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中</div>'
        },
//更新方法
        loadUpFn : function(me){
        	loadData();me.resetload();
        },
        threshold : 50
    });
     // 暗链
    $('#Tab1 .lists').dropload({
        scrollArea : window,
        domUp : {
            domClass   : 'dropload-up',
            domRefresh : '<div class="dropload-refresh">↓ 下拉刷新</div>',
            domUpdate  : '<div class="dropload-update">↑ 释放刷新</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中</div>'
        },
//更新方法
        loadUpFn : function(me){
           loadData();me.resetload();
        },
        threshold : 50
    });
     // DNS劫持
    $('#Tab2 .lists').dropload({
        scrollArea : window,
        domUp : {
            domClass   : 'dropload-up',
            domRefresh : '<div class="dropload-refresh">↓ 下拉刷新</div>',
            domUpdate  : '<div class="dropload-update">↑ 释放刷新</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中</div>'
        },
//更新方法
        loadUpFn : function(me){
            loadData();me.resetload();
        },
        threshold : 50
    });
     // 中断
    $('#Tab3 .lists').dropload({
        scrollArea : window,
        domUp : {
            domClass   : 'dropload-up',
            domRefresh : '<div class="dropload-refresh">↓ 下拉刷新</div>',
            domUpdate  : '<div class="dropload-update">↑ 释放刷新</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中</div>'
        },
//更新方法
        loadUpFn : function(me){
           setTimeout(function(){loadData();me.resetload(); },500);
        },
        threshold : 50
    });
});

