/**
 * author:申屠
 */
mui.init();
//打开浏览器
//function openUrl(url){
//mui.plusReady(function() {
//plus.runtime.openURL(url);
//});		
//}
(function () {
var id = util.getQueryString("bill_id");
var isHis = util.getQueryString("isHis");

var app1=new Vue({
    el: '.info',

    data: {
      data: {
        stepList: [],

        data: {}
      }
    },

    methods: {
//    openUrl: function (url) {
//      ui.plusReady(function() {
//        plus.runtime.openURL(url);
//      });
//    },

      goDesc: function () {
        store.set('pageContent', this.data.data.vulDescription);
        clicked('../leak-desc/leak-desc.html');
      },

      goSugest: function () {
        store.set('pageContent', this.data.data.vulSuggest);
        clicked('../leak-advice/leak-advice.html');
      },

      goStep: function () {
        store.set('vulSteps', this.data.stepList);
        clicked('../tooling/tooling.html');
      }
    },

    mounted: function () {
      var that = this;
      http.post('/mobile/dns/detail.html', {dnsId: id, isHis: isHis}).done(function (data) {      
       that.data = data;console.log(data);
      });
    }
});
})();

//http.post('/mobile/dns/detail.html', {dnsId: '130', isHis: '1'}).done(function (data) {      
//     console.log(data);
//    });