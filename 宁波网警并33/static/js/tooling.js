/**
 * author:申屠
 */

(function () {
  new Vue({
    el: '.info-main',

    data: {
      steps: store.get('vulSteps')
    },

    mounted: function () {
      var h = $(".info-main ul li:first-child").height()/2;
      //<!--第一个li高度的一半-->
      var h1 = $(".info-main ul li:last-child").height()/2;
      //<!--最后一个li高度的一半-->
      $(".line").css("top",h);
      $(".line").height($(".info-main").height()-h1-h);
    }
  });
})();

