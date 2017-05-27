/**
 * author:申屠
 */
(function () {

  var vm = new Vue({
    el: '.info',

    data: {
      helpMsg: ''
    }
  });

  http.post('/mobile/login_help.html').done(function (ret) {
    vm.helpMsg = ret.helpstr;
  });

})();
