/**
 * author:申屠
 */
//概览高度
// var bodyheight=$(window).height();
// var viewheight=bodyheight-425;
//	$('.view').css("height", viewheight);

mui.init();
returnapp();

//双击退出应用
function returnapp(){
	mui.oldBack = mui.back;
	var backButtonPress = 0;
	mui.back = function(event) {
		backButtonPress++;
		if (backButtonPress > 1) {
			plus.runtime.quit();
		} else {
			plus.nativeUI.toast('再按一次退出应用');
		}
		setTimeout(function() {
			backButtonPress = 0;
		}, 1000);
		return false;
	};	
}
//右侧返回
function backto(){
mui.init({
        keyEventBind: {
            backbutton: true  //打开back按键监听
        }
    });
    mui.back = function () {
    	$('.rtn-text').click();
		returnapp();
    }
}
//左侧返回
function backLeft(){
mui.init({
        keyEventBind: {
            backbutton: true  //打开back按键监听
        }
    });
    mui.back = function () {
    	$('.bg').click();
		returnapp();
    }
}
//右侧菜单
$("#right").click(function(){
  var wid=parseInt($(".block-right").css('right'));
  if(wid>400){
  	$(".block-right").css('right','100%')
  }
  $(".block-right").animate({"right": "+=100%"},200);
//	backto();

});

//上方改过

(function () {
  var header_vm = new Vue({
    el: '.header',
    data: {
      hasUnreadMessage: false,
      hasUnreadDanger: false
    },

    methods: {
      showSlide: function () {
        $(".block-left,.unlogin").animate({"left": "+=55%"},200);
        $('.bg').fadeIn(300);
      }
    },

    mounted: function () {
      var that = this;
      http.post('/mobile/msg/unreadcount.html').done(function (ret) {
        that.hasUnreadMessage = ret.msg_unread_count > 0;
        that.hasUnreadDanger = ret.wxinfo_unread_count > 0;

        left_vm.hasUnreadMessage = ret.msg_unread_count > 0;
        left_vm.hasUnreadDanger = ret.wxinfo_unread_count > 0;
      });

      $('.bg').click(function(){   
        $('.bg').fadeOut(300);
        $(".block-left,.unlogin").animate({"left": "-=55%"},200);
      });
    }
  });


  //左边菜单
  var left_vm = new Vue({
    el: '.block-left',
    data: {
      user: {},
      hasUnreadMessage: false,
      hasUnreadDanger: false
    },

    methods: {
      logout: function () {
        store.set('appToken', '');
        store.set('userInfo', '');
        store.set('isautologin', 'no');
        clicked('../login/login.html');
      }
    },

    mounted: function () {
      var that = this;

      that.user = store.get('userInfo');
    }
  });


  //中间内容
  var content_vm = new Vue({
    el: '.content',

    data: {
      data: {
        lowVul: 0,
        middleVul: 0,
        highVul: 0,

        hiddenLink: 0,
        hiddenLinkCount: 0,
        dnsHijack: 0,
        dnsHijackCount: 0,
        usability: 0,
        usabilityCount: 0
      },

      circleLowVul: null,
      circleMiddleVul: null,
      circleHighVul: null,

      hiddenLinkWidth: 0,
      currentHiddenLinkWidth: 0,
      usabilityWidth: 0,
      currentUsabilityWidth: 0,
      dnsWidth: 0,
      currentDnsWidth: 0,

      homeOverview: {
        web: 0,
        unit: 0,
        alert: 0,
        disposal: 0
      },

      deptName: '',
      areaId: ''
    },

    methods: {
      updateData: function(data){
        this.data = data;		
        this.circleLowVul.setValue(Math.round(data.lowVulPct * 100));
        this.circleMiddleVul.setValue(Math.round(data.middleVulPct * 100));
        this.circleHighVul.setValue(Math.round(data.highVulPct * 100));
		if(data.lowVulPct==null){this.circleLowVul.setValue(0)}//无数据为0
		if(data.middleVulPct==null){this.circleMiddleVul.setValue(0)}
		if(data.highVulPct==null){this.circleHighVul.setValue(0)}
        this.currentHiddenLinkWidth = this.hiddenLinkWidth * data.hiddenLinkPct;
        this.currentUsabilityWidth = this.usabilityWidth * data.usabilityPct;
        this.currentDnsWidth = this.dnsWidth * data.dnsHijackPct;
      },

      updateHomeOverview: function(data){
        this.homeOverview = data;
      },

      loadSafetyOverview: function (callback) {
        var that = this;

        http.post('/mobile/home/safetyOverview.html', {deptName: this.deptName}).done(function (data) {
          that.updateData(data);
        }).always(function () {
          callback && callback();
        });
      },

      loadHomeOverview: function (callback) {
        var that = this;

        http.get('/mobile/home/overview.html', {areaId: this.areaId}).done(function (data) {
          that.updateHomeOverview(data);
        }).always(function () {
          callback && callback();
        });
      }
    },

    mounted: function () {
      var that = this;

      this.loadSafetyOverview();
      this.loadHomeOverview();

      //进度条
      this.circleLowVul = new CircleProgress(document.getElementById('circle1'), '#b885e2', '#60bcd1');
      this.circleMiddleVul = new CircleProgress(document.getElementById('circle2'), '#70d99e', '#52c3af');
      this.circleHighVul = new CircleProgress(document.getElementById('circle3'), '#fc8d58', '#ff2d49');
      this.hiddenLinkWidth = $('#scrollBar').width();
      this.usabilityWidth = $('#scrollBar2').width();
      this.dnsWidth = $('#scrollBar3').width();
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
          content_vm.loadSafetyOverview(function () {
            me.resetload();
          });

          content_vm.loadHomeOverview(function () {
            me.resetload();
          });

          right_vm.loadDepts();
        },
        threshold : 50
      });
    }
  });


  //右边菜单
  var right_vm = new Vue({
    el: '.block-right',
    data: {
      currentDept: {
        deptId: '',
        deptName: '全部'
      },

      depts: []
    },

    methods: {
      selectDept: function (dept) {
        this.currentDept = dept;
        $('#right').text(this.currentDept.deptName || '全部');
        this.back();
        content_vm.deptName = dept.deptName;
        content_vm.areaId = dept.deptId;
        content_vm.loadSafetyOverview();

        content_vm.loadHomeOverview();
      },

      back: function () {
        $(".block-right").animate({"right": "-=100%"},200);
        returnapp();
      },

      loadDepts: function () {
        var that = this;
        http.get('/mobile/home/area.html').done(function (data) {
          that.depts = data;
          store.set('depts', that.depts);
        });
      }
    },

    mounted: function () {
      this.loadDepts();
    }
  });
})();

