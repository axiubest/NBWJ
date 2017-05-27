/**
 * Created by 蒋鑫强 on 2017/1/17.
 * 绑定全局事件
 */
(function () {
  var vm = new Vue();

  /**
   * 绑定监听事件
   * @param name 事件名称
   * @param callback 事件回调方法
   * @private
   */
  var _on = function (name, callback) {
    vm.$on(name, callback);
  };

  /**
   * 触发事件
   * @param name 事件名称
   * @param data 传递的参数
   * @private
   */
  var _trigger = function (name, data) {
    vm.$emit(name, data);
  };

  /**
   * 移除事件
   * @param name
   * @param callback
   * @private
   */
  var _off = function (name, callback) {
    vm.$off(name, callback);
  };

  /**
   * 只触发一次的事件
   * @param name
   * @param callback
   * @private
   */
  var _once = function (name, callback) {
    vm.$once(name, callback);
  };

  window.ev = {
    on: _on,

    trigger: _trigger,

    off: _off,

    once: _once
  };
})();
