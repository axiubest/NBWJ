/**
 * author:申屠
 */
$(function(){

    // dropload
    $('.content').dropload({
        scrollArea : window,
        domUp : {
            domClass   : 'dropload-up',
            domRefresh : '<div class="dropload-refresh">↓ 下拉刷新</div>',
            domUpdate  : '<div class="dropload-update">↑ 释放刷新</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中</div>'
        },
        domDown : {
            domClass   : 'dropload-down',
            domRefresh : '<div class="dropload-refresh">↑上拉加载更多-自定义内容</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中-自定义内容...</div>',
            domNoData  : '<div class="dropload-noData">暂无数据-自定义内容</div>'
        },
//更新方法
        loadUpFn : function(me){
          http.post('/mobile/home/safetyOverview.html').done(function (ret) {
            ev.trigger('updateData', ret);
            me.resetload();
          }).always(function () {
            me.resetload();
          });

          http.post('/mobile/home/safetyOverview.html').done(function (ret) {
            ev.trigger('updateData', ret);
            me.resetload();
          }).always(function () {
            me.resetload();
          });
        },
        threshold : 50
    });
});

