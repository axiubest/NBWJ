/**
 * author:申屠
 */
var token=localStorage.getItem("appToken");//token
//token=token.replace(/\"/g,"");

var beforemail='';
beforemail=getQueryString("mail");
$('#beforemail').text(beforemail);
var homes='';
homes=getQueryString("home");

//保存变色
function color(){		
	if($('#mail').val()!==''){
$('.save').css('background','#0d86ff').css('pointer-events','all');
	}
	if($('#mail').val()==''){
		$('.save').css('background','#ccc').css('pointer-events','none');
	}　
}
$('#mail').click(function(){
	setInterval(color,50);
})

//保存验证
$('.save').click(function(){
	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
	if(reg.test($('#mail').val())){
		http.post('/mobile/email/modify.html', {
			email: $('#mail').val()
		}).done(function(data) {
			console.log(data);
			if(data.status == '100') {
				layer.msg('网络错误!', {
					time: 2000
				});
			} else {
				if(homes=='1'){
					clicked('../home-industry/mine/mine.html');
				}else if(homes=='2'){
					clicked('../home-owner/index/index.html');
				}else{
					clicked('../index/index.html');
				}
				layer.msg('保存成功!', {
					time: 2000
				});
			}
		
		});
		
	}else{
//		layer.msg('请输入正确的邮箱地址!', { time: 2000 });
	}	
})


