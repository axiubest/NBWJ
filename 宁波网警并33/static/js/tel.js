/**
 * author:申屠
 */
mui.init();

var code='';var phone='';
code=getQueryString("code");
phone=getQueryString("phone");
var homes='';
homes=getQueryString("home");
$('#tel').text(phone);


//保存变色
function color(){		
	if($.trim($('#newtel').val())!==''){
$('.save').css('background','#0d86ff').css('pointer-events','all');
	}
	if($.trim($('#newtel').val())==''){
		$('.save').css('background','#ccc').css('pointer-events','none');
	}　
}

$('#newtel').click(function(){
	setInterval(color,50);
})
//保存验证
$('.save').click(function(){
    //验证手机号码
    var phone2=$("#newtel").val();
    var tel = /^1([38]\d|4[57]|5[0-35-9]|7[06-8]|8[89])\d{8}$/;
    if(tel.test(phone2)){ 

		http.post('/mobile/phone/modify_withcode.html', {
			code: code,phone:phone2
		}).done(function(data) {
			console.log(data);
			if(data.res=='ok'){
				if(homes=='1'){
					clicked('../home-industry/mine/mine.html');
				}else if(homes=='2'){
					clicked('../home-owner/index/index.html');
				}else{
					clicked('../index/index.html');
				}		
       		layer.msg('保存成功!', { time: 2000 });
			}else{
				layer.msg('网络错误!', { time: 2000 });
			}
			
		});

    }else if(!tel.test(phone)){layer.msg('请输入正确的手机号码！', { time: 2000 });}

})

