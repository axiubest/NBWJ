/**
 * author:申屠
 */
mui.init();


////忽略js报错
// function killerrors() { return true; }
//window.onerror = killerrors;

(function () {
  var id = util.getQueryString("bill_id");
  var isHis = util.getQueryString("isHis");

  new Vue({
    el: '.info',

    data: {
      data: {
        stepList: [],

        vul: {}
      }
    },

    methods: {
//    openUrl: function (url) {
//      ui.plusReady(function() {
//        plus.runtime.openURL(url);
//      });
//    },
//mui.plusReady(function() {
//plus.runtime.openURL(url);
//});	
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
      http.post('/mobile/hiddenLink/detail.html', {hiddenLinkId: id, isHis: isHis}).done(function (data) {
        that.data = data;
      });
    }
  });
})();


//打开浏览器
function openUrl(url){
mui.plusReady(function() {
plus.runtime.openURL(url);
});		
}

//图片放大
mui.previewImage();