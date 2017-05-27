/**
 * Created by 蒋鑫强 on 2017/5/3.
 */

(function () {

  var API_URL = 'http://192.168.1.27:8080';
  /**
   * 去除空值
   * @param data 请求数据
   * @param method 请求方法
   * @private
   */
  function _trimData(data, method) {
    data = data || {};
    for(var key in data){
      var v = data[key];
      if((v === '' && method === 'GET') || v === undefined){
        delete data[key];
      }
    }
    return data;
  }

  /**
   * @param url
   * @param data
   * @param method
   * @returns {*}
   * @private
   */
  var ajax = function(url, data, method){
    var dtd = $.Deferred();
    var param = _trimData(data, method);
    param.token = store.get('appToken');

    $.ajax(API_URL + url, {
      data: param,
      type: method,
      headers: {
        'Cache-Control': "no-cache"
      },
      success: function(data){
        var result = null;
        try{
          result = $.parseJSON(data);
        }catch(e){
          dtd.reject();
          console.error('请求地址: '+url+',请求参数:'+JSON.stringify(param)+',返回结果:' + JSON.stringify(data));
          console.error(e);
          layer.msg('系统报错！请联系管理员', { time: 2000 });
        }
        if(result){
          if(parseInt(result.status) !== 1){
            dtd.resolve(result.data);
          }else{
            layer.msg(result.msg, { time: 2000 });
            dtd.reject(result);
          }
        }else{
          dtd.resolve({});
        }
      }
    });

    return dtd.promise();
  };

    window.http = {
      /**
       * get 请求
       * @param url
       * @param data
       * @returns {*}
       */
      get: function(url, data) {
        return ajax(url, data, 'GET');
      },

      /**
       * post 请求
       * @param url
       * @param data
       * @returns {*}
       */
      post: function(url, data){
        return ajax(url, data, 'POST');
      },

      /**
       * put 请求
       * @param url
       * @param data
       * @returns {*}
       */
      put: function(url, data){
        return ajax(url, data, 'PUT');
      },

      /**
       * DELETE 请求
       * @param url
       * @param data
       * @returns {*}
       */
      delete: function(url, data){
        return ajax(url, data, 'DELETE');
      }
    };
})();
