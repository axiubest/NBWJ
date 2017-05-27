/**
 * author:申屠
 */
mui.init();
var mail='';
  
var app1=new Vue({ 
    el: "#info",
    data: {
    	user_phone:"",
        user_mail: "",       
    }
})

//jquery加载数据
function load(){	
//获取数据
http.post('/mobile/home_getuserinfo.html').done(function(data) {
//	console.log(data);
app1.user_phone=data.user_phone;
app1.user_mail=data.user_mail;
mail=data.user_mail;

});

}
load();


$('#mail').click(function(){
	var mailUrl='../mail/mail.html?mail='+mail;
	clicked(mailUrl);
})
