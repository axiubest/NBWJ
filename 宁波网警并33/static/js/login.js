 //保存变色
function color(){
	if($('#email').val()!==''||$('#password').val()!==''){
$('.login').css('color','#fff').css('pointer-events','all');
	}
	if($('#email').val()==''||$('#password').val()==''){
		$('.login').css('color','#cecece').css('pointer-events','none');
	}　
}


setInterval(color,100);

//帮助
$('.btn').click(function(){
	clicked('../help/help.html');$('.btn').css('outline-color','rgba(0,0,0,0)')
})
//初始化禁止登录
$('.login').css('color','#cecece').css('pointer-events','none');
//登录验证

$('.content_login button').click(function(){
// 	//跳转首页
// clicked2('../index/index.html?userid=jayshentu&name=3111')
//
// 	//网警
//
// 	if($('#user').val() == "1"){
// 		clicked2('../index/index.html?userid=jayshentu&name=3111')
// 	}
// 	//业主执行人
// 	if($('#user').val() == "2"){
// 		clicked2('../index/index.html?userid=jayshentu&name=3111')
// 	}
// 	//行业主管
// 	if($('#user').val() == "3"){
// 		clicked2('../index/index.html?userid=jayshentu&name=3111')
// 	}
// 	//业主单位
// 	if($('#user').val() == "4"){
// 		clicked2('../index/index.html?userid=jayshentu&name=3111')
// 	}
login();
});
 
//本地存储  	
 $(document).ready(function() {
 	//读取 localStage 本地存储，填充用户名密码,如果自动登录有值直接跳转；    
 	//相反，跳转到本页面,等待登陆处理    
 	var storage = window.localStorage;
 	var getEmail = storage["email"];
 	var getPwd = storage["password"];

 	var getisautologin = storage["isautologin"];

 		if("yes" == getisautologin) {
 			if(getEmail !== "" && getEmail !== undefined && getPwd !== "" && getPwd !== undefined)
 			$("#email").val(getEmail);
 			$("#password").val(getPwd);
 			//加载时显示：正在自动登录  
	    http.post('/mobile/login.html', {username: getEmail, password: getPwd}).done(function (ret) {
	      var appToken = ret.token;
	      store.set('appToken', appToken);
	      http.post('/mobile/home_getuserinfo.html').done(function (ret1) {
	      	document.getElementById("isAutoLoginId").checked = true;
	      	storage["isautologin"] = "yes";
	        store.set('userInfo', ret1);
	        if(ret1.user_type.indexOf('主管')!=-1){
					clicked('../home-industry/mine/mine.html');
		}else if(ret1.user_type.indexOf('负责')!=-1){
			clicked('../home-owner/index/index.html');
		}else if(ret1.user_type.indexOf('领导')!=-1){
			clicked('../index/index.html');
		}
	      });
	    });

 		}
 	else {
 		$("#email").val(getEmail);
 		$("#password").val(getPwd);
 		document.getElementById("isRemberPwdId").checked = true;
 	}

 });

 function login() {
	var userEmail = $("#email").val();
 	var userPassWord = $("#password").val();
 	var storage = window.localStorage;
 	//记住密码    
 	if(document.getElementById("isRemberPwdId").checked) {
 		//存储到loaclStage      
 		storage["email"] = userEmail;
 		storage["password"] = userPassWord;

 		
 	} else {
 		storage["email"] = userEmail;

 	}
 	//下次自动登录    
 	if(document.getElementById("isAutoLoginId").checked) {
 		//存储到loaclStage      
 		storage["email"] = userEmail;
 		storage["password"] = userPassWord;

 		storage["isautologin"] = "yes";
 	} else {
 		storage["email"] = userEmail;
 		storage["isautologin"] = "no";
 	}

    http.post('/mobile/login.html', {username: $("#email").val(), password: $("#password").val()}).done(function (ret) {
      var appToken = ret.token;
      store.set('appToken', appToken);
      http.post('/mobile/home_getuserinfo.html').done(function (ret1) {
      	document.getElementById("isAutoLoginId").checked = true;
      	storage["isautologin"] = "yes";
        store.set('userInfo', ret1);
        if(ret1.user_type.indexOf('主管')!=-1){
					clicked('../home-industry/mine/mine.html');
		}else if(ret1.user_type.indexOf('负责')!=-1){
			clicked('../home-owner/index/index.html');
		}else if(ret1.user_type.indexOf('领导')!=-1){
			clicked('../index/index.html');
		}
//      clicked('../index/index.html');
      });
    });

 }
 
