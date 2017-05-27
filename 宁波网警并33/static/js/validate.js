/**
 * author:申屠
 */
var homes='';
homes=getQueryString("home");
var app1=new Vue({
    el: "#info",
    data: {
    	user_phone:""
    }
})
var phone='';
//jquery加载数据
function load(){	
//获取数据
http.post('/mobile/home_getuserinfo.html').done(function(data) {
//	console.log(data);
phone=data.user_phone;
var mtel = data.user_phone.substr(0, 3) + '****' + data.user_phone.substr(7); 
app1.user_phone=mtel;


});

}
load();

//验证码
mui.init();
//获取参数
var urlid='';
urlid=getQueryString("urlid");


var InterValObj; //timer变量，控制时间
var count = 60; //间隔函数，1秒执行
var curCount;//当前剩余秒数  
var code = ""; //验证码  
var codeLength = 6;//验证码长度  
function sendMessage() {  	
jishi();	
//修改手机
if(urlid == 1) {
	http.post('/mobile/getsmscode.html', {product: '手机号'}).done(function(data) {
	console.log(data);
	});

}
//跳转修改密码
if(urlid == 2) {
	http.post('/mobile/getsmscode.html', {
		product: '用户密码'
	}).done(function(data) {
		console.log(data);
	});
	}
}  

//倒计时
function SetRemainTime() {  
    if (curCount == 0) {                  
        window.clearInterval(InterValObj);//停止计时器  
        $("#btnSendCode").removeAttr("disabled");//启用按钮  
        $("#btnSendCode").val("重新发送");  
        code = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效      
    }  
    else {  
        
        $("#btnSendCode").val(curCount-1 + "秒后重发");  
        curCount--;  
    }  
}  

function jishi(){
    curCount = count;   
//验证手机号码
    //产生验证码  
    for (var i = 0; i < codeLength; i++) {  
        code += parseInt(Math.random() * 9).toString();  
    }  
    //设置button效果，开始计时  
    $("#btnSendCode").attr("disabled", "true");  
    $("#btnSendCode").val(curCount + "秒后重发");  
    InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次  

}






//输入变色
function color(){		
	if($.trim($('#checkCode').val())!==''){
$('.save').css('background','#0d86ff').css('pointer-events','all');
	}
	if($.trim($('#checkCode').val())==''){
		$('.save').css('background','#ccc').css('pointer-events','none');
	}　
}
$('#checkCode').click(function(){
	setInterval(color,50);
})

//下一步验证
function save(){

	//跳转修改手机
	if(urlid == 1) {
		http.post('/mobile/check_smscode.html', {
			code: $('#checkCode').val()
		}).done(function(data) {
			console.log(data);
			if(data.res=='ok'){
				var pwdUrl='../tel/tel.html?phone='+phone+'&code='+$('#checkCode').val()+'&home='+homes;
				clicked(pwdUrl);
			}else{
				layer.msg('验证码错误!', { time: 2000 });
			}
		}).fail(function() {
 			layer.msg('验证码错误!', { time: 2000 });
  		});
	}

	//跳转修改密码
	if(urlid == 2) {
		http.post('/mobile/check_smscode.html', {
			code: $('#checkCode').val()
		}).done(function(data) {
			console.log(data);
			if(data.res=='ok'){
				var pwdUrl='../pwd/pwd.html?phone='+phone+'&code='+$('#checkCode').val()+'&home='+homes;
				clicked(pwdUrl);
			}else{
				layer.msg('验证码错误!', { time: 2000 });
			}
		}).fail(function() {
 			layer.msg('验证码错误!', { time: 2000 });
  		});

	}
}



//var token=localStorage.getItem("appToken");//token
////token=token.replace(/\"/g,"");	
//$.ajax({
//  type: 'post',
//  url: 'http://192.168.1.27:8080/mobile/getsmscode.html',
//  data:{token:token,product:'用户密码'},
//  success: function(data){
//	console.log(data);
//  }
//});
//http.post('/mobile/getsmscode.html', {product: '用户密码'}).done(function(data) {
//	console.log(data);
//	});
