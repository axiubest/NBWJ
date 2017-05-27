/**
 * author:申屠
 */
//内容高度
   var bodyheight=$(window).height();
   var viewheight=bodyheight-275;
   if(viewheight>280){
   	$('.cont-info').css("height", viewheight);
   }
mui.init();
var mail='';
var app1=new Vue({ 
    el: "#info",
    data: {
    	user_phone:"",
        user_mail: "",  
        user_name:"",
        user_type:""
    }
})
//获取存储数据

function load(){	
//获取数据
http.post('/mobile/home_getuserinfo.html').done(function(data) {
	//	console.log(data);
	app1.user_phone=data.user_phone;
	app1.user_mail=data.user_mail;
	mail=data.user_mail;
	app1.user_name=data.user_name;
	app1.user_type=data.user_type;
	});

//威胁显示红点
http.post('/mobile/threatinfo/list.html').done(function(data) {
	if(data.total>0){
	$('.left-cir').show();
	}
})
}
load();
$('#mail').click(function(){
	var mailUrl='../../mail/mail.html?home=1&mail='+mail;
	clicked(mailUrl);
})
//退出登录
$('.login').click(function(){
store.set('appToken', '');
    store.set('userInfo', '');
    store.set('isautologin', 'no');
    clicked('../../login/login.html');
})