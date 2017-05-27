/**
 * author:申屠
 */
mui.init();
//劫持地址
//打开浏览器
//function openUrl(url){
//mui.plusReady(function() {
//plus.runtime.openURL(url);
//});		
//}


(function () {
  var id = util.getQueryString("bill_id");
  var isHis = util.getQueryString("isHis");

  new Vue({
    el: '.info',

    data: {
      data: {
        stepList: []
      }
    },

    methods: {
//    openUrl: function (url) {
//      ui.plusReady(function() {
//        plus.runtime.openURL(url);
//      });
//    },
      goStep: function () {
        store.set('vulSteps', this.data.stepList);
        clicked('../tooling/tooling.html');
      }
    },

    mounted: function () {
      var that = this;
      http.post('/mobile/usability/detail.html', {usId: id, isHis: isHis}).done(function (data) {
        that.data = data;
        //修复时间显示
		if(data.usFinshedTime==null){
			$('#fixed').hide()
		}else{
			$('#fixed').show()
			}
      });
    }
  });
})();

