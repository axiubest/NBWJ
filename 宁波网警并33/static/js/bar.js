$(document).ready(function (e) {
    //设置最大值
    ScrollBar.maxValue = 100;
    //初始化
    ScrollBar.Initialize();
    //设置最大值
    ProgressBar.maxValue = 100;
    //设置当前刻度
    var index = 0;
});
var ScrollBar = {
    value: 25,
    maxValue: 100,
    step: 1,
    currentX: 0,
    Initialize: function () {
        if (this.value > this.maxValue) {
            alert("给定当前值大于了最大值");
            return;
        }
        this.GetValue();
        $("#scroll_Track").css("width", this.currentX + 2 + "px");
        $("#scroll_Thumb").css("margin-left", this.currentX + "px");
        $("#scrollBarTxt").html(ScrollBar.value + "/" + ScrollBar.maxValue);
    },
    GetValue: function () {
        this.currentX = $("#scrollBar").width() * (this.value / this.maxValue);
    }
}
var ProgressBar = {
    maxValue: 100,
    value: 20,
    SetValue: function (aValue) {
        this.value = aValue;
        if (this.value >= this.maxValue) this.value = this.maxValue;
        if (this.value <= 0) this.value = 0;
    }
}
//中断数
$(document).ready(function (e) {
    //设置最大值
    ScrollBar2.maxValue = 100;
    //初始化
    ScrollBar2.Initialize();
    //设置最大值
    ProgressBar2.maxValue = 100;
    //设置当前刻度
    var index2 = 0;
});
var ScrollBar2 = {
    value: 0,
    maxValue: 100,
    step: 1,
    currentX: 0,
    Initialize: function () {
        if (this.value > this.maxValue) {
            alert("给定当前值大于了最大值");
            return;
        }
        this.GetValue();
        $("#scroll_Track2").css("width", this.currentX + 2 + "px");
        $("#scroll_Thumb2").css("margin-left", this.currentX + "px");
        $("#scrollBarTxt2").html(ScrollBar.value + "/" + ScrollBar.maxValue);
    },
    GetValue: function () {
        this.currentX = $("#scrollBar2").width() * (this.value / this.maxValue);
    }
}
var ProgressBar2 = {
    maxValue: 100,
    value: 20,
    SetValue: function (aValue) {
        this.value = aValue;
        if (this.value >= this.maxValue) this.value = this.maxValue;
        if (this.value <= 0) this.value = 0;
    }
}
//劫持数
$(document).ready(function (e) {
    //设置最大值
    ScrollBar3.maxValue = 100;
    //初始化
    ScrollBar3.Initialize();
    //设置最大值
    ProgressBar3.maxValue = 100;
    //设置当前刻度
    var index3 = 0;
});
var ScrollBar3 = {
    value: 55,
    maxValue: 100,
    step: 1,
    currentX: 0,
    Initialize: function () {
        if (this.value > this.maxValue) {
            alert("给定当前值大于了最大值");
            return;
        }
        this.GetValue();
        $("#scroll_Track3").css("width", this.currentX + 2 + "px");
        $("#scroll_Thumb3").css("margin-left", this.currentX + "px");
        $("#scrollBarTxt3").html(ScrollBar.value + "/" + ScrollBar.maxValue);
    },
    GetValue: function () {
        this.currentX = $("#scrollBar3").width() * (this.value / this.maxValue);
    }
}
var ProgressBar3 = {
    maxValue: 100,
    value: 20,
    SetValue: function (aValue) {
        this.value = aValue;
        if (this.value >= this.maxValue) this.value = this.maxValue;
        if (this.value <= 0) this.value = 0;
    }
}
