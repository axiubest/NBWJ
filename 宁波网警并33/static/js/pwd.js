/**
 * author:申屠
 */
mui.init();

var code='';
code=getQueryString("code");


//保存变色
function color(){		
	if($('#pwd').val()!==''||$('#aftpwd').val()!==''){
$('.save').css('background','#0d86ff').css('pointer-events','all');
	}
	if($('#pwd').val()==''||$('#aftpwd').val()==''){
		$('.save').css('background','#ccc').css('pointer-events','none');
	}　
}

$('#pwd').click(function(){
	setInterval(color,50);
})
//保存验证
$('.save').click(function(){
complete()
})




//验证2次输入密码
//function complete(){
//	var before=$('#pwd').val();
//	var after=$('#aftpwd').val();
//	if(after!==before){layer.msg('您两次输入的密码不一致!',{time:2000});}
//	else if(before.length<6 ){  
//      layer.msg('密码长度不得少于6个字符！',{time:2000});
//	}else if(after.length>16 ){
//      layer.msg('密码长度不得多于16个字符！',{time:2000});
//	}else{
//		
//		CheckPassWord(after)
//	}
//
//}

//验证2次输入密码
function complete(){
	var before=$('#pwd').val();
	var after=$('#aftpwd').val();
	if(after.length<6 ){  
        layer.msg('新密码长度不得少于6字符！',{time:2000});
	}else if(after.length>16 ){
        layer.msg('密码长度不得多于16字符！',{time:2000});
	}else{
		
		CheckPassWord(after)
	}

}




//ajax方法
function CheckPassWord(password) {


//alert($('#pwd').val());alert($('#aftpwd').val());alert(code);
//http.post('/mobile/password/modify_withcode.html', {
//	oldPassword: $('#pwd').val(),newPassword: $('#aftpwd').val(),code:code
//}).done(function(data) {
//	console.log(data);
//	if(data.res=='good'){
//		layer.alert('修改密码成功，请重新登录', {
//			title:'安全提示',
//		  skin: 'layui-layer-lan' //样式类名
//		  ,closeBtn: 0
//		}, function(){
//		clicked('../login/login.html?pwd=&user=');	
//		layer.msg('跳转登录！',{time:2000});
//		});
//	}else{
//		layer.msg('请输入正确的原密码!', { time: 2000 });
//	}
//	
//});	
var token=localStorage.getItem("appToken");//token
token=token.replace(/\"/g,"");
var urls=ipurl+'/mobile/password/modify_withcode.html';//在common.js里布局
$.ajax({
    type: 'post',
    url: urls,
    data:{token:token,oldPassword: $('#pwd').val(),newPassword: $('#aftpwd').val(),code:code},
    success: function(data){
		console.log(data);
		var status='';
		status=JSON.parse(data).status;
//		alert(JSON.parse(data).status);
		if(status=='0'){
		layer.alert('修改密码成功，请重新登录', {
			title:'安全提示',
		  skin: 'layui-layer-lan' //样式类名
		  ,closeBtn: 0
			}, function(){
			clicked('../login/login.html?pwd=&user=');	
			layer.msg('跳转登录！',{time:2000});
			});
		}
		else if(status=='2'){
			layer.msg('密码不符合规则!', { time: 2000 });
		}else if(status=='1'){
			layer.msg('请输入正确的原密码!', { time: 2000 });
		}
    }
});
}



//成功的
//var token=localStorage.getItem("appToken");//token
//token=token.replace(/\"/g,"");
//$.ajax({
//  type: 'post',
//  url: 'http://192.168.1.27:8080/mobile/password/modify_withcode.html',
//  data:{token:token,code:'825996',oldPassword: '6Qg@2017',newPassword:'6Qg@2017'},
//  success: function(data){
//	console.log(data)
//  }
//});

