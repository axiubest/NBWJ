/**
 * author:申屠
 */
mui.init();

(function () {
  new Vue({
    el: '.info',

    data: {
      content: store.get('pageContent')
    }
  });
})();
