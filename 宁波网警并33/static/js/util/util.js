/**
 * Created by 蒋鑫强 on 2017/5/4.
 */
(function () {
  window.util = {
    getQueryString: function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]); return null;
    },

    getType: function(obj){
      return Object.prototype.toString.call(obj);
    },
    // 判断变量是否为Date对象
    isDate: function(date){
      return this.getType(date) === '[object Date]';
    }
};
})();

Date.prototype.format = function(format){
  var o = {
    // 月份
    'M+': this.getMonth() + 1,
    // 日
    'd+': this.getDate(),
    // 小时
    'h+': this.getHours(),
    // 分
    'm+': this.getMinutes(),
    // 秒
    's+': this.getSeconds(),
    // 季度
    'q+': Math.floor((this.getMonth() + 3) / 3),
    // 毫秒
    'S': this.getMilliseconds()
  };

  if(/(y+)/.test(format)){
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  for(var key in o){
    if(new RegExp('(' + key + ')').test(format)){
      format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[key]) : (('00' + o[key]).substr(('' + o[key]).length)));
    }
  }

  return format;
};

Vue.filter('date', function (value, format) {
  if(util.isDate(value)){
    return value.format(format);
  }else{
    if(value){
      return new Date(value).format(format);
    }else{
      return '';
    }
  }
});
